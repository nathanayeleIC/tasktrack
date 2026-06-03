const meetings = [
  { id: 'meeting-1', title: 'Project kickoff', date: 'Apr 10, 2026', location: 'Room 204' },
  { id: 'meeting-2', title: 'Client sync', date: 'Apr 12, 2026', location: 'Zoom' },
  { id: 'meeting-3', title: 'Weekly review', date: 'Apr 14, 2026', location: 'Teams' }
];

export function MeetingList() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Meeting schedule</h2>
          <p className="mt-2 text-slate-600">Plan upcoming meetings and review your agenda.</p>
        </div>
        <button className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
          Create meeting
        </button>
      </div>
      <div className="mt-8 space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{meeting.title}</h3>
                <p className="text-sm text-slate-600">{meeting.location}</p>
              </div>
              <p className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">{meeting.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
