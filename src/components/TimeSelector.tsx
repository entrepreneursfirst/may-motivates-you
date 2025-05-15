
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
  // Add a state to track which preset time is selected
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customTimeEntered, setCustomTimeEntered] = useState(false);

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
    // We don't call onTimeSelect here anymore
  };

  // Track custom time entry
  const handleCustomTimeChange = () => {
    setSelectedPreset(null);
    setCustomTimeEntered(true);
  };

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
          {/* Removed the button here since scheduling happens from the parent */}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {timePresets.map((preset) => (
              <Button 
                key={preset.label} 
                variant={selectedPreset === preset.time ? "default" : "outline"} 
                className={selectedPreset === preset.time ? "bg-accent text-accent-foreground" : ""}
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
                defaultValue="09:00"
                onChange={handleCustomTimeChange}
              />
              <Button 
                className={customTimeEntered ? "bg-accent text-accent-foreground" : ""} 
                variant={customTimeEntered ? "default" : "outline"}
                onClick={handleCustomTimeChange}
              >
                Set
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
