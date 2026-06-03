const courses = [
  { id: 'course-1', name: 'Product Design', description: 'Design sprints and review cycles.', color: 'bg-sky-200 text-sky-900' },
  { id: 'course-2', name: 'Business Analytics', description: 'Project planning and reporting.', color: 'bg-emerald-200 text-emerald-900' },
  { id: 'course-3', name: 'Team Ops', description: 'Operations tasks and collaboration.', color: 'bg-purple-200 text-purple-900' }
];

export function CourseList() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Courses & Projects</h2>
          <p className="mt-2 text-slate-600">Organize your work into courses, projects, and groups.</p>
        </div>
        <button className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
          Add course
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <div key={course.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${course.color}`}>
              {course.name}
            </div>
            <p className="mt-4 text-sm text-slate-600">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
