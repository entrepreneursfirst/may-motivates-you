
import React, { useState } from 'react';
import { Clock, Info, Help, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Footer = () => {
  const [openDialog, setOpenDialog] = useState<'terms' | 'privacy' | null>(null);
  
  return (
    <footer className="bg-commitify-background py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <span className="flex items-center gap-2 text-xl font-bold">
                <span className="bg-commitify-yellow rounded-full p-1">
                  <Clock className="w-4 h-4 text-commitify-text" />
                </span>
                <span>Commitify</span>
              </span>
            </a>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center md:justify-end">
            <button
              onClick={() => setOpenDialog('terms')}
              className="text-commitify-secondary hover:text-commitify-blue transition-colors"
            >
              Terms
            </button>
            
            <button
              onClick={() => setOpenDialog('privacy')}
              className="text-commitify-secondary hover:text-commitify-blue transition-colors"
            >
              Privacy
            </button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="#" className="text-commitify-secondary hover:text-commitify-blue transition-colors flex items-center gap-1">
                    Contact
                    <Mail className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>help@commitify.com</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="#" className="text-commitify-secondary hover:text-commitify-blue transition-colors flex items-center gap-1">
                    Help
                    <Help className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>help@commitify.com</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center md:text-left">
          <p className="text-commitify-secondary text-sm">
            GDPR compliant. All data securely saved in the EU. © {new Date().getFullYear()} Commitify.
          </p>
        </div>
      </div>

      {/* Terms & Conditions Dialog */}
      <Dialog open={openDialog === 'terms'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Terms & Conditions</DialogTitle>
          </DialogHeader>
          <div className="text-sm space-y-4 mt-4">
            <p>Date: 14 May 2025</p>
            
            <p>Hi there! By using our app, website, or receiving AI-powered calls, you agree to the following terms and conditions. Please read them carefully.</p>
            
            <div className="space-y-2">
              <h3 className="font-bold">1. Use of Service</h3>
              <p>Our AI Call Agent is designed to support your productivity and motivation through automated calls and messages. By signing up, you consent to receive regular communications from our AI agents via phone, text, or app notifications.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">2. Not a Human or Professional Advisor</h3>
              <p>Our AI agents are powered by artificial intelligence and do not provide medical, legal, financial, or psychological advice. They're here to give encouragement—not make decisions for you.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">3. User Responsibilities</h3>
              <p>You agree not to use the service in any unlawful, abusive, or harmful manner. You are responsible for maintaining the confidentiality of your login credentials and ensuring your contact information is accurate.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">4. Privacy & Data</h3>
              <p>We are GDPR-compliant. Your data is securely stored within the EU.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">5. Cancellation</h3>
              <p>You may cancel or pause your subscription at any time. We reserve the right to suspend or terminate accounts that violate these terms.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">6. Changes to Terms</h3>
              <p>We may update these terms from time to time. Continued use of the service after changes are made means you accept the new terms.</p>
            </div>
            
            <p>By continuing to use the service, you acknowledge and agree to these terms.</p>
            
            <p>Questions? Please do not hesitate to reach us at help@commitify.com</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Dialog - Using the same format but with privacy content */}
      <Dialog open={openDialog === 'privacy'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="text-sm space-y-4 mt-4">
            <p>Date: 14 May 2025</p>
            <p>At Commitify, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information.</p>
            <p>For any privacy-related questions, please contact us at help@commitify.com</p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
