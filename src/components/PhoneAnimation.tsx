
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PhoneAnimation = () => {
  const [isRinging, setIsRinging] = useState(true);
  const [showCallScreen, setShowCallScreen] = useState(false);
  
  const handleAnswer = () => {
    setIsRinging(false);
    setShowCallScreen(true);
  };
  
  const handleHangUp = () => {
    setIsRinging(true);
    setShowCallScreen(false);
    // After 1 second, start ringing again
    setTimeout(() => {
      setIsRinging(true);
    }, 1000);
  };
  
  return (
    <div className="relative flex items-center gap-6">
      {/* Phone 1 */}
      <div className="relative transform -rotate-6">
        <img 
          src="/lovable-uploads/202da3af-3e90-4992-873f-e63795b76f9a.png" 
          alt="Phone" 
          className="w-48 md:w-64"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
          {/* Zen Master content */}
          <img 
            src="/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png"
            alt="Zen Master"
            className="w-24 h-24 object-cover rounded-full mb-3"
          />
          <p className="text-center text-sm font-medium">Zen Master is calling...</p>
          <div className="flex justify-center mt-3 gap-2">
            <div className="w-3 h-3 bg-commitify-blue rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-commitify-blue rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-commitify-blue rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
      
      {/* Phone 2 (main interactive phone) */}
      <div className="w-56 h-96 bg-black rounded-3xl overflow-hidden shadow-2xl border-8 border-black relative mx-auto transform rotate-6 z-10">
        {/* Phone screen */}
        <div className="w-full h-full bg-white p-4 flex flex-col">
          {isRinging && !showCallScreen && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="bg-commitify-yellow rounded-full p-4 mb-4">
                <img 
                  src="/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png"
                  alt="Slay Bestie"
                  className="w-16 h-16 object-cover rounded-full animate-phone-ring"
                />
              </div>
              <p className="text-lg font-semibold">Slay Bestie 🔥</p>
              <p className="text-sm text-gray-600 mb-6">Incoming Call...</p>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={handleAnswer}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={handleHangUp}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center rotate-135"
                >
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
          
          {showCallScreen && (
            <div className="flex-1 flex flex-col">
              <div className="text-center mb-4">
                <img 
                  src="/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png"
                  alt="Slay Bestie"
                  className="w-16 h-16 object-cover rounded-full mx-auto"
                />
                <p className="font-bold mt-2">Slay Bestie 🔥</p>
              </div>
              
              <div className="bg-pink-100 p-3 rounded-lg mb-2 self-start max-w-[80%]">
                <p className="text-sm">Girl, I'm checking on that project you're avoiding! 💅</p>
              </div>
              
              <div className="bg-pink-100 p-3 rounded-lg mb-2 self-start max-w-[80%]">
                <p className="text-sm">We're not ghosting deadlines in 2025, bestie!</p>
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={handleHangUp}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto rotate-135"
                >
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneAnimation;
