
import React from 'react';
import { Upload, Settings, Phone } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-12 h-12" />,
    title: "Upload your schedule & goals",
    description: "Import your to-dos, tasks, or even your resume.",
    color: "bg-yellow-400"
  },
  {
    icon: <Settings className="w-12 h-12" />,
    title: "Set the call vibe & frequency",
    description: "Choose how often you want to be called—and how aggressive the tone should be.",
    color: "bg-purple-400"
  },
  {
    icon: <Phone className="w-12 h-12" />,
    title: "Get check-ins from your AI coach",
    description: "Your AI will remember what you said, follow up, and motivate you to finish.",
    color: "bg-blue-400"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute left-0 w-full">
        <svg className="w-full" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 24C240 74 480 74 720 49C960 24 1200 0 1440 24V74H0V24Z" fill="white" fillOpacity="0.1"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit inline-block">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Works</span>
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-24 h-24 rounded-full ${step.color} bg-opacity-20 flex items-center justify-center mb-6`}>
                <div className={`${step.color} text-white bg-opacity-100 p-4 rounded-full`}>
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#start-now" 
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-4 px-10 rounded-xl shadow-md hover:shadow-xl transition-all"
          >
            Start Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
