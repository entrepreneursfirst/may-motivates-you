
import React from 'react';

const BackgroundGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="w-[120vw] h-[120vh] absolute top-[-10vh] left-[-10vw] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, #FCC01B, #FFD870, #FEF7CD, rgba(254, 247, 205, 0.3), rgba(254, 247, 205, 0))',
          opacity: 0.7,
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

export default BackgroundGradient;
