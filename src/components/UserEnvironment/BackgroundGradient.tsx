
import React, { useEffect, useState } from 'react';

const BackgroundGradient: React.FC = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  useEffect(() => {
    // Generate random position between 30-70% to keep gradient somewhat centered
    const randomX = Math.floor(Math.random() * 40) + 30;
    const randomY = Math.floor(Math.random() * 40) + 30;
    
    setPosition({ x: randomX, y: randomY });
  }, []);
  
  return (
    <div 
      className="fixed inset-0 -z-10 opacity-70 pointer-events-none"
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, 
                    #FCC01B 0%, 
                    #FFD870 30%, 
                    #FEF7CD 60%, 
                    rgba(254, 247, 205, 0.3) 80%, 
                    rgba(254, 247, 205, 0) 100%)`,
      }}
    />
  );
};

export default BackgroundGradient;
