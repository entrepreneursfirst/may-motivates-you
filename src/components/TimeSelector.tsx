//timeSelector
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMemo } from "react";
import { useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSelectorProps {
  onTimeSelect: (time: string | null, isRange: boolean, rangeStart?: string, rangeEnd?: string) => void;
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  className?: string; // Added className as an optional prop
}

export const TimeSelector = ({
  onTimeSelect,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  className = "" // Default to empty string
}: TimeSelectorProps) => {
  // Add a state to track which preset time is selected
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customTimeEntered, setCustomTimeEntered] = useState(false);
  const [customTime, setCustomTime] = useState("09:00");
  const [amPm, setAmPm] = useState<"AM" | "PM">("AM");

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

  // Handle AM/PM selection change
  const handleAmPmChange = (value: string) => {
    console.log("value = ", value)
    setAmPm(value as "AM" | "PM");
    console.log(value as "AM" | "PM")
    setSelectedPreset(null);
    setCustomTimeEntered(true);
  };

  // Get full time string with AM/PM for custom time
  const getFullCustomTimeString = (): string => {
    // Convert 24h format from the input to 12h format with AM/PM
    const [hours, minutes] = customTime.split(':');
    const hoursNum = parseInt(hours, 10);
    const hours12 = hoursNum > 12 ? hoursNum - 12 : (hoursNum === 0 ? 12 : hoursNum);
    return `${hours12}:${minutes} ${amPm}`;
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

  useEffect ( () => {
    // defaultTime is expected in "HH:mm" (24-hour format)
    const [hourStr, minute] = defaultTime.split(":");
    const hour = parseInt(hourStr, 10);

    const isPM = hour >= 12;
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const timeFormatted = `${hour12.toString().padStart(2, "0")}:${minute}`;

    setCustomTime(timeFormatted); // e.g. "03:30"
    setAmPm(isPM ? "PM" : "AM");
  }, [])

  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-2">
        {timePresets.map((preset) => (
          <Button
            key={preset.label}
            variant={selectedPreset === preset.time ? "default" : "outline"}
            className={`
              ${selectedPreset === preset.time ? "bg-commitify-purple text-white hover:bg-commitify-purple" : ""}
              text-[12px] sm:text-sm truncate
            `}
            onClick={() => handlePresetSelect(preset.time)}
          >
            {preset.label} ({preset.time})
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-time">Or select custom time</Label>
        <div className="flex gap-2">
          <Input
            type="time"
            id="custom-time"
            className={`flex-1 ${customTimeEntered ? "border-commitify-purple ring-1 ring-commitify-purple" : ""}`}
            value={customTime}
            onChange={handleCustomTimeChange}
          />
          <Select value={amPm} onValueChange={handleAmPmChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="AM/PM" data-value={amPm}/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
