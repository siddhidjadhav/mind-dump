import React from 'react';

export default function ThoughtCard({ thought, onDelete }) {
  const { transcription, category = 'Uncategorized', timestamp } = thought;

  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });

  const fullCategory = category.replace(/ > /g, ' → ');

  const categoryColors = {
    'Personal → Emotions': 'bg-rose-100 text-rose-800',
    'Personal → Daily Routine': 'bg-fuchsia-100 text-fuchsia-800',
    'Personal → Relationships': 'bg-purple-100 text-purple-800',
    'Personal → Health & Fitness': 'bg-pink-100 text-pink-800',
    'Personal → Life Reflections': 'bg-violet-100 text-violet-800',

    'Work & Career → Meetings': 'bg-yellow-100 text-yellow-800',
    'Work & Career → Deadlines & Planning': 'bg-amber-100 text-amber-800',
    'Work & Career → Office Politics': 'bg-orange-100 text-orange-800',
    'Work & Career → Job Search': 'bg-lime-100 text-lime-800',
    'Work & Career → Productivity': 'bg-green-100 text-green-800',

    'Education → Research & Thesis': 'bg-indigo-100 text-indigo-800',
    'Education → School / College Topics': 'bg-sky-100 text-sky-800',
    'Education → Assignments & Exams': 'bg-blue-100 text-blue-800',
    'Education → Learning New Skills': 'bg-teal-100 text-teal-800',
    'Education → Online Courses': 'bg-cyan-100 text-cyan-800',
    'Education → Study Plans': 'bg-emerald-100 text-emerald-800',

    'Science & Technology → Computer Science → Programming': 'bg-emerald-100 text-emerald-800',
    'Science & Technology → Computer Science → AI & ML': 'bg-green-100 text-green-800',
    'Science & Technology → Computer Science → Web/Mobile Development': 'bg-lime-100 text-lime-800',
    'Science & Technology → Computer Science → Data Structures': 'bg-teal-100 text-teal-800',
    'Science & Technology → Engineering': 'bg-yellow-100 text-yellow-800',
    'Science & Technology → Mathematics': 'bg-purple-100 text-purple-800',
    'Science & Technology → Space & Physics': 'bg-indigo-100 text-indigo-800',
    'Science & Technology → Biology & Medicine': 'bg-pink-100 text-pink-800',
    'Science & Technology → Environmental Science': 'bg-blue-100 text-blue-800',

    'Arts & Humanities → Painting / Drawing': 'bg-red-100 text-red-800',
    'Arts & Humanities → Literature / Poetry': 'bg-rose-100 text-rose-800',
    'Arts & Humanities → Philosophy': 'bg-gray-100 text-gray-800',
    'Arts & Humanities → History': 'bg-yellow-100 text-yellow-800',
    'Arts & Humanities → Music / Performing Arts': 'bg-indigo-100 text-indigo-800',

    'Social & Culture → Family & Traditions': 'bg-amber-100 text-amber-800',
    'Social & Culture → Festivals & Events': 'bg-orange-100 text-orange-800',
    'Social & Culture → Religion & Spirituality': 'bg-purple-100 text-purple-800',
    'Social & Culture → Social Issues': 'bg-red-100 text-red-800',
    'Social & Culture → Languages & Communication': 'bg-teal-100 text-teal-800',

    'Finance & Economics → Personal Finance': 'bg-green-100 text-green-800',
    'Finance & Economics → Budgeting': 'bg-lime-100 text-lime-800',
    'Finance & Economics → Investing': 'bg-emerald-100 text-emerald-800',
    'Finance & Economics → Business & Startups': 'bg-blue-100 text-blue-800',
    'Finance & Economics → Global Economy': 'bg-indigo-100 text-indigo-800',

    'Entertainment → Movies / TV Shows': 'bg-pink-100 text-pink-800',
    'Entertainment → Music': 'bg-purple-100 text-purple-800',
    'Entertainment → Games': 'bg-violet-100 text-violet-800',
    'Entertainment → Memes': 'bg-rose-100 text-rose-800',
    'Entertainment → Celebrities': 'bg-orange-100 text-orange-800',

    'Lifestyle → Food & Cooking': 'bg-amber-100 text-amber-800',
    'Lifestyle → Travel': 'bg-sky-100 text-sky-800',
    'Lifestyle → Fashion': 'bg-pink-100 text-pink-800',
    'Lifestyle → Interior Design': 'bg-blue-100 text-blue-800',
    'Lifestyle → Hobbies': 'bg-lime-100 text-lime-800',

    'News & Current Events → Politics': 'bg-red-100 text-red-800',
    'News & Current Events → International Affairs': 'bg-indigo-100 text-indigo-800',
    'News & Current Events → Local News': 'bg-gray-100 text-gray-800',
    'News & Current Events → Climate & Environment': 'bg-green-100 text-green-800',
    'News & Current Events → Technology Updates': 'bg-blue-100 text-blue-800',

    'Meta / Abstract Thoughts → Random Ideas': 'bg-yellow-100 text-yellow-800',
    'Meta / Abstract Thoughts → Dreams': 'bg-violet-100 text-violet-800',
    'Meta / Abstract Thoughts → “Shower Thoughts”': 'bg-cyan-100 text-cyan-800',
    'Meta / Abstract Thoughts → Philosophical Musings': 'bg-gray-200 text-gray-700',

    'Uncategorized': 'bg-zinc-200 text-zinc-700'
  };

  const badgeClass = categoryColors[fullCategory] || categoryColors['Uncategorized'];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 relative space-y-4 transition hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
          {fullCategory}
        </div>
        {onDelete && (
          <button
            onClick={() => {
              if (window.confirm('Delete this thought?')) onDelete();
            }}
            className="text-gray-400 hover:text-red-500 transition text-sm font-bold"
            title="Delete"
          >
            ×
          </button>
        )}
      </div>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{transcription}</p>
      <div className="text-xs text-gray-500 text-right">{formattedDate}</div>
    </div>
  );
}
