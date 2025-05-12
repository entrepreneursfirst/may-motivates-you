
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import VoiceOptions from '@/components/VoiceOptions';
import StartNow from '@/components/StartNow';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import FixedCTA from '@/components/FixedCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <HowItWorks />
        <VoiceOptions />
        <Testimonials />
        <Pricing />
        <StartNow />
        <Faq />
      </main>
      <Footer />
      <FixedCTA />
    </div>
  );
};

export default Index;
