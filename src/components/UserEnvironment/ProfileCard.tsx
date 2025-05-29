import React, { useState, useEffect } from 'react';
import { CalendarIcon, Edit, Phone, UserRound, X, Check, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import CancelSubscriptionDialog from './CancelSubscriptionDialog';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  userProfile: {
    full_name: string;
    phone: string;
    location: string;
    gender: string;
    birth_date: Date;
    balance: number
  };
  setUserProfile: React.Dispatch<React.SetStateAction<{
    full_name: string;
    phone: string;
    location: string;
    gender: string;
    birth_date: Date;
  }>>;
  updateProfileData: (profile: {
    full_name: string;
    location: string;
    gender: string;
    birth_date: Date;
  }) => Promise<void>;
  activePlan: string;
  activePlanDetails: {
    name: string;
    emoji: string;
    price: string;
    period: string;
    color: string;
  };
  handleChangeSubscription: () => void;
  handleCancelSubscription: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  userProfile,
  setUserProfile,
  activePlan,
  updateProfileData,
  activePlanDetails,
  handleChangeSubscription,
  handleCancelSubscription,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [highlightAgentCall, setHighlightAgentCall] = useState(false);
  const { toast } = useToast();
  
  // Agent contact information
  const agentPhoneNumber = "+1 (315) 325-8101";
  const agentPhoneNumberRaw = "+13153258101";

  // Check if user was redirected here from onboarding for verification call
  useEffect(() => {
    const needsVerificationCall = new URLSearchParams(window.location.search).get('verify');
    if (needsVerificationCall === 'true') {
      setHighlightAgentCall(true);
      // Remove the highlight after 10 seconds
      setTimeout(() => setHighlightAgentCall(false), 10000);
    }
  }, []);

  const handleConfirmCancel = (feedback?: string) => {
    setShowCancelDialog(false);
    handleCancelSubscription();
    
    // Display a message about the feedback if provided
    if (feedback && feedback.trim()) {
      toast({
        title: "Thank you for your feedback",
        description: "We appreciate you taking the time to share your thoughts."
      });
    }
  };
  
  const handleCallAgent = () => {
    toast({
      title: "Calling Agent",
      description: "Connecting you to your personal agent."
    });
    // The actual call will be initiated by the browser through the href link
  };

  return (
    <Card className="z-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="w-5 h-5 text-commitify-text" />
            Your Profile
          </CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsEditingProfile(!isEditingProfile)}>
          {isEditingProfile ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">                
        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Name</Label>
            {isEditingProfile ? <Input value={userProfile.full_name} onChange={e => setUserProfile({
            ...userProfile,
            full_name: e.target.value
          })} /> : <p className="text-base">{userProfile.full_name}</p>}
          </div>
          
          <div className="space-y-1">
            <Label>Phone</Label>
            {isEditingProfile ? <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" /> 
                <Input value={userProfile.phone} disabled onChange={e => setUserProfile({
                  ...userProfile,
                  phone: e.target.value
                })} />
              </div> : <p className="text-base flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                {userProfile.phone}
              </p>}
          </div>
          
          <div className="space-y-1">
            <Label>Location</Label>
            {isEditingProfile ? <Input value={userProfile.location} onChange={e => setUserProfile({
            ...userProfile,
            location: e.target.value
          })} /> : <p className="text-base">{userProfile.location}</p>}
          </div>
          
          <div className="space-y-1">
            <Label>Gender</Label>
            {isEditingProfile ? <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={userProfile.gender} onChange={e => setUserProfile({
            ...userProfile,
            gender: e.target.value
          })}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select> : <p className="text-base">{userProfile.gender}</p>}
          </div>
          
          <div className="space-y-1">
            <Label>Birth Date</Label>
            {isEditingProfile ? <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !userProfile.birth_date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {userProfile.birth_date ? format(userProfile.birth_date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={userProfile.birth_date} onSelect={date => date && setUserProfile({
                ...userProfile,
                birth_date: date
              })} initialFocus className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover> : <p className="text-base">
                {userProfile.birth_date ? format(userProfile.birth_date, "PPP") : "Not provided"}
              </p>}
          </div>
        </div>
        
        {isEditingProfile && <Button  onClick={async () => {
                                await updateProfileData(userProfile);
                                setIsEditingProfile(false);
                              }} className="w-full">
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>}
        
        {/* Contact Agent Section */}
        <div className="space-y-3 border-t pt-4">
          <div>
            <h3 className="font-medium mb-2">Contact Your Agent</h3>
            <p className="text-sm text-gray-500 mb-3">
              Need assistance with setup or have questions about your account? Call your personal agent directly.
            </p>
            
            <div className="flex flex-col space-y-3">
              <div className="p-3 rounded-lg bg-commitify-blue/10 flex items-center">
                <Phone className="w-5 h-5 mr-3 text-commitify-blue" />
                <div>
                  <p className="font-medium">{agentPhoneNumber}</p>
                  <p className="text-xs text-gray-500">Your Onboarding Agent, 24/7 available</p>
                </div>
              </div>
              
              {highlightAgentCall ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0.9 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(255, 203, 70, 0.7)",
                      "0 0 0 10px rgba(255, 203, 70, 0)",
                      "0 0 0 0 rgba(255, 203, 70, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <a 
                    href={`tel:${agentPhoneNumberRaw}`}
                    onClick={handleCallAgent}
                    className="inline-flex items-center justify-center gap-2 w-full bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text px-4 py-3 rounded-md font-medium transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call Agent Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </motion.div>
              ) : (
                <a 
                  href={`tel:${agentPhoneNumberRaw}`}
                  onClick={handleCallAgent}
                  className="inline-flex items-center justify-center gap-2 w-full bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text px-4 py-2 rounded-md font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Agent Now
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Subscription Plan Section */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <h3 className="font-medium mb-2">Current Subscription</h3>
            <p className="font-medium mb-2">Balance: {userProfile.balance}</p>

            {activePlan ? (
      <div className={`p-3 rounded-lg ${activePlanDetails.color} flex items-center`}>
        <span className="text-xl mr-2">{activePlanDetails.emoji}</span>
        <div>
          <p className="font-medium">{activePlanDetails.name}</p>
          <p className="text-xs">{activePlanDetails.price} {activePlanDetails.period}</p>
        </div>
      </div>
    ) : (
      <div className="p-3 rounded-lg bg-muted text-muted-foreground flex items-center">
        <span className="text-xl mr-2">📭</span>
        <div>
          <p className="font-medium">No Subscription</p>
          <p className="text-xs">Select a plan to get started</p>
        </div>
      </div>
    )}
  </div>
          
          <div className="flex flex-col space-y-2">
            {activePlan ? (
              <>
                <Button onClick={handleChangeSubscription} variant="outline" className="w-full">
                  Change Plan
                </Button>
                <Button
                  onClick={() => setShowCancelDialog(true)}
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-destructive"
                >
                  Cancel Subscription
                </Button>
              </>
            ) : (
              <Button onClick={handleChangeSubscription} className="w-full">
                Choose Plan
              </Button>
            )}
          </div>
        </div>

        {/* Cancel Subscription Dialog */}
        <CancelSubscriptionDialog 
          open={showCancelDialog}
          onOpenChange={setShowCancelDialog}
          onConfirmCancel={handleConfirmCancel}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
