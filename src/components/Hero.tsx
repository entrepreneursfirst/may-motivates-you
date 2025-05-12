
import React from 'react';
import { Button } from "@/components/ui/button";
import PhoneAnimation from './PhoneAnimation';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative Elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-neon opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300 opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit leading-tight mb-6">
              Your AI just called. <br />
              You've got <span className="text-neon">sh*t</span> to finish.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Meet <span className="font-bold">callmemay.be</span> — the AI that calls when motivation runs out and procrastination kicks in.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-neon hover:bg-neon-hover text-white font-medium text-lg px-8 py-6"
                onClick={() => scrollToSection('start-now')}
              >
                Try It Now
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-lg px-8 py-6"
                onClick={() => scrollToSection('how-it-works')}
              >
                How It Works
              </Button>
            </div>
          </div>
          
          {/* Phone Animation */}
          <div className="flex justify-center lg:justify-end">
            <PhoneAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
