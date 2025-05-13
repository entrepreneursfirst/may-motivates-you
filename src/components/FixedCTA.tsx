
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';

const FixedCTA = () => {
  const [visible, setVisible] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 70% of the first viewport
      const shouldShow = window.scrollY > window.innerHeight * 0.7;
      setVisible(shouldShow);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;
  
  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4">
      <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-full shadow-lg p-3 flex items-center justify-between">
        <p className="ml-2 font-semibold hidden md:block">
          Let your AI coach call you now
        </p>
        <Button 
          className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text rounded-full flex items-center gap-2"
          onClick={() => scrollToSection('pricing')}
        >
          <Phone className="w-4 h-4" />
          <span className="hidden md:inline">Call Me Now</span>
          <span className="md:hidden">Try Free</span>
        </Button>
      </div>
    </div>
  );
};

export default FixedCTA;
