import React from 'react';
import { redirect } from 'next/navigation';
import { ShieldCheck, LogOut, Lock } from 'lucide-react';
import { verifyAdminSession, clearAdminSessionCookie } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;
  try {
    session = await verifyAdminSession();
  } catch {
    redirect('/login');
  }

  async function handleLogout() {
    'use server';
    await clearAdminSessionCookie();
    redirect('/login');
  }

  return (
    <div className="w-full min-h-screen bg-onyx-black flex flex-col relative">
      {/* Executive Security Control Bar (Fixed Top 0) */}
      <header className="fixed top-0 left-0 w-full bg-surface-container-low border-b border-surface-variant px-margin-mobile md:px-margin-desktop py-2.5 flex items-center justify-between z-50 h-[54px] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-body text-[10px] uppercase tracking-widest font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Trust Active</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-silver-leaf font-body text-[11px] uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>User: <strong className="text-primary">{session.username}</strong> ({session.role})</span>
          </div>
        </div>

        <form action={handleLogout}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-rose-950/40 border border-surface-variant hover:border-rose-500/50 text-silver-leaf hover:text-rose-300 font-body text-[10px] uppercase tracking-widest py-1.5 px-3 transition-all duration-300 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </form>
      </header>

      {/* Main Protected Admin Area */}
      <main className="flex-1 w-full pt-[54px]">{children}</main>
    </div>
  );
}
