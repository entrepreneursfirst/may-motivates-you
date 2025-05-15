import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.6'

interface AppointmentRow {
  id: string;
  user_id: string;
  scheduled_at: number; // unix timestamp
  title: string;
  agent_id: string;
  provided_context: string;
  scheduling_status: 'initialized' | 'ongoing_call' | 'completed' | 'error';
}

interface UserRow {
  id: string;
  phone?: string;
  balance: number;
}

serve(async (req) => {
  console.log("🕒 Appointment trigger fired at:", new Date().toISOString(), "🕒 Current time in Unix Timestamp (seconds):", Math.floor(Date.now()));
  
  // Set CORS headers
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get current time in unix timestamp (seconds)
    const currentTime = Math.floor(Date.now());
    console.log("currentTime = ", currentTime)
    
    // Calculate time 10 minutes ago
    const tenMinutesAgo = currentTime - 60000;
    
    /*/ Query for appointments that are due in the past 10 minutes and have status "initialized" or "error"
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments_scheduling')
      .select('*')
      .in('scheduling_status', ['initialized', 'error'])
      .lte('scheduled_at', currentTime)
      .gte('scheduled_at', tenMinutesAgo)
      .order('scheduled_at', { ascending: true });
    */
    // Query for appointments that are due in the past 10 minutes and have status "initialized" or "error"
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments_scheduling')
      .select('*')
      .in('scheduling_status', ['initialized', 'error'])
      .lte('scheduled_at', currentTime)
      .order('scheduled_at', { ascending: true });
  
      console.log("data appointments = ", appointments)      
    
    if (appointmentsError) {
      throw new Error(`Error fetching appointments: ${appointmentsError.message}`);
    }
    
    console.log(`📅 Found ${appointments?.length || 0} appointments to process`);
        
    // Process each due appointment
    if (appointments && appointments.length > 0) {
      for (const appointment of appointments as AppointmentRow[]) {
        try {
          console.log(`🔍 Processing appointment: ${appointment.id} for user: ${appointment.user_id}`);
          
          // Update appointment status to "ongoing"
          const { error: updateError } = await supabase
            .from('appointments_scheduling')
            .update({ scheduling_status: 'ongoing_call' })
            .eq('id', appointment.id);
          
          if (updateError) {
            throw new Error(`Error updating appointment status: ${updateError.message}`);
          }
          
          // Get user's phone number
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('phone, balance')
            .eq('id', appointment.user_id)
            .single();
          
          if (userError || !userData) {
            throw new Error(`Error fetching user data: ${userError?.message || 'User not found'}`);
          }
          
          const user = userData as UserRow;
          
          if (!user.phone) {
            throw new Error('User has no phone number');
          }
          
          if (user.balance <= 0) {
            throw new Error('User has insufficient balance');
          }
          
          // Make the call via make-call function
          const callResponse = await fetch(
            `${supabaseUrl}/functions/v1/make-call`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`
              },
              body: JSON.stringify({
                toNumber: user.phone,
                agentId: appointment.agent_id,
                userId: appointment.user_id,
                providedContext: appointment.provided_context
              })
            }
          );
          
          const callResult = await callResponse.json();
          
          if (!callResponse.ok || !callResult.success) {
            throw new Error(`Call failed: ${callResult.error || 'Unknown error'}`);
          }
          
          // Update appointment with call result
          const { error: finalUpdateError } = await supabase
            .from('appointments_scheduling')
            .update({
              scheduling_status: 'completed',
              response_body: JSON.stringify(callResult),
              call_id: callResult.callId
            })
            .eq('id', appointment.id);
          
          if (finalUpdateError) {
            throw new Error(`Error updating appointment with result: ${finalUpdateError.message}`);
          }
          
         
          
          console.log(`✅ Successfully processed appointment: ${appointment.id}`);
        } catch (appointmentError) {
          console.error(`❌ Error processing appointment ${appointment.id}:`, appointmentError);
          
          // Update appointment status to "error"
          await supabase
            .from('appointments_scheduling')
            .update({
              scheduling_status: 'error',
              response_body: JSON.stringify({
                error: appointmentError instanceof Error ? appointmentError.message : String(appointmentError)
              })
            })
            .eq('id', appointment.id);
          
        
        }
      }
    }
    
    return new Response(
      JSON.stringify({
        processed: appointments?.length || 0,
        time: new Date().toISOString(),
      }),
      {
        headers: {
          ...Object.fromEntries(headers),
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("❌ Error in appointment trigger:", error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
        time: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          ...Object.fromEntries(headers),
          "Content-Type": "application/json"
        }
      }
    );
  }
})
