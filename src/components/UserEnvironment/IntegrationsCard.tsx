
import React from 'react';
import { Calendar as CalendarIcon, FileText, Mail, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const IntegrationsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Additional Integrations
        </CardTitle>
        <CardDescription>
          Coming soon to enhance your experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border border-dashed rounded-lg flex items-center gap-3 opacity-60">
          <Mail className="w-5 h-5" />
          <div>
            <h4 className="font-medium">Email Integration</h4>
            <p className="text-sm text-muted-foreground">Connect your email for better tracking</p>
          </div>
          <span className="ml-auto text-xs bg-commitify-yellow/20 px-2 py-1 rounded">Coming Soon</span>
        </div>
        
        <div className="p-4 border border-dashed rounded-lg flex items-center gap-3 opacity-60">
          <CalendarIcon className="w-5 h-5" />
          <div>
            <h4 className="font-medium">Calendar Sync</h4>
            <p className="text-sm text-muted-foreground">Sync with your preferred calendar app</p>
          </div>
          <span className="ml-auto text-xs bg-commitify-yellow/20 px-2 py-1 rounded">Coming Soon</span>
        </div>
        
        <div className="p-4 border border-dashed rounded-lg flex items-center gap-3 opacity-60">
          <FileText className="w-5 h-5" />
          <div>
            <h4 className="font-medium">File Upload</h4>
            <p className="text-sm text-muted-foreground">Upload documents for your agent to analyze</p>
          </div>
          <span className="ml-auto text-xs bg-commitify-yellow/20 px-2 py-1 rounded">Coming Soon</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsCard;
