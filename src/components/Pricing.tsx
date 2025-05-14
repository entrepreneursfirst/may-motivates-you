
import React from 'react';
import { Check, Phone, MemoryStick, Mic, Star, Plus, CalendarIcon, CircleDollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Acquaintance",
    description: "Perfect for getting started",
    price: "$3.75",
    period: "per week",
    calls: 3,
    features: [
      "Motivational voice agent",
      "Basic AI memory (short-term)",
      "Fixed voice tone",
    ],
    popular: false,
    buttonText: "Get Started",
    icon: <Phone className="w-5 h-5 mr-2 text-commitify-blue" />
  },
  {
    name: "Bestie",
    description: "Our most popular choice",
    price: "$5.00",
    period: "per week",
    calls: 5,
    features: [
      "Everything in Acquaintance, and...",
      "Long-term memory",
      "Add your own voice",
      "Weekly progress tracking",
    ],
    popular: true,
    buttonText: "Most Popular",
    icon: <Phone className="w-5 h-5 mr-2 text-commitify-blue" />
  },
  {
    name: "Ride or Die",
    description: "Maximum accountability",
    price: "$6.67",
    period: "per week",
    calls: 8,
    features: [
      "Everything in Bestie, and...",
      "Calendar integration",
      "Access to all current and future voices",
    ],
    popular: false,
    buttonText: "Go Premium",
    icon: <Phone className="w-5 h-5 mr-2 text-commitify-blue" />
  }
];

const extraCallPack = {
  name: "One More Thing",
  description: "One-time top-up",
  price: "$1.25",
  minutes: 5,
  buttonText: "Add Minutes",
};

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
            <Card 
              key={index}
              className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow border ${plan.popular ? 'border-commitify-yellow' : 'border-gray-100'} bg-gradient-to-br from-violet-50 to-violet-100 h-full flex flex-col`}
            >
              {/* Fixed height container for "Most Popular" badge */}
              <div className="h-[40px] flex items-center justify-center">
                {plan.popular && (
                  <div className="bg-commitify-yellow text-commitify-text text-center py-2 font-medium flex items-center justify-center w-full">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-0">
                <div className="h-12 flex items-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 flex-grow">
                <div className="pt-4">
                  <div className="flex items-center mb-2">
                    {plan.icon}
                    <span className="font-medium">{plan.calls} calls per week</span>
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-commitify-secondary ml-1">{plan.period}</span>
                  </div>
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
                  className={`w-full ${plan.popular ? 'bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text' : 'bg-commitify-blue hover:bg-commitify-blue/90 text-white'} rounded-full`}
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Extra Minutes Pack */}
        <div className="mt-12 max-w-xs mx-auto">
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 bg-gradient-to-br from-violet-50 to-violet-100 flex flex-col h-full">
            <CardHeader className="pb-0">
              <div className="h-12 flex items-center">
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-lg">{extraCallPack.name}</CardTitle>
                  <Plus className="text-green-500 w-5 h-5" />
                </div>
              </div>
              <CardDescription>{extraCallPack.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4 flex-grow">
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 mr-2 text-commitify-blue" />
                <span className="font-medium">+{extraCallPack.minutes} extra minutes</span>
              </div>
              <div className="mb-2">
                <div className="flex items-center">
                  <CircleDollarSign className="w-5 h-5 mr-2 text-green-500" />
                  <span className="text-xl font-bold">{extraCallPack.price}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 mt-auto">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full"
                onClick={() => handleSelectPlan(extraCallPack.name)}
              >
                {extraCallPack.buttonText}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <p className="text-center text-commitify-secondary mt-8">
          Cancel anytime. First call demo free. All plans include VAT.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
