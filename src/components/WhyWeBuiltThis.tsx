
import React from 'react';

const WhyWeBuiltThis = () => {
  return (
    <section id="why" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Added sticker as absolute positioned element */}
        <img 
          src="/lovable-uploads/99634d53-7783-4dd8-a3d9-bf614fb19fcf.png"
          alt="Cool sticker"
          className="absolute w-16 md:w-20 lg:w-24 left-12 top-10 md:left-16 md:top-15 z-0 opacity-90"
        />
        
        <div className="bg-commitify-yellow/20 p-10 md:p-16 rounded-3xl relative overflow-hidden">
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center md:text-left relative z-10">
            Why We Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">Commitify</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-lg">
                It all started when our founder kept getting interrupted while scrolling Instagram. Every notification pulled her away from important work — except one thing actually helped: phone calls.
              </p>
              
              <p className="text-lg">
                Unlike silent reminders that can be ignored, a ringing phone creates urgency. When someone calls to check on your progress, you feel accountable.
              </p>
              
              <p className="text-lg">
                That's when the idea struck: What if an AI could call you with the perfect tone and timing to keep you on track?
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">The Founder's Story</h3>
              
              <p className="italic text-commitify-secondary mb-6">
                "As someone with ADHD, I needed more than just another notification. I needed the psychological weight of a conversation — someone who would remember what I promised and follow up. That's why our AI coaches don't just remind you; they call you and actually talk."
              </p>
              
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png" 
                  alt="Founder" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold">Sarah Chen</p>
                  <p className="text-sm text-commitify-secondary">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeBuiltThis;
