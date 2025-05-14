
import React from 'react';

const BackgroundGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div
        className="absolute w-[150vw] h-[150vw] top-[-25%] left-[-25%] rounded-full"
        style={{
          background: 'radial-gradient(circle, #F97316 0%, #FEC6A1 60%, #FEF7CD 100%)',
          opacity: 0.25,
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
};

export default BackgroundGradient;
