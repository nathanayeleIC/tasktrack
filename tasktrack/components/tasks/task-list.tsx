'use client';

import { useEffect, useMemo, useState } from 'react';
import { CreateModal, type TaskFormData } from '../ui/create-modal';

type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

type Task = {
  id: string;
  name: string;
  category: string;
  dueDate: string;
  description: string;
  status: TaskStatus;
};

const initialTasks: Task[] = [
  { id: 'task-1', name: 'Prepare design review', category: 'Product Design', dueDate: 'Apr 9, 2026', description: 'Finalize slides before the review.', status: 'Not Started' },
  { id: 'task-2', name: 'Write meeting recap', category: 'Team Ops', dueDate: 'Apr 11, 2026', description: 'Summarize action items from standup.', status: 'In Progress' },
  { id: 'task-3', name: 'Submit assignment draft', category: 'Business Analytics', dueDate: 'Apr 13, 2026', description: 'Send the draft to the professor.', status: 'Completed' }
];

const TASK_STORAGE_KEY = 'tasktrack-tasks';
const CALENDAR_STORAGE_KEY = 'tasktrack-calendar-events';

function normalizeStatus(status?: string): TaskStatus {
  if (!status) return 'Not Started';
  const normal = status.toLowerCase();
  if (normal === 'completed' || normal === 'complete') return 'Completed';
  if (normal === 'in progress' || normal === 'inprogress') return 'In Progress';
  return 'Not Started';
}

function normalizeTask(task: Task): Task {
  return { ...task, status: normalizeStatus(task.status) };
}

function persistCalendarEvent(event: { id: string; title: string; date: string; label: string; color: string; description: string }) {
  if (typeof window === 'undefined') return;
  const raw = window.localStorage.getItem(CALENDAR_STORAGE_KEY);
  const current = raw ? JSON.parse(raw) : [];
  window.localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify([...current, event]));
}

function deleteCalendarEvent(taskId: string) {
  if (typeof window === 'undefined') return;
  const raw = window.localStorage.getItem(CALENDAR_STORAGE_KEY);
  if (!raw) return;
  const filtered = (JSON.parse(raw) as any[]).filter((e) => !e.id.includes(taskId));
  window.localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(filtered));
}

function persistTasks(updated: Task[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updated));
  try {
    window.dispatchEvent(new CustomEvent('tasktrack-tasks-updated', { detail: updated }));
  } catch {
    const ev: any = document.createEvent('CustomEvent');
    ev.initCustomEvent('tasktrack-tasks-updated', false, false, updated);
    window.dispatchEvent(ev);
  }
}

const statusStyles: Record<TaskStatus, string> = {
  'Not Started': 'bg-surface-container-high text-on-surface-variant',
  'In Progress': 'bg-brand-100 text-brand-700',
  Completed: 'bg-sage-50 text-sage-600',
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(TASK_STORAGE_KEY);
    if (raw) {
      try {
        const stored = JSON.parse(raw) as Task[];
        if (stored.length > 0) {
          setTasks(stored.map(normalizeTask));
          return;
        }
      } catch {}
    }
    // Nothing in storage yet — persist initial data so overview can read it
    persistTasks(initialTasks);
  }, []);

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    const updated = tasks.map((task) => (task.id === taskId ? { ...task, status } : task));
    setTasks(updated);
    persistTasks(updated);
  };

  const handleCreateTask = (formData: TaskFormData) => {
    const dueDateTime = formData.date && formData.time ? `${formData.date} ${formData.time}` : formData.date;
    const parsedDate = new Date(dueDateTime);

    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: formData.title.trim(),
      category: formData.category,
      dueDate: parsedDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      description: formData.description || 'No description provided.',
      status: 'Not Started'
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    persistTasks(updated);

    persistCalendarEvent({
      id: `calendar-task-${Date.now()}`,
      title: `${newTask.name} (Due)`,
      date: parsedDate.toISOString(),
      label: `Task • ${newTask.category}`,
      color: 'bg-warning-100 text-warning-900',
      description: newTask.description
    });

    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = tasks.filter((task) => task.id !== taskId);
    setTasks(updated);
    persistTasks(updated);
    deleteCalendarEvent(taskId);
  };

  const statusGroups = useMemo(
    () => ({
      'Not Started': tasks.filter((t) => t.status === 'Not Started'),
      'In Progress': tasks.filter((t) => t.status === 'In Progress'),
      Completed: tasks.filter((t) => t.status === 'Completed'),
    }),
    [tasks]
  );

  return (
    <>
      <div className="rounded-3xl border border-outline-variant bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-on-surface">Task list</h2>
            <p className="mt-2 text-on-surface-variant">Manage tasks for courses, projects, and personal work.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Add new task
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {(['Not Started', 'In Progress', 'Completed'] as TaskStatus[]).map((section) => (
            <div key={section} className="rounded-2xl border border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-on-surface">{section}</h3>
                <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 text-xs font-semibold text-on-surface-variant">
                  {statusGroups[section].length}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {statusGroups[section].length === 0 && (
                  <p className="text-sm italic text-outline">No {section.toLowerCase()} tasks yet.</p>
                )}
                {statusGroups[section].map((task) => (
                  <div key={task.id} className="rounded-2xl border border-outline-variant bg-white p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-on-surface">{task.name}</h4>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-outline">{task.category}</p>
                        <p className="mt-2 text-sm text-on-surface-variant">{task.description}</p>
                      </div>
                      <div className="flex flex-col items-start gap-3 sm:items-end">
                        <div className="flex flex-col gap-2 sm:items-end">
                          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">Status</label>
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                            className="rounded-full border border-outline-variant bg-surface-container-low px-4 py-2 text-sm text-on-surface focus:border-brand-500 focus:outline-none"
                          >
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>
                            {task.status}
                          </span>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="rounded-full bg-blush-50 px-3 py-1 text-xs font-semibold text-blush-700 transition hover:bg-blush-100"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-sm text-outline">Due {task.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTask} type="task" />
    </>
  );
}
