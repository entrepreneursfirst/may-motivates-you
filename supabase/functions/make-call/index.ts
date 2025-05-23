// make-call
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Retell from 'https://esm.sh/retell-sdk'

interface CallRequest {
  toNumber: string;
  agentId: string;
  userId?: string;
  provided_context?: string
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
    const body: CallRequest = await req.json();
    console.log('📋 Request body:', JSON.stringify(body, null, 2));
    const { toNumber, agentId, userId, provided_context } = body;
    
    if (!toNumber || !agentId) {
      console.error('❌ Missing required parameters:', { toNumber, agentId });
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // get previous transcripts by user
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


    // here we would need to poll the country_from_number database instead. this is now nonsense code as agentid is already checked
    if (!agentId) {
      console.error(`❌ No from_number found for agent ID: ${agentId}`);
      return new Response(
        JSON.stringify({ success: false, error: `Invalid agent ID: ${agentId}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // // get previous transcripts by user
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
    
    //const supabase = createClient(supabaseUrl, supabaseKey);

    const previous_transcripts = await supabase
    .from('calls')
    .select('transcript')
    .eq('user_id', userId)

    console.log(`previous transcripts user_id ${userId }: `, JSON.stringify(previous_transcripts.data))

    let transcript_list_text: string = ""

    for (var i = 0; i< previous_transcripts.data.length; i++) {
      transcript_list_text = `${transcript_list_text} \n\n transcript ${i}: \n ${JSON.stringify(previous_transcripts.data[i].transcript)}`
    }
    console.log(`# Transcipts \n ${transcript_list_text}`)

    console.log(`calling agent_id ${agentId}`)
    // Make the call
    console.log('📱 Making call from', '+13153258101', 'to', toNumber);
    
    const retellResponse = await retellClient.call.createPhoneCall({
      from_number: '+13153258101',
      to_number: toNumber,
      override_agent_id: agentId,
      retell_llm_dynamic_variables: { previous_transcript_text: transcript_list_text, provided_context: provided_context},
    });

    console.log(`agent response_id = ${retellResponse.agent_id}`)
    console.log('✅ Call created successfully:', retellResponse.call_id);
    console.log('📊 Call details:', JSON.stringify(retellResponse, null, 2));
    
    
    
    // Record the call in the database
    if (userId) {
      console.log('💾 Recording call in database for user:', userId);
      const callData = {
        id: retellResponse.call_id,
        user_id: userId,
        agent_id: retellResponse.agent_id,
        started_at: new Date().toISOString(),
        to_number: toNumber,
        status: 'completed',
        duration_seconds: retellResponse.call_cost.total_duration_seconds,
        response_body: JSON.stringify(retellResponse),
      };
      console.log('📝 Call data to insert:', JSON.stringify(callData, null, 2));
      
      const { data, error } = await supabase
      .from('calls')
      .insert(callData);
      
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