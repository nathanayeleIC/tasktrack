'use client';

import { useEffect, useState } from 'react';
import { CreateModal, type TaskFormData } from '../ui/create-modal';

type Meeting = {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
};

const initialMeetings: Meeting[] = [
  { id: 'meeting-1', title: 'Project kickoff', category: 'Product Design', date: 'Apr 10, 2026', location: 'Room 204', description: 'Align on goals and deliverables.' },
  { id: 'meeting-2', title: 'Client sync', category: 'Business Analytics', date: 'Apr 12, 2026', location: 'Zoom', description: 'Review progress and next steps.' },
  { id: 'meeting-3', title: 'Weekly review', category: 'Team Ops', date: 'Apr 14, 2026', location: 'Teams', description: 'Recap accomplishments and blockers.' }
];

const MEETING_STORAGE_KEY = 'tasktrack-meetings';
const CALENDAR_STORAGE_KEY = 'tasktrack-calendar-events';

function persistCalendarEvent(event: { id: string; title: string; date: string; label: string; color: string; description: string }) {
  if (typeof window === 'undefined') return;
  const raw = window.localStorage.getItem(CALENDAR_STORAGE_KEY);
  const current = raw ? JSON.parse(raw) : [];
  window.localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify([...current, event]));
}

function deleteCalendarEvent(meetingId: string) {
  if (typeof window === 'undefined') return;
  const raw = window.localStorage.getItem(CALENDAR_STORAGE_KEY);
  if (!raw) return;
  const current = JSON.parse(raw);
  const filtered = current.filter((event: any) => !event.id.includes(meetingId));
  window.localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(filtered));
}

export function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(MEETING_STORAGE_KEY);
    if (!raw) return;
    try {
      const stored = JSON.parse(raw) as Meeting[];
      setMeetings((current) => [...current, ...stored]);
    } catch {
      // ignore invalid storage
    }
  }, []);

  const handleCreateMeeting = (formData: TaskFormData) => {
    const meetingDateTime = formData.date && formData.time ? `${formData.date} ${formData.time}` : formData.date;
    const parsedDate = new Date(meetingDateTime);

    const newMeeting: Meeting = {
      id: `meeting-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      date: parsedDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      location: formData.priority === 'High' ? 'In-person' : 'Virtual',
      description: formData.description || 'No description provided.'
    };

    const updated = [...meetings, newMeeting];
    setMeetings(updated);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(MEETING_STORAGE_KEY, JSON.stringify([...(JSON.parse(window.localStorage.getItem(MEETING_STORAGE_KEY) || '[]') as Meeting[]), newMeeting]));
    }

    persistCalendarEvent({
      id: `calendar-meeting-${Date.now()}`,
      title: newMeeting.title,
      date: parsedDate.toISOString(),
      label: `Meeting • ${newMeeting.category}`,
      color: 'bg-brand-100 text-brand-800',
      description: newMeeting.description
    });

    setIsModalOpen(false);
  };

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings((current) => current.filter((meeting) => meeting.id !== meetingId));
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(window.localStorage.getItem(MEETING_STORAGE_KEY) || '[]') as Meeting[];
      window.localStorage.setItem(MEETING_STORAGE_KEY, JSON.stringify(stored.filter((m) => m.id !== meetingId)));
    }
    deleteCalendarEvent(meetingId);
  };

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Meeting schedule</h2>
            <p className="mt-2 text-slate-600">Plan upcoming meetings and review your agenda.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
            Create meeting
          </button>
        </div>
        <div className="mt-8 space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">{meeting.title}</h3>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{meeting.category}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{meeting.description}</p>
                  <p className="mt-2 text-sm text-slate-600">{meeting.location}</p>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <div className="flex gap-2">
                    <p className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">{meeting.date}</p>
                    <button
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateMeeting} type="event" />
    </>
  );
}
