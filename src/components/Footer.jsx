import React from 'react';

export default function Footer() {
  return (
    <div className="mt-24 pt-12 border-t border-zinc-800/30">
      <div className="flex items-center justify-center">
        <button className="group px-6 py-3 rounded-full border border-zinc-800/50 hover:border-[#FF6B4A]/50 transition-all duration-300 flex items-center space-x-3">
          {/* Brain Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          >
            {/* Brain outline */}
            <path
              d="M 6 14 C 5 13 4 11 4 9 C 4 6 6 3 9 3 C 10 3 11 3.5 12 4 C 13 3.5 14 3 15 3 C 18 3 20 6 20 9 C 20 11 19 13 18 14 C 18 15 18 16 17 17 L 17 20 C 17 21 16.5 21.5 16 21.5 L 8 21.5 C 7.5 21.5 7 21 7 20 L 7 17 C 6 16 6 15 6 14 Z"
              stroke="#FF6B4A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Left lobe */}
            <path
              d="M 8 8 Q 6 9 6 11"
              stroke="#FF6B4A"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
              fill="none"
            />
            {/* Right lobe */}
            <path
              d="M 16 8 Q 18 9 18 11"
              stroke="#FF6B4A"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
              fill="none"
            />
            {/* Center detail */}
            <path
              d="M 12 8 Q 11 10 12 12 Q 13 10 12 8"
              stroke="#FF6B4A"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.6"
              fill="none"
            />
          </svg>
          
          <span className="text-zinc-400 text-xs font-light tracking-wide group-hover:text-zinc-300 transition-colors duration-300">
            Wood's Teaching Seminar
          </span>
        </button>
      </div>
    </div>
  );
}
