/**
 * RetellAI integration for making phone calls
 */
//import { toast } from '@/components/ui/use-toast';
// This would use the actual Retell SDK in production
// import Retell from 'retell-sdk';

// NOTE: Make sure to set the following environment variables in your .env.local file:
// VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co

interface CallResponse {
  success: boolean;
  callId?: string;
  error?: string;
}

interface MakeCallRequest {
  toNumber: string;
  agentId: string;
  userId?: string;
  appointmentId?: string;
}
interface CallScheduleRequest {
  toNumber: string;
  agentId: string;
  userId?: string;
  scheduled_timestamp: number;
  provided_context: string;
}
/**
 * Makes an AI phone call using RetellAI via Supabase Edge Function
 * @param toNumber The phone number to call
 * @param agentId The ID of the agent voice to use
 * @param userId Optional user ID to associate with the call
 * @param appointmentId Optional appointment ID to associate with the call
 * @returns A response object with the call status
 */
export const makeAICall = async (
  toNumber: string, 
  agentId: string,
  userId: string, // Default user ID for now
): Promise<CallResponse> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    if (!supabaseUrl) {
      throw new Error('Missing Supabase URL configuration');
    }

    const requestBody: MakeCallRequest = {
      toNumber,
      agentId,
      userId,
    };
    console.log(`retell_endpoint = ${`${supabaseUrl}/functions/v1/make-call`}`)


    const response = await fetch(`${supabaseUrl}/functions/v1/make-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || ''}`
      },
      body: JSON.stringify(requestBody)
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as CallResponse;
    
  }catch (error) {
    console.error('Error making RetellAI call:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};




export const scheduleCall = async (
  toNumber: string, 
  agentId: string = "6a628486-8f0a-4206-98e8-42be9a7eea4d",
  userId: string = "7010089f-bd91-4ecc-9a0c-3739e95e40d1", // Default user ID for now
  scheduled_timestamp: number,
  provided_context: string = ""): Promise<CallResponse> => {
  try {
    // In a real implementation, we would get the API key from environment variables
    
    // For development purposes, log what we would be doing
    console.log(`Calling ${toNumber} with agent ${agentId}`);
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    if (!supabaseUrl) {
      throw new Error('Missing Supabase URL configuration');
    }

    const requestBody: CallScheduleRequest = {
      toNumber,
      agentId,
      userId,
      scheduled_timestamp,
      provided_context
    };

    const response = await fetch(`${supabaseUrl}/functions/v1/appointment-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as CallResponse;

  } catch (error) {
    console.log(`error = ${error}`)
  }}