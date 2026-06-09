'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/auth', label: 'Auth' }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-8 lg:block">
      <div className="mb-10 rounded-3xl border border-slate-200 bg-surface-bright px-5 py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-600">TaskTrack</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Productivity Workspace</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? 'bg-brand-500 text-white shadow-[0_12px_30px_-22px_rgba(60,95,228,0.9)]'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-900">All-in-one workspace</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">Create and edit tasks, meetings, and courses directly from the Dashboard.</p>
      </div>
    </aside>
  );
}
