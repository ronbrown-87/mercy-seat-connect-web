import { createClient } from '@supabase/supabase-js'

// These values will be automatically provided by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
  created_at: string
}

export interface Comment {
  id: string
  content: string
  user_id: string
  sermon_id?: number
  photo_id?: string
  parent_id?: string
  likes: number
  created_at: string
  user: User
}

export interface Photo {
  id: string
  title: string
  description: string
  image_url: string
  user_id: string
  likes: number
  created_at: string
  user: User
}

export interface Sermon {
  id: number
  title: string
  speaker: string
  date: string
  category: string
  url: string
  description: string
  duration?: string
  tags?: string[]
  likes: number
}
