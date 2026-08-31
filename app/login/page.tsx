'use client';

import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { loginAdminAction, LoginResult } from '@/app/actions/auth';
import FadeIn from '@/components/motion/FadeIn';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-white text-background font-body text-label-caps font-bold tracking-[0.2em] uppercase py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50"
    >
      {pending ? (
        'Verifying Session...'
      ) : (
        <>
          Authenticate Session <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

const initialState: LoginResult = {
  success: false,
  message: '',
};

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAdminAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push('/admin');
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="w-full min-h-screen bg-onyx-black flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none opacity-5">
        <h1 className="font-display text-[28vw] uppercase tracking-tighter text-primary">
          ZERO
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-md bg-surface-container-low border border-surface-variant p-8 md:p-12 shadow-2xl">
        <FadeIn direction="up">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-variant">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-body text-label-caps text-silver-leaf tracking-[0.3em] uppercase">
              SO BOLD ENT Portal
            </span>
          </div>

          <h1 className="font-display text-headline-lg text-primary uppercase leading-tight mb-2">
            CONTROL CENTER
          </h1>
          <p className="font-body text-body-md text-silver-leaf/70 mb-8">
            Restricted access. Authenticate with executive admin credentials.
          </p>

          {/* Feedback Alert */}
          {state.message && (
            <div
              className={`p-4 mb-6 text-xs uppercase tracking-wider font-body border flex items-center gap-3 ${
                state.success
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              }`}
            >
              {!state.success && <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />}
              <span>{state.message}</span>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block font-body text-[10px] uppercase tracking-[0.2em] text-silver-leaf mb-2"
              >
                Moniker / Identity
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="admin"
                  className="w-full bg-background border border-surface-variant px-4 py-3 text-primary placeholder-silver-leaf/30 font-body text-body-md focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              {state.errors?.username && (
                <p className="text-rose-400 text-[10px] uppercase tracking-wider mt-1">
                  {state.errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-body text-[10px] uppercase tracking-[0.2em] text-silver-leaf mb-2"
              >
                Access Cipher
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-background border border-surface-variant px-4 py-3 text-primary placeholder-silver-leaf/30 font-body text-body-md focus:border-primary focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-silver-leaf/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {state.errors?.password && (
                <p className="text-rose-400 text-[10px] uppercase tracking-wider mt-1">
                  {state.errors.password}
                </p>
              )}
            </div>

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>

          {/* Footer Warning */}
          <div className="mt-8 pt-6 border-t border-surface-variant/40 text-center">
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-silver-leaf/50">
              Zero-Trust Session • HttpOnly Cookie • 1-Hour Ephemeral Lease
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
