// appointment-schedule
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface CallScheduleRequest {
  toNumber: string;
  agentId: string;
  userId?: string;
  scheduled_timestamp: number;
  provided_context?: string;
}

interface CallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

serve(async (req: Request) => {
  try {
    console.log('📞 Received request:', req.method, req.url);
    
    // Handle CORS
    if (req.method === 'OPTIONS') {
      console.log('🔄 Handling CORS preflight request');
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        }
      })
    }
    
    // Get data from request (toNumber, agentId, userId)
    const body: CallScheduleRequest = await req.json();
    console.log('📋 Request body:', JSON.stringify(body, null, 2));
    const { toNumber, agentId, userId, scheduled_timestamp, provided_context } = body;
    
    if (!toNumber || !agentId || !scheduled_timestamp) {
      console.error('❌ Missing required parameters:', { toNumber, agentId, scheduled_timestamp});
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client (to record the call in the database)
    console.log('🔄 Initializing Supabase client');
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase environment variables:', { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseKey 
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
    
    const userBalance = data[0]?.balance
    if (userBalance <= 0){
      console.log("user balance is unsufficient")
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "not enough balance",
        }),
        {
          status: 402, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }
    console.log(`User balance is ${userBalance} so it is higher than 0 ${userBalance >0}`)
    
    interface CreateAppointmentSchedule {
      user_id: string;
      agent_id: string;
      title: string;
      scheduled_at: number;
      provided_context: string | undefined;
      scheduling_status: 'initialized' | 'ongoing' | 'completed' | 'error';
    }
    
    if (userId) {
      console.log('💾 Recording call in appointment_scheduling in database for user:', userId);
      const callData: CreateAppointmentSchedule = {
        user_id: userId,
        agent_id: agentId,
        title: "My scheduled call",
        scheduled_at: scheduled_timestamp,
        provided_context: provided_context,
        scheduling_status: 'initialized',
      };
      console.log('📝 Call data to insert:', JSON.stringify(callData, null, 2));
      
      const { data, error } = await supabase.from('appointments_scheduling').insert(callData);
      
      if (error) {
        console.error('❌ Error inserting call record:', error);
      } else {
        console.log('✅ Call record inserted successfully');
      }
    } else {
      console.log('⚠️ No userId provided, skipping database record');
    }

    console.log(`data_id = ${data.id}`)
    
    console.log('🏁 Returning successful response');
    return new Response(
      JSON.stringify({ 
        success: true, 
        scheduling_id: data.id,
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  } catch (error) {

    // Log additional context
    console.error('Request method:', req.method);
    console.error('Request URL:', req.url);
    
    try {
      const body = await req.clone().text();
      console.error('Request body:', body);
    } catch (bodyError) {
      console.error('Could not log request body:', bodyError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        response_body: JSON.stringify(error)
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
});
