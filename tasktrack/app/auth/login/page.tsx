import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm shadow-slate-200/50">
        <h1 className="text-3xl font-semibold text-slate-900">Login</h1>
        <p className="mt-3 text-slate-600">Sign in to your TaskTrack account.</p>
        <form className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input type="email" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none" placeholder="you@example.com" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none" placeholder="••••••••" />
          </label>
          <button className="w-full rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">Continue</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          New to TaskTrack?{' '}
          <Link href="/auth/signup" className="font-semibold text-brand-600 hover:text-brand-700">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
