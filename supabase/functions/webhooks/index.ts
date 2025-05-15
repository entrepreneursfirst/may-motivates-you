import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Retell from 'https://esm.sh/retell-sdk'

interface WebhookRequestBody {
  event: string;
  call: {
    call_type: string;
    from_number: string;
    to_number: string;
    direction: string;
    call_id: string;
    agent_id: string;
    call_status: string;
    metadata: Record<string, any>;
    retell_llm_dynamic_variables?: Record<string, string>;
    start_timestamp: number;
    end_timestamp: number;
    disconnection_reason: string;
    transcript: string;
    transcript_object: Array<any>;
    transcript_with_tool_calls: Array<any>;
    opt_out_sensitive_data_storage: boolean;
    call_analysis?: {
      call_summary: string;
      in_voicemail: boolean;
      user_sentiment: string;
      call_successful: boolean;
      custom_analysis_data: Record<string, any>;
    };
    total_cost?: number;
  };
}

// Database storage interface with only the fields we want to store
interface CallDatabaseEntry {
  id: string;
  user_id: string;
  agent_id: string;
  to_number: string;
  status: string;
  transcript: string;
  started_at: string,
  ended_at: string,
  summary?: string;
  user_sentiment?: string;
  call_successful?: boolean;
  in_voicemail?: boolean;
  follow_up_task?: string
  duration_seconds: number; // In milliseconds
  total_cost?: number; // Assuming this comes from elsewhere as it's not in the webhook
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
    // // verify the retell_API_KEY -> Uncommit this when all is working
    // console.log(`XTELL SIGNATURE = ${Deno.env.get("X-RETELL-SIGNATURE")}`)
    // if (
    //   !Retell.verify(
    //     JSON.stringify(req.body),
    //     Deno.env.get("X-RETELL-SIGNATURE"),
    //     req.headers["x-retell-signature"] as string,
    //   )
    // ) {
    //   console.error("Invalid signature");
    //   return;
    // }
      
    let userId = "";
    let userBalance = 0;
    const data = await req.json();
    console.log(JSON.stringify(data));
    const body: WebhookRequestBody = data//await req.json();

    console.log()
    console.log('📋 Request body:', JSON.stringify(body, null, 2));
    const to_number_cleaned = body.call.to_number.replace("+", ""); // Removes the first +

    
    // Initialize Supabase client (to record the webhook response in the database)
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
    if (to_number_cleaned) {
      console.log('💾 retrieving userId from the to_number:', body.call.to_number);



      
      // upsert updates an existing row or creates a new row if it doesn't exist
      const { data, error } = await supabase
      .from('users')
      .select()
      .eq('to_number', to_number_cleaned)

      console.log(data)
      userId = data[0]?.id
      userBalance = data[0]?.balance
      console.log(`I got the return value of data which is the user id in ${userId}`)
      console.log(`userBalance = ${userBalance}`)
      
      if (!data) {
        console.error('❌ Error inserting call record:', error);
      } else {
        console.log('✅ Call record inserted successfully');
      }
    } else {
      console.log('⚠️ No userId provided, skipping database record');
    }
    console.log(`userId = ${userId}`)
    console.log(`body data to insert before callDataBaseENtry = ${JSON.stringify(body)}`)
    // convert the data of the webhook by retell into useful data for the database
    const updateData: CallDatabaseEntry = {
      id: body.call.call_id,
      user_id: userId,
      agent_id: body.call.agent_id,
      to_number: to_number_cleaned,
      transcript: body.call.transcript, 
      status: body.call.call_status,
      started_at: new Date(body.call.start_timestamp).toISOString(),
      ended_at: new Date(body.call.end_timestamp).toISOString(),
      summary: body.call.call_analysis?.call_summary,
      user_sentiment: body.call.call_analysis?.user_sentiment,
      call_successful: body.call.call_analysis?.call_successful,
      in_voicemail: body.call.call_analysis?.in_voicemail,
      follow_up_task: body.call.call_analysis?.custom_analysis_data.get_followup_task,
      duration_seconds: (body.call.end_timestamp - body.call.start_timestamp)/1000,
      total_cost: body.call?.total_cost
    }
    
    const callId: string = body.call.call_id
    // Record the call in the database
    if (callId) {
      console.log('💾 Updating callId\'s call data in database:', callId);
      
      console.log('📝 Call data to insert:', JSON.stringify(updateData, null, 2));
      // upsert updates an existing row or creates a new row if it doesn't exist
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
      .from('calls')
      .upsert(updateData)
      .eq('id', callId)
      
      if (error) {
        console.error('❌ Error inserting call record:', error);
      } else {
        console.log('✅ Call record inserted successfully');
      }

      if (body.event==="call_analyzed") {
        // upsert updates an existing row or creates a new row if it doesn't exist

        let newBalance;
        if (body.call.agent_id === "agent_f6f715fe18971f95067744e49d"){
          newBalance = userBalance
        } else{
          newBalance = userBalance - 1;
        }
        

        const { balance_data, balance_error } = await supabase
          .from('users')
          .update({balance: newBalance})
          .eq('id', userId)
        console.log("balance data")
        console.log(balance_data)
        console.log(`error of balance_error = ${balance_error}`)
        console.log(`I got the return value of data which is the user id in ${userId}`)
        console.log(`userBalance = ${userBalance} new balance = ${newBalance}`)
      }

    if (!data) {
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