import { UpcomingTasks } from '../../components/dashboard/overview';
import { TaskList } from '../../components/tasks/task-list';
import { MeetingList } from '../../components/meetings/meeting-list';
import { CourseList } from '../../components/courses/course-list';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-600">Dashboard</p>
              <h1 className="text-4xl font-semibold text-slate-900">Overview</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full bg-success-500" />
              Active workspace
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-slate-600">Manage your tasks, meetings, and courses all in one place.</p>
        </div>

        <div className="space-y-6">
          <UpcomingTasks />
          <TaskList />
          <MeetingList />
          <CourseList />
        </div>
      </div>
    </main>
  );
}
