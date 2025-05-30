//callScheduleCard.tsx
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ScheduledCall } from "@/components/ScheduledCall";
import { TimeSelector } from "@/components/selectors/TimeSelector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useIsMobile } from '@/hooks/use-mobile';
import { convertToTimestamp } from "@/utils/dateConverter"


interface CallScheduleCardProps {
  selectedDate: Date | undefined;
  handleDateSelect: (date: Date | undefined) => void;
  showTimeSelector: boolean;
  startTime: string;
  endTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  handleTimeSelect: (time: string | null, isRange: boolean, rangeStart?: string, rangeEnd?: string) => void;
  scheduledCalls: Array<{
    date: Date;
    time: string | null;
    timeRange?: {
      start: string;
      end: string;
    } | null;
    talkingPoints?: string;
    locked?: boolean;
  }>;
  handleDeleteCall: (index: number) => void;
  handleLockInCall: (index: number) => void;
}

const CallScheduleCard: React.FC<CallScheduleCardProps> = ({
  selectedDate,
  handleDateSelect,
  showTimeSelector,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  handleTimeSelect,
  scheduledCalls,
  handleDeleteCall,
  handleLockInCall
}) => {
  const [talkingPoints, setTalkingPoints] = useState("");
  const isMobile = useIsMobile();
  
  const handleScheduleCall = () => {
    // Get the custom time input and AM/PM selection
    const timeInput = (document.getElementById('custom-time') as HTMLInputElement)?.value || "09:00";
    
    // Get the AM/PM value from the select element
    const amPmSelect = document.querySelector('[data-value]') as HTMLElement;
    const amPm = amPmSelect?.getAttribute('data-value') || "AM";
    
    // Convert time input to hours and minutes
    const [hours, minutes] = timeInput.split(':');
    const hoursNum = parseInt(hours, 10);
    
    // Format to 12-hour time with AM/PM
    const hours12 = hoursNum > 12 ? hoursNum - 12 : (hoursNum === 0 ? 12 : hoursNum);
    const fullTimeString = `${hours12}:${minutes} ${amPm}`;
    
    handleTimeSelect(fullTimeString, false);
    setTalkingPoints("");
  };
  
  return <Card>
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
        <div className={`grid ${showTimeSelector ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {/* Calendar for date selection */}
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-3">Select dates for calls</h4>
            <CalendarComponent mode="single" selected={selectedDate} onSelect={handleDateSelect} className={cn("mx-auto p-3 pointer-events-auto")} />
          </div>
          
          {/* Talking points and time selection when date is selected */}
          {showTimeSelector && <div className="space-y-6">
              {/* Talking Points Input */}
              <div className="border rounded-md p-4">
                <div className="space-y-3">
                  <Label htmlFor="talking-points">Enter topics you'd like to discuss during the call</Label>
                  <Textarea id="talking-points" placeholder="E.g. ask about how my exam went." value={talkingPoints} onChange={e => setTalkingPoints(e.target.value)} className="min-h-[100px]" />
                </div>
              </div>

              {/* Time Selection */}
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">
                  Select time for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "call"}
                </h4>
                <TimeSelector 
                  onTimeSelect={() => {}} // Empty function since we're now handling scheduling with the button
                  startTime={startTime} 
                  endTime={endTime} 
                  setStartTime={setStartTime} 
                  setEndTime={setEndTime}
                  className={isMobile ? "text-xs" : ""}
                />
              </div>

              {/* Schedule Button */}
              <Button className="w-full bg-primary hover:bg-commitify-yellow active:bg-commitify-purple" onClick={handleScheduleCall}>
                Schedule Call
              </Button>
            </div>}
        </div>
        
        {/* If no date selected, show message */}
        {!showTimeSelector && <div className="text-center p-4 text-muted-foreground">
            Select a date from the calendar to schedule a call
          </div>}
        
        {/* Scheduled calls list */}
        <div className="mt-6 border rounded-md p-4">
          <h4 className="font-medium mb-3">Scheduled calls</h4>
          <p className="text-muted-foreground text-sm mb-4">
            All scheduled calls are automatically sent to your AI agent.
          </p>
          {scheduledCalls.length === 0 ? <p className="text-muted-foreground text-center py-4">
              No calls scheduled yet. Select a date above to schedule a call.
            </p> : <div className="space-y-2">
              {scheduledCalls.map((call, index) => <ScheduledCall key={index} call={call} onDelete={() => handleDeleteCall(index)} />)}
            </div>}
        </div>
      </CardContent>
    </Card>;
};

export default CallScheduleCard;
