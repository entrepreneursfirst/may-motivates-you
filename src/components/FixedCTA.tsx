
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const FixedCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showThreshold = 500; // Show after scrolling 500px
      
      setIsVisible(scrollY > showThreshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 shadow-lg transform transition-transform z-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-lg font-medium mb-3 md:mb-0">
          Let your AI coach call you. You just have to answer.
        </p>
        <Button 
          className="bg-neon hover:bg-neon-hover text-white px-8"
          onClick={() => {
            // Smooth scroll to the start now section
            document.getElementById('start-now')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Try My First Call
        </Button>
      </div>
    </div>
  );
};

export default FixedCTA;
