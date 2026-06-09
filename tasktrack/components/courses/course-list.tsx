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
  { id: 'course-1', name: 'Product Design', description: 'Design sprints and review cycles.', color: 'bg-sky-200 text-sky-900' },
  { id: 'course-2', name: 'Business Analytics', description: 'Project planning and reporting.', color: 'bg-emerald-200 text-emerald-900' },
  { id: 'course-3', name: 'Team Ops', description: 'Operations tasks and collaboration.', color: 'bg-purple-200 text-purple-900' }
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
  return {
    ...task,
    status: normalizeStatus(task.status)
  };
}

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(TASK_STORAGE_KEY);
    if (!raw) {
      setTasks([]);
      return;
    }
    try {
      const stored = JSON.parse(raw) as Task[];
      setTasks(stored.map(normalizeTask));
    } catch {
      // ignore invalid storage
    }
  };

  useEffect(() => {
    loadTasks();

    const handleStorageUpdate = (e?: Event) => {
      // If the event carries the updated tasks, use them directly
      try {
        const ce = e as any;
        if (ce && ce.detail && Array.isArray(ce.detail)) {
          setTasks(ce.detail.map(normalizeTask));
          return;
        }
      } catch {
        // ignore
      }
      loadTasks();
    };

    window.addEventListener('tasktrack-tasks-updated', handleStorageUpdate as EventListener);
    window.addEventListener('storage', handleStorageUpdate as EventListener);

    return () => {
      window.removeEventListener('tasktrack-tasks-updated', handleStorageUpdate as EventListener);
      window.removeEventListener('storage', handleStorageUpdate as EventListener);
    };
  }, []);

  const getTasksForCourse = (courseName: string) => {
    return tasks.filter((task) => task.category === courseName);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((current) => current.filter((course) => course.id !== courseId));
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(window.localStorage.getItem(COURSE_STORAGE_KEY) || '[]') as Course[];
      window.localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(stored.filter((c) => c.id !== courseId)));
    }
  };

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
        {courses.map((course) => {
          const courseTasks = getTasksForCourse(course.name);
          return (
            <div key={course.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-start justify-between">
                <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${course.color}`}>
                  {course.name}
                </div>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-600">{course.description}</p>
              {courseTasks.length > 0 && (
                <div className="mt-5 space-y-3 border-t border-slate-200 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Associated Tasks ({courseTasks.length})</p>
                  {courseTasks.map((task) => (
                    <div key={task.id} className="rounded-2xl border border-slate-200 bg-white p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">{task.name}</h4>
                          <p className="mt-1 text-xs text-slate-500">{task.dueDate}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-700">
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {courseTasks.length === 0 && (
                <p className="mt-5 text-sm text-slate-500 italic">No tasks yet for this course</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
