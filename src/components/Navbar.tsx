
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 transition-all duration-300 ${
      isScrolled ? "bg-white bg-opacity-90 shadow-md py-3" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold font-outfit">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">call</span>me<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">may.be</span>
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
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-700 hover:text-purple-500 transition-colors font-medium">
            How It Works
          </a>
          <a href="#voices" className="text-gray-700 hover:text-purple-500 transition-colors font-medium">
            Coach Voices
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-purple-500 transition-colors font-medium">
            Pricing
          </a>
          <a href="#faq" className="text-gray-700 hover:text-purple-500 transition-colors font-medium">
            FAQ
          </a>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all">
            Try It Free
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-500 transition-colors py-2 font-medium" onClick={toggleMenu}>
                How It Works
              </a>
              <a href="#voices" className="text-gray-700 hover:text-purple-500 transition-colors py-2 font-medium" onClick={toggleMenu}>
                Coach Voices
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-500 transition-colors py-2 font-medium" onClick={toggleMenu}>
                Pricing
              </a>
              <a href="#faq" className="text-gray-700 hover:text-purple-500 transition-colors py-2 font-medium" onClick={toggleMenu}>
                FAQ
              </a>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white w-full" onClick={toggleMenu}>
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
