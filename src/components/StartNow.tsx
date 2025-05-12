
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const StartNow = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goalType: '',
    frequency: '',
    voice: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit the form data
    
    toast({
      title: "Success!",
      description: "Your AI Coach is ready to call you soon!",
    });
  };
  
  return (
    <section id="start-now" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center font-outfit mb-4">
          Start <span className="text-neon">Now</span>
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16">
          Get your personal AI coach in just three simple steps
        </p>
        
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goalType">What's your goal?</Label>
              <Select onValueChange={(value) => handleSelectChange('goalType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work projects</SelectItem>
                  <SelectItem value="study">Study & Learning</SelectItem>
                  <SelectItem value="fitness">Fitness & Health</SelectItem>
                  <SelectItem value="personal">Personal projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="frequency">Call frequency</Label>
              <Select onValueChange={(value) => handleSelectChange('frequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How often should we call?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="3x-week">3 times per week</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voice">Coach voice</Label>
              <Select onValueChange={(value) => handleSelectChange('voice', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your coach voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drill-sergeant">💪 Drill Sergeant</SelectItem>
                  <SelectItem value="zen-master">🧘 Chill Zen Master</SelectItem>
                  <SelectItem value="sass-queen">💅 Sass Queen</SelectItem>
                  <SelectItem value="own-voice">🧠 Your Own Voice (Premium)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full bg-neon hover:bg-neon-hover text-white">
              Schedule My First Call
            </Button>
            
            <p className="text-xs text-center text-gray-500">
              By clicking, you agree to our Terms of Service & Privacy Policy.
              <br />First call is always free.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StartNow;
