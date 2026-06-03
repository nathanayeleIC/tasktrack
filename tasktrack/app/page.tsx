import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/courses', label: 'Courses' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/auth', label: 'Auth' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/50 backdrop-blur">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-500">TaskTrack</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">A modern workspace for tasks, courses, and meetings.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Track assignments, schedule meetings, and organize projects in one clean dashboard built with Next.js, TypeScript, Tailwind CSS, and Supabase.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
