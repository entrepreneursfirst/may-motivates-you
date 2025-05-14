
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, ChevronDown } from 'lucide-react';
import PhoneAnimation from './PhoneAnimation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from '@/hooks/use-mobile';

// Country codes for the dropdown with added flag emoticons
const countryCodes = [{
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
  const isMobile = useIsMobile();

  // Add an event listener for the custom event
  useEffect(() => {
    const handleActivatePhoneInput = () => {
      setIsPhoneInputActive(true);
    };
    window.addEventListener('activatePhoneInput', handleActivatePhoneInput);
    return () => {
      window.removeEventListener('activatePhoneInput', handleActivatePhoneInput);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handlePhoneInput = () => {
    setIsPhoneInputActive(true);
  };

  const handleCancel = () => {
    setIsPhoneInputActive(false);
    setPhoneNumber('');
  };

  const handleSubmit = () => {
    if (selectedCountryCode.code !== "+1") {
      setShowWaitlistDialog(true);
    } else {
      console.log("Phone number submitted:", selectedCountryCode.code + phoneNumber);
      setIsPhoneInputActive(false);
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
              Our AI agents make sure you <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">own it.</span>
            </h2>
            
            {/* Subtext - Changed from text-center to text-left */}
            <p className="text-left text-commitify-secondary text-xl mb-4 max-w-3xl">Meet Commitify — the AI that calls when motivation runs out and procrastination kicks in.</p>
            
            {/* Button area with smooth horizontal expansion - Updated for mobile layout */}
            <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4`}>
              <div className={`transition-all duration-700 ease-in-out ${isPhoneInputActive ? (isMobile ? 'w-full' : 'w-[450px]') : 'w-[168px]'}`}>
                {isPhoneInputActive ? <div className="flex items-center w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="bg-white border border-gray-300 text-gray-700 px-3 py-6 rounded-l-full hover:bg-gray-50 flex items-center min-w-[90px] justify-center gap-1">
                          {selectedCountryCode.flag} {selectedCountryCode.code} <ChevronDown className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 max-h-[300px] overflow-y-auto bg-white">
                        <div className="grid">
                          {countryCodes.map(country => <div key={country.code} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectCountry(country)}>
                              <span className="mr-2 text-lg">{country.flag}</span>
                              <span className="font-medium">{country.code}</span>
                              <span className="ml-2 text-sm text-gray-600">{country.name}</span>
                            </div>)}
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Input 
                      type="tel" 
                      value={phoneNumber} 
                      onChange={e => setPhoneNumber(e.target.value)} 
                      className={`py-6 rounded-none border-l-0 border-r-0 ${isMobile ? 'w-[120px] sm:w-[160px]' : 'w-[180px] sm:w-[220px]'}
                          shadow-[0_0_15px_rgba(178,107,202,0.7)] focus:shadow-[0_0_25px_rgba(178,107,202,0.9)]
                          border-commitify-purple/30 focus:border-commitify-purple/50 
                          outline-none ring-2 ring-commitify-yellow/30 focus:ring-commitify-yellow/50`} 
                      placeholder="Phone number" 
                    />
                    
                    <div className="flex">
                      <Button onClick={handleSubmit} className="bg-commitify-yellow text-commitify-text hover:bg-commitify-yellow/90 px-4 py-6 rounded-none shadow-[0_0_10px_rgba(252,192,27,0.5)]">
                        <Check className="w-5 h-5" />
                      </Button>
                      <Button onClick={handleCancel} className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-6 rounded-r-full">
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div> : <Button className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-medium text-lg px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all w-full" onClick={handlePhoneInput}>
                    Try it for $0
                  </Button>}
              </div>
              
              <Button 
                variant="outline" 
                className={`border-2 border-commitify-blue text-commitify-blue hover:bg-commitify-blue/10 font-medium text-lg px-8 py-6 rounded-full transition-all duration-700 ${isPhoneInputActive && !isMobile ? 'translate-x-4' : ''}`} 
                onClick={() => scrollToSection('how-it-works')}
              >
                Learn More
              </Button>
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
    </section>;
};
export default Hero;
