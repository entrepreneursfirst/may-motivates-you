import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Clock, Phone, LogIn, User, UserPlus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import LoginDialog from './LoginDialog';
import SignupDialog from './SignupDialog';
import LoginHandler from './LoginHandler';
import { useAuth } from '@/context/AuthContext';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAttemptingLogin, setIsAttemptingLogin] = useState(false);
  const { user, signOut, isLoading } = useAuth();

  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  
  // Function to activate phone input in hero section - Now redirects to signup
  const activatePhoneInput = () => {
    if (user) {
      // If user is logged in, take them to their account
      navigate('/user-environment');
    } else {
      // Otherwise open the signup dialog
      setIsSignupOpen(true);
    }
  };
  
  // Function to handle login attempt
  const handleLogin = () => {
    setIsAttemptingLogin(true);
  };
  
  // Function to open signup dialog
  const handleSignup = () => {
    setIsSignupOpen(true);
  };
  
  // Handle successful login
  const handleLoginSuccess = () => {
    setIsAttemptingLogin(false);
    setIsLoginOpen(false);
  };
  
  // Handle failed login
  const handleLoginFailure = () => {
    setIsAttemptingLogin(false);
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
        <Link to="/" className="flex items-center">
          <span className="flex items-center gap-2 text-2xl font-bold">
            <span className="bg-commitify-yellow rounded-full p-1">
              <Clock className="w-5 h-5 text-commitify-text" />
            </span>
            <span>Commitify</span>
          </span>
        </Link>

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
            Get Started
          </Button>
          
          {user ? (
            <Button 
              onClick={() => navigate('/user-environment')}
              className="bg-commitify-background hover:bg-commitify-background/90 text-commitify-text border border-commitify-text rounded-full px-6 flex items-center gap-2"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
              Account
            </Button>
          ) : (
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleLogin}
                className="bg-commitify-background hover:bg-commitify-background/90 text-commitify-text border border-commitify-text rounded-full px-6 flex items-center gap-2"
                aria-label="Login"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Button>
              <Button 
                onClick={handleSignup}
                className="bg-commitify-blue hover:bg-commitify-blue/90 text-white rounded-full px-6 flex items-center gap-2"
                aria-label="Signup"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </div>
          )}
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
                Get Started
              </Button>

              {user ? (
                <Button 
                  onClick={() => navigate('/user-environment')}
                  className="bg-commitify-background hover:bg-commitify-background/90 text-commitify-text border border-commitify-text rounded-full w-full flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Account
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handleLogin}
                    className="bg-commitify-background hover:bg-commitify-background/90 text-commitify-text border border-commitify-text rounded-full w-full flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Log In
                  </Button>
                  <Button 
                    onClick={handleSignup}
                    className="bg-commitify-blue hover:bg-commitify-blue/90 text-white rounded-full w-full flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Login Dialog */}
        <LoginDialog isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
        
        {/* Signup Dialog */}
        <SignupDialog isOpen={isSignupOpen} setIsOpen={setIsSignupOpen} />
        
        {/* Login Handler (invisible component) */}
        {isAttemptingLogin && (
          <LoginHandler 
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
