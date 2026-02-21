import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronLeft, Loader2, Users, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function Activity() {
  const [name, setName] = useState("");
  const [participantId, setParticipantId] = useState(null);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const pId = localStorage.getItem("psych_participant_id");
    if (pId) setParticipantId(pId);

    let sId = localStorage.getItem("psych_session_id");
    if (!sId) {
      sId = Math.random().toString(36).substring(7);
      localStorage.setItem("psych_session_id", sId);
    }
    setSessionId(sId);
  }, []);

  useEffect(() => {
    if (!participantId) return;

    const interval = setInterval(() => {
      fetch("/api/activity/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId }),
      }).catch(console.error);
    }, 15000);

    return () => clearInterval(interval);
  }, [participantId]);

  const { data, refetch } = useQuery({
    queryKey: ["activityState", participantId],
    queryFn: async () => {
      const url = participantId
        ? `/api/activity/state?participantId=${participantId}`
        : "/api/activity/state";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch state");
      return res.json();
    },
    refetchInterval: 3000,
    enabled: true,
  });

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await fetch("/api/activity/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, sessionId }),
      });
      const result = await res.json();
      if (result.success) {
        setParticipantId(result.participantId);
        localStorage.setItem("psych_participant_id", result.participantId);
        toast.success("Joined the lobby!");
      } else {
        toast.error(result.error || "Failed to join");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  if (!participantId) {
    return (
      <div className="min-h-screen bg-[#18181B] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
              Live Activity
            </div>
            <h1 className="text-white text-4xl font-bold leading-tight">
              Join the Experiment
            </h1>
            <p className="text-zinc-400 text-base">
              Enter your name to participate in the diagnostic exercise
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                placeholder="First and Last Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-[#27272A] border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent outline-none transition-all text-white placeholder-zinc-500"
                required
              />
            </div>

            <button className="w-full bg-[#FF6B4A] text-white font-bold py-4 rounded-2xl hover:bg-[#FF5A39] transition-all active:scale-[0.98]">
              Enter Lobby
            </button>
          </form>

          <div className="text-center pt-4">
            <Link to="/" className="text-zinc-500 text-sm font-medium inline-flex items-center space-x-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { state, participants, pairing } = data || {};
  const isActive = state?.is_active;

  return (
    <div className="min-h-screen bg-[#18181B]">
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .spin {
          animation: spin 2s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#18181B] sticky top-0 z-10 border-b border-zinc-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="w-10 h-10 bg-[#27272A] rounded-full flex items-center justify-center active:scale-95 transition-transform">
                <ChevronLeft className="w-5 h-5 text-zinc-400" />
              </Link>
              <div>
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Live Activity
                </div>
                <h1 className="text-white text-xl font-bold">Exercise</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-[#27272A] border border-zinc-800 px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#10B981] rounded-full pulse-glow" />
              <span className="text-zinc-400 text-xs font-medium">
                {participants?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-32">
        {!isActive ? (
          <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#FF6B4A]/10 rounded-2xl flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#FF6B4A] spin" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-white text-2xl font-bold">
                Waiting for Instructor
              </h2>
              <p className="text-zinc-400 text-sm">
                The activity will begin shortly
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                In Lobby
              </div>
              <div className="grid grid-cols-2 gap-2">
                {participants?.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#18181B] border border-zinc-800 p-3 rounded-xl text-zinc-300 text-sm font-medium"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Round */}
            <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
                    Round
                  </div>
                  <div className="text-white text-4xl font-bold">
                    {state.current_round}
                  </div>
                </div>
                <div className="w-14 h-14 bg-[#FF6B4A]/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-[#FF6B4A]" />
                </div>
              </div>
            </div>

            {/* Partner Card */}
            <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Your Partner
                </div>
                <h2 className="text-white text-3xl font-bold">
                  {pairing ? pairing.partner_name : "Awaiting Assignment"}
                </h2>
              </div>

              <div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-[#FF6B4A]">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Topic
                  </span>
                </div>
                <p className="text-white text-lg font-medium leading-relaxed">
                  {state.current_topic || "Introduce yourselves"}
                </p>
              </div>
            </div>

            {/* All Participants */}
            <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-zinc-400" />
                <h3 className="text-white text-lg font-bold">
                  All Participants
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {participants?.map((p) => (
                  <div
                    key={p.id}
                    className={`p-3 rounded-xl border text-sm font-medium ${
                      p.id == participantId
                        ? "bg-[#FF6B4A]/10 border-[#FF6B4A] text-[#FF6B4A]"
                        : "bg-[#18181B] border-zinc-800 text-zinc-400"
                    }`}
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
