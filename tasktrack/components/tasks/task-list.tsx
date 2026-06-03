const tasks = [
  { id: 'task-1', name: 'Prepare design review', dueDate: 'Apr 9, 2026', status: 'Open' },
  { id: 'task-2', name: 'Write meeting recap', dueDate: 'Apr 11, 2026', status: 'In progress' },
  { id: 'task-3', name: 'Submit assignment draft', dueDate: 'Apr 13, 2026', status: 'Completed' }
];

export function TaskList() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Task list</h2>
          <p className="mt-2 text-slate-600">Manage tasks for courses, projects, and personal work.</p>
        </div>
        <button className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
          Add new task
        </button>
      </div>
      <div className="mt-8 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{task.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{task.dueDate}</p>
              </div>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">{task.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
