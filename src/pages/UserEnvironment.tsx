import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Edit,
  File, 
  FileText,
  Mail, 
  MessageSquare, 
  Phone, 
  Settings, 
  UserRound,
  Trash2,
  X,
  Check,
  ArrowLeft,
  Bot
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScheduledCall } from "@/components/ScheduledCall";
import { TimeSelector } from "@/components/TimeSelector";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

// Import agents from the Agents component
const agents = [{
  id: 1,
  name: "Life Coach",
  image: "/lovable-uploads/84ad56f5-4ca3-4201-b391-1f382fb0bf6b.png",
  emoji: "🧍‍♀️",
  description: "Your personal growth guru who turns goals into daily wins with calm encouragement.",
  quote: "Let's break this into steps — and nail the first one today."
}, {
  id: 2,
  name: "Zen Master",
  image: "/lovable-uploads/758609d4-c1fe-450e-926b-5afdf6650e3d.png",
  emoji: "🧘",
  description: "The chill philosopher who reminds you to breathe, reflect, and stay centered.",
  quote: "The task exists. It waits for you. Are you ready?"
}, {
  id: 3,
  name: "Slay Bestie",
  image: "/lovable-uploads/735ccb5d-7d5c-4de9-b764-d99b6619a349.png",
  emoji: "💅",
  description: "The glitter-drenched voice that drags you out of bed and into your power.",
  quote: "Slay the day or stay in delay — your call, babe."
}, {
  id: 4,
  name: "Hype Beast",
  image: "/lovable-uploads/7275608e-a6b4-4f6e-a671-287e022c6cd4.png",
  emoji: "🏋️",
  description: "Pure energy in your ear yelling \"LET'S GOOOOOOOO\" until you move.",
  quote: "YOU GOT THIS! Time to level up your game!"
}, {
  id: 5,
  name: "Drill Sergeant",
  image: "/lovable-uploads/4d5b4382-c347-4c68-b807-b3d21cfef20c.png",
  emoji: "🎖️",
  description: "No excuses, no delays — just clear orders, structure, and discipline.",
  quote: "YOU SAID 10AM. IT'S 10:03. WHY AREN'T YOU MOVING?"
}, {
  id: 6,
  name: "CEO,000,000",
  image: "/lovable-uploads/5e0312df-3529-4495-ba95-2d12b3ce011e.png",
  emoji: "💼",
  description: "Laser-focused leadership who turns your chaos into calendar blocks and KPIs.",
  quote: "This task has no ROI unless you execute."
}];

// Get plans data from Pricing component
const plans = [
  {
    name: "Cold Call",
    emoji: "❄️",
    description: "Just dip your toes in",
    price: "$7.50",
    period: "one-time",
    color: "bg-[#1EAEDB]/20 text-[#1EAEDB]",
  },
  {
    name: "Acquaintance",
    emoji: "👋",
    description: "Perfect for getting started",
    price: "$3.75",
    period: "per week",
    color: "bg-commitify-blue/20 text-commitify-blue",
  },
  {
    name: "Bestie",
    emoji: "🫶",
    description: "Our most popular choice",
    price: "$5.00",
    period: "per week",
    color: "bg-commitify-yellow/20 text-commitify-text",
  },
  {
    name: "Ride or Die",
    emoji: "💯",
    description: "Maximum accountability",
    price: "$6.50",
    period: "per week",
    color: "bg-commitify-blue/20 text-commitify-blue",
  }
];

const UserEnvironment = () => {
  // Add navigate function for routing
  const navigate = useNavigate();
  
  // Toast notifications
  const { toast } = useToast();

  // State for editing profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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

  // State for active plan (mock data - in a real app this would come from an API)
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
    timeRange?: { start: string; end: string } | null;
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
          timeRange: { start: rangeStart, end: rangeEnd }
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
      description: "Your call has been added to the schedule.",
    });
  };

  // Handle call deletion
  const handleDeleteCall = (index: number) => {
    const updatedCalls = [...scheduledCalls];
    updatedCalls.splice(index, 1);
    setScheduledCalls(updatedCalls);
    
    toast({
      title: "Call removed",
      description: "The call has been removed from your schedule.",
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
        description: `Your subscription has been updated to ${selectedPlan}.`,
      });
    }
  };

  // Handle cancel subscription
  const handleCancelSubscription = () => {
    toast({
      title: "Cancel subscription",
      description: "Are you sure you want to cancel your subscription?",
      action: (
        <Button variant="destructive" size="sm" onClick={() => 
          toast({
            title: "Subscription canceled",
            description: "Your subscription has been canceled.",
          })
        }>
          Confirm
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-commitify-background to-commitify-background/90">
      {/* Header with logo */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <span className="flex items-center gap-2 text-2xl font-bold">
              <span className="bg-commitify-yellow rounded-full p-1">
                <Clock className="w-5 h-5 text-commitify-text" />
              </span>
              <span>Commitify</span>
            </span>
          </a>
          
          {/* Back to landing page button */}
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Your Commitify Environment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar: Profile Card - Now sticky positioned */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserRound className="w-5 h-5 text-commitify-text" />
                  <div>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Name</Label>
                    {isEditingProfile ? (
                      <Input 
                        value={userProfile.name} 
                        onChange={e => setUserProfile({...userProfile, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-base">{userProfile.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    {isEditingProfile ? (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <Input 
                          value={userProfile.phone} 
                          onChange={e => setUserProfile({...userProfile, phone: e.target.value})}
                        />
                      </div>
                    ) : (
                      <p className="text-base flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {userProfile.phone}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Location</Label>
                    {isEditingProfile ? (
                      <Input 
                        value={userProfile.location} 
                        onChange={e => setUserProfile({...userProfile, location: e.target.value})}
                      />
                    ) : (
                      <p className="text-base">{userProfile.location}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Gender</Label>
                    {isEditingProfile ? (
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={userProfile.gender}
                        onChange={e => setUserProfile({...userProfile, gender: e.target.value})}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <p className="text-base">{userProfile.gender}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Birth Date</Label>
                    {isEditingProfile ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !userProfile.birthdate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {userProfile.birthdate ? format(userProfile.birthdate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={userProfile.birthdate}
                            onSelect={(date) => date && setUserProfile({...userProfile, birthdate: date})}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <p className="text-base">
                        {userProfile.birthdate ? format(userProfile.birthdate, "PPP") : "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
                
                {isEditingProfile && (
                  <Button
                    onClick={() => setIsEditingProfile(false)}
                    className="w-full"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                )}
                
                {/* Subscription Plan Section */}
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <h3 className="font-medium mb-2">Current Subscription</h3>
                    <div className={`p-3 rounded-lg ${activePlanDetails.color} flex items-center`}>
                      <span className="text-xl mr-2">{activePlanDetails.emoji}</span>
                      <div>
                        <p className="font-medium">{activePlanDetails.name}</p>
                        <p className="text-xs">{activePlanDetails.price} {activePlanDetails.period}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={handleChangeSubscription}
                      variant="outline"
                      className="w-full"
                    >
                      Change Plan
                    </Button>
                    <Button 
                      onClick={handleCancelSubscription}
                      variant="ghost" 
                      className="w-full text-muted-foreground hover:text-destructive"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-8">
            {/* Active Agent Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-commitify-text" />
                  <div>
                    <CardTitle>Your Active Agent</CardTitle>
                    <CardDescription>Manage your active agent and preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-r from-[#FFC371] via-[#FFAA5B] to-[#FDE365] rounded-lg text-commitify-text mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-full bg-white p-1 overflow-hidden flex-shrink-0">
                      <img 
                        src={activeAgent.image} 
                        alt={activeAgent.name} 
                        className="w-full h-full object-cover object-top rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{activeAgent.emoji}</span>
                        <h3 className="font-bold text-xl">{activeAgent.name}</h3>
                      </div>
                      <p className="text-sm mb-3">{activeAgent.description}</p>
                      <div className="bg-white/40 backdrop-blur-sm p-3 rounded-lg italic text-sm">
                        "{activeAgent.quote}"
                      </div>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-medium mb-3">Select a different agent</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {agents.map(agent => (
                    <button
                      key={agent.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        agent.id === activeAgentId 
                          ? "border-commitify-yellow bg-commitify-yellow/10" 
                          : "border-transparent hover:border-commitify-yellow/50"
                      }`}
                      onClick={() => setActiveAgentId(agent.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{agent.emoji}</span>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Data Input & Preferences Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Data Input & Preferences</h2>
              
              {/* First row - Call Schedule (3 columns wide) */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Call Schedule
                    </CardTitle>
                    <CardDescription>
                      Schedule when your agent should call you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Calendar for date selection */}
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-3">Select dates for calls</h4>
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          className={cn("mx-auto p-3 pointer-events-auto")}
                        />
                      </div>
                      
                      {/* Time selection when date is selected */}
                      <div className="border rounded-md p-4">
                        {showTimeSelector ? (
                          <>
                            <h4 className="font-medium mb-3">
                              Select time for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "call"}
                            </h4>
                            <TimeSelector
                              onTimeSelect={handleTimeSelect}
                              rangeMode={timeRangeMode}
                              setRangeMode={setTimeRangeMode}
                              startTime={startTime}
                              endTime={endTime}
                              setStartTime={setStartTime}
                              setEndTime={setEndTime}
                            />
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground text-center">
                              Select a date from the calendar to schedule a call
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Scheduled calls list */}
                    <div className="mt-6 border rounded-md p-4">
                      <h4 className="font-medium mb-3">Scheduled calls</h4>
                      {scheduledCalls.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                          No calls scheduled yet. Select a date above to schedule a call.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {scheduledCalls.map((call, index) => (
                            <ScheduledCall 
                              key={index}
                              call={call}
                              onDelete={() => handleDeleteCall(index)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Second row - Natural Language Input */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Natural Language Input
                    </CardTitle>
                    <CardDescription>
                      Tell your agent what to track in your own words
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="E.g., I want to track my workout progress, remind me to exercise 3 times a week..."
                      className="min-h-[150px]"
                    />
                    <Button className="w-full mt-4">
                      Submit to Agent
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Third row - Future Features */}
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Additional Integrations
                    </CardTitle>
                    <CardDescription>
                      Coming soon to enhance your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-dashed rounded-lg flex items-center gap-3 opacity-60">
                      <Mail className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium">Email Integration</h4>
                        <p className="text-sm text-muted-foreground">Connect your email for better tracking</p>
                      </div>
                      <span className="ml-auto text-xs bg-commitify-yellow/20 px-2 py-1 rounded">Coming Soon</span>
                    </div>
                    
                    <div className="p-4 border border-dashed rounded-lg flex items-center gap-3 opacity-60">
                      <CalendarIcon className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium">Calendar Sync</h4>
                        <p className="text-sm text-muted-foreground">Sync with your preferred calendar app</p>
                      </div>
                      <span className="ml-auto text-xs bg-commitify-yellow/20 px-2 py-1 rounded">Coming Soon</span>
                    </div>
                    
                    <div className="p-4 border border-dashed rounded-lg flex items-center gap-3 opacity-60">
                      <FileText className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium">File Upload</h4>
                        <p className="text-sm text-muted-foreground">Upload documents for your agent to analyze</p>
                      </div>
                      <span className="ml-auto text-xs bg-commitify-yellow/20 px-2 py-1 rounded">Coming Soon</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the Footer component */}
      <Footer />
      
      {/* Subscription Plan Selection Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              Select a new subscription plan below
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            {plans.map(plan => (
              <button
                key={plan.name}
                className={`p-4 rounded-lg ${plan.color} flex items-center justify-between hover:opacity-90 transition-opacity ${
                  selectedPlan === plan.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectPlan(plan.name)}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{plan.emoji}</span>
                  <div className="text-left">
                    <h4 className="font-medium">{plan.name}</h4>
                    <p className="text-xs">{plan.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{plan.price}</p>
                  <p className="text-xs">{plan.period}</p>
                </div>
              </button>
            ))}
          </div>
          <DialogFooter className="flex justify-between items-center mt-4">
            <Button variant="outline" onClick={() => setShowPlanDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmPlan} 
              disabled={!selectedPlan}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserEnvironment;
