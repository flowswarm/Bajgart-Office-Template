import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { Modal } from './components/Modal';
import { PROJECTS, PLAYGROUND_ITEMS } from './data';
import { ArrowUp, Plus } from 'lucide-react';

export default function App() {
  const [isPricingOpen, setIsPricingOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      <Navbar 
        onOpenPricing={() => setIsPricingOpen(true)} 
        onOpenAbout={() => setIsAboutOpen(true)} 
      />

      <main className="max-w-[1400px] mx-auto px-6 pt-40 pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center mb-40">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-[100px] leading-[1.1] max-w-5xl mb-12"
          >
            Your shortcut to a brand that connects meaning with <span className="italic">feeling.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-text-secondary text-sm uppercase tracking-[0.2em] mb-12"
          >
            for early stage tech startups that need direction and identity
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3">
            {['Fintech', 'Ed/Fun Tech', 'Tools', 'AI', 'Health', 'Communities'].map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="px-5 py-2 border border-btn-secondary-border rounded-full text-[12px] uppercase tracking-wider"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="mb-60">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-5xl md:text-7xl leading-tight mb-12">
                Brand ready in <span className="italic">two weeks</span> or continuously loved.
              </h2>
              <div className="space-y-8 text-lg text-text-secondary">
                <p>For founders and startups who want high-quality design delivered fast.</p>
                <p>A brand that will make you understandable, trustworthy and memorable at a fraction of agency cost.</p>
                <button 
                  onClick={() => setIsPricingOpen(true)}
                  className="text-link-color underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Process + Pricing
                </button>
                <div className="pt-8 space-y-4">
                  <p className="text-text-primary font-medium">Why founders choose us:</p>
                  <ul className="space-y-3">
                    <li>→ Director-level, hands-on. One person across for total consistency.</li>
                    <li>→ 14+ years, 30+ brands, proven across industries.</li>
                    <li>→ Trusted worldwide. US, Europe, and Middle East.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-zinc-100">
               <img 
                 src="https://picsum.photos/seed/valueprop/800/1000" 
                 alt="Value proposition" 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
               {/* Floating cards simulation */}
               <div className="absolute inset-0 p-8 flex flex-col justify-end gap-4">
                  <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg w-48 rotate-[-5deg]">
                    <p className="text-xs font-medium uppercase tracking-wider mb-2">Next Sprint</p>
                    <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-black" />
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Ticker Strip */}
          <div className="mt-40 border-y border-black/5 py-8 overflow-hidden">
            <div className="marquee-track flex gap-20 text-sm uppercase tracking-[0.3em] font-medium text-text-secondary">
              {Array(10).fill("Earn trust · Win hearts · Raise round · Move faster · Spark excitement").map((text, i) => (
                <span key={i}>{text}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="mb-60">
          <div className="mb-20">
             <p className="text-sm uppercase tracking-widest text-text-secondary mb-4">Portfolio</p>
             <h2 className="text-5xl md:text-7xl">Here's what the <span className="italic">shortcut</span> looks like.</h2>
          </div>
          <div className="flex flex-col">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Playground Section */}
        <section id="playground" className="mb-60">
          <div className="mb-20">
             <p className="text-sm uppercase tracking-widest text-text-secondary mb-4">Other creative affairs</p>
             <h2 className="text-5xl md:text-7xl mb-6">Playground</h2>
             <p className="text-text-secondary text-xl max-w-2xl">
               Mix of real-world brands, AI experiments, and late-night ideas that had to happen.
             </p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {PLAYGROUND_ITEMS.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="break-inside-avoid rounded-2xl overflow-hidden bg-zinc-100"
              >
                <img 
                  src={item.src} 
                  alt="Playground item" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-40 border-t border-black/5">
          <h2 className="text-5xl md:text-8xl mb-8">
            Make the meaning clear.<br />
            Make the feeling <span className="italic">undeniable.</span>
          </h2>
          <p className="text-text-secondary text-xl mb-12">Let's build your shortcut together.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="https://tally.so/r/mYLJW0" 
              target="_blank" 
              className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:scale-[1.03] transition-transform w-full md:w-auto"
            >
              Let's begin
            </a>
            <a 
              href="https://cal.com/bajgart-office/20min" 
              target="_blank" 
              className="border border-btn-secondary-border px-10 py-4 rounded-full text-lg font-medium hover:bg-zinc-50 transition-colors w-full md:w-auto"
            >
              Book a call
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row items-center justify-between pt-20 border-t border-black/5 text-sm text-text-secondary uppercase tracking-widest">
          <div className="flex items-center gap-4 mb-8 md:mb-0">
            <img 
              src="https://framerusercontent.com/images/guFvYwrJngqpZWlNv3xWiqk7sk.png" 
              alt="Founder" 
              className="w-12 h-12 rounded-full grayscale"
              referrerPolicy="no-referrer"
            />
            <span>Based in Paris, working with clients worldwide.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://x.com/LucieBajgart" target="_blank" className="hover:text-text-primary transition-colors">X (Twitter)</a>
            <a href="https://www.instagram.com/luciebajgart/" target="_blank" className="hover:text-text-primary transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/luciebajgart/" target="_blank" className="hover:text-text-primary transition-colors">LinkedIn</a>
            <a href="https://dribbble.com/LucieBajgart" target="_blank" className="hover:text-text-primary transition-colors">Dribbble</a>
          </div>
        </footer>
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[90]">
        <button className="bg-white border border-black/5 shadow-lg px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-[1.05] transition-transform">
          <Plus className="w-4 h-4" />
          Invite a founder
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white border border-black/5 shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:scale-[1.1] transition-transform"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      {/* Modals */}
      <Modal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)}>
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-text-secondary">Process + Pricing</p>
            <h2 className="text-6xl">1. Brand sprint</h2>
            <p className="text-3xl italic text-text-secondary">Direction and identity in 10 days.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-lg text-text-secondary">
            <div className="space-y-6">
              <p>No layers. No overhead. Just focus. This sprint is for founders who don't have months or layers to manage. You get two strong identity directions, crafted fast and built to move with your momentum.</p>
              <div className="pt-6">
                <p className="text-text-primary font-medium mb-4 uppercase tracking-wider text-sm">What $8,000 gets you:</p>
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  <li>• 2 full identity directions</li>
                  <li>• Logo system</li>
                  <li>• Typography & color system</li>
                  <li>• Graphic elements & patterns</li>
                  <li>• Homepage or landing page design</li>
                  <li>• Social media templates</li>
                  <li>• 8 custom applications</li>
                  <li>• Brand guidelines & toolkit</li>
                </ul>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-8 border border-black/5 rounded-3xl bg-zinc-50">
                <h4 className="text-2xl mb-2">Brand Sprint</h4>
                <p className="text-4xl font-serif mb-4">$8,000</p>
                <p className="text-sm">A complete brand delivered in 10 working days.</p>
              </div>
              <div className="p-8 border border-black/5 rounded-3xl">
                <h4 className="text-2xl mb-2">Brand Retainer</h4>
                <p className="text-4xl font-serif mb-4">$6,000/mo</p>
                <p className="text-sm">Ongoing brand support for growing teams.</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)}>
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-text-secondary">About</p>
            <h2 className="text-6xl">Lucie Bajgart</h2>
            <p className="text-3xl italic text-text-secondary">Founder & Creative Director</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-lg text-text-secondary">
            <div className="space-y-6">
              <p>With over 14 years of experience building brands across the globe, I founded Bajgart Design Office to provide founders with a direct, high-speed path to world-class identity.</p>
              <p>I believe that great design isn't just about how it looks, but how it feels. It's about creating a shortcut between your vision and your audience's understanding.</p>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden grayscale">
               <img 
                 src="https://picsum.photos/seed/lucie/800/800" 
                 alt="Lucie Bajgart" 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>
          <div className="pt-12 border-t border-black/5">
             <h3 className="text-3xl mb-8">Guiding Values</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { t: "Obsession makes magic", d: "We don't just do the work, we live it until it's perfect." },
                  { t: "Feelings will get you far", d: "Logic is the foundation, but emotion is the bridge." },
                  { t: "Can't outwork fun", d: "The best results come from a place of genuine curiosity." }
                ].map(v => (
                  <div key={v.t} className="space-y-2">
                    <p className="font-serif text-xl">{v.t}</p>
                    <p className="text-sm text-text-secondary">{v.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
