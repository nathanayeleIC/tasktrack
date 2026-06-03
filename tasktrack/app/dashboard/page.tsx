import { UpcomingTasks } from '../../components/dashboard/overview';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-3 text-slate-600">A quick view of your upcoming tasks, active projects, and scheduled meetings.</p>
        </div>
        <UpcomingTasks />
      </div>
    </main>
  );
}
