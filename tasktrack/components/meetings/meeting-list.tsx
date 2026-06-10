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
  const filtered = (JSON.parse(raw) as any[]).filter((e) => !e.id.includes(meetingId));
  window.localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(filtered));
}

function persistMeetings(updated: Meeting[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MEETING_STORAGE_KEY, JSON.stringify(updated));
  try {
    window.dispatchEvent(new CustomEvent('tasktrack-meetings-updated', { detail: updated }));
  } catch {
    const ev: any = document.createEvent('CustomEvent');
    ev.initCustomEvent('tasktrack-meetings-updated', false, false, updated);
    window.dispatchEvent(ev);
  }
}

export function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(MEETING_STORAGE_KEY);
    if (raw) {
      try {
        const stored = JSON.parse(raw) as Meeting[];
        if (stored.length > 0) {
          setMeetings(stored);
          return;
        }
      } catch {}
    }
    // Nothing in storage yet — persist initial data so overview can read it
    persistMeetings(initialMeetings);
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
    persistMeetings(updated);

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
    const updated = meetings.filter((m) => m.id !== meetingId);
    setMeetings(updated);
    persistMeetings(updated);
    deleteCalendarEvent(meetingId);
  };

  return (
    <>
      <div className="rounded-3xl border border-outline-variant bg-white p-8 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-on-surface">Meeting schedule</h2>
            <p className="mt-2 text-on-surface-variant">Plan upcoming meetings and review your agenda.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Create meeting
          </button>
        </div>
        <div className="mt-8 space-y-4">
          {meetings.length === 0 && (
            <p className="text-sm italic text-outline">No meetings yet.</p>
          )}
          {meetings.map((meeting) => (
            <div key={meeting.id} className="rounded-2xl border border-outline-variant bg-surface-container-low p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-on-surface">{meeting.title}</h3>
                    <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-on-surface-variant">
                      {meeting.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-on-surface-variant">{meeting.description}</p>
                  <p className="mt-1 text-sm text-outline">{meeting.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-sage-50 px-3 py-1 text-sm font-semibold text-sage-600">
                    {meeting.date}
                  </span>
                  <button
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    className="rounded-full bg-blush-50 px-3 py-1 text-sm font-semibold text-blush-700 transition hover:bg-blush-100"
                  >
                    Delete
                  </button>
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
