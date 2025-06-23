import React from 'react';

export default function ThoughtCard({ thought, onDelete }) {
  const { transcription, timestamp } = thought;

  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="relative h-44 p-4 rounded-2xl shadow-md bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 border border-white/70 transition hover:shadow-lg hover:scale-[1.02] duration-200 flex flex-col justify-between backdrop-blur-sm">
      
      {/* Delete button */}
      {onDelete && (
        <button
          onClick={() => {
            if (window.confirm('Delete this thought?')) onDelete();
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm font-bold transition"
          title="Delete"
        >
          ×
        </button>
      )}

      {/* Thought text */}
      <p className="text-sm text-gray-800 font-medium whitespace-pre-wrap line-clamp-4 overflow-hidden">
        {transcription}
      </p>

      {/* Footer */}
      <div className="mt-3 flex justify-between items-center text-xs text-gray-600">
        <span>{formattedDate}</span>
        <button className="text-indigo-600 font-semibold hover:underline">Details</button>
      </div>
    </div>
  );
}