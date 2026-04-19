import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { Modal } from './components/Modal';
import { StartProjectForm } from './components/StartProjectForm';
import { PROJECTS, PLAYGROUND_ITEMS } from './data';
import { ArrowUp, CreditCard, Check, X } from 'lucide-react';

export default function App() {
  const [isPricingOpen, setIsPricingOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState<'success' | 'cancelled' | null>(null);
  const [checkoutLoading, setCheckoutLoading] = React.useState<string | null>(null);

  // Stripe Payment Links (permanent, hosted by Stripe)
  const paymentLinks = {
    sprint: 'https://buy.stripe.com/fZu28rdgc0wg7iycGfaVa06',
    retainer: 'https://buy.stripe.com/aFafZh3FCa6Q8mC0XxaVa07',
  };

  // Detect payment result from Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    if (payment === 'success' || payment === 'cancelled') {
      setPaymentStatus(payment);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setPaymentStatus(null), 8000);
    }
  }, []);

  const handleCheckout = (plan: 'sprint' | 'retainer') => {
    setCheckoutLoading(plan);
    window.location.href = paymentLinks[plan];
  };


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
    <div id="top" className="min-h-screen selection:bg-accent-blue selection:text-white">
      {/* Payment Status Toast */}
      {paymentStatus && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md ${
            paymentStatus === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-amber-50 border border-amber-200 text-amber-800'
          }`}
        >
          {paymentStatus === 'success' ? (
            <>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Payment successful!</p>
                <p className="text-sm opacity-70">Thank you — we'll be in touch within 24 hours.</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Checkout cancelled</p>
                <p className="text-sm opacity-70">No charge was made. You can try again anytime.</p>
              </div>
            </>
          )}
          <button
            onClick={() => setPaymentStatus(null)}
            className="ml-2 p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      <Navbar 
        onOpenPricing={() => setIsPricingOpen(true)} 
        onOpenAbout={() => setIsAboutOpen(true)} 
        onOpenProject={() => setIsProjectFormOpen(true)}
      />

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 pt-28 md:pt-40 pb-16 md:pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] md:min-h-[70vh] flex flex-col items-center justify-center text-center mb-24 md:mb-40">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] leading-[1.1] max-w-5xl mb-8 md:mb-12"
          >
            Your <span className="italic">shortcut</span>
            <br />
            to a website that turns
            <br />
            <span className="italic">visitors</span> into <span className="italic">customers.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-text-secondary text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] mb-12 max-w-[280px] md:max-w-none mx-auto"
          >
            for startups and founders who need speed, quality, and results
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3">
            {['Service', 'Hospitality', 'E-commerce', 'SaaS', 'Marketplace', 'AI'].map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="px-5 py-2 border border-btn-secondary-border rounded-full text-[12px] uppercase tracking-wider text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-colors"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="mb-32 md:mb-60">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl leading-tight mb-8 md:mb-12">
                Shipped in <span className="italic">two weeks max</span> and supported <span className="italic">continuously.</span>
              </h2>
              <div className="space-y-8 text-lg text-text-secondary">
                <blockquote className="italic text-text-secondary leading-relaxed space-y-6 border-l-2 border-accent-blue/30 pl-6">
                  <p>"I'm not trying to do something small.<br />That's never been the goal.</p>
                  <p>If I'm building it, it has to scale. It has to make money. It has to matter.<br />Not just look good—but actually work, actually convert, actually grow.</p>
                  <p>I don't want to spend years "figuring it out."<br />I want systems that work now, improve fast, and compound.</p>
                  <p>If something takes me 5 hours, I'm already thinking:<br />"How do I make this take 5 minutes?"</p>
                  <p>If I close one deal, I'm thinking about 10.<br />If I hit 10, I'm thinking about 100.<br />Because the real game isn't effort—it's leverage.</p>
                  <p>I don't care about doing things the traditional way.<br />If there's a faster, smarter, more scalable way—I'm taking it.</p>
                  <p>And if it doesn't exist yet…<br />I'll build it."</p>
                </blockquote>
              </div>
            </div>
            
            <div className="relative pb-10">
              {/* Main visual composition */}
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-bg-secondary">
                <img 
                  src="/portfolio/founder_portrait.jpg" 
                  alt="Foster Brand Development founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating performance card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 border border-accent-blue/10 hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                  <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">Lighthouse Score</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-light text-accent-blue">98</span>
                  <span className="text-sm text-text-secondary">/100</span>
                </div>
              </div>
              {/* Floating tech stack card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-accent-blue/10 hidden md:block">
                <p className="text-[10px] font-medium uppercase tracking-wider text-text-secondary mb-2">Stack</p>
                <div className="flex gap-2">
                  {['Next.js', 'React', 'TS'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-bg-secondary rounded text-[11px] font-medium text-accent-blue">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center mt-4 text-sm font-medium text-text-primary">John Foster, <span className="text-text-secondary">Founder & Head Software Engineer</span></p>
          </div>

          {/* Ticker Strip */}
          <div className="mt-24 md:mt-40 border-y border-accent-blue/5 py-8 overflow-hidden">
            <div className="marquee-track flex gap-12 md:gap-20 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium text-text-secondary">
              {Array(10).fill("Ship faster · Convert more · Scale smarter · Build better · Launch sooner").map((text, i) => (
                <span key={i} className="whitespace-nowrap">{text}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="mb-32 md:mb-60">
          <div className="mb-12 md:mb-20">
             <h2 className="text-4xl sm:text-5xl md:text-7xl">Here's what <span className="italic">shipping fast</span> looks like.</h2>
          </div>
          <div className="flex flex-col">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Lab / Playground Section */}
        <section id="playground" className="mb-32 md:mb-60">
          <div className="mb-12 md:mb-20">
             <p className="text-sm uppercase tracking-widest text-text-secondary mb-4">The Lab</p>
             <p className="text-text-secondary text-xl max-w-2xl">
               Side projects, open-source experiments, and late-night prototypes that we just had to build.
             </p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {PLAYGROUND_ITEMS.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="break-inside-avoid rounded-2xl overflow-hidden bg-bg-secondary"
              >
                <img 
                  src={item.src} 
                  alt="Lab experiment" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-24 md:py-40 border-t border-accent-blue/5">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8">
            Make the vision clear.<br />
            Make the launch <span className="italic">unforgettable.</span>
          </h2>
          <p className="text-text-secondary text-xl mb-12">Let's build your unfair advantage together.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => setIsProjectFormOpen(true)}
              className="bg-accent-blue text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-accent-blue-dark hover:scale-[1.03] transition-all w-full md:w-auto text-center cursor-pointer"
            >
              Start a project
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-8 pt-20 border-t border-accent-blue/5">
          <p className="text-sm text-text-secondary uppercase tracking-widest">
            Remote-first studio, shipping worldwide.
          </p>
          {/* Social link pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
            ].map(link => (
              <a 
                key={link.label}
                href={link.href} 
                target="_blank" 
                className="px-6 py-2.5 border border-btn-secondary-border rounded-full text-sm font-medium text-text-primary hover:bg-accent-blue hover:text-white hover:border-accent-blue transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[90]">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white border border-accent-blue/10 shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:scale-[1.1] hover:border-accent-blue/30 transition-all self-end"
        >
          <ArrowUp className="w-5 h-5 text-accent-blue" />
        </button>
      </div>

      {/* Pricing Modal */}
      <Modal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)}>
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-text-secondary">Process + Pricing</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl break-words">1. Dev Sprint</h2>
            <p className="text-xl md:text-3xl italic text-text-secondary">Designed, built, and shipped in 5 days or less.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-base md:text-lg text-text-secondary">
            <div className="space-y-6">
              <p>No layers. No overhead. Just senior developers building at full speed. This sprint is for business owners who need a production-ready website — not a prototype, not a mock-up — a real, deployed, high-performance site with continuous support included.</p>
              <div className="pt-6">
                <p className="text-text-primary font-medium mb-4 uppercase tracking-wider text-sm">What the sprint delivers:</p>
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  <li>• Custom design (Figma → code, pixel-perfect)</li>
                  <li>• Responsive build (desktop, tablet, mobile)</li>
                  <li>• Performance optimized (Lighthouse 95+)</li>
                  <li>• SEO foundations (meta, schema, sitemap)</li>
                  <li>• CMS integration (if needed)</li>
                  <li>• Analytics & tracking setup</li>
                  <li>• Hosting & deployment</li>
                  <li>• Continuous post-launch support</li>
                </ul>
              </div>
              {/* Day-by-day timeline */}
              <div className="pt-6">
                <p className="text-text-primary font-medium mb-4 uppercase tracking-wider text-sm">5-Day Sprint Timeline:</p>
                <div className="space-y-3 text-sm">
                  {[
                    { day: 'Day 1', task: 'Discovery, wireframes & design direction' },
                    { day: 'Day 2', task: 'High-fidelity design & client review' },
                    { day: 'Day 3–4', task: 'Full development, integrations & CMS' },
                    { day: 'Day 5', task: 'Testing, deployment & handoff' },
                  ].map(step => (
                    <div key={step.day} className="flex gap-4">
                      <span className="text-accent-blue font-medium w-20 flex-shrink-0">{step.day}</span>
                      <span>{step.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-8 border-2 border-accent-blue/20 rounded-3xl bg-bg-secondary">
                <h4 className="text-2xl mb-2">Dev Sprint</h4>
                <p className="text-4xl font-serif mb-2"><span className="text-accent-blue">$1,000</span></p>
                <p className="text-sm">A production-ready website, shipped in 5 days or less — with continuous support.</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> Custom design & development</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> Fully responsive & SEO ready</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> CMS, forms & analytics</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> Continuous support included</li>
                </ul>
                <button
                  onClick={() => handleCheckout('sprint')}
                  disabled={checkoutLoading === 'sprint'}
                  className="mt-6 w-full bg-accent-blue text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent-blue-dark hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-60 disabled:scale-100"
                >
                  <CreditCard className="w-4 h-4" />
                  {checkoutLoading === 'sprint' ? 'Redirecting…' : 'Pay $1,000 — Get started'}
                </button>
              </div>
              <div className="p-8 border border-accent-blue/10 rounded-3xl">
                <h4 className="text-2xl mb-2">Dev Retainer</h4>
                <p className="text-4xl font-serif mb-2"><span className="text-accent-blue">$150</span><span className="text-lg text-text-secondary">/mo</span></p>
                <p className="text-sm">Ongoing maintenance, updates, and support for your site.</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> Priority support & bug fixes</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> Content & design updates</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> Performance monitoring</li>
                  <li className="flex items-center gap-2"><span className="text-accent-blue">✓</span> Hosting management</li>
                </ul>
                <button
                  onClick={() => handleCheckout('retainer')}
                  disabled={checkoutLoading === 'retainer'}
                  className="mt-6 w-full border-2 border-accent-blue text-accent-blue px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent-blue hover:text-white hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-60 disabled:scale-100"
                >
                  <CreditCard className="w-4 h-4" />
                  {checkoutLoading === 'retainer' ? 'Redirecting…' : 'Subscribe — $150/mo'}
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <button 
                  onClick={() => { setIsPricingOpen(false); setIsProjectFormOpen(true); }}
                  className="bg-accent-blue text-white px-8 py-4 rounded-full text-center font-medium hover:bg-accent-blue-dark hover:scale-[1.03] transition-all cursor-pointer"
                >
                  Start a project
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* About Modal */}
      <Modal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)}>
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-text-secondary">About</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl break-words">Foster Brand Development</h2>
            <p className="text-xl md:text-3xl italic text-text-secondary">A development studio built for founders.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-base md:text-lg text-text-secondary">
            <div className="space-y-6">
              <p>Foster Brand Development was founded on a simple belief: startups deserve world-class engineering without the agency markup, the endless meetings, or the 3-month timelines.</p>
              <p>We're a small, senior team of engineers and designers who build production-ready websites and web applications at startup speed. Every project is led by a senior developer — no handoffs, no junior devs learning on your dime.</p>
              <p>We're a new studio with a sharp edge — built by engineers who've spent years in the trenches at startups and agencies, now channeling that experience into something lean, fast, and obsessively quality-driven. Every project gets our full attention, because right now, your success is how we build ours.</p>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-bg-secondary flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-accent-blue mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-3xl font-serif">F</span>
                </div>
                <p className="font-serif text-2xl text-text-primary mb-2">FBD</p>
                <p className="text-sm text-text-secondary">Development Studio</p>
                <p className="text-sm text-text-secondary mt-1">Est. 2024</p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-accent-blue/5">
             <h3 className="text-3xl mb-8">How We Work</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { t: "Ship, don't slide", d: "We don't make presentations. We build living, breathing products you can click, test, and launch." },
                  { t: "Speed is a feature", d: "Fast sites, fast builds, fast communication. We treat your time like our own." },
                  { t: "Quality is non-negotiable", d: "Every pixel, every interaction, every performance metric — we obsess so you don't have to." }
                ].map(v => (
                  <div key={v.t} className="space-y-2">
                    <p className="font-serif text-xl italic text-text-primary">{v.t}</p>
                    <p className="text-sm text-text-secondary">{v.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </Modal>

      {/* Start a Project Form */}
      <StartProjectForm isOpen={isProjectFormOpen} onClose={() => setIsProjectFormOpen(false)} />
    </div>
  );
}
