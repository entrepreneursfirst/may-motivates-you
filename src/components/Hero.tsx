import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, ChevronDown } from 'lucide-react';
import PhoneAnimation from './PhoneAnimation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/utils/supabase';
import { makeAICall } from '@/utils/retellai';
import { useAuth } from '@/context/AuthContext';
import AuthDialog from './auth/AuthDialog';
import SignupDialog from './SignupDialog';


// Country codes for the dropdown with added flag emoticons
export const countryCodes = [{
  code: "+1",
  country: "US",
  name: "United States",
  flag: "🇺🇸"
}, {
  code: "+44",
  country: "GB",
  name: "United Kingdom",
  flag: "🇬🇧"
}, {
  code: "+33",
  country: "FR",
  name: "France",
  flag: "🇫🇷"
}, {
  code: "+49",
  country: "DE",
  name: "Germany",
  flag: "🇩🇪"
}, {
  code: "+61",
  country: "AU",
  name: "Australia",
  flag: "🇦🇺"
}, {
  code: "+91",
  country: "IN",
  name: "India",
  flag: "🇮🇳"
}, {
  code: "+81",
  country: "JP",
  name: "Japan",
  flag: "🇯🇵"
}, {
  code: "+86",
  country: "CN",
  name: "China",
  flag: "🇨🇳"
}];

const Hero = () => {
  const [isPhoneInputActive, setIsPhoneInputActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  const { user, signOut, isLoading } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  

  // Add an event listener for the custom event
  useEffect(() => {
    const handleActivatePhoneInput = () => {
      setIsPhoneInputActive(true);
    };
    window.addEventListener('activatePhoneInput', handleActivatePhoneInput);
    
    const handleOpenAuthDialog = () => {
      setShowAuthDialog(true);
    };
    window.addEventListener('openAuthDialog', handleOpenAuthDialog);
    
    const handleOpenSignupDialog = () => {
      setShowSignupDialog(true);
    };
    window.addEventListener('openSignupDialog', handleOpenSignupDialog);
    
    return () => {
      window.removeEventListener('activatePhoneInput', handleActivatePhoneInput);
      window.removeEventListener('openAuthDialog', handleOpenAuthDialog);
      window.removeEventListener('openSignupDialog', handleOpenSignupDialog);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handlePhoneInput = () => {
    // Instead of showing the auth dialog, directly show the signup dialog
    setShowSignupDialog(true);
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('openSignupDialog'));
  };

  const handleCancel = () => {
    setIsPhoneInputActive(false);
    setPhoneNumber('');
  };

  const handleSubmit = async () => {
    const fullPhoneNumber = `${selectedCountryCode.code}${phoneNumber}`.replace(/[\s()-]/g, '');

    if (selectedCountryCode.code !== "+1") {
      setShowWaitlistDialog(true);
      return;
    }
    if (user) {
      // Already logged in — make the AI call
      try {
        const callResponse = await makeAICall(
          fullPhoneNumber,
          "agent_f6f715fe18971f95067744e49d",
          user.id
        );
  
        if (callResponse.success) {
          toast({
            title: "Call on its way!",
            description: `Your AI coach is calling ${fullPhoneNumber}`,
          });
          setIsPhoneInputActive(false);
        } else {
          throw new Error(callResponse.error || "Call failed.");
        }
      } catch (err: any) {
        toast({
          title: "Call Error",
          description: err.message || "Unable to place call.",
          variant: "destructive"
        });
      }
    } else {
      // Not logged in — trigger AuthDialog with OTP step
      setShowAuthDialog(true);
    }
  };

    
      

  const handleSelectCountry = country => {
    setSelectedCountryCode(country);
  };

  // Connect phone animation buttons with the Try it for $0 button
  const handlePhoneAnswerFromAnimation = () => {
    setIsPhoneInputActive(true);
  };

  const handlePhoneHangUpFromAnimation = () => {
    setIsPhoneInputActive(false);
    setPhoneNumber('');
  };

  // Render the phone input form (visible or invisible based on state)
  const renderPhoneInput = (visible: boolean) => {
    return (
      <div className={`${visible ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} transition-opacity duration-300 w-full`}>
        <div className="flex items-center w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-white border border-gray-300 text-gray-700 px-3 py-6 rounded-l-full hover:bg-gray-50 flex items-center min-w-[90px] justify-center gap-1">
                {selectedCountryCode.flag} {selectedCountryCode.code} <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 max-h-[300px] overflow-y-auto bg-white">
              <div className="grid">
                {countryCodes.map(country => (
                  <div 
                    key={country.code} 
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" 
                    onClick={() => handleSelectCountry(country)}
                  >
                    <span className="mr-2 text-lg">{country.flag}</span>
                    <span className="font-medium">{country.code}</span>
                    <span className="ml-2 text-sm text-gray-600">{country.name}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Input 
            type="tel" 
            value={visible ? phoneNumber : ''}
            onChange={e => visible && setPhoneNumber(e.target.value)} 
            className={`py-6 rounded-none border-l-0 border-r-0 flex-1
                shadow-[0_0_15px_rgba(178,107,202,0.7)] focus:shadow-[0_0_25px_rgba(178,107,202,0.9)]
                border-commitify-purple/30 focus:border-commitify-purple/50 
                outline-none ring-2 ring-commitify-yellow/30 focus:ring-commitify-yellow/50`} 
            placeholder={visible ? "Phone number" : ""} 
          />
          
          <div className="flex">
            <Button 
              onClick={visible ? handleSubmit : undefined} 
              className="bg-commitify-yellow text-commitify-text hover:bg-commitify-yellow/90 px-4 py-6 rounded-none shadow-[0_0_10px_rgba(252,192,27,0.5)]"
            >
              <Check className="w-5 h-5" />
            </Button>
            <Button 
              onClick={visible ? handleCancel : undefined} 
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-6 rounded-r-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return <section id="hero" className="pt-40 pb-28 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-commitify-yellow opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-commitify-purple opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative">
          {/* Sun Sticker with floating animation - Updated positioning for mobile */}
          <div className="absolute top-[0%] left-[76%] md:left-[43%] lg:top-[0%] lg:left-[43%] w-24 md:w-32 lg:w-40 -z-10">
            <img src="/lovable-uploads/7699a50a-72f1-4d30-9cd6-720d836c481f.png" alt="Sun Sticker" className="w-full h-auto" />
          </div>
          
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-[75px] font-extrabold leading-tight">
              Everyday is your day.
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Our AI agents make sure you <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF914D] via-[#E57040] to-[#EFAF26]">own it.</span>
            </h2>
            
            {/* Subtext - Changed from text-center to text-left */}
            <p className="text-left text-commitify-secondary text-xl mb-4 max-w-3xl">Meet Commitify — the AI that calls when motivation runs out and procrastination kicks in.</p>
            
            {/* Button area with improved layout handling */}
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 w-full`}>
              {/* On mobile, stacking buttons vertically */}
              {isMobile ? (
                <>
                  <div className="w-full transition-all duration-500 ease-in-out">
                    {isPhoneInputActive ? (
                      renderPhoneInput(true)
                    ) : (
                      <div className="flex items-center w-full">
                        <Button 
                          className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-medium text-lg px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all w-full" 
                          onClick={handlePhoneInput}
                        >
                          Get Started
                        </Button>
                        {/* Hidden space placeholder - renders the same dimensions but invisible */}
                        <div className="invisible h-0 absolute">
                          {renderPhoneInput(false)}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-commitify-blue text-commitify-blue hover:bg-commitify-blue/10 font-medium text-lg px-8 py-6 rounded-full"
                    onClick={() => scrollToSection('agents')}
                  >
                    Meet Our Agents
                  </Button>
                </>
              ) : (
                // On desktop, placing buttons side by side with smooth transitions
                <div className="flex items-center space-x-4 transition-all duration-300 ease-in-out">
                  <div className={`transition-all duration-300 ease-in-out ${isPhoneInputActive ? 'w-[450px]' : 'w-[168px]'}`}>
                    {isPhoneInputActive ? (
                      renderPhoneInput(true)
                    ) : (
                      <Button 
                        className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-medium text-lg px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all w-[168px]" 
                        onClick={handlePhoneInput}
                      >
                        Get Started
                      </Button>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-2 border-commitify-blue text-commitify-blue hover:bg-commitify-blue/10 font-medium text-lg px-8 py-6 rounded-full transition-all duration-300"
                    onClick={() => scrollToSection('agents')}
                  >
                    Meet Our Agents
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Phone Animation - Centered on Mobile */}
          <div className="flex justify-center items-center mx-auto lg:mx-0 lg:justify-end mt-12 lg:mt-0 pr-0 lg:pr-8 overflow-visible">
            <PhoneAnimation onAnswerCall={handlePhoneAnswerFromAnimation} onHangUp={handlePhoneHangUpFromAnimation} />
          </div>
        </div>
      </div>

      {/* Waitlist Dialog */}
      <AlertDialog open={showWaitlistDialog} onOpenChange={setShowWaitlistDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>We're expanding soon!</AlertDialogTitle>
            <AlertDialogDescription>
              We are working on getting Commitify available in {selectedCountryCode.name}. Would you like to join our waitlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowWaitlistDialog(false)}>Maybe later</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
            console.log(`Added to waitlist for ${selectedCountryCode.name}`);
            setShowWaitlistDialog(false);
            setIsPhoneInputActive(false);
          }}>
              Join waitlist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthSuccess={async () => {
          const fullPhoneNumber = `${selectedCountryCode.code}${phoneNumber}`.replace(/[\s()-]/g, '');
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            const callResponse = await makeAICall(
              fullPhoneNumber,
              "agent_f6f715fe18971f95067744e49d",
              session.user.id
            );

            if (callResponse.success) {
              toast({
                title: "Call on its way!",
                description: `Your AI coach is calling ${fullPhoneNumber}`,
              });
              setIsPhoneInputActive(false);
            } else {
              toast({
                title: "Call Failed",
                description: callResponse.error || "Unable to place call.",
                variant: "destructive",
              });
            }
          }
        }}
        initialPhoneNumber={phoneNumber}
        initialCountryCode={selectedCountryCode.code}
      />
      
      {/* Add Signup Dialog */}
      <SignupDialog
        isOpen={showSignupDialog}
        setIsOpen={setShowSignupDialog}
      />
    </section>;
};
export default Hero;
