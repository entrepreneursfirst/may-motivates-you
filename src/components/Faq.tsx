
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What if I don't answer?",
    answer: "No worries. We'll call back—nicely the first time, firmly the second."
  },
  {
    question: "Will I get spammed?",
    answer: "Never. You're in charge of the frequency and time slots."
  },
  {
    question: "Will it guilt-trip me?",
    answer: "Only if that's what motivates you 😏"
  },
  {
    question: "Is my data safe?",
    answer: "Stored securely in the EU. Fully GDPR compliant."
  },
  {
    question: "Can I customize what the AI says?",
    answer: "Absolutely! You can set specific phrases or adjust the tone to your preference."
  },
  {
    question: "How does billing work?",
    answer: "You'll be billed according to your selected plan. All plans are weekly and can be canceled at any time."
  }
];

const Faq = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center font-outfit mb-16">
          Frequently Asked <span className="text-neon">Questions</span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
