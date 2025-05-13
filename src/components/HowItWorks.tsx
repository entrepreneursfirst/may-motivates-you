
import React from 'react';
import { Button } from "@/components/ui/button";

// Step content as separate objects for better editability
const step1 = {
  imageSrc: "/lovable-uploads/2c682f5d-9441-4c38-bb50-0e5b969df930.png",
  title: "Upload your schedule & goals",
  description: "Import your to-dos, tasks, or even your resume."
};

const step2 = {
  imageSrc: "/lovable-uploads/bff9745b-e164-44f7-afc9-26c5b1823fce.png", 
  title: "Set the call vibe & frequency",
  description: "Choose how often you want to be called—and how aggressive the tone should be."
};

const step3 = {
  imageSrc: "/lovable-uploads/44c37770-c3f4-4735-8bf2-a7bc177b82ad.png",
  title: "Get check-ins from your AI coach",
  description: "Your AI will remember what you said, follow up, and motivate you to finish."
};

const HowItWorks = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Rainbow Sticker - Added to the left of the header */}
      <div className="absolute top-24 left-4 md:left-16 lg:left-24 z-0 opacity-90">
        <img 
          src="/lovable-uploads/c967a7e7-5403-4fe3-ba1e-52fa5eba1841.png" 
          alt="Rainbow sticker" 
          className="w-20 md:w-28 lg:w-32 object-contain"
        />
      </div>
      
      {/* Smiley Sticker */}
      <div className="absolute top-1 left-[calc(50%168rem)] md:left-[calc(50%+24rem)] z-0 opacity-90">
        <img src="/lovable-uploads/f3b4d8ae-527f-4545-9a2d-e5e13253d587.png" alt="Smiley sticker" className="w-24 md:w-32 object-contain" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          How It Works
        </h2>
        <p className="text-center text-commitify-secondary text-xl mb-16 max-w-3xl mx-auto">
          Three simple steps to boost your productivity
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 - Each section is now individually editable */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex items-center justify-center h-[350px]">
              <img 
                src={step1.imageSrc} 
                alt={step1.title} 
                className="object-contain"
                style={{
                  width: "350px",
                  height: "350px"
                }} 
              />
            </div>
            {/* All titles use the same fixed height with top alignment */}
            <div className="h-20 flex items-start justify-center mb-2">
              <h3 className="text-2xl font-bold">
                {step1.title}
              </h3>
            </div>
            <p className="text-commitify-secondary text-lg">
              {step1.description}
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex items-center justify-center h-[350px]">
              <img 
                src={step2.imageSrc} 
                alt={step2.title}
                className="object-contain"
                style={{
                  width: "350px",
                  height: "350px"
                }} 
              />
            </div>
            <div className="h-20 flex items-start justify-center mb-2">
              <h3 className="text-2xl font-bold">
                {step2.title}
              </h3>
            </div>
            <p className="text-commitify-secondary text-lg">
              {step2.description}
            </p>
          </div>
          
          {/* Step 3 - Making this stickman 10% smaller */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex items-center justify-center h-[350px]">
              <img 
                src={step3.imageSrc} 
                alt={step3.title} 
                className="object-contain"
                style={{
                  width: "315px",  /* 350px - 10% = 315px */
                  height: "315px"  /* 350px - 10% = 315px */
                }} 
              />
            </div>
            <div className="h-20 flex items-start justify-center mb-2">
              <h3 className="text-2xl font-bold">
                {step3.title}
              </h3>
            </div>
            <p className="text-commitify-secondary text-lg">
              {step3.description}
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button onClick={() => scrollToSection('pricing')} className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all">
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
