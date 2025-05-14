
import React from 'react';
import { Button } from "@/components/ui/button";

// Step content as separate objects for better editability
const step1 = {
  imageSrc: "/lovable-uploads/2c682f5d-9441-4c38-bb50-0e5b969df930.png",
  title: (
    <>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-blue-400">Upload</span> your schedule & goals
    </>
  ),
  description: "Introduce yourself, explain your to-dos, integrate your schedule, or upload files."
};
const step2 = {
  imageSrc: "/lovable-uploads/bff9745b-e164-44f7-afc9-26c5b1823fce.png",
  title: (
    <>
      Set the <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-blue-400">call time</span>, frequency & vibe
    </>
  ),
  description: "Choose when you want to be called—and who you want the caller to be."
};
const step3 = {
  imageSrc: "/lovable-uploads/44c37770-c3f4-4735-8bf2-a7bc177b82ad.png",
  title: (
    <>
      Get phone call check-ins from your <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-blue-400">AI Coach</span>
    </>
  ),
  description: "Your AI will remember what you said, follow up, and helps you follow through."
};

const HowItWorks = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return <section id="how-it-works" className="py-24 overflow-hidden">
    <div className="container mx-auto px-4 relative">
      {/* Rainbow Sticker - Now positioned relative to container */}
      <div className="absolute left-[4cm] -top-[3cm] z-0 opacity-90">
        <img src="/lovable-uploads/c967a7e7-5403-4fe3-ba1e-52fa5eba1841.png" alt="Rainbow sticker" className="w-64 md:w-72 lg:w-80 object-contain" />
      </div>
      
      <div className="bg-commitify-yellow/20 p-10 md:p-16 rounded-3xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">Works</span>
        </h2>
        <p className="text-center text-commitify-secondary text-xl mb-8">
          Three simple steps to boost your productivity
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 - Each section is now individually editable */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex items-center justify-center h-[350px] md:h-[350px]">
              <img src={step1.imageSrc} alt="Upload your schedule & goals" className="object-contain md:w-[350px] w-[297.5px] md:h-[350px] h-[297.5px]" />
            </div>
            {/* All titles use the same fixed height with top alignment */}
            <div className="h-20 flex items-start justify-center mb-2 md:mb-2">
              <h3 className="text-3xl font-extrabold mb-3 md:mb-1">
                {step1.title}
              </h3>
            </div>
            <p className="text-commitify-secondary text-lg">
              {step1.description}
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex items-center justify-center h-[350px] md:h-[350px]">
              <img src={step2.imageSrc} alt="Set the call time, frequency & vibe" className="object-contain md:w-[350px] w-[297.5px] md:h-[350px] h-[297.5px]" />
            </div>
            <div className="h-20 flex items-start justify-center mb-2 md:mb-2">
              <h3 className="text-3xl font-extrabold mb-3 md:mb-1">
                {step2.title}
              </h3>
            </div>
            <p className="text-commitify-secondary text-lg">
              {step2.description}
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex items-center justify-center h-[350px] md:h-[350px]">
              <img src={step3.imageSrc} alt="Get phone call check-ins from your AI coach" className="object-contain md:w-[350px] w-[297.5px] md:h-[350px] h-[297.5px]" />
            </div>
            <div className="h-20 flex items-start justify-center mb-2 md:mb-2">
              <h3 className="text-3xl font-extrabold mb-3 md:mb-1">
                {step3.title}
              </h3>
            </div>
            <p className="text-commitify-secondary text-lg">
              {step3.description}
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button onClick={() => scrollToSection('pricing')} className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all">Explore Our Subscriptions</Button>
        </div>
      </div>
    </div>
  </section>;
};

export default HowItWorks;
