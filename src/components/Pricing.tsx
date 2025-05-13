
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Quick Kickstart",
    description: "Perfect for that one crucial task",
    price: "$1.99",
    features: [
      "1 call right now",
      "Choose your coach voice",
      "24-hour support",
    ],
    popular: false,
    buttonText: "Get Started"
  },
  {
    name: "Focus Pack",
    description: "Keep on track throughout the week",
    price: "$4.99",
    period: "per week",
    features: [
      "3 calls per week",
      "Progress tracking",
      "All coach voices",
      "Call scheduling",
    ],
    popular: true,
    buttonText: "Most Popular"
  },
  {
    name: "Power-Up Plan",
    description: "Maximum accountability",
    price: "$9.99",
    period: "per week",
    features: [
      "Daily calls",
      "Long-term memory",
      "Custom call scripts",
      "Calendar integration",
      "Voice customization",
    ],
    popular: false,
    buttonText: "Go Premium"
  }
];

const Pricing = () => {
  const { toast } = useToast();

  const handleSelectPlan = (planName: string) => {
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName} plan. Let's get started!`,
    });
  };
  
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-commitify-blue to-commitify-purple">Pricing</span>
        </h2>
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold">Try your first call for $0</h3>
          <p className="text-commitify-secondary text-lg mt-4 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border ${plan.popular ? 'border-commitify-yellow' : 'border-gray-100'}`}
            >
              {plan.popular && (
                <div className="bg-commitify-yellow text-commitify-text text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-commitify-secondary mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-commitify-secondary ml-1">{plan.period}</span>
                  )}
                </div>
                
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text' : 'bg-commitify-blue hover:bg-commitify-blue/90 text-white'} rounded-full`}
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-commitify-secondary mt-8">
          Cancel anytime. First call demo free. All plans include VAT.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
