
import React, { useState } from 'react';
import { Check, Phone, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Cold Call",
    emoji: "❄️",
    description: "Just dip your toes in",
    price: "$7.50",
    period: "one-time",
    callCount: 3,
    features: [
      "Motivational voice agent",
      "Basic AI memory",
    ],
    popular: false,
    buttonText: "Try Now",
    icon: <Phone className="w-5 h-5 mr-2 text-[#1EAEDB]" />,
    headerText: "Try it out",
    billingNote: "One-time payment",
    color: "bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white",
    cardBorder: "border-[#1EAEDB]/30",
    headerColor: "bg-[#1EAEDB] text-white"
  },
  {
    name: "Acquaintance",
    emoji: "👋",
    description: "Perfect for getting started",
    price: "$3.75",
    period: "per week",
    callCount: 3,
    features: [
      "Motivational voice agent",
      "Basic AI memory",
    ],
    popular: false,
    buttonText: "Get Started",
    icon: <Phone className="w-5 h-5 mr-2 text-commitify-blue" />,
    headerText: "For the curious",
    billingNote: "Billed Monthly",
    color: "bg-commitify-blue hover:bg-commitify-blue/90 text-white",
    cardBorder: "border-gray-100",
    headerColor: "bg-commitify-blue text-white"
  },
  {
    name: "Bestie",
    emoji: "🫶",
    description: "Our most popular choice",
    price: "$5.00",
    period: "per week",
    callCount: 5,
    features: [
      "Everything in Acquaintance, and...",
      "Long-term memory",
    ],
    popular: true,
    buttonText: "Most Popular",
    icon: <Phone className="w-5 h-5 mr-2 text-commitify-yellow" />,
    headerText: "Most Popular",
    billingNote: "Billed Monthly",
    color: "bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text",
    cardBorder: "border-commitify-yellow",
    headerColor: "bg-commitify-yellow text-commitify-text"
  },
  {
    name: "Ride or Die",
    emoji: "💯",
    description: "Maximum accountability",
    price: "$6.50",
    period: "per week",
    callCount: 8,
    features: [
      "Everything in Bestie, and...",
      "Access to all current and future voices",
      "Early and free access to future features!",
    ],
    popular: false,
    buttonText: "Go Premium",
    icon: <Phone className="w-5 h-5 mr-2 text-commitify-blue" />,
    headerText: "For the committed",
    billingNote: "Billed Monthly",
    color: "bg-commitify-blue hover:bg-commitify-blue/90 text-white",
    cardBorder: "border-gray-100",
    headerColor: "bg-commitify-blue text-white"
  }
];

const Pricing = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName} plan. Let's get started!`,
    });
  };
  
  const scrollToTopAndActivatePhone = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Dispatch custom event to activate phone input
    window.dispatchEvent(new CustomEvent('activatePhoneInput'));
  };
  
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF914D] via-[#E57040] to-[#EFAF26]">Pricing</span>
        </h2>
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold">Try your first call for $0</h3>
          <p className="text-commitify-secondary text-lg mt-4 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>
          <Button 
            onClick={scrollToTopAndActivatePhone} 
            className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text mt-6 rounded-full px-6 py-2 flex items-center gap-2 mx-auto"
          >
            <Phone className="w-5 h-5" />
            Try it for $0
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow border ${
                selectedPlan === plan.name 
                  ? 'border-4 border-commitify-blue' 
                  : plan.popular 
                  ? 'border-commitify-yellow' 
                  : plan.cardBorder
              } bg-gradient-to-br from-violet-50 to-violet-100 h-full flex flex-col`}
            >
              {/* Fixed height container for header */}
              <div className="h-[40px] flex items-center justify-center">
                {(plan.popular || plan.headerText) && (
                  <div className={`${
                    plan.headerColor
                    } text-center py-2 font-medium flex items-center justify-center w-full`}>
                    {plan.popular ? <Star className="w-4 h-4 mr-2" /> : null}
                    {plan.headerText}
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-0">
                <div className="h-12 flex items-center">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {plan.name} <span className="text-xl">{plan.emoji}</span>
                  </CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 flex-grow">
                <div className="pt-4">
                  <div className="flex items-center mb-2">
                    {plan.icon}
                    <span className="font-medium">{plan.callCount} calls per week</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-commitify-secondary ml-1">{plan.period}</span>
                  </div>
                  <div className="text-xs text-commitify-secondary">{plan.billingNote}</div>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4 mt-auto">
                <Button 
                  className={`w-full ${
                    selectedPlan === plan.name
                      ? 'bg-commitify-blue hover:bg-commitify-blue/90 text-white'
                      : plan.color
                  } rounded-full`}
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  {selectedPlan === plan.name ? 'Selected' : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <p className="text-center text-commitify-secondary mt-8">
          Cancel anytime. First call demo free. All plans include VAT.
        </p>
        
        <div className="text-center mt-10">
          <Button 
            onClick={scrollToTopAndActivatePhone} 
            className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text rounded-full px-8 py-6 text-lg font-medium flex items-center gap-2 mx-auto"
          >
            <Phone className="w-6 h-6" />
            Try your first call for $0
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
