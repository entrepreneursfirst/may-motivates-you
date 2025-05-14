
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const NaturalLanguageCard = () => {
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
        <Textarea placeholder="E.g., I want to track my workout progress, remind me to exercise 3 times a week..." className="min-h-[150px]" />
        <Button className="w-full mt-4">
          Submit to Agent
        </Button>
      </CardContent>
    </Card>
  );
};

export default NaturalLanguageCard;
