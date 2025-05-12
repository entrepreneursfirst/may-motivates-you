
import React from 'react';
import { Button } from "@/components/ui/button";
import PhoneAnimation from './PhoneAnimation';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
      {/* Decorative Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-400 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-60 right-20 w-48 h-48 bg-yellow-300 opacity-10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full font-medium text-sm">
              Stay on track with AI calls 🚀
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit leading-tight">
              Your AI just called. <br />
              You've got <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">sh*t</span> to finish.
            </h1>
            <p className="text-xl text-gray-600">
              Meet <span className="font-bold">callmemay.be</span> — the AI that calls when motivation runs out and procrastination kicks in.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-medium text-lg px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                onClick={() => scrollToSection('start-now')}
              >
                Try It Now
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-medium text-lg px-8 py-6 rounded-xl"
                onClick={() => scrollToSection('how-it-works')}
              >
                How It Works
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
