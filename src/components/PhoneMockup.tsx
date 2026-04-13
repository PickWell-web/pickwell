import React from 'react';
import { motion } from 'motion/react';

interface PhoneMockupProps {
  imageSrc: string;
}

export default function PhoneMockup({ imageSrc }: PhoneMockupProps) {
  return (
    <div className="relative group">
      {/* External Frame - Titanium look */}
      <div className="relative mx-auto border-pickwell-dark/90 bg-pickwell-dark/90 border-[8px] md:border-[10px] rounded-[3rem] md:rounded-[4rem] h-[580px] w-[280px] md:h-[680px] md:w-[330px] shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">

        {/* Main highlight reflection */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-20" />

        {/* Frame inner border/shine */}
        <div className="absolute inset-[1px] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] z-10 pointer-events-none" />

        {/* Screen Container */}
        <div className="relative h-full w-full bg-black overflow-hidden rounded-[2.2rem] md:rounded-[3.2rem]">
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 md:w-28 md:h-7 bg-black rounded-3xl z-40 flex items-center justify-end px-3">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] mr-1" />
          </div>

          {/* User Image Content */}
          <div className="h-full w-full relative">
            <img
              src={imageSrc}
              alt="Phone content"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Volume Buttons (Left) */}
        <div className="absolute -left-[10px] top-24 w-1 h-8 bg-pickwell-dark rounded-r-lg" />
        <div className="absolute -left-[10px] top-36 w-1 h-14 bg-pickwell-dark rounded-r-lg" />
        <div className="absolute -left-[10px] top-52 w-1 h-14 bg-pickwell-dark rounded-r-lg" />

        {/* Power Button (Right) */}
        <div className="absolute -right-[10px] top-40 w-1 h-20 bg-pickwell-dark rounded-l-lg" />
      </div>

      {/* Shadow layer underneath */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 blur-2xl rounded-full scale-x-125 z-0" />
    </div>
  );
}
