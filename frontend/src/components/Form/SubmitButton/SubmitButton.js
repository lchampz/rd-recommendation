import React from 'react';

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
    >
      <span className="text-lg">🚀</span>
      <span>{text}</span>
    </button>
  );
}

export default SubmitButton;
