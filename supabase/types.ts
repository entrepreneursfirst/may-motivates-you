export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          title: string
          description: string | null
          scheduled_at: string
          status: Database['public']['Enums']['appointment_status']
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          title: string
          description?: string | null
          scheduled_at: string
          status?: Database['public']['Enums']['appointment_status']
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          title?: string
          description?: string | null
          scheduled_at?: string
          status?: Database['public']['Enums']['appointment_status']
          created_at?: string
          updated_at?: string
        }
      }
      calls: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          appointment_id: string | null
          started_at: string
          ended_at: string | null
          status: Database['public']['Enums']['call_status']
          duration_seconds: number | null
          created_at: string
          summary: string | null
          response_body: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          appointment_id?: string | null
          started_at: string
          ended_at?: string | null
          status: Database['public']['Enums']['call_status']
          duration_seconds?: number | null
          created_at?: string
          summary?: string | null
          response_body?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          appointment_id?: string | null
          started_at?: string
          ended_at?: string | null
          status?: Database['public']['Enums']['call_status']
          duration_seconds?: number | null
          created_at?: string
          summary?: string | null
          response_body?: Json | null
        }
      }
    }
    Enums: {
      appointment_status: 'scheduled' | 'completed' | 'cancelled'
      call_status: 'completed' | 'missed' | 'cancelled'
    }
    Functions: {}
    Composites: {}
  }
}

// Helper types for common use cases
export type Agent = Database['public']['Tables']['agents']['Row']
export type NewAgent = Database['public']['Tables']['agents']['Insert']
export type UpdateAgent = Database['public']['Tables']['agents']['Update']

export type Appointment = Database['public']['Tables']['appointments']['Row']
export type NewAppointment = Database['public']['Tables']['appointments']['Insert']
export type UpdateAppointment = Database['public']['Tables']['appointments']['Update']
export type AppointmentStatus = Database['public']['Enums']['appointment_status']

export type Call = Database['public']['Tables']['calls']['Row']
export type NewCall = Database['public']['Tables']['calls']['Insert']
export type UpdateCall = Database['public']['Tables']['calls']['Update']
export type CallStatus = Database['public']['Enums']['call_status']
