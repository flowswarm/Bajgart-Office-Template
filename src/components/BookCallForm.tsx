import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Phone } from 'lucide-react';

interface BookCallFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CallFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  topic: string;
  preferredTime: string;
  message: string;
}

const INITIAL_DATA: CallFormData = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  topic: '',
  preferredTime: '',
  message: '',
};

const TOPIC_OPTIONS = [
  'Dev Sprint — I need a website built fast',
  'Dev Retainer — I need ongoing support',
  "Something custom \u2014 let's talk scope",
  'Just exploring — want to learn more',
];

const TIME_OPTIONS = [
  'Mornings (9am–12pm EST)',
  'Afternoons (12pm–5pm EST)',
  'Evenings (5pm–8pm EST)',
  'Flexible — anytime works',
];

export function BookCallForm({ isOpen, onClose }: BookCallFormProps) {
  const [formData, setFormData] = useState<CallFormData>(INITIAL_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof CallFormData, string>>>({});

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData(INITIAL_DATA);
        setIsSubmitted(false);
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  const updateField = (field: keyof CallFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CallFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.topic) newErrors.topic = 'Please select what you want to discuss';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setIsSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl max-h-[90vh] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-gray-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* ─── Success State ─── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-accent-blue flex items-center justify-center mb-8"
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl mb-4">You're on the list.</h2>
                    <p className="text-text-secondary text-lg max-w-md">
                      Your call request has been sent. I'll reach out within 24 hours to confirm a time.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-10 bg-accent-blue text-white px-8 py-3.5 rounded-full font-medium hover:bg-accent-blue-dark hover:scale-[1.03] transition-all"
                    >
                      Back to site
                    </button>
                  </motion.div>
                ) : (
                  /* ─── Form ─── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center mb-4">
                        <Phone className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h2 className="text-4xl md:text-5xl mb-3">Book a call.</h2>
                      <p className="text-text-secondary text-lg">Tell me a little about yourself and I'll reach out to schedule.</p>
                    </div>

                    <div className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Full Name <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={e => updateField('fullName', e.target.value)}
                          placeholder="John Foster"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.fullName ? 'border-red-400 ring-2 ring-red-100' : 'border-btn-secondary-border'} bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all`}
                        />
                        {errors.fullName && <p className="mt-1.5 text-sm text-red-500">{errors.fullName}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Email <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => updateField('email', e.target.value)}
                          placeholder="john@company.com"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.email ? 'border-red-400 ring-2 ring-red-100' : 'border-btn-secondary-border'} bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all`}
                        />
                        {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Phone <span className="text-text-secondary/40 text-xs normal-case">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => updateField('phone', e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-5 py-3.5 rounded-xl border border-btn-secondary-border bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Company Name <span className="text-text-secondary/40 text-xs normal-case">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={e => updateField('companyName', e.target.value)}
                          placeholder="Acme Inc."
                          className="w-full px-5 py-3.5 rounded-xl border border-btn-secondary-border bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all"
                        />
                      </div>

                      {/* Topic */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-3">
                          What do you want to talk about? <span className="text-accent-blue">*</span>
                        </label>
                        <div className="space-y-2">
                          {TOPIC_OPTIONS.map(option => (
                            <button
                              key={option}
                              onClick={() => updateField('topic', option)}
                              className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all duration-200 text-base ${
                                formData.topic === option
                                  ? 'border-accent-blue bg-accent-blue/5 text-accent-blue'
                                  : 'border-btn-secondary-border text-text-primary hover:border-accent-blue/40'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {errors.topic && <p className="mt-1.5 text-sm text-red-500">{errors.topic}</p>}
                      </div>

                      {/* Preferred Time */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-3">
                          Preferred call time <span className="text-text-secondary/40 text-xs normal-case">(optional)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TIME_OPTIONS.map(option => (
                            <button
                              key={option}
                              onClick={() => updateField('preferredTime', option)}
                              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                                formData.preferredTime === option
                                  ? 'border-accent-blue bg-accent-blue text-white'
                                  : 'border-btn-secondary-border text-text-secondary hover:border-accent-blue hover:text-accent-blue'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Anything else? <span className="text-text-secondary/40 text-xs normal-case">(optional)</span>
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={e => updateField('message', e.target.value)}
                          placeholder="Share any context, questions, or links you'd like me to review before the call."
                          rows={3}
                          className="w-full px-5 py-3.5 rounded-xl border border-btn-secondary-border bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-8 flex flex-col gap-2">
                      {submitError && (
                        <p className="text-sm text-red-500 text-center">{submitError}</p>
                      )}
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-accent-blue text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-accent-blue-dark hover:scale-[1.02] transition-all text-lg disabled:opacity-70 disabled:scale-100"
                      >
                        {isLoading ? 'Sending…' : 'Request a Call'}
                        <Phone className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
