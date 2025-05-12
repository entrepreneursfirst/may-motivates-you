
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
    <div className="relative">
      {/* Phone base */}
      <div className="w-64 h-96 bg-dark rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 relative mx-auto">
        {/* Phone screen */}
        <div className="w-full h-full bg-gray-100 p-4 flex flex-col">
          {isRinging && !showCallScreen && (
            <div className="flex-1 flex flex-col items-center justify-center animate-pulse-ring">
              <div className="bg-neon rounded-full p-4 mb-4">
                <Phone className="w-12 h-12 text-white animate-phone-ring" />
              </div>
              <p className="text-lg font-semibold">Your AI Coach 📞</p>
              <p className="text-sm text-gray-600 mb-6">Incoming Call...</p>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={handleAnswer}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center"
                >
                  <Phone className="w-6 h-6" />
                </Button>
                <Button 
                  onClick={handleHangUp}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center rotate-135"
                >
                  <Phone className="w-6 h-6" />
                </Button>
              </div>
            </div>
          )}
          
          {showCallScreen && (
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-200 p-3 rounded-lg mb-2 self-start max-w-[80%]">
                Hey there! Your deadline is coming up. How's your progress?
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={handleHangUp}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto rotate-135"
                >
                  <Phone className="w-6 h-6" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Controls below phone */}
      <div className="mt-6 flex justify-center space-x-4">
        <Button className="bg-neon hover:bg-neon-hover text-white flex items-center">
          <span className="mr-2">🎤</span> Try it live now
        </Button>
        <Button variant="outline" className="border-neon text-neon hover:bg-neon hover:text-white flex items-center">
          <span className="mr-2">▶️</span> Sample call
        </Button>
      </div>
    </div>
  );
};

export default PhoneAnimation;
