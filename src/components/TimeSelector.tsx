
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMemo } from "react";


interface TimeSelectorProps {
  onTimeSelect: (time: string | null, isRange: boolean, rangeStart?: string, rangeEnd?: string) => void;
  rangeMode: boolean;
  setRangeMode: (mode: boolean) => void;
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
}

export const TimeSelector = ({
  onTimeSelect,
  rangeMode,
  setRangeMode,
  startTime,
  endTime,
  setStartTime,
  setEndTime
}: TimeSelectorProps) => {
  // Common time preset options
  const timePresets = [
    { label: "Morning", time: "09:00" },
    { label: "Noon", time: "12:00" },
    { label: "Afternoon", time: "15:00" },
    { label: "Evening", time: "18:00" }
  ];

  const handleExactTimeSelect = (time: string) => {
    onTimeSelect(time, false);
  };

  const handleTimeRangeSelect = () => {
    onTimeSelect(null, true, startTime, endTime);
  };

  // Round current time to the next 15-minute interval
  const getRoundedTime = () => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const minutes = now.getMinutes();
    const rounded = Math.ceil(minutes / 15) * 15;
    if (rounded === 60) {
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
    } else {
      now.setMinutes(rounded);
    }

    return now.toTimeString().slice(0, 5); // "HH:MM"
  };

  const defaultTime = useMemo(() => getRoundedTime(), []);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={rangeMode}
          onCheckedChange={setRangeMode}
          id="time-range-mode"
        />
        <Label htmlFor="time-range-mode">
          Use time range (agent will call at a random time in range)
        </Label>
      </div>

      {rangeMode ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start time</Label>
              <Input 
                type="time" 
                id="start-time"
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End time</Label>
              <Input 
                type="time" 
                id="end-time"
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <Button className="w-full" onClick={handleTimeRangeSelect}>
            Schedule Random Time in Range
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {timePresets.map((preset) => (
              <Button 
                key={preset.label} 
                variant="outline" 
                onClick={() => handleExactTimeSelect(preset.time)}
              >
                {preset.label} ({preset.time})
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-time">Or select custom time</Label>
            <div className="flex space-x-2">
              <Input 
                type="time" 
                id="custom-time"
                className="flex-1"
                defaultValue={defaultTime}
              />
              <Button onClick={() => {
                const customTime = (document.getElementById('custom-time') as HTMLInputElement).value;
                handleExactTimeSelect(customTime);
              }}>
                Set
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
