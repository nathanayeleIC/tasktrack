export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h1 className="text-3xl font-semibold text-slate-900">Calendar</h1>
        <p className="mt-3 text-slate-600">Review your tasks and meetings in a calendar view.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Monthly Overview</h2>
            <p className="mt-2 text-slate-600">Preview upcoming deadlines and schedule milestones.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Weekly Agenda</h2>
            <p className="mt-2 text-slate-600">See meetings and tasks for the current week.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
