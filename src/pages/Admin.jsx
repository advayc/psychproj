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
  Maximize2,
  X,
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
  const [showFullscreenQR, setShowFullscreenQR] = useState(false);

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

  // Handle ESC key to close fullscreen QR
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showFullscreenQR) {
        setShowFullscreenQR(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFullscreenQR]);

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
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white border border-green-200 rounded-3xl p-8 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#7C3AED]" />
              </div>
              <div className="text-center">
                <h1 className="text-black text-2xl font-bold">Admin Access</h1>
                <p className="text-gray-500 text-sm mt-2">
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
                  className="w-full bg-green-50 border border-green-300 text-black px-4 py-4 pr-12 rounded-2xl focus:outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED] transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                className="w-full bg-[#7C3AED] hover:bg-purple-700 text-white py-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>

            <Link
              to="/"
              className="block text-center text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
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
      <div className="bg-green-50 border-b border-green-200">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-95 transition-transform border border-green-200">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#7C3AED]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    Instructor
                  </div>
                  <h1 className="text-black text-xl font-bold">Control</h1>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${
                state?.is_active
                  ? "bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]"
                  : "bg-green-100 border-green-200 text-gray-500"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${state?.is_active ? "bg-[#10B981] pulse-glow" : "bg-gray-400"}`}
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
        <div className="bg-white border border-green-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <QrCode className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="text-black text-xl font-bold">Join Activity</h2>
            </div>
            <button
              onClick={() => setShowFullscreenQR(true)}
              className="flex items-center space-x-2 bg-[#7C3AED] hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-all active:scale-95"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="text-sm">Fullscreen</span>
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl flex items-center justify-center border border-green-100">
            <QRCodeSVG
              value={`${window.location.origin}/activity`}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/10 p-4 rounded-2xl">
            <p className="text-[#7C3AED] text-sm text-center font-medium">
              Students scan this QR code to join
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              {window.location.origin}/activity
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white border border-green-200 rounded-3xl p-6 space-y-6">
          <h2 className="text-black text-xl font-bold">Session Status</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                Round
              </div>
              <div className="text-black text-4xl font-bold">
                {state?.current_round || 0}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                Participants
              </div>
              <div className="text-black text-4xl font-bold">
                {participants?.length || 0}
              </div>
            </div>
          </div>

          {state?.is_active && state?.current_topic && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                Current Topic
              </div>
              <p className="text-black text-base font-medium">
                {state.current_topic}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-white border border-green-200 rounded-3xl p-6 space-y-4">
          <h3 className="text-black text-lg font-bold">Controls</h3>

          <div className="space-y-3">
            {!state?.is_active ? (
              <button
                onClick={() => handleAction("start")}
                disabled={isProcessing || (participants?.length || 0) < 2}
                className="w-full flex items-center justify-center space-x-3 bg-[#7C3AED] hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-[#7C3AED] text-white p-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
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
                    "⚠️ FULL RESET - This will:\n\n" +
                    "• Stop the activity\n" +
                    "• Delete ALL participants\n" +
                    "• Delete ALL pairings\n" +
                    "• Reset round to 0\n\n" +
                    "Note: Participants may still have cached data in their browsers. " +
                    "They should refresh or click 'Reset' on their page.\n\n" +
                    "Are you sure?"
                  )
                ) {
                  handleAction("reset");
                }
              }}
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 p-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Full Reset</span>
            </button>

            <button
              onClick={() => {
                if (
                  confirm(
                    "Clear all participants?\n\n" +
                    "This will remove all current participants from the lobby. " +
                    "The activity state and round number will remain.\n\n" +
                    "Participants will need to re-join."
                  )
                ) {
                  handleAction("clear-participants");
                }
              }}
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-500 p-3 rounded-2xl font-medium text-sm transition-all active:scale-[0.98]"
            >
              <Users className="w-4 h-4" />
              <span>Clear Participants</span>
            </button>
          </div>

          {(participants?.length || 0) < 2 && !state?.is_active && (
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 p-4 rounded-2xl">
              <p className="text-[#7C3AED] text-sm">
                Need at least 2 participants to start
              </p>
            </div>
          )}
        </div>

        {/* Participants */}
        <div className="bg-white border border-green-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-500" />
              <h3 className="text-black text-lg font-bold">Lobby</h3>
            </div>
            <div className="w-8 h-8 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center">
              <span className="text-black text-sm font-bold">
                {participants?.length || 0}
              </span>
            </div>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {participants?.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No participants yet
              </div>
            )}
            {participants?.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-xl"
              >
                <span className="text-black text-sm font-medium">
                  {p.name}
                </span>
                <div className="w-2 h-2 bg-[#10B981] rounded-full pulse-glow" />
              </div>
            ))}
          </div>
        </div>

        {/* Current Pairings */}
        {state?.is_active && pairings?.length > 0 && (
          <div className="bg-white border border-green-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ArrowRightLeft className="w-5 h-5 text-gray-500" />
                <h3 className="text-black text-lg font-bold">Current Pairings</h3>
              </div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Round {state.current_round}
              </div>
            </div>

            <div className="space-y-3">
              {pairings.map((pairing) => (
                <div
                  key={pairing.id}
                  className="bg-green-50 border border-green-200 rounded-2xl p-4"
                >
                  {editingPairing === pairing.id ? (
                    <div className="space-y-3">
                      <div className="text-black text-sm font-medium mb-2">
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
                                  : "bg-white border border-green-200 text-black hover:bg-green-50"
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
                        className="w-full text-center text-gray-500 text-sm py-2 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-[#7C3AED]/10 px-3 py-1.5 rounded-lg">
                            <span className="text-[#7C3AED] text-sm font-medium">
                              {pairing.participant_a_name}
                            </span>
                          </div>
                          <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                          <div className="bg-[#10B981]/10 px-3 py-1.5 rounded-lg">
                            <span className="text-[#10B981] text-sm font-medium">
                              {pairing.participant_b_name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingPairing(pairing.id)}
                        className="px-3 py-1.5 bg-white border border-green-200 rounded-lg text-gray-500 text-xs font-medium hover:bg-green-50 transition-colors"
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

        <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/10 p-5 rounded-2xl">
          <div className="text-[#7C3AED] text-xs font-medium uppercase tracking-wider mb-2">
            Instructions
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Share the QR code above for students to join. Press{" "}
            <strong className="text-black">Start Activity</strong> to begin. Use{" "}
            <strong className="text-black">Switch Partners</strong> to rotate
            pairings.
          </p>
        </div>
      </div>

      {/* Fullscreen QR Code Modal */}
      {showFullscreenQR && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setShowFullscreenQR(false)}
        >
          <button
            onClick={() => setShowFullscreenQR(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex flex-col items-center space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <QRCodeSVG
                value={`${window.location.origin}/activity`}
                size={400}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-white text-3xl font-bold">Scan to Join</h2>
              <p className="text-gray-400 text-lg font-mono">
                {window.location.origin}/activity
              </p>
              <p className="text-gray-500 text-sm">
                Click anywhere or press ESC to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
