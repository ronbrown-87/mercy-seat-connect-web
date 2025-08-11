import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, avatarUrl?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<AuthUser>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          avatarUrl: data.avatar_url
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if Supabase is accessible
      if (!supabase.auth) {
        throw new Error('Authentication service is not available. Please check your internet connection.');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('fetch')) {
          throw new Error('Network error: Unable to connect to authentication service. Please check your internet connection and try again.');
        }
        throw error;
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error types
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        throw new Error('Network error: Unable to connect to authentication service. Please check your internet connection and try again.');
      }
      
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }
      
      if (error.message?.includes('Email not confirmed')) {
        throw new Error('Please check your email and confirm your account before logging in.');
      }
      
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  };

  const signup = async (name: string, email: string, password: string, avatarUrl?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if Supabase is accessible
      if (!supabase.auth) {
        return { success: false, error: 'Authentication service is not available. Please check your internet connection.' };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            avatar_url: avatarUrl
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        
        // Handle specific error cases
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          return { success: false, error: 'An account with this email already exists. Please try logging in instead.' };
        }
        
        if (error.message.includes('fetch') || error.message.includes('network')) {
          return { success: false, error: 'Network error: Unable to connect to authentication service. Please check your internet connection and try again.' };
        }
        
        if (error.message.includes('password')) {
          return { success: false, error: 'Password must be at least 6 characters long.' };
        }
        
        if (error.message.includes('email')) {
          return { success: false, error: 'Please enter a valid email address.' };
        }
        
        return { success: false, error: error.message || 'Signup failed. Please try again.' };
      }

      if (data.user) {
        try {
          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                name,
                email,
                avatar_url: avatarUrl
              }
            ]);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // If profile creation fails, we should clean up the user account
            await supabase.auth.signOut();
            return { success: false, error: 'Failed to create user profile. Please try again.' };
          }

          await fetchUserProfile(data.user.id);
          return { success: true };
        } catch (profileError: any) {
          console.error('Profile creation error:', profileError);
          // Clean up the user account if profile creation fails
          await supabase.auth.signOut();
          return { success: false, error: 'Failed to create user profile. Please try again.' };
        }
      }
      return { success: false, error: 'Signup failed. Please try again.' };
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle network and fetch errors
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        return { success: false, error: 'Network error: Unable to connect to authentication service. Please check your internet connection and try again.' };
      }
      
      return { success: false, error: error.message || 'An unexpected error occurred. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (updates: Partial<AuthUser>): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          avatar_url: updates.avatarUrl
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    updateProfile
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};