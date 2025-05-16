import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CalendarIcon, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { scheduleCall } from '@/utils/retellai';
import supabase from '@/utils/supabase';
import { convertToTimestamp } from '@/utils/dateConverter';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

interface OnboardingFlowProps {
  user: any;
  session: any;
  agents: any[];
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ 
  user, 
  session, 
  agents,
  onComplete 
}) => {
  console.log("OnboardingFlow rendered with user:", user?.id);
  
  const [step, setStep] = useState(1);
  const [isCallCompleted, setIsCallCompleted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [talkingPoints, setTalkingPoints] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [debugMode, setDebugMode] = useState(false);
  const { toast } = useToast();
  
  // Agent contact information
  const agentPhoneNumber = "+1 (315) 325-8101";
  const agentPhoneNumberRaw = "+13153258101";
  
  // Available time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM"
  ];
  
  // Fetch user phone number
  useEffect(() => {
    console.log("OnboardingFlow: Fetching user phone");
    const fetchUserPhone = async () => {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from('users')
        .select('to_number')
        .eq('id', user.id)
        .single();
        
      if (data?.to_number) {
        console.log("User phone found:", data.to_number);
        setUserPhone(data.to_number);
      } else {
        console.log("No phone number found for user");
      }
    };
    
    fetchUserPhone();
  }, [user]);
  
  // Check for debug mode in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'true') {
      setDebugMode(true);
      console.log("Debug mode enabled for onboarding");
    }
  }, []);
  
  // Check if user has completed onboarding call
  useEffect(() => {
    console.log("OnboardingFlow: Checking call status, current step:", step);
    const checkCallStatus = () => {
      const callCompleted = localStorage.getItem('onboardingCallCompleted');
      console.log("Call completed status from localStorage:", callCompleted);
      if (callCompleted === 'true') {
        setIsCallCompleted(true);
        // If the call was already completed, go to the next step
        if (step === 1) {
          console.log("Advancing to step 2 because call is already completed");
          setStep(2);
        }
      }
    };
    
    checkCallStatus();
    
    // Set up interval to check for completion
    const interval = setInterval(checkCallStatus, 5000);
    return () => clearInterval(interval);
  }, [step]);
  
  const handleCallAgent = () => {
    console.log("handleCallAgent called");
    toast({
      title: "Calling Onboarding Agent",
      description: "Please complete the call to proceed with your setup."
    });
    
    if (debugMode) {
      // In debug mode, immediately mark call as completed
      console.log("Debug mode: Simulating completed call");
      setIsCallCompleted(true);
      localStorage.setItem('onboardingCallCompleted', 'true');
      toast({
        title: "Call Completed (Debug Mode)",
        description: "Moving to next step...",
      });
      setStep(2);
    } else {
      // In real mode, there's a setTimeout for demo purposes
      // In a production environment, this would be replaced with an API callback
      // that verifies the call happened
      
      // Start checking if call is in progress (browser initiates call via href)
      // When call is complete, we'll get a callback or the user will press a button
      setTimeout(() => {
        // This timeout would be replaced with actual call verification
        console.log("Call simulated as completed after timeout");
        setIsCallCompleted(true);
        localStorage.setItem('onboardingCallCompleted', 'true');
        toast({
          title: "Call Completed",
          description: "Thank you for verifying your phone number!",
        });
        setStep(2);
      }, 5000);
    }
  };
  
  const handleAgentSelect = (agent: any) => {
    console.log("Selected agent:", agent.name);
    setSelectedAgent(agent);
    setTimeout(() => setStep(3), 300);
  };
  
  const handleScheduleCall = async () => {
    console.log("handleScheduleCall called with date:", selectedDate, "time:", selectedTime);
    if (!selectedDate || !selectedTime || !selectedAgent || !user?.id) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time and fill in all required details.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Format date and time for API
      const [time, ampm] = selectedTime.split(" ");
      const [hourStr, minuteStr] = time.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      
      const timestamp = convertToTimestamp(
        selectedDate.getDate(),
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear(),
        hour,
        minute,
        ampm
      );
      
      console.log("Scheduling call with timestamp:", timestamp);
      
      // Call the API to schedule the call
      const callResponse = await scheduleCall(
        userPhone,
        selectedAgent.agent_id,
        user.id,
        timestamp,
        talkingPoints
      );
      
      console.log("Call scheduling response:", callResponse);
      
      if (callResponse.success) {
        toast({
          title: "Call Scheduled!",
          description: `Your call is set for ${format(selectedDate, 'MMMM d')} at ${selectedTime}`,
        });
        
        // Mark onboarding as complete and move to final step
        console.log("Setting onboardingComplete to true in localStorage");
        localStorage.setItem('onboardingComplete', 'true');
        setStep(4);
        
        // After a short delay, complete the onboarding
        setTimeout(() => {
          console.log("Onboarding complete, triggering callback");
          onComplete();
        }, 3000);
      } else {
        throw new Error(callResponse.error || "Unable to schedule call");
      }
    } catch (error: any) {
      console.error("Error scheduling call:", error);
      toast({
        title: "Scheduling Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive"
      });
    }
  };
  
  // Force debug mode
  useEffect(() => {
    // Uncomment to force debug mode
    // setDebugMode(true);
  }, []);
  
  // Render the current step
  const renderStep = () => {
    console.log("Rendering step:", step);
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">Welcome to Commitify</motion.h2>
            <motion.p variants={itemVariants} className="text-center text-gray-600 mb-6">
              First, let's verify your phone number by making a quick onboarding call.
            </motion.p>
            
            <motion.div variants={itemVariants} className="p-4 bg-commitify-blue/10 rounded-lg mb-6 w-full max-w-md">
              <div className="flex items-center mb-3">
                <Phone className="w-5 h-5 mr-3 text-commitify-blue" />
                <div>
                  <p className="font-medium">{agentPhoneNumber}</p>
                  <p className="text-xs text-gray-500">Your Onboarding Agent, available 24/7</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                This quick call helps us verify your identity and understand your goals better.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-full max-w-md">
              <a 
                href={`tel:${agentPhoneNumberRaw}`}
                onClick={handleCallAgent}
                className="inline-flex items-center justify-center gap-2 w-full bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Onboarding Agent
              </a>
              
              {isCallCompleted && (
                <div className="mt-4 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span>Call completed! Proceeding to next step...</span>
                </div>
              )}
              
              {debugMode && (
                <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                  Debug mode active - Call verification will be simulated
                </div>
              )}
            </motion.div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">Choose Your Agent</motion.h2>
            <motion.p variants={itemVariants} className="text-center text-gray-600 mb-6">
              Select the personality that will best motivate you.
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {agents.map((agent) => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    selectedAgent?.id === agent.id ? 'border-commitify-yellow shadow-lg' : 'border-transparent'
                  }`}
                  onClick={() => handleAgentSelect(agent)}
                >
                  <Card className="h-full">
                    <CardContent className="p-4 flex flex-col items-center justify-between h-full">
                      <div className="text-3xl mb-2">{agent.emoji}</div>
                      <h3 className="font-bold text-lg">{agent.name}</h3>
                      <p className="text-sm text-center text-gray-600 my-2">{agent.description}</p>
                      <p className="text-xs italic text-center mt-2">"{agent.quote}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div 
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">Schedule Your First Call</motion.h2>
            <motion.p variants={itemVariants} className="text-center text-gray-600 mb-6">
              When would you like {selectedAgent?.name} to check in with you?
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <motion.div variants={itemVariants} className="space-y-4">
                <Label>What would you like to discuss?</Label>
                <Textarea 
                  placeholder="Enter topics or tasks you'd like to be held accountable for..."
                  className="min-h-[120px]"
                  value={talkingPoints}
                  onChange={(e) => setTalkingPoints(e.target.value)}
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Label>Choose a date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Label>Choose a time</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={cn(
                          "text-sm",
                          selectedTime === time ? "bg-commitify-yellow text-commitify-text" : ""
                        )}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="mt-8 w-full flex justify-end">
              <Button 
                className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text px-6 py-2 font-medium flex items-center gap-2"
                onClick={handleScheduleCall}
              >
                Schedule Call <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div 
            key="step4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants}>
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">All Set!</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 mb-6">
              Your first call with {selectedAgent?.name} is scheduled for {selectedDate && format(selectedDate, "MMMM d")} at {selectedTime}.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-600">
              You'll now be redirected to your dashboard.
            </motion.p>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pt-24">
      {/* Debug Info */}
      {debugMode && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg text-xs font-mono">
          <p>Debug Info:</p>
          <p>User ID: {user?.id || 'Not logged in'}</p>
          <p>Current Step: {step}</p>
          <p>isCallCompleted: {isCallCompleted ? 'true' : 'false'}</p>
          <p>selectedAgent: {selectedAgent?.name || 'None'}</p>
          <p>userPhone: {userPhone || 'Not set'}</p>
        </div>
      )}
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center w-full max-w-md mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`h-3 w-3 rounded-full ${
                i <= step ? 'bg-commitify-yellow' : 'bg-gray-300'
              }`}></div>
              <div className="text-xs mt-1 text-gray-500">
                {i === 1 && "Verify"}
                {i === 2 && "Agent"}
                {i === 3 && "Schedule"}
                {i === 4 && "Complete"}
              </div>
            </div>
          ))}
        </div>
        <div className="h-1 bg-gray-200 w-full max-w-md mx-auto mt-2 rounded">
          <div 
            className="h-1 bg-commitify-yellow rounded-l transition-all duration-500 ease-in-out" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step Content with Animation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow; 