import React from 'react';

export default function TextUpload({ textInput, setTextInput, handleTextSubmit }) {
  return (
    <div className="space-y-2">
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Type your thought here..."
        className="w-full p-3 border rounded resize-none h-24"
      />
      <button
        onClick={handleTextSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Text
      </button>
    </div>
  );
}
