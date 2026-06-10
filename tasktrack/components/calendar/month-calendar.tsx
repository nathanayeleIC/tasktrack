'use client';

import { useEffect, useMemo, useState } from 'react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CALENDAR_STORAGE_KEY = 'tasktrack-calendar-events';

type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  label: string;
  color: string;
  description?: string;
};

const defaultEvents: CalendarEvent[] = [
  {
    id: 'meeting-1',
    title: 'Project kickoff',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
    label: 'Meeting',
    color: 'bg-brand-500 text-white'
  },
  {
    id: 'task-1',
    title: 'Prepare design review',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2),
    label: 'Due date',
    color: 'bg-surface-container-high text-on-surface'
  },
  {
    id: 'meeting-2',
    title: 'Client sync',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 4),
    label: 'Meeting',
    color: 'bg-brand-100 text-brand-700'
  },
  {
    id: 'task-2',
    title: 'Write meeting recap',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5),
    label: 'Due date',
    color: 'bg-warning-100 text-warning-900'
  },
  {
    id: 'meeting-3',
    title: 'Weekly review',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
    label: 'Meeting',
    color: 'bg-sage-50 text-sage-600'
  }
];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells = Array.from({ length: startOffset + totalDays }, (_, index) => {
    const dayNumber = index - startOffset + 1;
    return dayNumber > 0 ? new Date(year, month, dayNumber) : null;
  });

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function formatDateShort(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function loadPersistedEvents(): CalendarEvent[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(CALENDAR_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Array<{ id: string; title: string; date: string; label: string; color: string; description?: string }>;
    return parsed
      .map((e) => ({ ...e, date: new Date(e.date) }))
      .filter((e) => !Number.isNaN(e.date.getTime()));
  } catch {
    return [];
  }
}

export function MonthCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [savedEvents, setSavedEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setSavedEvents(loadPersistedEvents());
  }, []);

  const events = useMemo(() => [...defaultEvents, ...savedEvents], [savedEvents]);
  const monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const grid = useMemo(() => getMonthGrid(currentDate.getFullYear(), currentDate.getMonth()), [currentDate]);

  const eventMap = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((map, event) => {
      const key = event.date.toDateString();
      if (!map[key]) map[key] = [];
      map[key].push(event);
      return map;
    }, {});
  }, [events]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[32px] border border-outline-variant bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">Calendar</p>
          <h2 className="mt-3 text-3xl font-semibold text-on-surface">Month view</h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">All meetings and task due dates are shown below.</p>
        </div>
        <div className="inline-flex items-center gap-3 rounded-3xl border border-outline-variant bg-surface-container-low px-4 py-2 text-sm font-semibold text-on-surface">
          <button
            onClick={() => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            className="rounded-full bg-white px-3 py-2 transition hover:bg-surface-container"
          >
            Prev
          </button>
          <span>{monthLabel}</span>
          <button
            onClick={() => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            className="rounded-full bg-white px-3 py-2 transition hover:bg-surface-container"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[32px] border border-outline-variant bg-white p-5 shadow-soft">
          <div className="grid grid-cols-7 gap-2 border-b border-outline-variant pb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-outline">
            {days.map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2 pt-4">
            {grid.map((date, index) => {
              const key = date?.toDateString() ?? `empty-${index}`;
              const dayEvents = date ? eventMap[date.toDateString()] : undefined;
              const isCurrentMonth = date && date.getMonth() === currentDate.getMonth();
              const isToday = date?.toDateString() === today.toDateString();
              return (
                <div
                  key={key}
                  className={`min-h-[115px] rounded-2xl border p-3 text-sm ${
                    date
                      ? isCurrentMonth
                        ? isToday
                          ? 'border-brand-300 bg-brand-50'
                          : 'border-outline-variant bg-white'
                        : 'border-outline-variant/50 bg-surface-container-low text-outline'
                      : 'border-transparent bg-transparent'
                  }`}
                >
                  {date && (
                    <div className="flex items-start justify-between">
                      <span className={`text-sm font-semibold ${isToday ? 'text-brand-600' : 'text-on-surface'}`}>
                        {date.getDate()}
                      </span>
                      {isToday && (
                        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Today</span>
                      )}
                    </div>
                  )}
                  <div className="mt-2 space-y-1">
                    {dayEvents?.slice(0, 2).map((event) => (
                      <div key={event.id} className={`overflow-hidden rounded-xl px-2 py-1 text-xs font-semibold ${event.color}`}>
                        {event.title}
                      </div>
                    ))}
                    {dayEvents && dayEvents.length > 2 && (
                      <div className="rounded-xl bg-surface-container px-2 py-1 text-xs text-outline">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[32px] border border-outline-variant bg-white p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-on-surface">Event details</h3>
          <div className="mt-5 space-y-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-2xl border border-outline-variant bg-surface-container-low p-4">
                <p className="text-sm font-semibold text-on-surface">{event.title}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-outline">{event.label}</p>
                <p className="mt-1.5 text-sm text-on-surface-variant">{formatDateShort(event.date)}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
