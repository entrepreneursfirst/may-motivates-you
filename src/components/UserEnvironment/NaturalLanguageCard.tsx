
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const NaturalLanguageCard = () => {
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSave = () => {
    // Save functionality can be expanded later
    toast({
      title: "Input saved",
      description: "Your natural language input has been saved."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Natural Language Input
        </CardTitle>
        <CardDescription>
          Tell your agent what to track in your own words
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          placeholder="E.g., I want to track my workout progress, remind me to exercise 3 times a week..." 
          className="min-h-[150px]"
          value={inputText}
          onChange={handleInputChange}
        />
        <Button className="w-full mt-4" onClick={handleSave}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default NaturalLanguageCard;
