// LoginDialog.tsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/utils/db/supabase';

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoginDialog = ({ isOpen, setIsOpen }: LoginDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome to Commitify!",
      });
      
      // Close dialog and navigate to user environment
      setIsOpen(false);
      navigate('/user-environment');
      
    } catch (error: any) {
      // Silently handle error without logging to console
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (error.message?.includes("Invalid login")) {
        errorMessage = "Invalid email or password. Please try again.";
      }
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log in to Commitify</DialogTitle>
          <DialogDescription>
            Enter your email and password to access your account.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Password</span>
            </Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;