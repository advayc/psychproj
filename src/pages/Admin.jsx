import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  FastForward,
  RotateCcw,
  Users,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowRightLeft,
  QrCode,
} from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

export default function Admin() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pairings, setPairings] = useState([]);
  const [editingPairing, setEditingPairing] = useState(null);

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const { data, refetch } = useQuery({
    queryKey: ["adminState"],
    queryFn: async () => {
      const res = await fetch("/api/activity/state");
      if (!res.ok) throw new Error("Failed to fetch state");
      return res.json();
    },
    refetchInterval: 2000,
    enabled: isAuthenticated,
  });

  // Fetch pairings when activity is active
  const { data: pairingsData, refetch: refetchPairings } = useQuery({
    queryKey: ["pairings"],
    queryFn: async () => {
      const res = await fetch("/api/activity/pairings");
      if (!res.ok) throw new Error("Failed to fetch pairings");
      return res.json();
    },
    refetchInterval: 2000,
    enabled: isAuthenticated && data?.state?.is_active,
  });

  useEffect(() => {
    if (pairingsData?.pairings) {
      setPairings(pairingsData.pairings);
    }
  }, [pairingsData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/activity/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      if (result.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuth", "true");
        toast.success("Welcome, Admin!");
      } else {
        toast.error("Invalid password");
        setPassword("");
      }
    } catch (error) {
      toast.error("Authentication failed");
    }
  };

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
        if (action === "next" || action === "start") {
          refetchPairings();
        }
      } else {
        toast.error(result.error || "Action failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdatePairing = async (pairingId, newPartnerId) => {
    try {
      const res = await fetch("/api/activity/update-pairing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pairingId, newPartnerId }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Pairing updated");
        refetchPairings();
        setEditingPairing(null);
      } else {
        toast.error(result.error || "Update failed");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const { state, participants } = data || {};

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#18181B] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-[#FF6B4A]/10 rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#FF6B4A]" />
              </div>
              <div className="text-center">
                <h1 className="text-white text-2xl font-bold">Admin Access</h1>
                <p className="text-zinc-400 text-sm mt-2">
                  Enter password to continue
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full bg-[#18181B] border border-zinc-800 text-white px-4 py-4 pr-12 rounded-2xl focus:outline-none focus:border-[#FF6B4A]/50 transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6B4A] hover:bg-[#FF5A39] text-white py-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>

            <Link
              to="/"
              className="block text-center text-zinc-400 text-sm hover:text-zinc-300 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        {/* QR Code */}
        <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <QrCode className="w-5 h-5 text-[#FF6B4A]" />
            <h2 className="text-white text-xl font-bold">Join Activity</h2>
          </div>
          
          <div className="bg-white p-6 rounded-2xl flex items-center justify-center">
            <QRCodeSVG
              value={`${window.location.origin}/activity`}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="bg-[#FF6B4A]/5 border border-[#FF6B4A]/10 p-4 rounded-2xl">
            <p className="text-[#FF6B4A] text-sm text-center font-medium">
              Students scan this QR code to join
            </p>
            <p className="text-zinc-400 text-xs text-center mt-1">
              {window.location.origin}/activity
            </p>
          </div>
        </div>

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

        {/* Current Pairings */}
        {state?.is_active && pairings?.length > 0 && (
          <div className="bg-[#27272A] border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ArrowRightLeft className="w-5 h-5 text-zinc-400" />
                <h3 className="text-white text-lg font-bold">Current Pairings</h3>
              </div>
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                Round {state.current_round}
              </div>
            </div>

            <div className="space-y-3">
              {pairings.map((pairing) => (
                <div
                  key={pairing.id}
                  className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4"
                >
                  {editingPairing === pairing.id ? (
                    <div className="space-y-3">
                      <div className="text-white text-sm font-medium mb-2">
                        Change partner for {pairing.participant_a_name}:
                      </div>
                      <div className="space-y-2">
                        {participants
                          ?.filter((p) => p.id !== pairing.participant_a_id)
                          .map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleUpdatePairing(pairing.id, p.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                p.id === pairing.participant_b_id
                                  ? "bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981]"
                                  : "bg-[#27272A] border border-zinc-800 text-zinc-300 hover:bg-[#27272A]/50"
                              }`}
                            >
                              <span className="text-sm font-medium">{p.name}</span>
                              {p.id === pairing.participant_b_id && (
                                <span className="ml-2 text-xs">(current)</span>
                              )}
                            </button>
                          ))}
                      </div>
                      <button
                        onClick={() => setEditingPairing(null)}
                        className="w-full text-center text-zinc-400 text-sm py-2 hover:text-zinc-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-[#FF6B4A]/10 px-3 py-1.5 rounded-lg">
                            <span className="text-[#FF6B4A] text-sm font-medium">
                              {pairing.participant_a_name}
                            </span>
                          </div>
                          <ArrowRightLeft className="w-4 h-4 text-zinc-600" />
                          <div className="bg-[#10B981]/10 px-3 py-1.5 rounded-lg">
                            <span className="text-[#10B981] text-sm font-medium">
                              {pairing.participant_b_name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingPairing(pairing.id)}
                        className="px-3 py-1.5 bg-[#27272A] border border-zinc-800 rounded-lg text-zinc-400 text-xs font-medium hover:bg-[#27272A]/50 transition-colors"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#FF6B4A]/5 border border-[#FF6B4A]/10 p-5 rounded-2xl">
          <div className="text-[#FF6B4A] text-xs font-medium uppercase tracking-wider mb-2">
            Instructions
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Share the QR code above for students to join. Press{" "}
            <strong className="text-white">Start Activity</strong> to begin. Use{" "}
            <strong className="text-white">Switch Partners</strong> to rotate
            pairings.
          </p>
        </div>
      </div>
    </div>
  );
}
