
import React from 'react';
import { Upload, Settings, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <Upload className="w-10 h-10" />,
    title: "Upload your schedule & goals",
    description: "Import your to-dos, tasks, or even your resume.",
    color: "bg-commitify-yellow"
  },
  {
    icon: <Settings className="w-10 h-10" />,
    title: "Set the call vibe & frequency",
    description: "Choose how often you want to be called—and how aggressive the tone should be.",
    color: "bg-commitify-blue"
  },
  {
    icon: <Phone className="w-10 h-10" />,
    title: "Get check-ins from your AI coach",
    description: "Your AI will remember what you said, follow up, and motivate you to finish.",
    color: "bg-commitify-purple"
  }
];

const HowItWorks = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-commitify-yellow opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-commitify-blue opacity-10 rounded-full blur-3xl"></div>
      
      {/* Smiley Sticker */}
      <div className="absolute top-24 left-[calc(50%+8rem)] md:left-[calc(50%+12rem)] z-0 opacity-90">
        <img 
          src="/lovable-uploads/f3b4d8ae-527f-4545-9a2d-e5e13253d587.png" 
          alt="Smiley sticker" 
          className="w-24 md:w-32 object-contain"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">Works</span>
        </h2>
        <p className="text-center text-commitify-secondary text-xl mb-16 max-w-3xl mx-auto">
          Three simple steps to boost your productivity
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-20 h-20 rounded-full ${step.color} text-white flex items-center justify-center mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>
              <p className="text-commitify-secondary text-lg">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={() => scrollToSection('pricing')}
            className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
