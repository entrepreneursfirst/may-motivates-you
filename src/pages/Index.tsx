
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
      <div className="sticker top-[15%] left-[25%] animate-float">
        <img src="/lovable-uploads/7699a50a-72f1-4d30-9cd6-720d836c481f.png" alt="" className="w-16 md:w-24" />
      </div>
      <div className="sticker top-[30%] right-[35%] animate-bounce-light">
        <img src="/lovable-uploads/3decf83c-218f-41ae-aa32-951b5f1315cc.png" alt="" className="w-12 md:w-20" />
      </div>
      <div className="sticker bottom-[40%] left-[40%] animate-bounce-light">
        <img src="/lovable-uploads/cb06b746-c500-4c6c-b244-f17b27f8195e.png" alt="" className="w-10 md:w-16" />
      </div>
      <div className="sticker bottom-[25%] right-[22%] animate-float">
        <img src="/lovable-uploads/f444a48a-3725-4b4b-8c1e-31cb25b03eb5.png" alt="" className="w-14 md:w-20" />
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
