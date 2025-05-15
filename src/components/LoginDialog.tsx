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
import { Phone, KeyRound } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import supabase from '@/utils/supabase';

// Common country codes with flags
const countryCodes = [
  { code: "+1", flag: "🇺🇸", country: "US/CA" },
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+33", flag: "🇫🇷", country: "FR" },
  { code: "+49", flag: "🇩🇪", country: "DE" },
  { code: "+61", flag: "🇦🇺", country: "AU" },
  { code: "+86", flag: "🇨🇳", country: "CN" },
  { code: "+91", flag: "🇮🇳", country: "IN" },
  { code: "+81", flag: "🇯🇵", country: "JP" },
  { code: "+52", flag: "🇲🇽", country: "MX" },
  { code: "+55", flag: "🇧🇷", country: "BR" },
];

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoginDialog = ({ isOpen, setIsOpen }: LoginDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for phone number entry
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for OTP verification
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  // Get formatted phone number with country code
  const getFullPhoneNumber = () => {
    return `${countryCode}${phoneNumber}`;
  };

  // Step 1: Send OTP to phone number
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 7) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Sending OTP to:', getFullPhoneNumber());
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: getFullPhoneNumber(),
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Verification Code Sent",
        description: "Please enter the 6-digit code sent to your phone",
      });
      
      // Move to OTP verification step
      setShowVerification(true);
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate OTP
    if (!verificationCode || verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: getFullPhoneNumber(),
        token: verificationCode,
        type: 'sms',
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
      console.error('Error verifying OTP:', error);
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid verification code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowVerification(false);
    setVerificationCode('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to Commitify</DialogTitle>
          <DialogDescription>
            Create a new account or log in to your existing account by providing your phone number and verification code.
          </DialogDescription>
        </DialogHeader>
        
        {!showVerification ? (
          // Phone number form
          <form onSubmit={handleSendCode} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-32 rounded-l-md rounded-r-none border-r-0">
                    <SelectValue placeholder={`${countryCode}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} {country.flag} {country.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  className="rounded-l-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          // Verification code form
          <form onSubmit={handleVerifyCode} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode" className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                <span>Verification Code</span>
              </Label>
              <p className="text-sm text-gray-500">
                Enter the 6-digit code sent to {getFullPhoneNumber()}
              </p>
              <Input 
                id="verificationCode"
                type="text" 
                placeholder="Enter 6-digit code" 
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset} 
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;