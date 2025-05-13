
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
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Agents />
      <HowItWorks />
      <WhyWeBuiltThis />
      <Pricing />
      <Footer />
      <FixedCTA />
    </div>
  );
};

export default Index;
