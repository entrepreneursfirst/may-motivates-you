// LoginHandler.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/utils/db/supabase';

interface LoginHandlerProps {
  onLoginSuccess: () => void;
  onLoginFailure: () => void;
}

const LoginHandler: React.FC<LoginHandlerProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // This function attempts to log in the user directly without verification
  const performDirectLogin = useCallback(async () => {
    if (isLoggingIn) return;
    
    setIsLoggingIn(true);
    
    try {
      // Create a temporary user for demonstration purposes
      // In a real implementation, you would have a more secure approach
      // Note: This will only work if anonymous logins are enabled in Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        // Use dummy values since we're bypassing verification
        // Replace these with your test account credentials or implement another method
        email: 'user@example.com',
        password: 'password123',
      });
      
      if (error) {
        // Silently handle error without logging to console
        toast({
          title: 'Login Failed',
          description: 'Unable to log you in automatically. Please call the agent number.',
          variant: 'destructive',
        });
        onLoginFailure();
        return;
      }
      
      // Success - user is logged in
      toast({
        title: 'Login Successful',
        description: 'Welcome to Commitify!',
      });
      
      // Call success callback
      onLoginSuccess();
      
      // Navigate to user environment
      navigate('/user-environment');
      
    } catch (error) {
      // Silently handle error without logging to console
      toast({
        title: 'Login Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
      onLoginFailure();
    } finally {
      setIsLoggingIn(false);
    }
  }, [isLoggingIn, navigate, onLoginFailure, onLoginSuccess, toast]);

  // Attempt login automatically when component mounts
  useEffect(() => {
    performDirectLogin();
  }, [performDirectLogin]);

  return null; // This is a functional component with no UI
};

export default LoginHandler; 