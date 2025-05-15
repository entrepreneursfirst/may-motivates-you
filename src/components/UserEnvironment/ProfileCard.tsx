import React, { useState } from 'react';
import { CalendarIcon, Edit, Phone, UserRound, X, Check } from 'lucide-react';
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
  const { toast } = useToast();

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
