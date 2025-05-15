
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoginDialog = ({ isOpen, setIsOpen }: LoginDialogProps) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, here you would send the verification code to the phone number
    toast({
      title: "Verification code sent",
      description: "A verification code has been sent to your phone number.",
    });
    
    setShowVerification(true);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid verification code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, here you would verify the code
    setIsOpen(false);
    navigate('/user-environment');
    
    toast({
      title: "Login successful",
      description: "Welcome to Commitify!",
    });
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
                <Phone className="w-5 h-5 text-muted-foreground" />
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full">Send Verification Code</Button>
            </DialogFooter>
          </form>
        ) : (
          // Verification code form
          <form onSubmit={handleVerifyCode} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                <span>Verification Code</span>
              </Label>
              <div className="flex justify-center py-2">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode} 
                  onChange={setVerificationCode}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1">Verify & Login</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
