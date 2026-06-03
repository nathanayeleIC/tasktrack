import { MeetingList } from '../../components/meetings/meeting-list';

export default function MeetingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
          <h1 className="text-3xl font-semibold text-slate-900">Meetings</h1>
          <p className="mt-3 text-slate-600">Schedule meetings and link them to your courses or projects.</p>
        </div>
        <MeetingList />
      </div>
    </main>
  );
}
