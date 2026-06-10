'use client';

import { useEffect, useState } from 'react';

type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

type Task = {
  id: string;
  name: string;
  category: string;
  dueDate: string;
  description: string;
  status: TaskStatus;
};

type Course = {
  id: string;
  name: string;
  description: string;
  color: string;
};

const initialCourses: Course[] = [
  { id: 'course-1', name: 'Product Design', description: 'Design sprints and review cycles.', color: 'bg-sage-50 text-sage-600' },
  { id: 'course-2', name: 'Business Analytics', description: 'Project planning and reporting.', color: 'bg-brand-100 text-brand-700' },
  { id: 'course-3', name: 'Team Ops', description: 'Operations tasks and collaboration.', color: 'bg-blush-50 text-blush-700' }
];

const COURSE_STORAGE_KEY = 'tasktrack-courses';
const TASK_STORAGE_KEY = 'tasktrack-tasks';

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

const statusStyles: Record<TaskStatus, string> = {
  'Not Started': 'bg-surface-container-high text-on-surface-variant',
  'In Progress': 'bg-brand-100 text-brand-700',
  Completed: 'bg-sage-50 text-sage-600',
};

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(TASK_STORAGE_KEY);
    if (!raw) { setTasks([]); return; }
    try {
      setTasks((JSON.parse(raw) as Task[]).map(normalizeTask));
    } catch {}
  };

  useEffect(() => {
    loadTasks();

    const handleTasksUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (Array.isArray(detail)) {
        setTasks(detail.map(normalizeTask));
      } else {
        loadTasks();
      }
    };

    window.addEventListener('tasktrack-tasks-updated', handleTasksUpdate as EventListener);
    window.addEventListener('storage', loadTasks);

    return () => {
      window.removeEventListener('tasktrack-tasks-updated', handleTasksUpdate as EventListener);
      window.removeEventListener('storage', loadTasks);
    };
  }, []);

  const handleDeleteCourse = (courseId: string) => {
    const updated = courses.filter((c) => c.id !== courseId);
    setCourses(updated);
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(window.localStorage.getItem(COURSE_STORAGE_KEY) || '[]') as Course[];
      window.localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(stored.filter((c) => c.id !== courseId)));
    }
  };

  return (
    <div className="rounded-3xl border border-outline-variant bg-white p-8 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-on-surface">Courses & Projects</h2>
          <p className="mt-2 text-on-surface-variant">Organize your work into courses, projects, and groups.</p>
        </div>
        <button className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
          Add course
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {courses.map((course) => {
          const courseTasks = tasks.filter((t) => t.category === course.name);
          return (
            <div key={course.id} className="rounded-2xl border border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-start justify-between">
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${course.color}`}>
                  {course.name}
                </span>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="rounded-full bg-blush-50 px-3 py-1 text-xs font-semibold text-blush-700 transition hover:bg-blush-100"
                >
                  Delete
                </button>
              </div>
              <p className="mt-4 text-sm text-on-surface-variant">{course.description}</p>
              {courseTasks.length > 0 ? (
                <div className="mt-5 space-y-3 border-t border-outline-variant pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-outline">
                    Tasks ({courseTasks.length})
                  </p>
                  {courseTasks.map((task) => (
                    <div key={task.id} className="rounded-xl border border-outline-variant bg-white p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-medium text-on-surface">{task.name}</h4>
                          <p className="mt-0.5 text-xs text-outline">{task.dueDate}</p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusStyles[task.status]}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm italic text-outline">No tasks yet for this course.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
