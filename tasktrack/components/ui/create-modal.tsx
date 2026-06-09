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

const categories = [
  'Product Design',
  'Business Analytics',
  'Team Ops',
  'Marketing',
  'Engineering',
  'General'
];

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
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!formData.date) {
      alert('Please enter a date');
      return;
    }
    onSubmit({ ...formData, type: activeTab });
    setFormData({
      title: '',
      category: categories[0],
      priority: 'Medium',
      date: '',
      time: '',
      description: '',
      type: 'task'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-slate-200 bg-white shadow-soft">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
          <h2 className="text-2xl font-semibold text-slate-900">Create New</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200 px-8 pt-6">
          {['task', 'event'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as 'task' | 'event');
                setFormData((prev) => ({ ...prev, type: tab as 'task' | 'event' }));
              }}
              className={`rounded-t-3xl px-6 py-3 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'border-b-2 border-brand-500 text-brand-600 bg-brand-50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={activeTab === 'task' ? 'What needs to be done?' : 'Event title'}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 focus:border-brand-500 focus:bg-white focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 focus:border-brand-500 focus:bg-white focus:outline-none"
              >
                {priorities.map((pri) => (
                  <option key={pri} value={pri}>
                    {pri}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 focus:border-brand-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 focus:border-brand-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Notes (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Add additional details..."
              rows={4}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-3xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
