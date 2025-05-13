import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const WhyWeBuiltThis = () => {
  return <section id="why" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Added sticker positioned relative to container */}
        <div className="absolute -left-0 -top-[3cm] z-0 transform rotate-[-20deg] opacity-90">
          <img src="/lovable-uploads/99634d53-7783-4dd8-a3d9-bf614fb19fcf.png" alt="Cool sticker" className="w-16 md:w-40 lg:w-48 h-auto" />
        </div>
        
        <div className="bg-commitify-yellow/20 p-10 md:p-16 rounded-3xl relative overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center md:text-left relative z-10">
            Why We Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">Commitify</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-lg">AI has proven itself as a powerful reflection partner. It listens without judgment and can surface insights you might not reach on your own. However, we’re still figuring out the best way to bring it into our lives in a way that sticks. Is it a journaling app? A chatbot you open when you're feeling stuck? A dashboard that tracks your progress and sends push notifications? </p>
              
              <p className="text-lg">These formats all have promise — but they rely on one thing: you deciding to sit down, open the app, and reflect. And that’s where most people fall off. Because in the moments when reflection matters most, we’re often too busy, distracted, or overwhelmed to seek it out ourselves. </p>
              
              <p className="text-lg">What if, instead, AI came to you? What if it reached out — like a real friend would? Not just another ping or silent notification. A voice. A check-in. A moment that cuts through the noise. Because we’ve learned something simple: When someone calls to ask how you're doing — you answer.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">The Founder's Story</h3>
              
              <p className="italic text-commitify-secondary mb-6">"As someone with ADHD, I built this after missing too many personal deadlines. I never missed meetings with others — only my own goals.




Commitify replicates the real-world accountability of a check-in call, so others can get the same gentle (or tough) push to follow through. The calls create a sense of social commitment that notifications simply can't match."</p>
              
              <div className="flex items-center">
                <img src="/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png" alt="Founder" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-bold">Mehdi Greefhorst</p>
                  <p className="text-sm text-commitify-secondary">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default WhyWeBuiltThis;