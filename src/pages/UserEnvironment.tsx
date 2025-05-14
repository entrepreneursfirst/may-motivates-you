
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';
import ProfileCard from '@/components/UserEnvironment/ProfileCard';
import ActiveAgentCard from '@/components/UserEnvironment/ActiveAgentCard';
import CallScheduleCard from '@/components/UserEnvironment/CallScheduleCard';
import NaturalLanguageCard from '@/components/UserEnvironment/NaturalLanguageCard';
import IntegrationsCard from '@/components/UserEnvironment/IntegrationsCard';
import PlanSelectionDialog from '@/components/UserEnvironment/PlanSelectionDialog';
import Header from '@/components/UserEnvironment/Header';
import BackgroundGradient from '@/components/UserEnvironment/BackgroundGradient';

// Agent data
const agents = [
  {
    id: 1,
    name: "Life Coach",
    image: "/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png",
    emoji: "🧍‍♀️",
    description: "Your personal growth guru who turns goals into daily wins with calm encouragement.",
    quote: "Let's break this into steps — and nail the first one today."
  },
  {
    id: 2,
    name: "Zen Master",
    image: "/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png",
    emoji: "🧘",
    description: "The chill philosopher who reminds you to breathe, reflect, and stay centered.",
    quote: "The task exists. It waits for you. Are you ready?"
  },
  {
    id: 3,
    name: "Slay Bestie",
    image: "/lovable-uploads/735ccb5d-7d5c-4de9-b764-d99b6619a349.png",
    emoji: "💅",
    description: "The glitter-drenched voice that drags you out of bed and into your power.",
    quote: "Slay the day or stay in delay — your call, babe."
  },
  {
    id: 4,
    name: "Hype Beast",
    image: "/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png",
    emoji: "🏋️",
    description: "Pure energy in your ear yelling \"LET'S GOOOOOOOO\" until you move.",
    quote: "YOU GOT THIS! Time to level up your game!"
  },
  {
    id: 5,
    name: "Drill Sergeant",
    image: "/lovable-uploads/4d5b4382-c347-4c68-b807-b3d21cfef20c.png",
    emoji: "🎖️",
    description: "No excuses, no delays — just clear orders, structure, and discipline.",
    quote: "YOU SAID 10AM. IT'S 10:03. WHY AREN'T YOU MOVING?"
  },
  {
    id: 6,
    name: "CEO,000,000",
    image: "/lovable-uploads/5e0312df-3529-4495-ba95-2d12b3ce011e.png",
    emoji: "💼",
    description: "Laser-focused leadership who turns your chaos into calendar blocks and KPIs.",
    quote: "This task has no ROI unless you execute."
  }
];

// Plan data
const plans = [
  {
    name: "Cold Call",
    emoji: "❄️",
    description: "Just dip your toes in",
    price: "$7.50",
    period: "one-time",
    color: "bg-[#1EAEDB]/20 text-[#1EAEDB]",
    billingNote: "One-time payment"
  },
  {
    name: "Acquaintance",
    emoji: "👋",
    description: "Perfect for getting started",
    price: "$3.75",
    period: "per week",
    color: "bg-commitify-blue/20 text-commitify-blue",
    billingNote: "Billed Monthly"
  },
  {
    name: "Bestie",
    emoji: "🫶",
    description: "Our most popular choice",
    price: "$5.00",
    period: "per week",
    color: "bg-commitify-yellow/20 text-commitify-text",
    billingNote: "Billed Monthly"
  },
  {
    name: "Ride or Die",
    emoji: "💯",
    description: "Maximum accountability",
    price: "$6.50",
    period: "per week",
    color: "bg-commitify-blue/20 text-commitify-blue",
    billingNote: "Billed Monthly"
  }
];

const UserEnvironment = () => {
  // Toast notifications
  const { toast } = useToast();

  // State for user profile
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    gender: "Male",
    birthdate: new Date(1990, 0, 1)
  });

  // State for active agent
  const [activeAgentId, setActiveAgentId] = useState(1);

  // State for subscription dialog
  const [showPlanDialog, setShowPlanDialog] = useState(false);

  // State for active plan
  const [activePlan, setActivePlan] = useState("Bestie");

  // State for plan selection
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Date selection states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeRangeMode, setTimeRangeMode] = useState(false);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  // Scheduled calls
  const [scheduledCalls, setScheduledCalls] = useState<Array<{
    date: Date;
    time: string | null;
    timeRange?: {
      start: string;
      end: string;
    } | null;
  }>>([]);

  // Get active agent
  const activeAgent = agents.find(agent => agent.id === activeAgentId) || agents[0];

  // Get active plan details
  const activePlanDetails = plans.find(plan => plan.name === activePlan) || plans[0];

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setShowTimeSelector(true);
    }
  };

  // Handle time selection
  const handleTimeSelect = (time: string | null, isRange: boolean, rangeStart?: string, rangeEnd?: string) => {
    if (isRange && rangeStart && rangeEnd) {
      if (selectedDate) {
        setScheduledCalls([...scheduledCalls, {
          date: selectedDate,
          time: null,
          timeRange: {
            start: rangeStart,
            end: rangeEnd
          }
        }]);
      }
    } else if (time && selectedDate) {
      setScheduledCalls([...scheduledCalls, {
        date: selectedDate,
        time: time
      }]);
    }

    // Reset selection states
    setSelectedDate(undefined);
    setShowTimeSelector(false);
    setSelectedTime(null);
    toast({
      title: "Call scheduled",
      description: "Your call has been added to the schedule."
    });
  };

  // Handle call deletion
  const handleDeleteCall = (index: number) => {
    const updatedCalls = [...scheduledCalls];
    updatedCalls.splice(index, 1);
    setScheduledCalls(updatedCalls);
    toast({
      title: "Call removed",
      description: "The call has been removed from your schedule."
    });
  };

  // Handle subscription changes
  const handleChangeSubscription = () => {
    setSelectedPlan(null); // Reset selected plan when opening dialog
    setShowPlanDialog(true);
  };

  // Handle plan selection
  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  // Handle plan confirmation
  const handleConfirmPlan = () => {
    if (selectedPlan) {
      setActivePlan(selectedPlan);
      setShowPlanDialog(false);
      toast({
        title: "Plan updated",
        description: `Your subscription has been updated to ${selectedPlan}.`
      });
    }
  };

  // Handle cancel subscription
  const handleCancelSubscription = () => {
    // Here you would typically call an API to cancel the subscription
    toast({
      title: "Subscription canceled",
      description: "Your subscription has been canceled successfully."
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-commitify-background">
      {/* Warm radial gradient background */}
      <BackgroundGradient />
      
      {/* Header with logo */}
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar: Profile Card - Now fixed position on desktop */}
          <div className="md:col-span-1 relative">
            <div className="md:sticky md:top-24">
              <ProfileCard 
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                activePlan={activePlan}
                activePlanDetails={activePlanDetails}
                handleChangeSubscription={handleChangeSubscription}
                handleCancelSubscription={handleCancelSubscription}
              />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-8">
            {/* Active Agent Section */}
            <ActiveAgentCard 
              activeAgent={activeAgent}
              activeAgentId={activeAgentId}
              setActiveAgentId={setActiveAgentId}
              agents={agents}
            />
            
            {/* Call Schedule and other cards */}
            <div className="space-y-8">
              {/* Call Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                <CallScheduleCard 
                  selectedDate={selectedDate}
                  handleDateSelect={handleDateSelect}
                  showTimeSelector={showTimeSelector}
                  timeRangeMode={timeRangeMode}
                  setTimeRangeMode={setTimeRangeMode}
                  startTime={startTime}
                  endTime={endTime}
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                  handleTimeSelect={handleTimeSelect}
                  scheduledCalls={scheduledCalls}
                  handleDeleteCall={handleDeleteCall}
                />
              </div>
              
              {/* Natural Language Input */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <NaturalLanguageCard />
              </div>
              
              {/* Additional Integrations */}
              <div className="grid grid-cols-1 gap-6">
                <IntegrationsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Subscription Plan Selection Dialog */}
      <PlanSelectionDialog 
        showPlanDialog={showPlanDialog}
        setShowPlanDialog={setShowPlanDialog}
        plans={plans}
        selectedPlan={selectedPlan}
        handleSelectPlan={handleSelectPlan}
        handleConfirmPlan={handleConfirmPlan}
      />
    </div>
  );
};

export default UserEnvironment;
