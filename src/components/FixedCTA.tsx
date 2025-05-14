import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';
const FixedCTA = () => {
  const [visible, setVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Dispatch a custom event that the Hero component will listen for
    setTimeout(() => {
      window.dispatchEvent(new Event('activatePhoneInput'));
    }, 800); // Add a slight delay to ensure the scroll completes first
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
  return <div className="fixed bottom-6 left-0 right-0 z-40 px-4">
      <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-full shadow-lg p-3 flex items-center justify-between md:justify-between justify-center">
        <p className="ml-2 font-semibold hidden md:block">
          Let your AI coach call you now
        </p>
        <Button className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text rounded-full flex items-center gap-2 md:ml-0 mx-auto md:mx-0" onClick={scrollToTop}>
          <Phone className="w-4 h-4" />
          <span>Call Me Now</span>
        </Button>
      </div>
    </div>;
};
export default FixedCTA;