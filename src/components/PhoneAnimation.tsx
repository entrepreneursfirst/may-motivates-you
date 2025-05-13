
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type PhoneFormValues = {
  phoneNumber: string;
};

const PhoneAnimation = () => {
  const [isRinging, setIsRinging] = useState(true);
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  const form = useForm<PhoneFormValues>({
    defaultValues: {
      phoneNumber: ""
    }
  });

  const handleAnswer = () => {
    setShowPhoneForm(true);
  };

  const handleSubmitPhone = (data: PhoneFormValues) => {
    console.log("Phone number submitted:", data.phoneNumber);
    setIsRinging(false);
    setShowPhoneForm(false);
    setShowCallScreen(true);
  };

  const handleHangUp = () => {
    setIsRinging(true);
    setShowCallScreen(false);
    // After 1 second, start ringing again
    setTimeout(() => {
      setIsRinging(true);
    }, 1000);
  };

  // Phone component with incoming call and form
  return <div className="relative flex items-center justify-center scale-110 md:scale-125 my-8 transform -translate-x-30">
      {/* Ambient glow background */}
      <div className="absolute inset-0 -m-12 rounded-full bg-gradient-to-br from-commitify-yellow to-amber-200 opacity-30 blur-2xl" />

      {/* Tilted Phone */}
      <div className="relative transform -rotate-12">
        <div className="relative w-64 h-[480px] z-20">
          {/* Gradient screen background inside phone */}
          <div className="absolute inset-[3%] rounded-[24px] bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-500 shadow-inner z-0" />

          {/* Phone overlay (the phone frame PNG with empty middle) */}
          <img src="/lovable-uploads/dbf73134-0771-42c1-994e-959d4ced156e.png" alt="Phone Frame" className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

          {/* Screen content */}
          <div className="absolute inset-[11%] z-20 flex flex-col items-center justify-center px-4">
            <img src="/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png" alt="Zen Master" className="w-20 h-20 rounded-full mb-3 object-cover" />
            <p className="text-center text-base font-semibold">Zen Master 🌿</p>

            {isRinging && !showCallScreen && <>
                <p className="text-sm text-gray-100 mb-4">Incoming Call...</p>
                <div className="flex space-x-4">
                  <Button onClick={handleAnswer} className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button onClick={handleHangUp} className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center rotate-135">
                    <Phone className="w-5 h-5" />
                  </Button>
                </div>
              </>}

            {showCallScreen && <>
                <div className="bg-white/80 text-black p-3 rounded-lg mb-2 max-w-[90%] text-sm text-left">
                  Stay present, my friend. Let's focus on what matters now.
                </div>
                <div className="bg-white/80 text-black p-3 rounded-lg mb-2 max-w-[90%] text-sm text-left">
                  Your project deserves the attention of your full being.
                </div>
                <Button onClick={handleHangUp} className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mt-auto rotate-135">
                  <Phone className="w-5 h-5" />
                </Button>
              </>}
          </div>
        </div>
      </div>

      {/* Phone Number Form Sheet */}
      <Sheet open={showPhoneForm} onOpenChange={setShowPhoneForm}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Enter Your Phone Number</SheetTitle>
            <SheetDescription>
              We'll send you motivational calls to keep you on track
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitPhone)} className="space-y-6">
                <FormField control={form.control} name="phoneNumber" render={({
                field
              }) => <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <Button type="submit" className="w-full">
                  Start Receiving Calls
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>;
};

export default PhoneAnimation;
