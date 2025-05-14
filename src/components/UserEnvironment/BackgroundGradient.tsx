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
      className="fixed inset-0 -z-10 opacity-40 pointer-events-none"
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, 
                    #FDE1D3 0%, 
                    #FFDEE2 25%, 
                    #E5DEFF 50%, 
                    rgba(229, 222, 255, 0.3) 75%, 
                    rgba(229, 222, 255, 0) 100%)`,
      }}
    />
  );
};

export default BackgroundGradient;
