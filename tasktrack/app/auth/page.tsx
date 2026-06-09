import Link from 'next/link';

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm shadow-slate-200/50">
        <h1 className="text-3xl font-semibold text-slate-900">Authentication</h1>
        <p className="mt-3 text-slate-600">Connect with Supabase Auth for secure signup, login, and password reset.</p>
        <div className="mt-8 space-y-4">
          <Link href="/auth/login" className="block rounded-2xl bg-brand-500 px-5 py-3 text-center text-white transition hover:bg-brand-600">
            Login
          </Link>
          <Link href="/auth/signup" className="block rounded-2xl border border-slate-200 px-5 py-3 text-center text-slate-900 transition hover:bg-slate-100">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
