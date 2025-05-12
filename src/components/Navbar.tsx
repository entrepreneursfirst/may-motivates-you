
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold font-outfit text-dark">
            <span className="text-neon">call</span>me<span className="text-neon">may.be</span>
          </span>
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-dark focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#how-it-works" className="text-dark hover:text-neon transition-colors font-medium">
            How It Works
          </a>
          <a href="#voices" className="text-dark hover:text-neon transition-colors font-medium">
            Coach Voices
          </a>
          <a href="#pricing" className="text-dark hover:text-neon transition-colors font-medium">
            Pricing
          </a>
          <a href="#faq" className="text-dark hover:text-neon transition-colors font-medium">
            FAQ
          </a>
          <Button className="bg-neon hover:bg-neon-hover text-white">
            Try It Free
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              <a href="#how-it-works" className="text-dark hover:text-neon transition-colors py-2 font-medium" onClick={toggleMenu}>
                How It Works
              </a>
              <a href="#voices" className="text-dark hover:text-neon transition-colors py-2 font-medium" onClick={toggleMenu}>
                Coach Voices
              </a>
              <a href="#pricing" className="text-dark hover:text-neon transition-colors py-2 font-medium" onClick={toggleMenu}>
                Pricing
              </a>
              <a href="#faq" className="text-dark hover:text-neon transition-colors py-2 font-medium" onClick={toggleMenu}>
                FAQ
              </a>
              <Button className="bg-neon hover:bg-neon-hover text-white w-full" onClick={toggleMenu}>
                Try It Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
