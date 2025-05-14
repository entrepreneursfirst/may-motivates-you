
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ScheduledCall } from "@/components/ScheduledCall";
import { TimeSelector } from "@/components/TimeSelector";

interface CallScheduleCardProps {
  selectedDate: Date | undefined;
  handleDateSelect: (date: Date | undefined) => void;
  showTimeSelector: boolean;
  timeRangeMode: boolean;
  setTimeRangeMode: React.Dispatch<React.SetStateAction<boolean>>;
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
  }>;
  handleDeleteCall: (index: number) => void;
}

const CallScheduleCard: React.FC<CallScheduleCardProps> = ({
  selectedDate,
  handleDateSelect,
  showTimeSelector,
  timeRangeMode,
  setTimeRangeMode,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  handleTimeSelect,
  scheduledCalls,
  handleDeleteCall
}) => {
  return (
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
                <ScheduledCall key={index} call={call} onDelete={() => handleDeleteCall(index)} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CallScheduleCard;
