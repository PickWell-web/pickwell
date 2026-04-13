import React from 'react';
import { motion } from 'motion/react';

interface PhoneMockupProps { imageSrc: string; }

export default function PhoneMockup({ imageSrc }: PhoneMockupProps) {
  // Balanced aspect ratio: 1080 (width) / (1901 image + ~130 status bar and chin)
  return (
    <div className="relative group perspective-1000">
      {/* Physical Buttons (Saliências) */}
      <div className="absolute -left-[3px] top-28 w-[3px] h-8 bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a] rounded-l-md shadow-sm z-30" />
      <div className="absolute -left-[3px] top-40 w-[3px] h-14 bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a] rounded-l-md shadow-sm z-30" />
      <div className="absolute -left-[3px] top-56 w-[3px] h-14 bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a] rounded-l-md shadow-sm z-30" />
      <div className="absolute -right-[3px] top-44 w-[3px] h-20 bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a] rounded-r-md shadow-sm z-30" />

      {/* Main Body / Frame */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto w-[290px] md:w-[350px] aspect-[1080/2030] bg-[#0c0c0c] rounded-[3.5rem] md:rounded-[4.5rem] p-[8px] md:p-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[1px] border-white/20"
      >
        {/* Metallic Edge Shine */}
        <div className="absolute inset-0 rounded-[3.5rem] md:rounded-[4.5rem] border-[1px] border-white/10 z-10 pointer-events-none" />
        
        {/* Internal Screen Bezel */}
        <div className="relative h-full w-full bg-black rounded-[2.8rem] md:rounded-[3.8rem] overflow-hidden border-[2px] border-[#1a1a1a] flex flex-col">
          
          {/* Dedicated Status Bar Area (Fixed height) */}
          <div className="h-10 md:h-12 w-full bg-black flex items-center justify-center relative z-50 shrink-0">
             {/* Dynamic Island */}
             <div className="w-24 h-6 md:w-28 md:h-7 bg-black rounded-3xl flex items-center justify-end px-3 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
             </div>
          </div>

          {/* Screen Content Container - Fills remaining space */}
          <div className="relative flex-grow w-full overflow-hidden bg-white">
            <img 
              src={imageSrc} 
              alt="iPhone Screen Content" 
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            
            {/* Glossy Overlay/Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-40" />
          </div>

          {/* Bottom Navigation Indicator Area (Chin) */}
          <div className="h-6 w-full bg-white flex items-center justify-center relative shrink-0">
            <div className="w-20 h-1 bg-black/10 rounded-full" />
          </div>
        </div>

        {/* Outer Frame Glow/Titanium Look */}
        <div className="absolute -inset-[1px] rounded-[3.5rem] md:rounded-[4.5rem] bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none z-0" />
      </motion.div>

      {/* Realistic Shadow */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/30 blur-3xl rounded-full scale-x-110 z-0" />
    </div>
  );
}
