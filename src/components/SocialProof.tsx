import React, { useRef, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

// Testimonial data with information about the person and their experience
const testimonials = [{
  id: 1,
  text: "I genuinely forgot this wasn't a real person. The CEO agent called me out harder than my manager ever has.",
  name: "Lina",
  role: "26",
  avatar: "L",
  image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&fit=crop&crop=faces",
  stars: 5
}, {
  id: 2,
  text: "I thought it was just another reminder app. Then the Zen Master told me to breathe and do one small thing. It worked.",
  name: "Mark",
  role: "30",
  avatar: "M",
  image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=150&h=150&fit=crop&crop=faces",
  stars: 5
}, {
  id: 3,
  text: "Slay Bestie had me laughing and then… somehow I actually cleaned my room. 10/10.",
  name: "Jamie",
  role: "19",
  avatar: "J",
  image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=faces",
  stars: 5
}, {
  id: 4,
  text: "It's weirdly personal. Like a squad that actually checks in. I use it daily now — even on good days.",
  name: "Ravi",
  role: "32",
  avatar: "R",
  image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=faces",
  stars: 5
}];
const TestimonialCard = ({
  testimonial
}) => <div className="bg-transparent backdrop-blur-sm p-8 rounded-2xl border border-black shadow-md hover:shadow-lg transition-all h-full">
    <div className="flex justify-between mb-4 items-center">
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-3 border-2 border-commitify-yellow">
          <AvatarImage src={testimonial.image} />
          <AvatarFallback className="bg-commitify-blue text-white font-bold">
            {testimonial.avatar}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">{testimonial.name}</p>
          <p className="text-sm text-commitify-secondary">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex">
        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < testimonial.stars ? 'text-commitify-yellow fill-commitify-yellow' : 'text-gray-300'}`} />)}
      </div>
    </div>
    
    <p className="text-lg mb-4">
      "{testimonial.text}"
    </p>
  </div>;
const SocialProof = () => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // New state to track scroll position indicators
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // New effect to track scroll position and update arrow visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;
    const handleScroll = () => {
      // Show left arrow if not at the beginning
      setShowLeftArrow(container.scrollLeft > 20);

      // Show right arrow if not at the end
      const isAtEnd = Math.abs(container.scrollWidth - container.scrollLeft - container.clientWidth) < 20;
      setShowRightArrow(!isAtEnd);
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  return <section className="py-24 bg-commitify-background overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF914D] via-[#E57040] to-[#EFAF26]">Members</span> Say 
          </h2>
          <img src="/lovable-uploads/d2c6c635-074a-4194-ad78-9aa1d54f6d17.png" alt="Happy emoji" className="w-48 h-auto absolute -right-64 md:right-[-10rem] top-0 md:-top-6 object-contain" />
          <p className="text-xl text-commitify-secondary">Real calls leading to real results: these people got the push they needed.</p>
        </div>
        
        {isMobile ? <div className="relative px-4 py-4">
            <div className="relative overflow-hidden">
              <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-8 px-4 scroll-container">
                {testimonials.map(testimonial => <div key={testimonial.id} className="flex-shrink-0 min-w-[280px] max-w-[280px]">
                    <TestimonialCard testimonial={testimonial} />
                  </div>)}
              </div>
            </div>
            
            {/* Left fade-out gradient overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-10 z-[5] pointer-events-none bg-gradient-to-r from-commitify-background to-transparent"></div>
            
            {/* Mobile left navigation arrow - only show when scrolled */}
            {showLeftArrow && <Button variant="outline" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 border-commitify-blue text-commitify-blue rounded-full shadow-md" onClick={scrollLeft}>
                <ChevronLeft className="h-5 w-5" />
              </Button>}
            
            {/* Right fade-out gradient overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-10 z-[5] pointer-events-none bg-gradient-to-l from-commitify-background to-transparent"></div>
            
            {/* Mobile right navigation arrow - only show when not at end */}
            {showRightArrow && <Button variant="outline" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 border-commitify-blue text-commitify-blue rounded-full shadow-md" onClick={scrollRight}>
                <ChevronRight className="h-5 w-5" />
              </Button>}
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(testimonial => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}
          </div>}
      </div>
    </section>;
};
export default SocialProof;