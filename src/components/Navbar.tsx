import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  onOpenPricing: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPricing, onOpenAbout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] backdrop-blur-nav border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Links */}
        <div className="flex items-center gap-6 text-[12px] font-medium uppercase tracking-wider">
          <button onClick={onOpenPricing} className="hover:opacity-60 transition-opacity cursor-pointer">Process + Pricing</button>
          <button onClick={onOpenAbout} className="hover:opacity-60 transition-opacity cursor-pointer">About</button>
          <a href="#playground" className="hover:opacity-60 transition-opacity">Playground</a>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center leading-tight">
          <span className="font-serif text-xl md:text-2xl font-light">Bajgart Design</span>
          <br />
          <span className="font-serif text-xl md:text-2xl font-light">Office</span>
        </div>

        {/* Right: Availability + CTAs */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-[12px] font-medium">
            <span className="w-2 h-2 rounded-full bg-accent-green pulse-green" />
            <span className="text-text-secondary uppercase tracking-wider">2 spots available Apr'26</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://tally.so/r/mYLJW0" 
              target="_blank" 
              className="bg-black text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:scale-[1.03] transition-transform"
            >
              Let's begin
            </a>
            <a 
              href="https://cal.com/bajgart-office/20min" 
              target="_blank" 
              className="hidden md:block border border-btn-secondary-border px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-zinc-50 transition-colors"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
