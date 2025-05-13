
import React from 'react';
import { Button } from "@/components/ui/button";
import PhoneAnimation from './PhoneAnimation';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-commitify-yellow opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-commitify-purple opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Lazy days happen. <br />
              Our AI agents can <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">motivate you.</span>
            </h1>
            <p className="text-xl text-commitify-secondary">
              Commitify is the AI that calls when motivation runs out and procrastination kicks in.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-medium text-lg px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all"
                onClick={() => scrollToSection('pricing')}
              >
                Try it for $0
              </Button>
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
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <PhoneAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
