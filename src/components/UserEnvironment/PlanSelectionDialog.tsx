
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Plan {
  name: string;
  emoji: string;
  description: string;
  price: string;
  period: string;
  color: string;
  billingNote?: string;
}

interface PlanSelectionDialogProps {
  showPlanDialog: boolean;
  setShowPlanDialog: React.Dispatch<React.SetStateAction<boolean>>;
  plans: Plan[];
  selectedPlan: string | null;
  handleSelectPlan: (planName: string) => void;
  handleConfirmPlan: () => void;
}

const PlanSelectionDialog: React.FC<PlanSelectionDialogProps> = ({
  showPlanDialog,
  setShowPlanDialog,
  plans,
  selectedPlan,
  handleSelectPlan,
  handleConfirmPlan
}) => {
  return (
    <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Subscription Plan</DialogTitle>
          <DialogDescription>
            Select a new subscription plan below
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          {plans.map(plan => (
            <button 
              key={plan.name} 
              className={`p-4 rounded-lg ${plan.color} flex items-center justify-between hover:opacity-90 transition-opacity ${selectedPlan === plan.name ? 'ring-2 ring-primary' : ''}`} 
              onClick={() => handleSelectPlan(plan.name)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{plan.emoji}</span>
                <div className="text-left">
                  <h4 className="font-medium">{plan.name}</h4>
                  <p className="text-xs">{plan.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{plan.price}</p>
                <p className="text-xs">{plan.period}</p>
                {plan.billingNote && <p className="text-xs opacity-70">{plan.billingNote}</p>}
              </div>
            </button>
          ))}
        </div>
        <DialogFooter className="flex justify-between items-center mt-4">
          <Button variant="outline" onClick={() => setShowPlanDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmPlan} disabled={!selectedPlan}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanSelectionDialog;
