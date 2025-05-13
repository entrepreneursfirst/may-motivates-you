
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

  // Shared phone layout wrapper
  const PhoneWrapper = ({
    agentImage,
    agentName,
    messageLines,
    showPickup,
  }: {
    agentImage: string;
    agentName: string;
    messageLines?: string[];
    showPickup?: boolean;
  }) => (
    <div className="relative w-64 h-[480px] z-20">
      {/* Gradient screen background inside phone */}
      <div className="absolute inset-[11%] rounded-[24px] bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-500 shadow-inner z-0" />

      {/* Phone overlay (the phone frame PNG with empty middle) */}
      <img
        src="/lovable-uploads/dbf73134-0771-42c1-994e-959d4ced156e.png"
        alt="Phone Frame"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* Screen content */}
      <div className="absolute inset-[11%] z-20 flex flex-col items-center justify-center px-4">
        <img
          src={agentImage}
          alt={agentName}
          className="w-20 h-20 rounded-full mb-3 object-cover"
        />
        <p className="text-center text-base font-semibold">{agentName}</p>

        {isRinging && showPickup && (
          <>
            <p className="text-sm text-gray-100 mb-4">Incoming Call...</p>
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
          </>
        )}

        {showCallScreen &&
          messageLines?.map((msg, i) => (
            <div
              key={i}
              className="bg-white/80 text-black p-3 rounded-lg mb-2 max-w-[90%] text-sm text-left"
            >
              {msg}
            </div>
          ))}

        {showCallScreen && (
          <Button 
            onClick={handleHangUp}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mt-auto rotate-135"
          >
            <Phone className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative flex items-center gap-6 scale-110 md:scale-125 my-8">
      {/* Ambient glow background */}
      <div className="absolute inset-0 -m-12 rounded-full bg-gradient-to-br from-commitify-yellow to-amber-200 opacity-30 blur-2xl" />

      {/* Phone 1 – Zen Master, passive call */}
      <div className="relative transform -rotate-12 -mr-10">
        <PhoneWrapper
          agentImage="/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png"
          agentName="Zen Master 🌿"
          showPickup={false}
        />
      </div>

      {/* Phone 2 – Main Phone, interactive */}
      <div>
        <PhoneWrapper
          agentImage="/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png"
          agentName="Slay Bestie 🔥"
          showPickup={isRinging && !showCallScreen}
          messageLines={
            showCallScreen
              ? [
                  "Girl, I'm checking on that project you're avoiding! 💅",
                  "We're not ghosting deadlines in 2025, bestie!",
                ]
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default PhoneAnimation;
