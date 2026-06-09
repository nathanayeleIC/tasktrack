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
  return {
    ...task,
    status: normalizeStatus(task.status)
  };
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
  const current = JSON.parse(raw);
  const filtered = current.filter((event: any) => !event.id.includes(taskId));
  window.localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(filtered));
}

function persistTasks(updatedTasks: Task[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTasks));
  // Dispatch updated tasks payload so other components can refresh immediately
  try {
    window.dispatchEvent(new CustomEvent('tasktrack-tasks-updated', { detail: updatedTasks }));
  } catch {
    // Fallback for environments that don't support CustomEvent constructor
    const ev: any = document.createEvent('CustomEvent');
    ev.initCustomEvent('tasktrack-tasks-updated', false, false, updatedTasks);
    window.dispatchEvent(ev);
  }
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(TASK_STORAGE_KEY);
    if (!raw) return;
    try {
      const stored = JSON.parse(raw) as Task[];
      // If there are stored tasks, use those (avoid duplicating initialTasks)
      if (stored.length > 0) {
        setTasks(stored.map(normalizeTask));
      }
    } catch {
      // ignore invalid storage
    }
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
      'Not Started': tasks.filter((task) => task.status === 'Not Started'),
      'In Progress': tasks.filter((task) => task.status === 'In Progress'),
      Completed: tasks.filter((task) => task.status === 'Completed')
    }),
    [tasks]
  );

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Task list</h2>
            <p className="mt-2 text-slate-600">Manage tasks for courses, projects, and personal work.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
            Add new task
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {(['Not Started', 'In Progress', 'Completed'] as TaskStatus[]).map((section) => (
            <div key={section} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{section}</h3>
                  <p className="text-sm text-slate-600">{statusGroups[section].length} task{statusGroups[section].length === 1 ? '' : 's'}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {statusGroups[section].length === 0 && <p className="text-sm text-slate-500">No {section.toLowerCase()} tasks yet.</p>}
                {statusGroups[section].map((task) => (
                  <div key={task.id} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-900">{task.name}</h4>
                        <p className="mt-1 text-sm font-medium uppercase tracking-[0.1em] text-slate-500">{task.category}</p>
                        <p className="mt-2 text-sm text-slate-600">{task.description}</p>
                      </div>
                      <div className="flex flex-col items-start gap-3 sm:items-end">
                        <div className="flex flex-col gap-2 sm:items-end">
                          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</label>
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                            className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none"
                          >
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-sm text-slate-600">Due {task.dueDate}</p>
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
