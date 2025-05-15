import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Retell from 'https://esm.sh/retell-sdk'

interface CallScheduleRequest {
  toNumber: string;
  agentId: string;
  userId?: string;
  scheduled_timestamp: number

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
    const { toNumber, agentId, userId, scheduled_timestamp } = body;
    
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

    
    // Initialize Retell client
    console.log('🔑 Initializing Retell client');
    const apiKey = Deno.env.get('RETELL_API_KEY') || '';
    if (!apiKey) {
      console.error('❌ Missing RETELL_API_KEY environment variable');
    }
    
    const retellClient = new Retell({
      apiKey: apiKey,
    });

    //mapping of agents and from numbers:
    const agentFromNumberMap = {
      'agent1': '+13153258101',
    }
    
    if (!agentFromNumberMap["agent1"]) {
      console.error(`❌ No from_number found for agent ID: ${agentId}`);
      return new Response(
        JSON.stringify({ success: false, error: `Invalid agent ID: ${agentId}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Make the call
    console.log('📱 Making call from +13153258101 ', 'to', toNumber);

    const retellResponse = await retellClient.batchCall.createBatchCall({
      from_number: "+13153258101",
      tasks: [{ to_number: toNumber, retell_llm_dynamic_variables: { customer_name: 'bar' } }],
      name: 'First batch call',
      trigger_timestamp: scheduled_timestamp,
    });

    console.log('✅ Call created successfully:', retellResponse.call_id);
    console.log('📊 Call details:', JSON.stringify(retellResponse, null, 2));
    
    // // Initialize Supabase client (to record the call in the database)
    // console.log('🔄 Initializing Supabase client');
    // const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    // const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    // if (!supabaseUrl || !supabaseKey) {
    //   console.error('❌ Missing Supabase environment variables:', { 
    //     hasUrl: !!supabaseUrl, 
    //     hasKey: !!supabaseKey 
    //   });
    // }
    
    // const supabase = createClient(supabaseUrl, supabaseKey);
    const scheduled_at = new Date(scheduled_timestamp).toISOString()
    // Record the call in the database
    if (userId) {
      console.log('💾 Recording call in database for user:', userId);
      const callData = {
        user_id: userId,
        agent_id: agentId,
        title: "My scheduled call",
        scheduled_at: scheduled_at,
        status: 'completed',    
        response_body: JSON.stringify(retellResponse),
      };
      console.log('📝 Call data to insert:', JSON.stringify(callData, null, 2));
      
      const { data, error } = await supabase.from('appointments').insert(callData);
      
      if (error) {
        console.error('❌ Error inserting call record:', error);
      } else {
        console.log('✅ Call record inserted successfully');
      }
    } else {
      console.log('⚠️ No userId provided, skipping database record');
    }
    
    console.log('🏁 Returning successful response');
    return new Response(
      JSON.stringify({ 
        success: true, 
        callId: retellResponse.call_id,
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
    console.error('❌ Error making RetellAI call:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
    
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