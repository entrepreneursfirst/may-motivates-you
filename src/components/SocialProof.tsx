import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Star } from 'lucide-react';

// Testimonial data with information about the person and their experience
const testimonials = [
  {
    id: 1,
    text: "I genuinely forgot this wasn't a real person. The CEO agent called me out harder than my manager ever has.",
    name: "Lina",
    role: "26",
    avatar: "L",
    agentName: "CEO",
    stars: 5
  },
  {
    id: 2,
    text: "I thought it was just another reminder app. Then the Zen Master told me to breathe and do one small thing. It worked.",
    name: "Mark",
    role: "30",
    avatar: "M",
    agentName: "Zen Master",
    stars: 5
  },
  {
    id: 3,
    text: "Slay Bestie had me laughing and then… somehow I actually cleaned my room. 10/10.",
    name: "Jamie",
    role: "19",
    avatar: "J",
    agentName: "Slay Bestie",
    stars: 5
  },
  {
    id: 4,
    text: "It's weirdly personal. Like a squad that actually checks in. I use it daily now — even on good days.",
    name: "Ravi",
    role: "32",
    avatar: "R",
    agentName: "Squad",
    stars: 5
  }
];

const SocialProof = () => {
  return (
    <section className="py-24 bg-commitify-background overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Members Are Enjoying <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">Happier And Healthier</span> Lives
          </h2>
          <p className="text-xl text-commitify-secondary">
            Real results from real people who got the push they needed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex justify-between mb-4 items-center">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-3 border-2 border-commitify-yellow">
                    <AvatarImage src="" />
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
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.stars ? 'text-commitify-yellow fill-commitify-yellow' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-lg mb-4">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center text-commitify-blue">
                <MessageCircle className="w-5 h-5 mr-2" />
                <p className="text-sm font-medium">Coached by {testimonial.agentName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
