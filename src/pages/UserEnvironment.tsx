
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  File, 
  FileText,
  Mail, 
  MessageSquare, 
  Phone, 
  Settings, 
  UserRound 
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

const UserEnvironment = () => {
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
  
  // State for call schedule
  const [callSchedule, setCallSchedule] = useState({
    frequency: "weekly",
    time: "09:00",
    day: "Monday",
    date: new Date()
  });
  
  // State for natural language input
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");

  // Get active agent
  const activeAgent = agents.find(agent => agent.id === activeAgentId) || agents[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-commitify-background to-commitify-background/90 pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Commitify Environment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar: Profile Card - Now fixed positioning */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Name</Label>
                    <div className="flex">
                      <Input 
                        value={userProfile.name} 
                        onChange={e => setUserProfile({...userProfile, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <Input 
                        value={userProfile.phone} 
                        onChange={e => setUserProfile({...userProfile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Location</Label>
                    <Input 
                      value={userProfile.location} 
                      onChange={e => setUserProfile({...userProfile, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Gender</Label>
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
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Birth Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !userProfile.birthdate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {userProfile.birthdate ? format(userProfile.birthdate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={userProfile.birthdate}
                          onSelect={(date) => date && setUserProfile({...userProfile, birthdate: date})}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-8">
            {/* Active Agent Section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Active Agent</CardTitle>
                <CardDescription>Manage your active agent and preferences</CardDescription>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Natural Language Input */}
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
                      value={naturalLanguageInput}
                      onChange={(e) => setNaturalLanguageInput(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Submit to Agent
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Call Frequency and Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Call Frequency & Schedule
                    </CardTitle>
                    <CardDescription>
                      Set how often your agent should call you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={callSchedule.frequency}
                        onChange={e => setCallSchedule({...callSchedule, frequency: e.target.value})}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    {callSchedule.frequency === "weekly" || callSchedule.frequency === "biweekly" && (
                      <div className="space-y-2">
                        <Label>Day of week</Label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={callSchedule.day}
                          onChange={e => setCallSchedule({...callSchedule, day: e.target.value})}
                        >
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label>Preferred time</Label>
                      <Input 
                        type="time" 
                        value={callSchedule.time}
                        onChange={e => setCallSchedule({...callSchedule, time: e.target.value})}
                      />
                    </div>
                    
                    {callSchedule.frequency === "monthly" && (
                      <div className="space-y-2">
                        <Label>Date of month</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !callSchedule.date && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {callSchedule.date ? format(callSchedule.date, "do 'of each month'") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={callSchedule.date}
                              onSelect={(date) => date && setCallSchedule({...callSchedule, date: date})}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Save Schedule
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Upcoming Integrations */}
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
                      <Calendar className="w-5 h-5" />
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
    </div>
  );
};

export default UserEnvironment;
