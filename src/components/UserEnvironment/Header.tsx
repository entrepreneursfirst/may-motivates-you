
import React from 'react';
import { ArrowLeft, Clock, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

const Header = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
    toast({
      title: "Success",
      description: "Logged out successfully",
      duration: 3000,
    });
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-commitify-background/70 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="flex items-center gap-2 text-2xl font-bold">
            <span className="bg-commitify-yellow rounded-full p-1">
              <Clock className="w-5 h-5 text-commitify-text" />
            </span>
            <span>Commitify</span>
          </span>
        </a>
        
        <div className="flex items-center gap-2">
          {/* Home button */}
          <Button variant="outline" onClick={() => navigate('/')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Button>
          
          {/* Logout button */}
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
