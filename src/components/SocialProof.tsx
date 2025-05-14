
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Star } from 'lucide-react';

// Testimonial data with information about the person and their experience
const testimonials = [
  {
    id: 1,
    text: "The morning check-ins with Coach Sarah completely turned my productivity around. I've finished more projects in a month than I did all last quarter!",
    name: "Michael T.",
    role: "Marketing Director",
    avatar: "M",
    agentName: "Coach Sarah",
    stars: 5
  },
  {
    id: 2,
    text: "As someone with ADHD, the gentle reminders from Max keep me focused without feeling pressured. I'm finally sticking to my meditation routine!",
    name: "Emma L.",
    role: "Software Developer",
    avatar: "E",
    agentName: "Max",
    stars: 5
  },
  {
    id: 3,
    text: "Maya's evening check-ins helped me establish a proper sleep schedule after years of insomnia. The accountability is what I needed.",
    name: "David K.",
    role: "Fitness Instructor",
    avatar: "D",
    agentName: "Maya",
    stars: 4
  },
  {
    id: 4,
    text: "I was skeptical at first, but Alex's weekly goal reviews have helped me save more money in 3 months than I did all last year!",
    name: "Jennifer P.",
    role: "Financial Analyst",
    avatar: "J",
    agentName: "Alex",
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
