import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, Book } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#18181B] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-white text-5xl font-bold leading-tight">
            Psychology Experiment
          </h1>
          <p className="text-zinc-400 text-lg">
            Interactive diagnostic exercise platform
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/activity"
            className="w-full bg-[#FF6B4A] text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-[#FF5A39] transition-colors active:scale-95"
          >
            <Users className="w-6 h-6" />
            <span>Join Activity</span>
          </Link>

          <Link
            to="/learn"
            className="w-full bg-[#27272A] text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-[#3F3F46] transition-colors active:scale-95"
          >
            <Book className="w-6 h-6" />
            <span>Learn</span>
          </Link>

          <Link
            to="/admin"
            className="w-full bg-[#27272A] text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-[#3F3F46] transition-colors active:scale-95"
          >
            <Shield className="w-6 h-6" />
            <span>Admin Panel</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
