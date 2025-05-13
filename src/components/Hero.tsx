
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, ChevronDown } from 'lucide-react';
import PhoneAnimation from './PhoneAnimation';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Country codes for the dropdown
const countryCodes = [
  { code: "+1", country: "US", name: "United States" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+33", country: "FR", name: "France" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+61", country: "AU", name: "Australia" },
  { code: "+91", country: "IN", name: "India" },
  { code: "+81", country: "JP", name: "Japan" },
  { code: "+86", country: "CN", name: "China" },
];

const Hero = () => {
  const [isPhoneInputActive, setIsPhoneInputActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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

  const handleSelectCountry = (country) => {
    setSelectedCountryCode(country);
  };

  // This function will be called from PhoneAnimation component
  const handlePhoneAnswerFromAnimation = () => {
    setIsPhoneInputActive(true);
  };

  const handlePhoneHangUpFromAnimation = () => {
    setIsPhoneInputActive(false);
  };
  
  return (
    <section id="hero" className="pt-40 pb-28 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-commitify-yellow opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-commitify-purple opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative">
          {/* Sun Sticker with floating animation */}
          <div className="absolute top-[450px] -left-[700px] md:top-[400px] md:-left-[700px] lg:top-[400px] lg:-left-[700px] w-24 md:w-32 lg:w-40 z-10">
            <img 
              src="/lovable-uploads/7699a50a-72f1-4d30-9cd6-720d836c481f.png" 
              alt="Sun Sticker" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
              Lazy days happen.
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Our AI agents can <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">motivate you.</span>
            </h2>
            <p className="text-lg text-commitify-secondary">
              Commitify is the AI that calls when motivation runs out and procrastination kicks in.
            </p>
            
            {/* Updated button area with smoother transition */}
            <div className="flex items-center gap-4">
              <div className="flex transition-all duration-300 ease-in-out">
                {isPhoneInputActive ? (
                  <div className="flex items-center animate-fade-in">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          className="bg-white border border-gray-300 text-gray-700 px-3 py-6 rounded-l-full hover:bg-gray-50 flex items-center min-w-[90px] justify-center gap-1"
                        >
                          {selectedCountryCode.code} <ChevronDown className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 max-h-[300px] overflow-y-auto">
                        <div className="grid">
                          {countryCodes.map((country) => (
                            <div
                              key={country.code}
                              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectCountry(country)}
                            >
                              <span className="font-medium">{country.code}</span>
                              <span className="ml-2 text-sm text-gray-600">{country.name}</span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="py-6 rounded-none border-l-0 border-r-0 w-[180px] sm:w-[220px]"
                      placeholder="Phone number"
                    />
                    
                    <div className="flex">
                      <Button 
                        onClick={handleSubmit}
                        className="bg-commitify-yellow text-commitify-text hover:bg-commitify-yellow/90 px-4 py-6 rounded-none"
                      >
                        <Check className="w-5 h-5" />
                      </Button>
                      <Button 
                        onClick={handleCancel}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-6 rounded-r-full"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-medium text-lg px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all"
                    onClick={handlePhoneInput}
                  >
                    Try it for $0
                  </Button>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="border-2 border-commitify-blue text-commitify-blue hover:bg-commitify-blue/10 font-medium text-lg px-8 py-6 rounded-full"
                onClick={() => scrollToSection('how-it-works')}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Phone Animation */}
          <div className="flex justify-center lg:justify-end mt-12 lg:mt-0 pr-0 lg:pr-8 overflow-visible">
            <PhoneAnimation 
              onAnswerCall={handlePhoneAnswerFromAnimation} 
              onHangUp={handlePhoneHangUpFromAnimation}
            />
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
    </section>
  );
};

export default Hero;
