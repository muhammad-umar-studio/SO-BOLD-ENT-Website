import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-onyx-black text-bright-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-heading text-8xl font-black tracking-tighter text-neon-gold mb-4">404</h1>
      <h2 className="font-heading text-2xl font-bold tracking-widest uppercase mb-6">Page Not Found</h2>
      <p className="font-sans text-muted-gray max-w-md mb-8">
        The requested dispatch, artist profile, or page does not exist or has been relocated within the SO BOLD ENT catalog.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-neon-gold text-onyx-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-bright-white transition-colors duration-200"
      >
        Return to Home
      </Link>
    </main>
  );
}
