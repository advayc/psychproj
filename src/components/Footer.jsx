import React from 'react';

export default function Footer() {
  return (
    <div className="mt-24 pt-12 border-t border-green-200">
      <div className="flex items-center justify-center gap-4">
        <button className="group px-6 py-3 rounded-full border border-green-200 hover:border-[#7C3AED]/50 transition-all duration-300 flex items-center space-x-3 bg-white">
          <span className="text-xl">📚</span>
          
          <span className="text-black text-xs font-light tracking-wide group-hover:text-gray-600 transition-colors duration-300">
            Wood's Teaching Seminar
          </span>
        </button>
      </div>
    </div>
  );
}
