import React from 'react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  onOpenPricing: () => void;
  onOpenAbout: () => void;
  onOpenProject: () => void;
}

const BrandLogo = () => (
  <div className="flex flex-col items-center leading-tight">
    <span className="font-serif text-xl md:text-2xl font-light tracking-tight text-text-primary">Foster Brand Development</span>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({ onOpenPricing, onOpenAbout, onOpenProject }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] backdrop-blur-nav border-b border-accent-blue/5">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Links */}
        <div className="hidden md:flex items-center gap-6 text-[12px] font-medium uppercase tracking-wider">
          <button onClick={onOpenPricing} className="hover:text-accent-blue transition-colors cursor-pointer">Process + Pricing</button>
          <button onClick={onOpenAbout} className="hover:text-accent-blue transition-colors cursor-pointer">About</button>
          <a href="#playground" className="hover:text-accent-blue transition-colors">Lab</a>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="#top" className="text-text-primary hover:opacity-80 transition-opacity">
            <BrandLogo />
          </a>
        </div>

        {/* Right: Availability + CTAs */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 text-[12px] font-medium">
            <span className="w-2 h-2 rounded-full bg-accent-green pulse-green" />
            <span className="text-text-secondary uppercase tracking-wider">3 spots open</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenProject}
              className="bg-accent-blue text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-accent-blue-dark hover:scale-[1.03] transition-all cursor-pointer"
            >
              Start a project
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
