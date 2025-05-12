
import React from 'react';
import { Upload, Settings, Phone } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-12 h-12" />,
    title: "Upload your schedule & goals",
    description: "Import your to-dos, tasks, or even your resume."
  },
  {
    icon: <Settings className="w-12 h-12" />,
    title: "Set the call vibe & frequency",
    description: "Choose how often you want to be called—and how aggressive the tone should be."
  },
  {
    icon: <Phone className="w-12 h-12" />,
    title: "Get check-ins from your AI coach",
    description: "Your AI will remember what you said, follow up, and motivate you to finish."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center font-outfit mb-16">
          How It <span className="text-neon">Works</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-24 h-24 rounded-full bg-neon bg-opacity-10 flex items-center justify-center mb-6">
                <div className="text-neon">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#start-now" 
            className="inline-block bg-neon hover:bg-neon-hover text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Start Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
