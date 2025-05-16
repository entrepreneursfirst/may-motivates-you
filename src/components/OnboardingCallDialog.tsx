import React, { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingCallDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const OnboardingCallDialog: React.FC<OnboardingCallDialogProps> = ({
  isOpen,
  setIsOpen
}) => {
  const navigate = useNavigate();
  const [callInitiated, setCallInitiated] = useState(false);
  
  const agentPhoneNumber = "+1 (315) 325-8101";
  const agentPhoneNumberRaw = "+13153258101";
  
  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCallInitiated(false);
    }
  }, [isOpen]);

  const handleCallClick = () => {
    setCallInitiated(true);
    // The actual call will be initiated by the browser through the href
  };
  
  const handleGotoProfile = () => {
    // Close the dialog
    setIsOpen(false);
    // Navigate to user environment with the verify parameter
    navigate('/user-environment?verify=true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Setup</DialogTitle>
          <DialogDescription>
            Call our onboarding agent to verify your phone number and set up your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="p-4 bg-commitify-blue/10 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <Phone className="w-5 h-5 mr-3 text-commitify-blue" />
              <div>
                <p className="font-medium">{agentPhoneNumber}</p>
                <p className="text-xs text-gray-500">Your Onboarding Agent</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              This quick call helps us verify your identity and set up your preferences.
            </p>
          </div>
          
          {!callInitiated ? (
            <a 
              href={`tel:${agentPhoneNumberRaw}`}
              onClick={handleCallClick}
              className="inline-flex items-center justify-center gap-2 w-full bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text px-4 py-3 rounded-lg font-medium transition-colors mb-4"
            >
              <Phone className="w-5 h-5" />
              Call Onboarding Agent
            </a>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-700">
                Thank you for initiating the call!
              </p>
              <Button 
                onClick={handleGotoProfile}
                className="w-full bg-commitify-blue hover:bg-commitify-blue/90 text-white flex items-center justify-center gap-2"
              >
                Continue to your Profile <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className={callInitiated ? 'hidden' : ''}
          >
            Remind me later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingCallDialog; 