import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  FastForward,
  RotateCcw,
  Users,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const [isProcessing, setIsProcessing] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["adminState"],
    queryFn: async () => {
      const res = await fetch("/api/activity/state");
      if (!res.ok) throw new Error("Failed to fetch state");
      return res.json();
    },
    refetchInterval: 2000,
  });

  const handleAction = async (action) => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/activity/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(
          `${action.charAt(0).toUpperCase() + action.slice(1)} completed`,
        );
        refetch();
      } else {
        toast.error(result.error || "Action failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setIsProcessing(false);
    }
  };

  const { state, participants } = data || {};

  return (
    <div className="min-h-screen bg-[#18181B]">
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#18181B] border-b border-zinc-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="w-10 h-10 bg-[#27272A] rounded-full flex items-center justify-center active:scale-95 transition-transform">
                <ChevronLeft className="w-5 h-5 text-zinc-400" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#FF6B4A]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#FF6B4A]" />
                </div>
                <div>
                  <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    Instructor
                  </div>
                  <h1 className="text-white text-xl font-bold">Control</h1>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${
                state?.is_active
                  ? "bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]"
                  : "bg-zinc-800/50 border-zinc-800 text-zinc-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${state?.is_active ? "bg-[#10B981] pulse-glow" : "bg-zinc-600"}`}
              />
              <span className="text-xs font-medium">
                {state?.is_active ? "Active" : "Standby"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-32">
        {/* Status */}
        <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-6 space-y-6">
          <h2 className="text-white text-xl font-bold">Session Status</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                Round
              </div>
              <div className="text-white text-4xl font-bold">
                {state?.current_round || 0}
              </div>
            </div>

            <div>
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                Participants
              </div>
              <div className="text-white text-4xl font-bold">
                {participants?.length || 0}
              </div>
            </div>
          </div>

          {state?.is_active && state?.current_topic && (
            <div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4">
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                Current Topic
              </div>
              <p className="text-white text-base font-medium">
                {state.current_topic}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-white text-lg font-bold">Controls</h3>

          <div className="space-y-3">
            {!state?.is_active ? (
              <button
                onClick={() => handleAction("start")}
                disabled={isProcessing || (participants?.length || 0) < 2}
                className="w-full flex items-center justify-center space-x-3 bg-[#FF6B4A] hover:bg-[#FF5A39] disabled:opacity-50 disabled:hover:bg-[#FF6B4A] text-white p-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
              >
                <Play className="w-5 h-5" />
                <span>Start Activity</span>
              </button>
            ) : (
              <button
                onClick={() => handleAction("next")}
                disabled={isProcessing}
                className="w-full flex items-center justify-center space-x-3 bg-[#10B981] hover:bg-[#059669] text-white p-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
              >
                <FastForward className="w-5 h-5" />
                <span>Switch Partners</span>
              </button>
            )}

            <button
              onClick={() => {
                if (
                  confirm(
                    "Reset all data? This will clear participants and pairings.",
                  )
                ) {
                  handleAction("reset");
                }
              }}
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 p-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          {(participants?.length || 0) < 2 && !state?.is_active && (
            <div className="bg-[#FF6B4A]/10 border border-[#FF6B4A]/20 p-4 rounded-2xl">
              <p className="text-[#FF6B4A] text-sm">
                Need at least 2 participants to start
              </p>
            </div>
          )}
        </div>

        {/* Participants */}
        <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-zinc-400" />
              <h3 className="text-white text-lg font-bold">Lobby</h3>
            </div>
            <div className="w-8 h-8 bg-[#18181B] border border-zinc-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {participants?.length || 0}
              </span>
            </div>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {participants?.length === 0 && (
              <div className="text-center py-8 text-zinc-500 text-sm">
                No participants yet
              </div>
            )}
            {participants?.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-[#18181B] border border-zinc-800 p-3 rounded-xl"
              >
                <span className="text-zinc-300 text-sm font-medium">
                  {p.name}
                </span>
                <div className="w-2 h-2 bg-[#10B981] rounded-full pulse-glow" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FF6B4A]/5 border border-[#FF6B4A]/10 p-5 rounded-2xl">
          <div className="text-[#FF6B4A] text-xs font-medium uppercase tracking-wider mb-2">
            Instructions
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Students scan QR code to join. Press{" "}
            <strong className="text-white">Start Activity</strong> to begin. Use{" "}
            <strong className="text-white">Switch Partners</strong> to rotate
            pairings.
          </p>
        </div>
      </div>
    </div>
  );
}
