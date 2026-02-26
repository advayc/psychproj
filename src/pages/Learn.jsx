import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CheckCircle2, Lightbulb, X, ZoomIn } from "lucide-react";
import Footer from "../components/Footer";
import AnimatedOnScroll from "../components/AnimatedOnScroll";
import { DSM_CRITERIA, TREATMENTS } from "../lib/content";

// content now imported from src/lib/content.js

export default function Learn() {
  const [activeTab, setActiveTab] = useState("dsm");
  const [zoomedSrc, setZoomedSrc] = useState(null);
  const [isZoomedOpen, setIsZoomedOpen] = useState(false);

  useEffect(() => {
    if (zoomedSrc) {
      setIsZoomedOpen(false);
      requestAnimationFrame(() => setIsZoomedOpen(true));
      document.body.style.overflow = "hidden";
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setZoomedSrc(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    document.body.style.overflow = "";
    setIsZoomedOpen(false);
    return undefined;
  }, [zoomedSrc]);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-green-50 sticky top-0 z-10 border-b border-green-200">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-95 transition-transform border border-green-200">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Resources
              </div>
              <h1 className="text-black text-xl font-bold">Learn</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={`mx-auto px-6 py-6 pb-32 ${activeTab === "case" ? "max-w-4xl" : "max-w-md"}`}>
        {/* Tabs */}
        <div className="flex gap-0.5 bg-white p-1 rounded-2xl mb-6 border border-green-200 overflow-x-auto justify-center">
          {[
            { key: "dsm", label: "DSM-5" },
            { key: "case", label: "Case Study" },
            { key: "treatments", label: "Treatment" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${activeTab === tab.key ? "bg-[#7C3AED] text-white" : "text-gray-600"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DSM Content */}
        {activeTab === "dsm" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                Definition
              </div>
              <p className="text-black text-sm leading-relaxed">
                Schizophrenia is a chronic, severe brain disorder affecting how
                a person thinks, feels, and acts, often causing them to lose
                touch with reality.
              </p>
            </div>

            {DSM_CRITERIA.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-green-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#7C3AED]/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black text-base font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RevisionHub / Treatments Content */}
        {activeTab === "treatments" && (
          <div className="space-y-4">
            {/* Note at top */}
            <div className="bg-green-100 rounded-2xl p-4 flex gap-3 items-start border border-green-300">
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5">
                <Lightbulb className="w-5 h-5 text-[#7C3AED] stroke-[1.8]" />
              </div>
              <div className="text-black text-[13px] leading-relaxed">
                <strong className="text-black font-semibold">Note:</strong> There's no objective cure for schizophrenia, but there are treatments to help manage the symptoms! Keep in mind that these treatments use a biopsychosocial approach.
              </div>
            </div>

            {/* Treatment categories */}
            {TREATMENTS.map((treatment, i) => (
              <div key={i} className="space-y-3">
                <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px]">
                  {treatment.category}
                </div>
                {treatment.items.map((item, j) => (
                  <div
                    key={j}
                    className="bg-white rounded-2xl p-5 border border-green-200"
                  >
                    <h3 className="text-black text-base font-bold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Case Study Content: display only large images from Case File */}
        {activeTab === "case" && (
          <div className="space-y-6">
            <div className="w-full">
              <div className="space-y-6">
                {[
                  "/Case FIle/1.png",
                  "/Case FIle/2.png",
                  "/Case FIle/3.png",
                  "/Case FIle/4.png",
                ].map((src, idx) => (
                  <AnimatedOnScroll key={src} className="w-full">
                    <div className="w-full overflow-hidden rounded-2xl border bg-white shadow-sm relative">
                      <button
                        type="button"
                        onClick={() => setZoomedSrc(src)}
                        className="absolute top-3 right-3 bg-white/95 text-black p-2 rounded-full border border-green-200 shadow-sm hover:bg-white transition-colors"
                        aria-label={`Zoom in to case image ${idx + 1}`}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <img
                        src={src}
                        alt={`case image ${idx + 1}`}
                        className="w-full h-[64vh] md:h-[72vh] lg:h-[78vh] object-contain"
                      />
                    </div>
                  </AnimatedOnScroll>
                ))}
              </div>
            </div>
          </div>
        )}

        {zoomedSrc && (
          <div
            className={`fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 py-6 transition-opacity duration-200 ${isZoomedOpen ? "opacity-100" : "opacity-0"}`}
            role="dialog"
            aria-modal="true"
            onClick={() => setZoomedSrc(null)}
          >
            <div
              className={`relative w-full max-w-5xl transition-transform duration-200 ease-out ${isZoomedOpen ? "scale-100" : "scale-95"}`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="bg-white rounded-2xl border border-green-200 overflow-hidden relative">
                <button
                  type="button"
                  onClick={() => setZoomedSrc(null)}
                  className="absolute top-3 right-3 bg-white/90 text-black p-2 rounded-full border border-white/60 shadow-sm hover:bg-white transition-colors backdrop-blur"
                  aria-label="Close zoomed image"
                >
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={zoomedSrc}
                  alt="Zoomed case study"
                  className="w-full max-h-[85vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
