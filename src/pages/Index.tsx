
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Agents from '@/components/Agents';
import HowItWorks from '@/components/HowItWorks';
import WhyWeBuiltThis from '@/components/WhyWeBuiltThis';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import FixedCTA from '@/components/FixedCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-commitify-background overflow-hidden relative">
      {/* Decorative stickers scattered across the page */}
      <div className="sticker top-[15%] left-[12%] animate-float -z-10">
        <img src="/lovable-uploads/7699a50a-72f1-4d30-9cd6-720d836c481f.png" alt="" className="w-16 md:w-24" />
      </div>
      <div className="sticker top-[8%] right-[18%] animate-bounce-light">
        <img src="/lovable-uploads/3decf83c-218f-41ae-aa32-951b5f1315cc.png" alt="" className="w-12 md:w-20" />
      </div>
      <div className="sticker bottom-[65%] left-[22%] animate-bounce-light">
        <img src="/lovable-uploads/cb06b746-c500-4c6c-b244-f17b27f8195e.png" alt="" className="w-10 md:w-16" />
      </div>
      <div className="sticker bottom-[55%] right-[14%] animate-float">
        <img src="/lovable-uploads/f444a48a-3725-4b4b-8c1e-31cb25b03eb5.png" alt="" className="w-14 md:w-20" />
      </div>
      <div className="sticker top-[50%] left-[8%] animate-float">
        <img src="/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png" alt="" className="w-12 md:w-18" />
      </div>
      <div className="sticker top-[65%] right-[10%] animate-bounce-light">
        <img src="/lovable-uploads/735ccb5d-7d5c-4de9-b764-d99b6619a349.png" alt="" className="w-14 md:w-20" />
      </div>
      <div className="sticker bottom-[15%] left-[20%] animate-bounce-light">
        <img src="/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png" alt="" className="w-10 md:w-16" />
      </div>
      <div className="sticker bottom-[30%] right-[25%] animate-float">
        <img src="/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png" alt="" className="w-12 md:w-18" />
      </div>
      
      <Navbar />
      <main>
        <Hero />
        <Agents />
        <HowItWorks />
        <WhyWeBuiltThis />
        <Pricing />
      </main>
      <Footer />
      <FixedCTA />
    </div>
  );
};

export default Index;
