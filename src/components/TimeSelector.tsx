
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
  const [customTime, setCustomTime] = useState("09:00 AM");

  // Format time to AM/PM format
  const formatTimeToAMPM = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hoursNum = parseInt(hours, 10);
    const period = hoursNum >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNum % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };
  
  // Convert AM/PM time to 24h format for internal use
  const convertTo24Hour = (time12h: string): string => {
    const [timePart, period] = time12h.split(' ');
    let [hours, minutes] = timePart.split(':');
    let hoursNum = parseInt(hours, 10);
    
    if (period === 'PM' && hoursNum < 12) hoursNum += 12;
    if (period === 'AM' && hoursNum === 12) hoursNum = 0;
    
    return `${hoursNum.toString().padStart(2, '0')}:${minutes}`;
  };

  // Common time preset options with AM/PM format
  const timePresets = [
    { label: "Morning", time: "09:00 AM" },
    { label: "Noon", time: "12:00 PM" },
    { label: "Afternoon", time: "03:00 PM" },
    { label: "Evening", time: "06:00 PM" }
  ];

  // Handle preset selection without triggering onTimeSelect immediately
  const handlePresetSelect = (time: string) => {
    setSelectedPreset(time);
    setCustomTimeEntered(false);
    setCustomTime(time);
  };

  // Track custom time entry
  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
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
            className={selectedPreset === preset.time ? "bg-commitify-purple text-white hover:bg-commitify-purple" : ""}
            onClick={() => handlePresetSelect(preset.time)}
          >
            {preset.label} ({preset.time})
          </Button>
        ))}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="custom-time">Or select custom time</Label>
        <Input 
          type="time" 
          id="custom-time"
          className={`flex-1 ${customTimeEntered ? "border-commitify-purple ring-1 ring-commitify-purple" : ""}`}
          value={customTime}
          onChange={handleCustomTimeChange}
        />
      </div>
    </div>
  );
};
