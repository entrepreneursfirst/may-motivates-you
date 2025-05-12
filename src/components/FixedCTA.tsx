
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 py-4 px-4 shadow-lg transform transition-transform z-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-xl font-medium mb-3 md:mb-0 text-white">
          Ready for your AI coach to call you? 📱✨
        </p>
        <div className="flex gap-4">
          <Button 
            className="bg-white text-purple-600 hover:bg-purple-100 font-medium px-8 transition-all shadow-md hover:shadow-xl"
            onClick={() => {
              document.getElementById('start-now')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Try My First Call
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FixedCTA;
