'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { submitContactInquiry, ActionState } from '@/app/actions/contact';
import FadeIn from '@/components/motion/FadeIn';

export default function ContactPage() {
  const [formState, setFormState] = useState<ActionState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const result = await submitContactInquiry(formState, formData);
    setFormState(result);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full relative pt-32 pb-section-gap min-h-screen">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/products/studio_monitors.png"
          alt="Contact Background"
          fill
          priority
          className="object-cover opacity-20 grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[70vh]">
        {/* Left Column */}
        <div className="md:col-span-5 flex flex-col justify-center mb-12 md:mb-0 pt-8 md:pt-0">
          <FadeIn direction="down">
            <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-4 font-semibold">
              Consultation &amp; Booking
            </span>
            <h1 className="font-display text-display-xl-mobile md:text-display-xl text-primary uppercase leading-[0.85] tracking-tighter mb-6">
              SECURE<br />YOUR<br />SESSION
            </h1>
            <p className="font-body text-body-lg text-silver-leaf max-w-md mb-8">
              Direct access to premier management and production consultation. Define your trajectory.
            </p>
            <div className="hidden md:block border-t border-surface-variant pt-6">
              <p className="font-body text-label-caps text-primary uppercase tracking-[0.15em] mb-2 font-bold">
                Global Headquarters
              </p>
              <p className="font-body text-body-md text-silver-leaf">
                Los Angeles, CA<br />
                New York, NY<br />
                London, UK
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Form Column */}
        <div className="md:col-span-7 flex items-center">
          <FadeIn direction="up" fullWidth>
            <div className="w-full bg-surface-container-low backdrop-blur-md p-8 md:p-12 border border-surface-variant shadow-2xl">
              {formState.success ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
                  <h3 className="font-display text-headline-md uppercase text-primary">
                    Session Request Received
                  </h3>
                  <p className="font-body text-body-md text-silver-leaf max-w-md">
                    {formState.message}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormState({})}
                  >
                    Send Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
                  {formState.message && !formState.success && (
                    <div className="bg-red-900/30 border border-red-500/50 p-4 text-red-200 font-body text-sm flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                      <span>{formState.message}</span>
                    </div>
                  )}

                  <Input
                    id="name"
                    name="name"
                    label="Artist / Entity Moniker"
                    placeholder="e.g. Aura Vanguard / Sony Music"
                    required
                    error={formState.errors?.name}
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Direct Contact Email"
                    placeholder="management@domain.com"
                    required
                    error={formState.errors?.email}
                  />

                  <Select
                    id="inquiry"
                    name="inquiry"
                    label="Nature of Inquiry"
                    options={[
                      { label: 'Full-Service Management', value: 'management' },
                      { label: 'Studio Production Block', value: 'production' },
                      { label: 'Strategic Consultation', value: 'consultation' },
                      { label: 'Brand Partnership / Sync', value: 'partnership' },
                      { label: 'Other Inquiry', value: 'other' },
                    ]}
                  />

                  <Textarea
                    id="message"
                    name="message"
                    label="Project Brief / Objectives"
                    placeholder="Outline primary objectives, timelines, and scale..."
                    rows={4}
                    required
                    error={formState.errors?.message}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      disabled={isSubmitting}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Transmitting Request...' : 'Submit Request'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
