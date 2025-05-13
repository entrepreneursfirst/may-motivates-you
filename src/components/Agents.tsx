
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const agents = [
  {
    name: "Life Coach",
    image: "/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png",
    emoji: "🧍‍♀️",
    description: "Gentle, practical — podcast host vibes.",
    quote: "Let's break this down into manageable steps."
  },
  {
    name: "Zen Master",
    image: "/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png",
    emoji: "🧘",
    description: "Slow, mindful, deeply present.",
    quote: "This moment is your opportunity to begin."
  },
  {
    name: "Slay Bestie",
    image: "/lovable-uploads/735ccb5d-7d5c-4de9-b764-d99b6619a349.png",
    emoji: "💅",
    description: "Sassy, sweet, flirty-shady motivation.",
    quote: "We're not ghosting deadlines in 2025, bestie!"
  },
  {
    name: "Hype Beast",
    image: "/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png",
    emoji: "🏋️",
    description: "High energy, 'LET'S GOOOO' attitude.",
    quote: "YOU GOT THIS! Time to level up your game!"
  },
  {
    name: "Drill Sergeant",
    image: "/lovable-uploads/4d5b4382-c347-4c68-b807-b3d21cfef20c.png",
    emoji: "🎖️",
    description: "Tough accountability, no excuses.",
    quote: "ATTENTION! That deadline won't meet itself!"
  },
  {
    name: "The CEO",
    image: "/lovable-uploads/5e0312df-3529-4495-ba95-2d12b3ce011e.png",
    emoji: "💼",
    description: "Efficient, KPI-driven, zero fluff.",
    quote: "Let's optimize your productivity metrics."
  }
];

const Agents = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <section id="agents" className="py-20 relative bg-commitify-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          An entire team of <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">motivators</span> for you
        </h2>
        <p className="text-center text-commitify-secondary text-xl mb-16 max-w-3xl mx-auto">
          Pick your coach. From chill monk to CEO boss.
        </p>
        
        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-commitify-blue text-commitify-blue rounded-full md:-left-5 hidden md:flex"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 scroll-container"
          >
            {agents.map((agent, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[280px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 rounded-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  {/* Removed the white background for headshots */}
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                {/* Yellow gradient background for the text area */}
                <div className="p-6 bg-gradient-to-br from-yellow-100 via-amber-200 to-yellow-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{agent.emoji}</span>
                    <h3 className="font-bold text-xl">{agent.name}</h3>
                  </div>
                  
                  <p className="text-sm text-commitify-secondary mb-4">
                    {agent.description}
                  </p>
                  
                  <div className="bg-white/70 p-3 rounded-lg italic text-sm">
                    "{agent.quote}"
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-commitify-blue text-commitify-blue rounded-full md:-right-5 hidden md:flex"
            onClick={scrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-medium rounded-full px-8 py-6 shadow-md hover:shadow-lg transition-all"
          >
            Find Your Perfect Coach
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Agents;
