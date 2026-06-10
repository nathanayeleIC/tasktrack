'use client';

import { useEffect, useState } from 'react';

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  type?: 'task' | 'event';
};

export type TaskFormData = {
  title: string;
  category: string;
  priority: string;
  date: string;
  time: string;
  description: string;
  type: 'task' | 'event';
};

const categories = ['Product Design', 'Business Analytics', 'Team Ops', 'Marketing', 'Engineering', 'General'];
const priorities = ['Low', 'Medium', 'High'];

export function CreateModal({ isOpen, onClose, onSubmit, type = 'task' }: CreateModalProps) {
  const [activeTab, setActiveTab] = useState<'task' | 'event'>(type);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    category: categories[0],
    priority: 'Medium',
    date: '',
    time: '',
    description: '',
    type: 'task'
  });

  useEffect(() => {
    setActiveTab(type);
    setFormData((prev) => ({ ...prev, type }));
  }, [type]);

  const handleInputChange = (field: keyof Omit<TaskFormData, 'type'>, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { alert('Please enter a title'); return; }
    if (!formData.date) { alert('Please enter a date'); return; }
    onSubmit({ ...formData, type: activeTab });
    setFormData({ title: '', category: categories[0], priority: 'Medium', date: '', time: '', description: '', type: 'task' });
  };

  if (!isOpen) return null;

  const inputClass = 'mt-3 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-5 py-3 text-on-surface placeholder-outline focus:border-brand-500 focus:bg-white focus:outline-none';
  const labelClass = 'block text-xs font-semibold uppercase tracking-[0.2em] text-outline';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/20 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-outline-variant bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-outline-variant px-8 py-6">
          <h2 className="text-2xl font-semibold text-on-surface">Create New</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-outline transition hover:bg-surface-container hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2 border-b border-outline-variant px-8 pt-6">
          {(['task', 'event'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setFormData((prev) => ({ ...prev, type: tab }));
              }}
              className={`rounded-t-2xl px-6 py-3 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'border-b-2 border-brand-500 bg-brand-50 text-brand-700'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={activeTab === 'task' ? 'What needs to be done?' : 'Event title'}
              className={inputClass}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className={inputClass}>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select value={formData.priority} onChange={(e) => handleInputChange('priority', e.target.value)} className={inputClass}>
                {priorities.map((pri) => <option key={pri} value={pri}>{pri}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Time</label>
              <input type="time" value={formData.time} onChange={(e) => handleInputChange('time', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Notes (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Add additional details..."
              rows={4}
              className={inputClass}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-outline-variant px-6 py-3 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
