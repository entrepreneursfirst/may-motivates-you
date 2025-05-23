//UserEnvironment.tsx
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';
import ProfileCard from '@/components/UserEnvironment/ProfileCard';
import ActiveAgentCard from '@/components/UserEnvironment/ActiveAgentCard';
import CallScheduleCard from '@/components/UserEnvironment/CallScheduleCard';
import IntegrationsCard from '@/components/UserEnvironment/IntegrationsCard';
import PlanSelectionDialog from '@/components/UserEnvironment/PlanSelectionDialog';
import Header from '@/components/UserEnvironment/Header';
import BackgroundGradient from '@/components/UserEnvironment/BackgroundGradient';
import OnboardingCallDialog from '@/components/OnboardingCallDialog';
import OnboardingFlow from '@/components/UserEnvironment/OnboardingFlow';
import { useAuth } from '@/context/AuthContext';
import supabase from '@/utils/db/supabase';
import { scheduleCall } from '@/utils/retellai';
import { convertToTimestamp } from '@/utils/dateConverter'

// Agent data
const agents = [
  {
    id:1,
    agent_id: "agent_78f5fa0f170556473a976e7a91",
    name: "Life Coach",
    image: "/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png",
    emoji: "🧍‍♀️",
    description: "Your personal growth guru who turns goals into daily wins with calm encouragement.",
    quote: "Let's break this into steps — and nail the first one today."
  },
  {
    id:2,
    agent_id: "agent_6e73af06270b0032efc1fa18c3",
    name: "Zen Master",
    image: "/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png",
    emoji: "🧘",
    description: "The chill philosopher who reminds you to breathe, reflect, and stay centered.",
    quote: "The task exists. It waits for you. Are you ready?"
  },
  {
    id:3,
    agent_id: "agent_2afc28f645dc8343b84d7c483d",
    name: "Slay Bestie",
    image: "/lovable-uploads/735ccb5d-7d5c-4de9-b764-d99b6619a349.png",
    emoji: "💅",
    description: "The glitter-drenched voice that drags you out of bed and into your power.",
    quote: "Slay the day or stay in delay — your call, babe."
  },
  {
    id:4,
    agent_id: "agent_41764d36679db7bd0bd6e8988f",
    name: "Hype Beast",
    image: "/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png",
    emoji: "🏋️",
    description: "Pure energy in your ear yelling \"LET'S GOOOOOOOO\" until you move.",
    quote: "YOU GOT THIS! Time to level up your game!"
  },
  {
    id:5,
    agent_id: "agent_42c533c4bde861a6767e2c0ee1",
    name: "Drill Sergeant",
    image: "/lovable-uploads/4d5b4382-c347-4c68-b807-b3d21cfef20c.png",
    emoji: "🎖️",
    description: "No excuses, no delays — just clear orders, structure, and discipline.",
    quote: "YOU SAID 10AM. IT'S 10:03. WHY AREN'T YOU MOVING?"
  },
  {
    id:6,
    agent_id: "agent_2fa0142fed45ec311743fcd50b",
    name: "CEO,000,000",
    image: "/lovable-uploads/5e0312df-3529-4495-ba95-2d12b3ce011e.png",
    emoji: "💼",
    description: "Laser-focused leadership who turns your chaos into calendar blocks and KPIs.",
    quote: "This task has no ROI unless you execute."
  }
];
const creditMap: Record<string, number> = {
  "price_1ROh24GIxsF8bStBU1EBfS9Z": 7, // Ride or Die Plan - 7 weekly calls
  "price_1ROh0nGIxsF8bStB1xJw1MrF": 5, // Bestie plan - 5 weekly calls
  "price_1ROgvjGIxsF8bStBvltMVloL": 3, // Acquaintance plan - 3 weekly calls
  "price_1ROr80GIxsF8bStBYpj48Ue0": 3, //  Single package of 3 calls
  "price_1ROiaZGIxsF8bStBTLbdv0eb": 1 // test_product
};
// Plan data
const plans = [
  {
    id:"",
    name: "Cold Call",
    emoji: "❄️",
    description: "Just dip your toes in",
    price: "$7.50",
    period: "one-time",
    color: "bg-[#1EAEDB]/20 text-[#1EAEDB]",
    billingNote: "One-time payment"
  },
  {
    id: "price_1ROgvjGIxsF8bStBvltMVloL",
    name: "Acquaintance",
    emoji: "👋",
    description: "Perfect for getting started",
    price: "$3.75",
    period: "per week",
    color: "bg-commitify-blue/20 text-commitify-blue",
    billingNote: "Billed Monthly"
  },
  {
    id: "price_1ROh0nGIxsF8bStB1xJw1MrF",
    name: "Bestie",
    emoji: "🫶",
    description: "Our most popular choice",
    price: "$5.00",
    period: "per week",
    color: "bg-commitify-yellow/20 text-commitify-text",
    billingNote: "Billed Monthly"
  },
  {
    id: "price_1ROh24GIxsF8bStBU1EBfS9Z",
    name: "Ride or Die",
    emoji: "💯",
    description: "Maximum accountability",
    price: "$6.50",
    period: "per week",
    color: "bg-commitify-blue/20 text-commitify-blue",
    billingNote: "Billed Monthly"
  }
];

interface Call {
  id: string;
  agent_id: string;
  title: string;
  scheduled_at: string;
  started_at: string;
  status: string;
  duration_seconds: number;
}

export interface ScheduledCall {
  date: Date;
  time: string | null;
  timeRange?: {
    start: string;
    end: string;
  } | null;
  talkingPoints?: string;
  locked?: boolean;
}

const UserEnvironment = () => {
  // Toast notifications
  const { user, signOut, session, isLoading } = useAuth();

  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  const { toast } = useToast();

  // Function to fetch calls from database
  const fetchCalls = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('appointments_scheduling')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to match the Call interface
      const formattedCalls = data?.map(appointment => ({
        id: appointment.id,
        agent_id: appointment.agent_id,
        title: appointment.title || 'Scheduled Call',
        scheduled_at: new Date(appointment.scheduled_at).toISOString(), // Convert timestamp to ISO
        started_at: appointment.started_at ? new Date(appointment.started_at).toISOString() : '',
        status: appointment.scheduling_status,
        duration_seconds: appointment.duration_seconds || 0,
        provided_context: appointment.provided_context
      })) || [];

      setCalls(formattedCalls);
      
      // Convert the formatted calls to ScheduledCall format for UI display
      const scheduledCallsFromDB = formattedCalls.map(call => {
        const callDate = new Date(call.scheduled_at);
        
        // Format time from the timestamp (HH:MM AM/PM)
        const hours = callDate.getHours();
        const minutes = callDate.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        const timeString = `${hours12}:${minutes} ${ampm}`;
        
        return {
          date: callDate,
          time: timeString,
          talkingPoints: call.provided_context || '',
          locked: true // All calls from DB are considered locked
        };
      });
      
      // Set the scheduledCalls state with the converted data
      setScheduledCalls(scheduledCallsFromDB);
      
    } catch (error) {
      console.error('Error fetching calls:', error);
      toast({
        title: "Error",
        description: "Failed to load your scheduled calls.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [user, calls]);

  // Check if user needs onboarding
  useEffect(() => {
    if (user && !loading) {
      // For testing purposes - uncomment this line to force onboarding flow
      // localStorage.removeItem('onboardingComplete');
      console.log("Checking if user needs onboarding, user=", user.id);
      
      // Check if user has completed the onboarding flow
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      console.log("onboardingComplete from localStorage:", onboardingComplete);
      
      // If localStorage doesn't have the flag, check the database
      if (!onboardingComplete) {
        const checkUserOnboardingStatus = async () => {
          try {
            // Check if user has any appointments (indication they completed onboarding)
            const { data, error } = await supabase
              .from('appointments_scheduling')
              .select('id')
              .eq('user_id', user.id)
              .limit(1);
              
            if (error) throw error;
            console.log("Appointment check results:", data);
            
            // If user has no appointments and no localStorage flag, they need onboarding
            if (!data || data.length === 0) {
              console.log("First time user detected - showing onboarding flow");
              setIsFirstTimeUser(true);
            } else {
              // User has appointments but no localStorage flag - set the flag
              localStorage.setItem('onboardingComplete', 'true');
              console.log("User has appointments - not showing onboarding flow");
              setIsFirstTimeUser(false);
            }
          } catch (error) {
            console.error("Error checking user onboarding status:", error);
            // Default to showing onboarding if we can't determine status
            setIsFirstTimeUser(true);
          }
        };
        
        checkUserOnboardingStatus();
      } else {
        console.log("User has completed onboarding according to localStorage");
        setIsFirstTimeUser(false);
      }
    }
  }, [user, loading]);

  // State for user profile
  const [userProfile, setUserProfile] = useState({
    full_name: "John Doe",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    gender: "Male",
    birth_date: new Date(1990, 0, 1),
    balance:0
  });
  // State for active plan
  const [activePlan, setActivePlan] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('users')
        .select('full_name, to_number, location, gender, birth_date, active_plan, balance')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Error",
          description: "Unable to load your profile.",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        setUserProfile({
          full_name: data.full_name ?? "",
          phone: data.to_number ?? "",
          location: data.location ?? "",
          gender: data.gender ?? "",
          birth_date: data.birth_date ? new Date(data.birth_date) : new Date(1990, 0, 1),
          balance: data.balance
        });
      }
      if (data?.active_plan) {
        setActivePlan(data.active_plan)
      }
    };

    fetchUserProfile();
  }, [user]);

  const updateProfileData = async (userProfileData: {
    full_name: string;
    location: string;
    gender: string;
    birth_date: Date;
    active_plan?: string;
  }) => {
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update({
        full_name: userProfileData.full_name,
        location: userProfileData.location,
        gender: userProfileData.gender,
        birth_date: userProfileData.birth_date.toISOString().split('T')[0], // store as YYYY-MM-DD
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Profile Saved",
        description: "Your profile has been successfully updated."
      });
    }
  };

  // State for active agent
  const [activeAgentId, setActiveAgentId] = useState(1);

  // State for subscription dialog
  const [showPlanDialog, setShowPlanDialog] = useState(false);


  // State for plan selection
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Date selection states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");


  // Scheduled calls
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([]);

  // Get active agent
  const activeAgent = agents.find(agent => agent.id === activeAgentId) || agents[0];

  // Get active plan details
  const activePlanDetails = plans.find(plan => plan.id === activePlan) || plans[0];

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
        const newCall = {
          date: selectedDate,
          time: null,
          timeRange: {
            start: rangeStart,
            end: rangeEnd
          },
          talkingPoints: document.getElementById('talking-points') ?
            (document.getElementById('talking-points') as HTMLTextAreaElement).value : "",
          locked: true // Auto-lock the appointment
        };
        
        const updatedCalls = [...scheduledCalls, newCall];
        setScheduledCalls(updatedCalls);
        
        // Schedule the call immediately
        scheduleAppointmentAICall(newCall);
      }
    } else if (time && selectedDate) {
      const talkingPointsEl = document.getElementById('talking-points') as HTMLTextAreaElement;
      const talkingPointsText = talkingPointsEl ? talkingPointsEl.value : "";

      const newCall = {
        date: selectedDate,
        time: time,
        talkingPoints: talkingPointsText,
        locked: true // Auto-lock the appointment
      };
      
      const updatedCalls = [...scheduledCalls, newCall];
      setScheduledCalls(updatedCalls);
      
      // Schedule the call immediately
      scheduleAppointmentAICall(newCall);
    }

    // Reset selection states
    setSelectedDate(undefined);
    setShowTimeSelector(false);
    setSelectedTime(null);
    toast({
      title: "Call Scheduled!",
      description: "Your call has been scheduled and is locked in."
    });
  };

  // Handle call deletion
  const handleDeleteCall = async (index: number) => {
    try {
      const callToDelete = scheduledCalls[index];
      const updatedCalls = [...scheduledCalls];
      updatedCalls.splice(index, 1);
      
      // First update the UI state for immediate feedback
      setScheduledCalls(updatedCalls);
      
      // Get the corresponding call ID from the calls array
      const callData = calls.find(call => {
        const callDate = new Date(call.scheduled_at);
        const localCallDate = new Date(callToDelete.date);
        
        // Compare dates (ignoring timezone differences for simplicity)
        return callDate.getFullYear() === localCallDate.getFullYear() &&
               callDate.getMonth() === localCallDate.getMonth() &&
               callDate.getDate() === localCallDate.getDate() &&
               callDate.getHours() === localCallDate.getHours() &&
               callDate.getMinutes() === localCallDate.getMinutes();
      });
      
      if (callData?.id) {
        // Delete the call from the database
        const { error } = await supabase
          .from('appointments_scheduling')
          .delete()
          .eq('id', callData.id);
          
        if (error) {
          throw error;
        }
        
        // Also update the calls array
        setCalls(calls.filter(call => call.id !== callData.id));
      }
      
      toast({
        title: "Call removed",
        description: "The call has been removed from your schedule."
      });
    } catch (error) {
      console.error('Error deleting call:', error);
      toast({
        title: "Error",
        description: "Failed to delete the call. Please try again.",
        variant: "destructive"
      });
      
      // Refresh the data to ensure UI is in sync with database
      fetchCalls();
    }
  };

  const scheduleAppointmentAICall = async (call: ScheduledCall) => {

    console.log(`user phone number = ${userProfile.phone}`)
    console.log("call = ")
    console.log(JSON.stringify(call))
    console.log("users phone", userProfile.phone)
    console.log(`activeAgent = ${activeAgent}`)
    const [time, ampm] = call.time.split(" "); // time = "1:00", period = "AM"
    const [hours, minutes] = time.split(":")

    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const datetime_stamp = convertToTimestamp(
      call.date.getDate(),
      call.date.getMonth() + 1,
      call.date.getFullYear(),
      hour,
      minute,
      ampm
    );
    console.log(call.date)
    console.log(`call.date.getDay(), call.date.getMonth(), call.date.getFullYear(), hours, minutes, ampm`)
    console.log(call.date.getDate(), call.date.getMonth()+1, call.date.getFullYear(), hours, minutes, ampm)
    console.log(`datetime_stamp = ${datetime_stamp}`)
    if (session?.user) {
      const callResponse = await scheduleCall(
        userProfile.phone, // Already includes the + sign from to_number field
        activeAgent.agent_id,
        session.user.id,
        datetime_stamp,
        call.talkingPoints
      );

      if (callResponse.success) {
        toast({
          title: "Call on its way!",
          description: `Your AI coach is calling ${userProfile.phone}`,
        });
      } else {
        toast({
          title: "Call Failed",
          description: callResponse.error || "Unable to place call.",
          variant: "destructive",
        });
      }
    
    }
  }
  // Handle call lock-in
  const handleLockInCall = (index: number) => {
    const updatedCalls = [...scheduledCalls];
    updatedCalls[index].locked = true;
    setScheduledCalls(updatedCalls);
    // Toast notification is handled in the ScheduledCall component
    scheduleAppointmentAICall(updatedCalls[index])
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
  const handleConfirmPlan = async () => {
    if (!selectedPlan || !user || !session.access_token) return;

  try {
    const response = await fetch(
      'https://pwmsnfpwipyejywyqbnv.supabase.co/functions/v1/create-subscription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`, // ensure you include user's token
        },
        body: JSON.stringify({
          userId: user.id,
          priceId: selectedPlan,
        }),
      }
    );

    if (!response.ok) throw new Error('Failed to create subscription');

    const { url } = await response.json();

    if (url) {
      window.location.href = url; // Redirect to Stripe Checkout
    } else {
      throw new Error('No redirect URL returned');
    }
  } catch (err) {
    console.error(err);
    toast({
      title: "Subscription Failed",
      description: "There was an error creating your subscription.",
      variant: "destructive",
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

  const handleSignOut = async () => {
    await signOut();
  };

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    setIsFirstTimeUser(false);
    localStorage.setItem('onboardingComplete', 'true');
    toast({
      title: "Setup Complete",
      description: "Welcome to Commitify! Your dashboard is ready."
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-commitify-background">
      {/* Warm radial gradient background */}
      <BackgroundGradient />
      
      {/* Header with logo */}
      <Header />
      
      {/* Conditional rendering based on first-time status */}
      {isFirstTimeUser ? (
        // Render the onboarding flow for first-time users
        <OnboardingFlow 
          user={user}
          session={session}
          agents={agents}
          onComplete={handleOnboardingComplete}
        />
      ) : (
        <>
          {/* Onboarding Call Dialog - only shown for returning users who haven't completed it */}
          <OnboardingCallDialog 
            isOpen={showOnboardingDialog} 
            setIsOpen={setShowOnboardingDialog} 
          />
          
          <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left Sidebar: Profile Card - Now fixed position on desktop */}
              <div className="md:col-span-1 relative">
                <div className="md:sticky md:top-24">
                  <ProfileCard 
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    updateProfileData={updateProfileData}
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
                      startTime={startTime}
                      endTime={endTime}
                      setStartTime={setStartTime}
                      setEndTime={setEndTime}
                      handleTimeSelect={handleTimeSelect}
                      scheduledCalls={scheduledCalls}
                      handleDeleteCall={handleDeleteCall}
                      handleLockInCall={handleLockInCall}
                    />
                  </div>
                  
                  {/* Additional Integrations */}
                  <div className="grid grid-cols-1 gap-6">
                    <IntegrationsCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
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

export default UserEnvironment
