
import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="flex items-center gap-2 text-2xl font-bold">
            <span className="bg-commitify-yellow rounded-full p-1">
              <Clock className="w-5 h-5 text-commitify-text" />
            </span>
            <span>Commitify</span>
          </span>
        </a>
        
        {/* Home button */}
        <Button variant="outline" onClick={() => navigate('/')} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Home
        </Button>
      </div>
    </header>
  );
};

export default Header;
