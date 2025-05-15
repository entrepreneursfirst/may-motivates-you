
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TimeSelectorProps {
  onTimeSelect: (time: string | null, isRange: boolean, rangeStart?: string, rangeEnd?: string) => void;
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
}

export const TimeSelector = ({
  onTimeSelect,
  startTime,
  endTime,
  setStartTime,
  setEndTime
}: TimeSelectorProps) => {
  // Add a state to track which preset time is selected
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customTimeEntered, setCustomTimeEntered] = useState(false);
  const [customTime, setCustomTime] = useState("09:00");

  // Common time preset options
  const timePresets = [
    { label: "Morning", time: "09:00" },
    { label: "Noon", time: "12:00" },
    { label: "Afternoon", time: "15:00" },
    { label: "Evening", time: "18:00" }
  ];

  // Handle preset selection without triggering onTimeSelect immediately
  const handlePresetSelect = (time: string) => {
    setSelectedPreset(time);
    setCustomTimeEntered(false);
    setCustomTime(time);
  };

  // Track custom time entry
  const handleCustomTimeChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      setCustomTime(e.target.value);
    }
    setSelectedPreset(null);
    setCustomTimeEntered(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {timePresets.map((preset) => (
          <Button 
            key={preset.label} 
            variant={selectedPreset === preset.time ? "default" : "outline"} 
            className={selectedPreset === preset.time ? "bg-commitify-purple text-white" : ""}
            onClick={() => handlePresetSelect(preset.time)}
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
            value={customTime}
            onChange={(e) => handleCustomTimeChange(e)}
          />
          <Button 
            className={customTimeEntered ? "bg-commitify-purple text-white" : ""} 
            variant={customTimeEntered ? "default" : "outline"}
            onClick={() => handleCustomTimeChange()}
          >
            Set
          </Button>
        </div>
      </div>
    </div>
  );
};
