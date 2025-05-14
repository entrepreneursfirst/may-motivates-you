
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { XCircle } from "lucide-react";

interface CancelSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmCancel: (feedback?: string) => void;
}

const CancelSubscriptionDialog: React.FC<CancelSubscriptionDialogProps> = ({
  open,
  onOpenChange,
  onConfirmCancel
}) => {
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = () => {
    onConfirmCancel(feedback);
    setFeedback(""); // Reset feedback after submission
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 bg-red-100 text-red-600 p-3 rounded-full">
            <XCircle size={24} />
          </div>
          <AlertDialogTitle className="text-center text-xl">We're sorry to see you go</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your feedback helps us improve our service for everyone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <Textarea
            placeholder="Is there anything we could have done better? (optional)"
            className="min-h-[100px] resize-none"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            You can also reach us at <a href="mailto:help@commitify.me" className="text-primary underline">help@commitify.me</a> with any questions.
          </p>
        </div>
        
        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="sm:mt-0">
              Keep my subscription
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleSubmit}>
              Cancel subscription
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelSubscriptionDialog;
