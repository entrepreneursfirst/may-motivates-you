// SignupDialog.tsx
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
import { Mail, Lock, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/utils/supabase';

interface SignupDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SignupDialog = ({ isOpen, setIsOpen }: SignupDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!email || !phone || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Phone number validation (simple)
    const phonePattern = /^\+?[0-9]{10,15}$/;
    if (!phonePattern.test(phone.replace(/\s|-|\(|\)/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Format phone number for E.164 compliance (required by Supabase)
      let formattedPhone = phone.replace(/\s|-|\(|\)/g, '');
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }
      
      // Sign up user with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone: formattedPhone, // Add phone directly to auth record
        options: {
          data: {
            phone: formattedPhone
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Create user record in users table
      if (data.user) {
        // Update the user's phone number in auth.users table
        await supabase.auth.updateUser({
          phone: formattedPhone
        });
        
        // Also store in custom users table
        const { error: profileError } = await supabase.from('users').upsert({
          id: data.user.id,
          to_number: formattedPhone,
          email: data.user.email
        });
        
        if (profileError) {
          // Silent warning without console output
        }
      }
      
      toast({
        title: "Account Created!",
        description: "Your account has been created successfully.",
      });
      
      // Close dialog and navigate to user environment
      setIsOpen(false);
      navigate('/user-environment');
      
    } catch (error: any) {
      // Silently handle error without logging to console
      let errorMessage = "Failed to create account. Please try again.";
      
      if (error.message?.includes("already registered")) {
        errorMessage = "This email is already registered. Please log in instead.";
      } else if (error.message?.includes("password")) {
        errorMessage = "Password should be at least 6 characters long.";
      }
      
      toast({
        title: "Signup Failed",
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
          <DialogTitle>Create Your Account</DialogTitle>
          <DialogDescription>
            Sign up to get started with your personal accountability agent.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSignup} className="space-y-4 py-4">
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
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Phone Number</span>
            </Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="Enter your phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-500">Format: +1 (123) 456-7890</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Password</span>
            </Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-500">Minimum 6 characters</p>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog; 