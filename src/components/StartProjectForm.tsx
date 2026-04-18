import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Check, Send } from 'lucide-react';

interface StartProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type ServiceType = 'Dev Sprint' | 'Dev Retainer' | 'Something else' | '';

interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  companyDescription: string;
  serviceType: ServiceType;
  projectVision: string;
  timeline: string;
}

const INITIAL_DATA: FormData = {
  fullName: '',
  email: '',
  companyName: '',
  companyDescription: '',
  serviceType: '',
  projectVision: '',
  timeline: '',
};

const SERVICE_OPTIONS: { value: ServiceType; label: string; description: string }[] = [
  { value: 'Dev Sprint', label: 'Dev Sprint', description: 'A production-ready website, shipped in 5 days or less.' },
  { value: 'Dev Retainer', label: 'Dev Retainer', description: 'Ongoing maintenance, updates, and support.' },
  { value: 'Something else', label: 'Something else', description: 'Tell us what you need — we\'ll figure it out.' },
];

const TIMELINE_OPTIONS = [
  'ASAP',
  '1–2 weeks',
  '1 month',
  '2–3 months',
  'No rush — just exploring',
];

export function StartProjectForm({ isOpen, onClose }: StartProjectFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back


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
        setStep(1);
        setFormData(INITIAL_DATA);
        setIsSubmitted(false);
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.companyDescription.trim()) newErrors.companyDescription = 'Please tell us about your company';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep1()) {
      setDirection(1);
      setStep(2);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsLoading(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/start-project', {
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

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
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
            className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-gray-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress Bar */}
            {!isSubmitted && (
              <div className="px-8 pt-8 pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-1 rounded-full bg-bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-blue rounded-full"
                      initial={{ width: '50%' }}
                      animate={{ width: step === 1 ? '50%' : '100%' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </div>
                  <span className="text-xs text-text-secondary font-medium tracking-wider uppercase">
                    {step} / 2
                  </span>
                </div>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
              <AnimatePresence mode="wait" custom={direction}>
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
                    <h2 className="text-4xl md:text-5xl mb-4">You're in.</h2>
                    <p className="text-text-secondary text-lg max-w-md">
                      Your request has been sent. I'll get back to you within 24 hours with next steps.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-10 bg-accent-blue text-white px-8 py-3.5 rounded-full font-medium hover:bg-accent-blue-dark hover:scale-[1.03] transition-all"
                    >
                      Back to site
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  /* ─── Step 1: Contact Info ─── */
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-6"
                  >
                    <div className="mb-10">
                      <h2 className="text-4xl md:text-5xl mb-3">Let's get to know you.</h2>
                      <p className="text-text-secondary text-lg">Quick intro — then we'll talk about your project.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={e => updateField('fullName', e.target.value)}
                          placeholder="John Foster"
                          className="w-full px-5 py-3.5 rounded-xl border border-btn-secondary-border bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all"
                        />
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

                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={e => updateField('companyName', e.target.value)}
                          placeholder="Acme Inc."
                          className="w-full px-5 py-3.5 rounded-xl border border-btn-secondary-border bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all"
                        />
                      </div>

                      {/* Company Description */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Tell me about your company <span className="text-accent-blue">*</span>
                        </label>
                        <textarea
                          value={formData.companyDescription}
                          onChange={e => updateField('companyDescription', e.target.value)}
                          placeholder="What does your company do? Who are your customers? 2–3 sentences is perfect."
                          rows={3}
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.companyDescription ? 'border-red-400 ring-2 ring-red-100' : 'border-btn-secondary-border'} bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all resize-none`}
                        />
                        {errors.companyDescription && <p className="mt-1.5 text-sm text-red-500">{errors.companyDescription}</p>}
                      </div>
                    </div>

                    {/* Next Button */}
                    <div className="mt-10 flex justify-end">
                      <button
                        onClick={goNext}
                        className="bg-accent-blue text-white px-8 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-accent-blue-dark hover:scale-[1.03] transition-all text-lg"
                      >
                        Next
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ─── Step 2: Project Details ─── */
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-6"
                  >
                    <div className="mb-10">
                      <h2 className="text-4xl md:text-5xl mb-3">Now, the project.</h2>
                      <p className="text-text-secondary text-lg">What are we building together?</p>
                    </div>

                    <div className="space-y-6">
                      {/* Service Type */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-3">
                          What are you here for? <span className="text-accent-blue">*</span>
                        </label>
                        <div className="space-y-3">
                          {SERVICE_OPTIONS.map(option => (
                            <button
                              key={option.value}
                              onClick={() => updateField('serviceType', option.value)}
                              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                                formData.serviceType === option.value
                                  ? 'border-accent-blue bg-accent-blue/5'
                                  : 'border-btn-secondary-border hover:border-accent-blue/40'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className={`font-medium text-lg ${formData.serviceType === option.value ? 'text-accent-blue' : 'text-text-primary'}`}>
                                    {option.label}
                                  </p>
                                  <p className="text-sm text-text-secondary mt-0.5">{option.description}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  formData.serviceType === option.value
                                    ? 'border-accent-blue bg-accent-blue'
                                    : 'border-btn-secondary-border'
                                }`}>
                                  {formData.serviceType === option.value && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        {errors.serviceType && <p className="mt-1.5 text-sm text-red-500">{errors.serviceType}</p>}
                      </div>

                      {/* Project Vision */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-2">
                          Describe your project vision
                        </label>
                        <textarea
                          value={formData.projectVision}
                          onChange={e => updateField('projectVision', e.target.value)}
                          placeholder="What are you building? What mood, style, or references inspire you? Links are welcome."
                          rows={3}
                          className="w-full px-5 py-3.5 rounded-xl border border-btn-secondary-border bg-white text-text-primary text-lg placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all resize-none"
                        />
                      </div>

                      {/* Timeline */}
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wider text-text-secondary mb-3">
                          When do you need this? <span className="text-accent-blue">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TIMELINE_OPTIONS.map(option => (
                            <button
                              key={option}
                              onClick={() => updateField('timeline', option)}
                              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                                formData.timeline === option
                                  ? 'border-accent-blue bg-accent-blue text-white'
                                  : 'border-btn-secondary-border text-text-secondary hover:border-accent-blue hover:text-accent-blue'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {errors.timeline && <p className="mt-1.5 text-sm text-red-500">{errors.timeline}</p>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex items-center justify-between">
                      <button
                        onClick={goBack}
                        disabled={isLoading}
                        className="text-text-secondary flex items-center gap-2 hover:text-text-primary transition-colors font-medium disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <div className="flex flex-col items-end gap-2">
                        {submitError && (
                          <p className="text-sm text-red-500">{submitError}</p>
                        )}
                        <button
                          onClick={handleSubmit}
                          disabled={isLoading}
                          className="bg-accent-blue text-white px-8 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-accent-blue-dark hover:scale-[1.03] transition-all text-lg disabled:opacity-70 disabled:scale-100"
                        >
                          {isLoading ? 'Sending…' : 'Submit'}
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
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
