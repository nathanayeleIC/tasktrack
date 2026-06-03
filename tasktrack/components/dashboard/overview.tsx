import { format } from '../../lib/utils/date';

const upcomingTasks = [
  {
    id: '1',
    title: 'Finalize project proposal',
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
    course: 'Product Design',
    status: 'In progress'
  },
  {
    id: '2',
    title: 'Review sprint backlog',
    dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
    course: 'Team Ops',
    status: 'Open'
  },
  {
    id: '3',
    title: 'Complete weekly meeting notes',
    dueDate: new Date(Date.now() + 96 * 60 * 60 * 1000),
    course: 'Marketing',
    status: 'Open'
  }
];

export function UpcomingTasks() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h2 className="text-2xl font-semibold text-slate-900">Upcoming tasks</h2>
        <p className="mt-2 text-slate-600">Stay on top of your most important deadlines.</p>
        <div className="mt-6 space-y-4">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{task.course}</p>
                </div>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">{task.status}</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">Due {format(task.dueDate)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h2 className="text-2xl font-semibold text-slate-900">Upcoming meetings</h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Sprint planning</h3>
                <p className="mt-1 text-sm text-slate-600">Engineering team</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Tomorrow</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">Discuss priorities, blockers, and next milestones.</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Course check-in</h3>
                <p className="mt-1 text-sm text-slate-600">Business Analytics</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">Friday</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">Prepare updates for the upcoming student meeting.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
