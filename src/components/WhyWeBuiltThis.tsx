
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

const WhyWeBuiltThis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return <section id="why" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Updated sticker with larger size and moved to the right and up */}
        <div className="absolute left-[0cm] md:left-[2cm] -top-[2.7cm] md:-top-[2cm] z-0 transform rotate-[-20deg] opacity-90">
          <img src="/lovable-uploads/99634d53-7783-4dd8-a3d9-bf614fb19fcf.png" alt="Cool sticker" className="w-40 md:w-50 lg:w-50 h-auto" />
        </div>
        
        <div className="bg-commitify-yellow/20 p-10 md:p-16 rounded-3xl relative overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center md:text-left relative z-10">
            Why We Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF914D] via-[#E57040] to-[#EFAF26]">Commitify</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left text section - with improved read more experience */}
            <div className="space-y-6">
              {isMobile ? (
                <div className="relative">
                  {/* First paragraph always visible */}
                  <p className="text-lg">AI has proven itself to be <span className="font-bold">a powerful reflection partner</span>. It listens without judgment and can surface insights you might not reach on your own. However, we're still figuring out the best way to bring it into our lives in <span className="font-bold">a way that sticks</span>.</p>
                  
                  {/* Hidden content with smooth transition */}
                  <div 
                    className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[800px] opacity-100' : 'max-h-[120px] opacity-95'
                    }`}
                  >
                    <div className="text-lg mt-6">
                      These formats all have promise — but they rely on one thing: <span className="font-bold">you deciding to sit down, open the app, and reflect</span>. And that's where most people fall off. Because in the moments when reflection matters most, we're often too busy, distracted, or overwhelmed to seek it out ourselves.
                    </div>
                    
                    <div className="text-lg mt-6">
                      What if, instead, AI came to you? What if it reached out — like a real friend would? Not just another ping or silent notification. A voice. A check-in. A moment that cuts through the noise. Because we've learned something simple: When someone calls to ask how you're doing — <span className="font-bold">you answer</span>.
                    </div>
                    
                    {/* Fade overlay only when collapsed */}
                    {!isOpen && (
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-commitify-yellow/20 via-commitify-yellow/20 to-transparent pointer-events-none" />
                    )}
                  </div>
                  
                  {/* Clean, minimal Read more / Show less toggle */}
                  {!isOpen ? (
                    <div className="absolute bottom-0 left-0 w-full flex justify-center pb-1">
                      <button
                        onClick={() => setIsOpen(true)}
                        className="text-[#E57040] hover:text-[#E57040]/80 font-medium flex items-center transition-all duration-300 z-10"
                      >
                        Read more
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#E57040] hover:text-[#E57040]/80 font-medium flex items-center transition-all duration-300"
                      >
                        Show less
                        <ChevronDown className="ml-1 h-4 w-4 transform rotate-180 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-lg">AI has proven itself to be <span className="font-bold">a powerful reflection partner</span>. It listens without judgment and can surface insights you might not reach on your own. However, we're still figuring out the best way to bring it into our lives in  <span className="font-bold">a way that sticks</span>. Is it a journaling app? A chatbot you open when you're feeling stuck? A dashboard that tracks your progress and sends push notifications?</p>
                  
                  <p className="text-lg">These formats all have promise — but they rely on one thing:  <span className="font-bold">you deciding to sit down, open the app, and reflect</span>. And that's where most people fall off. Because in the moments when reflection matters most, we're often too busy, distracted, or overwhelmed to seek it out ourselves.</p>
                  
                  <p className="text-lg">What if, instead, AI came to you? What if it reached out — like a real friend would? Not just another ping or silent notification. A voice. A check-in. A moment that cuts through the noise. Because we've learned something simple: When someone calls to ask how you're doing — <span className="font-bold">you answer</span>.</p>
                </>
              )}
            </div>
            
            {/* Right founder section - Stack on mobile */}
            <div className="space-y-6">
              {/* Founder's story - moved above the grid */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Note from One of the Founders</h3>
                
                <p className="italic text-commitify-secondary mb-6">"As someone with ADHD, I wanted to build something I could actually use after missing too many personal deadlines. I never missed meetings with others — only my own goals.</p>
                
                <p className="italic text-commitify-secondary mb-6">Commitify replicates the real-world accountability of a check-in call, so others can get the same gentle (or tough) push to follow through. The calls create a sense of social commitment that notifications simply can't match."</p>
              </div>
              
              {/* Founders - vertical on mobile, grid on desktop */}
              <div className={`${isMobile ? "flex flex-col" : "grid grid-cols-2"} gap-4`}>
                {/* Mehdi Greefhorst */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/58d0c2bf-1239-4fe5-aaa0-516a235d9258.png" alt="Mehdi Greefhorst" className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <p className="font-bold">Mehdi Greefhorst</p>
                      <p className="text-sm text-commitify-secondary">Founder</p>
                    </div>
                  </div>
                </div>
                
                {/* Carlo Porcelli */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/04aa2041-2f74-4ee1-9cc8-644ca6e5fc26.png" alt="Carlo Porcelli" className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <p className="font-bold">Carlo Porcelli</p>
                      <p className="text-sm text-commitify-secondary">Founder</p>
                    </div>
                  </div>
                </div>
                
                {/* Mustafa Yenler */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/1c214e5c-3192-4289-a908-e43b4dbc8d16.png" alt="Mustafa Yenler" className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <p className="font-bold">Mustafa Yenler</p>
                      <p className="text-sm text-commitify-secondary">Founder</p>
                    </div>
                  </div>
                </div>
                
                {/* Gijs de Bruin */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/fb705994-ba28-4b60-91b7-d2d077392913.png" alt="Gijs de Bruin" className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <p className="font-bold">Gijs de Bruin</p>
                      <p className="text-sm text-commitify-secondary">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default WhyWeBuiltThis;
