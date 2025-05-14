
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Clock, Phone, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginDialog from './LoginDialog';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  
  // Function to activate phone input in hero section
  const activatePhoneInput = () => {
    scrollToSection('hero');
    // Dispatch custom event to activate phone input
    window.dispatchEvent(new CustomEvent('activatePhoneInput'));
  };
  
  // Function to open login dialog
  const openLoginDialog = () => {
    setIsLoginOpen(true);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-commitify-background bg-opacity-95 shadow-md py-3" : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="flex items-center gap-2 text-2xl font-bold">
            <span className="bg-commitify-yellow rounded-full p-1">
              <Clock className="w-5 h-5 text-commitify-text" />
            </span>
            <span>Commitify</span>
          </span>
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-commitify-text focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => scrollToSection('hero')} className="text-commitify-text hover:text-commitify-blue transition-colors font-medium">
            Home
          </button>
          <button onClick={() => scrollToSection('agents')} className="text-commitify-text hover:text-commitify-blue transition-colors font-medium">
            Agents
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-commitify-text hover:text-commitify-blue transition-colors font-medium">
            How It Works
          </button>
          <button onClick={() => scrollToSection('why')} className="text-commitify-text hover:text-commitify-blue transition-colors font-medium">
            Why
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-commitify-text hover:text-commitify-blue transition-colors font-medium">
            Pricing
          </button>
          <Button 
            onClick={activatePhoneInput}
            className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-semibold rounded-full px-6 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Get a Call
          </Button>
          <Button 
            onClick={openLoginDialog}
            className="bg-commitify-background hover:bg-commitify-background/90 text-commitify-text border border-commitify-text rounded-full px-6 flex items-center gap-2"
            aria-label="Login"
          >
            <LogIn className="w-4 h-4" />
            Log In
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-commitify-background shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button onClick={() => scrollToSection('hero')} className="text-commitify-text hover:text-commitify-blue transition-colors py-2 font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('agents')} className="text-commitify-text hover:text-commitify-blue transition-colors py-2 font-medium">
                Agents
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-commitify-text hover:text-commitify-blue transition-colors py-2 font-medium">
                How It Works
              </button>
              <button onClick={() => scrollToSection('why')} className="text-commitify-text hover:text-commitify-blue transition-colors py-2 font-medium">
                Why
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-commitify-text hover:text-commitify-blue transition-colors py-2 font-medium">
                Pricing
              </button>
              <Button 
                onClick={activatePhoneInput}
                className="bg-commitify-yellow hover:bg-commitify-yellow/90 text-commitify-text font-semibold rounded-full w-full flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Get a Call
              </Button>
              <Button 
                onClick={openLoginDialog}
                className="bg-commitify-background hover:bg-commitify-background/90 text-commitify-text border border-commitify-text rounded-full w-full flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Button>
            </div>
          </div>
        )}
        
        {/* Login Dialog */}
        <LoginDialog isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
