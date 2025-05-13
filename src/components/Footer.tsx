
import React from 'react';
import { Clock } from 'lucide-react';

const Footer = () => {
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
            <a href="#" className="text-commitify-secondary hover:text-commitify-blue transition-colors">
              Terms
            </a>
            <a href="#" className="text-commitify-secondary hover:text-commitify-blue transition-colors">
              Privacy
            </a>
            <a href="#" className="text-commitify-secondary hover:text-commitify-blue transition-colors">
              Contact
            </a>
            <a href="#" className="text-commitify-secondary hover:text-commitify-blue transition-colors">
              Help
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center md:text-left">
          <p className="text-commitify-secondary text-sm">
            GDPR compliant. All data securely saved in the EU. © {new Date().getFullYear()} Commitify.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
