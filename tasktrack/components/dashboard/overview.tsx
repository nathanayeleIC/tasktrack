'use client';

import { useEffect, useState } from 'react';

const TASK_STORAGE_KEY = 'tasktrack-tasks';
const MEETING_STORAGE_KEY = 'tasktrack-meetings';

type Task = {
  id: string;
  name: string;
  category: string;
  dueDate: string;
  status: string;
};

type Meeting = {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

function readUpcomingTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(TASK_STORAGE_KEY);
  if (!raw) return [];
  try {
    return (JSON.parse(raw) as Task[])
      .filter((t) => t.status !== 'Completed')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  } catch {
    return [];
  }
}

function readUpcomingMeetings(): Meeting[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(MEETING_STORAGE_KEY);
  if (!raw) return [];
  try {
    return (JSON.parse(raw) as Meeting[]).slice(0, 3);
  } catch {
    return [];
  }
}

export function UpcomingTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    setTasks(readUpcomingTasks());
    setMeetings(readUpcomingMeetings());

    const handleTasksUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (Array.isArray(detail)) {
        setTasks(
          (detail as Task[])
            .filter((t) => t.status !== 'Completed')
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 3)
        );
      } else {
        setTasks(readUpcomingTasks());
      }
    };

    const handleMeetingsUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (Array.isArray(detail)) {
        setMeetings((detail as Meeting[]).slice(0, 3));
      } else {
        setMeetings(readUpcomingMeetings());
      }
    };

    const handleStorage = () => {
      setTasks(readUpcomingTasks());
      setMeetings(readUpcomingMeetings());
    };

    window.addEventListener('tasktrack-tasks-updated', handleTasksUpdate);
    window.addEventListener('tasktrack-meetings-updated', handleMeetingsUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('tasktrack-tasks-updated', handleTasksUpdate);
      window.removeEventListener('tasktrack-meetings-updated', handleMeetingsUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-outline-variant bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-on-surface">Upcoming tasks</h2>
        <p className="mt-2 text-on-surface-variant">Stay on top of your most important deadlines.</p>
        <div className="mt-6 space-y-4">
          {tasks.length === 0 && (
            <p className="text-sm italic text-outline">No upcoming tasks yet.</p>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="rounded-2xl border border-outline-variant bg-surface-container-low p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-on-surface">{task.name}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{task.category}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  task.status === 'In Progress'
                    ? 'bg-brand-100 text-brand-700'
                    : 'bg-sage-50 text-sage-600'
                }`}>
                  {task.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-outline">Due {task.dueDate}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-outline-variant bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-on-surface">Upcoming meetings</h2>
        <p className="mt-2 text-on-surface-variant">Your next scheduled events.</p>
        <div className="mt-6 space-y-4">
          {meetings.length === 0 && (
            <p className="text-sm italic text-outline">No upcoming meetings yet.</p>
          )}
          {meetings.map((meeting) => (
            <div key={meeting.id} className="rounded-2xl border border-outline-variant bg-surface-container-low p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-on-surface">{meeting.title}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{meeting.category}</p>
                </div>
                <span className="rounded-full bg-sage-50 px-3 py-1 text-xs font-semibold text-sage-600">
                  {meeting.date}
                </span>
              </div>
              <p className="mt-3 text-sm text-outline">{meeting.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
