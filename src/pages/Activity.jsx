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
    const savedName = localStorage.getItem("psych_participant_name");
    
    // Only restore participantId if we also have a valid name
    if (pId && savedName && savedName.trim()) {
      setParticipantId(pId);
      setName(savedName);
    } else {
      // Clear invalid state
      localStorage.removeItem("psych_participant_id");
      localStorage.removeItem("psych_participant_name");
    }

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
      const data = await res.json();
      
      // Check if the current user is in the participants list
      if (participantId && data.participants) {
        const userExists = data.participants.some(p => p.id == participantId);
        if (!userExists) {
          // User was removed from DB (e.g., admin reset), clear local state
          localStorage.removeItem("psych_participant_id");
          localStorage.removeItem("psych_participant_name");
          setParticipantId(null);
          setName("");
          toast.info("Session has been reset. Please re-register.");
        }
      }
      
      return data;
    },
    refetchInterval: 3000,
    enabled: true,
  });

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      const res = await fetch("/api/activity/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), sessionId }),
      });
      const result = await res.json();
      if (result.success) {
        setParticipantId(result.participantId);
        localStorage.setItem("psych_participant_id", result.participantId);
        localStorage.setItem("psych_participant_name", name.trim());
        toast.success("Joined the lobby!");
      } else {
        toast.error(result.error || "Failed to join");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleResetRegistration = () => {
    localStorage.removeItem("psych_participant_id");
    localStorage.removeItem("psych_participant_name");
    setParticipantId(null);
    setName("");
    toast.success("Registration reset. You can now re-register.");
  };

  if (!participantId) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
              Live Activity
            </div>
            <h1 className="text-black text-4xl font-bold leading-tight">
              Join the Experiment
            </h1>
            <p className="text-gray-600 text-base">
              Enter your name to participate in the diagnostic exercise
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                placeholder="First and Last Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-white border border-green-300 rounded-2xl focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all text-black placeholder-gray-400"
                required
              />
            </div>

            <button className="w-full bg-[#7C3AED] text-white font-bold py-4 rounded-2xl hover:bg-purple-700 transition-all active:scale-[0.98]">
              Enter Lobby
            </button>
          </form>

          <div className="text-center pt-4">
            <Link to="/" className="text-gray-500 text-sm font-medium inline-flex items-center space-x-2 hover:text-gray-700">
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
    <div className="min-h-screen bg-green-50">
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
      <div className="bg-green-50 sticky top-0 z-10 border-b border-green-200">
        <div className="max-w-md mx-auto px-6 py-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-95 transition-transform border border-green-200">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </Link>
              <div>
                <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Live Activity
                </div>
                <h1 className="text-black text-xl font-bold">Exercise</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-white border border-green-200 px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#10B981] rounded-full pulse-glow" />
              <span className="text-gray-600 text-xs font-medium">
                {participants?.length || 0}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl px-4 py-2 border border-green-200 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">You are:</p>
              <p className="text-[#7C3AED] font-semibold">{name || "Unknown"}</p>
            </div>
            <button 
              onClick={handleResetRegistration}
              className="text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-32">
        {!isActive ? (
          <div className="bg-white border border-green-200 rounded-3xl p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#7C3AED] spin" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-black text-2xl font-bold">
                Waiting for Instructor
              </h2>
              <p className="text-gray-600 text-sm">
                The activity will begin shortly
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                In Lobby
              </div>
              <div className="grid grid-cols-2 gap-2">
                {participants?.map((p) => (
                  <div
                    key={p.id}
                    className={`p-3 rounded-xl border text-sm font-medium ${
                      p.id == participantId
                        ? "bg-[#7C3AED]/10 border-[#7C3AED] text-[#7C3AED]"
                        : "bg-green-50 border-green-200 text-black"
                    }`}
                  >
                    {p.name}
                    {p.id == participantId && (
                      <span className="ml-1.5 text-xs opacity-75">(You)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Round */}
            <div className="bg-white border border-green-200 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                    Round
                  </div>
                  <div className="text-black text-4xl font-bold">
                    {state.current_round}
                  </div>
                </div>
                <div className="w-14 h-14 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-[#7C3AED]" />
                </div>
              </div>
            </div>

            {/* Partner Card */}
            <div className="bg-white border border-green-200 rounded-3xl p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Your Partner
                </div>
                <h2 className="text-black text-3xl font-bold">
                  {pairing ? pairing.partner_name : "Awaiting Assignment"}
                </h2>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-[#7C3AED]">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Topic
                  </span>
                </div>
                <p className="text-black text-lg font-medium leading-relaxed">
                  {pairing?.topic || "Introduce yourselves"}
                </p>
              </div>
            </div>

            {/* All Participants */}
            <div className="bg-white border border-green-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-500" />
                <h3 className="text-black text-lg font-bold">
                  All Participants
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {participants?.map((p) => (
                  <div
                    key={p.id}
                    className={`p-3 rounded-xl border text-sm font-medium ${
                      p.id == participantId
                        ? "bg-[#7C3AED]/10 border-[#7C3AED] text-[#7C3AED]"
                        : "bg-green-50 border-green-200 text-gray-700"
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
