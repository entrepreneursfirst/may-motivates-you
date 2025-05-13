
import React, { useState, useEffect } from 'react';
import { PhoneCall, PhoneOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface PhoneAnimationProps {
  onAnswerCall?: () => void;
  onHangUp?: () => void;
}

// Agent data for display on phone
const agents = [{
  name: "Life Coach",
  image: "/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png",
  emoji: "🧍‍♀️"
}, {
  name: "Zen Master",
  image: "/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png",
  emoji: "🧘"
}, {
  name: "Slay Bestie",
  image: "/lovable-uploads/735ccb5d-7d5c-4de9-b764-d99b6619a349.png",
  emoji: "💅"
}, {
  name: "Hype Beast",
  image: "/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png",
  emoji: "🏋️"
}, {
  name: "Drill Sergeant",
  image: "/lovable-uploads/4d5b4382-c347-4c68-b807-b3d21cfef20c.png",
  emoji: "🎖️"
}, {
  name: "The CEO,000,000",
  image: "/lovable-uploads/5e0312df-3529-4495-ba95-2d12b3ce011e.png",
  emoji: "💼"
}];

const PhoneAnimation = ({
  onAnswerCall,
  onHangUp
}: PhoneAnimationProps) => {
  const [isRinging, setIsRinging] = useState(true);
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [phonePressed, setPhonePressed] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Preload all agent images to prevent flashing
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = agents.map((agent) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = agent.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
      } catch (err) {
        console.error("Failed to preload some images:", err);
        // Still set to true to prevent endless loading state
        setImagesPreloaded(true);
      }
    };
    
    preloadImages();
  }, []);

  // Rotate through agents every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAgentIndex(prevIndex => (prevIndex + 1) % agents.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const currentAgent = agents[currentAgentIndex];
  
  const handleAnswer = () => {
    if (onAnswerCall) {
      onAnswerCall();
    }
  };
  
  const handleHangUp = () => {
    if (onHangUp) {
      onHangUp();
    }
  };
  
  const handlePhonePress = () => {
    setPhonePressed(true);
    setTimeout(() => setPhonePressed(false), 300);
  };
  
  return <div className="relative flex items-center justify-center scale-[1.06] md:scale-[1.275] my-12 transform -translate-x-32">
      {/* Sound Vibration Visuals - Updated with sequential wave animations and lower z-index */}
      <div className="absolute inset-0 -m-24 flex items-center justify-center z-0">
        <div className="absolute w-64 h-64 rounded-full bg-yellow-400/50 animate-wave-1"></div>
        <div className="absolute w-80 h-80 rounded-full bg-yellow-400/45 animate-wave-2"></div>
        <div className="absolute w-96 h-96 rounded-full bg-yellow-400/40 animate-wave-3"></div>
      </div>
      
      {/* Ambient glow background */}
      <div className="absolute inset-0 -m-20 rounded-full bg-gradient-to-br from-commitify-yellow to-amber-200 opacity-60 blur-3xl" />

      {/* Phone with gentle tilt animation - higher z-index to appear above soundwaves */}
      <div className={`relative transform transition-transform duration-1500 cursor-pointer z-10
          ${phonePressed ? 'scale-[0.90]' : 'scale-100'} 
          ${isRinging ? 'animate-phone-tilt' : '-rotate-12'}`} onClick={handlePhonePress}>
        <div className="relative w-64 h-[480px] z-20">
          {/* Gradient screen background inside phone - UPDATED to be lighter */}
          <div className="absolute top-[1%] bottom-[1%] left-[3%] right-[3%] rounded-[28px] bg-gradient-to-br from-yellow-100 via-amber-200 to-yellow-300 shadow-inner z-0" />

          {/* Phone overlay (the phone frame PNG with empty middle) */}
          <img src="/lovable-uploads/dbf73134-0771-42c1-994e-959d4ced156e.png" alt="Phone Frame" className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

          {/* Screen content */}
          <div className="absolute inset-[11%] z-20 flex flex-col items-center justify-center px-4">
            {/* White circular background behind agent image */}
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm">
              {/* Agent image with proper styling and no fallback */}
              {imagesPreloaded && (
                <Avatar className="w-24 h-24">
                  <AvatarImage 
                    src={currentAgent.image} 
                    alt={currentAgent.name} 
                    className="object-cover" 
                  />
                </Avatar>
              )}
              {!imagesPreloaded && (
                <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
              )}
            </div>
            
            <p className="text-center text-base font-semibold">
              {currentAgent.name} {currentAgent.emoji}
            </p>

            {/* Always show this content regardless of state */}
            <p className="text-sm text-gray-700 mb-4">Incoming Call...</p>
            <div className="flex space-x-4">
              <Button onClick={handleAnswer} className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                <PhoneCall className="w-5 h-5" />
              </Button>
              <Button onClick={handleHangUp} className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center rotate-135 transition-transform hover:scale-105 active:scale-95">
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default PhoneAnimation;
