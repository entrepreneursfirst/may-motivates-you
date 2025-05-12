
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "I actually did my laundry for once.",
    author: "Jules",
    role: "Student",
    avatar: "J",
    stars: 5
  },
  {
    id: 2,
    quote: "Shipped my app in 5 days.",
    author: "Dan",
    role: "Developer",
    avatar: "D",
    stars: 5
  },
  {
    id: 3,
    quote: "Calls me like a life coach, but cheaper.",
    author: "Mariah",
    role: "Freelancer",
    avatar: "M",
    stars: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center font-outfit mb-4">
          What People Are <span className="text-neon">Saying</span>
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16">
          Real people, real results
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <p className="text-lg text-center mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-neon text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
