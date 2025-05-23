// AuthDialog
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import supabase from '@/utils/db/supabase';

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

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: () => void;
  initialPhoneNumber?: string;
  initialCountryCode?: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onOpenChange,
  onAuthSuccess,
  initialPhoneNumber = '',
  initialCountryCode = '+1'
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAutoSent, setHasAutoSent] = useState(false);

  
  // Get formatted phone number with country code
  const getFullPhoneNumber = () => {
    return `${countryCode}${phoneNumber}`;
  };
  
  // Step 1: Send OTP to phone number
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
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
      setStep('otp');
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
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate OTP
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
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
        token: otp,
        type: 'sms',
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Phone number verified successfully",
      });
      
      // Close dialog and notify parent of success
      onOpenChange(false);
      onAuthSuccess();
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
  
  // Reset dialog state when closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep('phone');
      setOtp('');
    }
    onOpenChange(open);
  };


  useEffect(() => {
    if (open) {
      setPhoneNumber(initialPhoneNumber || '');
      setCountryCode(initialCountryCode || '+1');
      setHasAutoSent(false); // Reset on open

    }
  }, [open, initialPhoneNumber, initialCountryCode]);

    // Watch phoneNumber AFTER it's set, then trigger OTP
  useEffect(() => {
    if (
      open &&
      step === 'phone' &&
      phoneNumber.length >= 7 &&
      !hasAutoSent
    ) {
      handleSendOtp(); // no event passed
      setHasAutoSent(true);
    }
  }, [open, step, phoneNumber, hasAutoSent]);
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'phone' ? 'Verify Your Phone Number' : 'Enter Verification Code'}
          </DialogTitle>
        </DialogHeader>
        
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex">
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
                type="tel" 
                placeholder="Enter your phone number" 
                className="rounded-l-none rounded-r-md" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Enter the 6-digit code sent to {getFullPhoneNumber()}
              </p>
              <Input 
                type="text" 
                placeholder="Enter 6-digit code" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setStep('phone')}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog; 