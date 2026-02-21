import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Book, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#18181B] p-6">
      <div className="max-w-3xl mx-auto pt-12 pb-24 space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em]">
            IB PSYCHOLOGY
          </div>
          <h1 className="text-white text-6xl font-bold leading-tight">
            Schizophrenia Study
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed">
            Interactive learning platform for diagnostic criteria and research studies
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#27272A]/80 border border-zinc-800/50 rounded-3xl p-6">
            <div className="text-white text-5xl font-bold mb-2">2</div>
            <div className="text-zinc-500 text-sm">Studies</div>
          </div>
          <div className="bg-[#27272A]/80 border border-zinc-800/50 rounded-3xl p-6">
            <div className="text-white text-5xl font-bold mb-2">5+</div>
            <div className="text-zinc-500 text-sm">Criteria</div>
          </div>
          <div className="bg-[#27272A]/80 border border-zinc-800/50 rounded-3xl p-6">
            <div className="text-white text-5xl font-bold mb-2">DSM</div>
            <div className="text-zinc-500 text-sm">Reference</div>
          </div>
        </div>

        {/* Learn Card */}
        <Link
          to="/learn"
          className="group block bg-[#27272A]/60 border border-zinc-800/50 rounded-3xl p-8 hover:bg-[#27272A] transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#FF6B4A]/20 rounded-2xl flex items-center justify-center">
                <Book className="w-8 h-8 text-[#FF6B4A]" />
              </div>
              <div className="space-y-3">
                <h2 className="text-white text-4xl font-bold">Learn</h2>
                <p className="text-zinc-400 text-base max-w-md">
                  Explore DSM-5 diagnostic criteria and foundational research studies
                </p>
              </div>
            </div>
            <div className="w-14 h-14 bg-zinc-800/50 rounded-full flex items-center justify-center group-hover:bg-zinc-700/50 transition-colors">
              <ArrowRight className="w-6 h-6 text-zinc-400" />
            </div>
          </div>
        </Link>

        {/* Activity Card */}
        <Link
          to="/activity"
          className="group block bg-[#27272A]/60 border border-zinc-800/50 rounded-3xl p-8 hover:bg-[#27272A] transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#10B981]/20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-[#10B981]" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <h2 className="text-white text-4xl font-bold">Activity</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                    <span className="text-[#10B981] text-sm font-medium">Live</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-base max-w-md">
                  Join the live socialization experiment and diagnostic exercise
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Instructor Access */}
        <Link
          to="/admin"
          className="group flex items-center justify-center space-x-2 text-zinc-500 hover:text-zinc-400 transition-colors py-4"
        >
          <span className="text-base font-medium">Instructor Access</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
