
import React from 'react';
import { format } from 'date-fns';
import { Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScheduledCallProps {
  call: {
    date: Date;
    time: string | null;
    timeRange?: { start: string; end: string } | null;
    talkingPoints?: string;
  };
  onDelete: () => void;
}

export const ScheduledCall = ({ call, onDelete }: ScheduledCallProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 text-primary rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <div>
          <p className="font-medium">{format(call.date, 'EEEE, MMMM d, yyyy')}</p>
          {call.time ? (
            <p className="text-sm text-muted-foreground">Exact time: {call.time}</p>
          ) : call.timeRange ? (
            <p className="text-sm text-muted-foreground">
              Random time between {call.timeRange.start} and {call.timeRange.end}
            </p>
          ) : null}
          
          {call.talkingPoints && (
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground mr-1">Text input</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-xs">
                      <p className="font-medium mb-1">Talking points:</p>
                      <p className="text-sm">{call.talkingPoints}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        size="icon" 
        variant="ghost" 
        className="text-muted-foreground hover:text-destructive"
        onClick={onDelete}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};
