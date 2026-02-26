import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Lightbulb } from "lucide-react";
import Footer from "../components/Footer";
import { STUDIES, TIPS } from "../lib/content";

export default function Revision() {
  const [activeTab, setActiveTab] = useState("fad");
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#tips") {
      setActiveTab("tips");
    }
  }, [location.hash]);

  useEffect(() => {
    if (activeTab === "tips" && location.hash === "#tips") {
      const el = document.getElementById("tips");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeTab, location.hash]);

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
              <h1 className="text-black text-xl font-bold">Exam Revision Hub</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={`mx-auto px-6 py-6 pb-32 ${activeTab === "studies" ? "max-w-4xl" : "max-w-md"}`}>
        {/* Tabs */}
        <div className="flex gap-0.5 bg-white p-1 rounded-2xl mb-6 border border-green-200 overflow-x-auto justify-center">
          {[
            { key: "fad", label: "FAD" },
            { key: "studies", label: "Studies" },
            { key: "tips", label: "Tips" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${(activeTab === tab.key) ? "bg-[#7C3AED] text-white" : "text-gray-600"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DSM content moved to /studies (main page). Learn now focuses on FAD, Treatments, Tips */}

        {/* Studies Content */}
        {activeTab === "studies" && (
          <div className="space-y-6">
            {STUDIES.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-green-200">
                <div className="flex items-start justify-between">
                  <h3 className="text-black text-2xl font-extrabold">{s.name}</h3>
                  <div className="text-[#7C3AED] text-lg font-bold ml-4">{s.year}</div>
                </div>

                <div className="mt-5">
                  <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px] mb-2">Aim</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{s.aim}</p>
                </div>

                {s.method && (
                  <div className="mt-5">
                    <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px] mb-2">Method</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{s.method}</p>
                  </div>
                )}

                {s.procedure && (
                  <div className="mt-5">
                    <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px] mb-2">Procedure</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{s.procedure}</p>
                  </div>
                )}

                {s.results && (
                  <div className="mt-5">
                    <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px] mb-2">Results</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{s.results}</p>
                  </div>
                )}

                {s.conclusion && (
                  <div className="mt-5">
                    <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px] mb-3">Conclusion</div>
                    <div className="bg-green-100 rounded-xl p-4 border border-green-200">
                      <p className="text-gray-800 text-sm leading-relaxed">{s.conclusion}</p>
                    </div>
                  </div>
                )}

                {s.application && (
                  <div className="mt-5">
                    <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px] mb-2">Application</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{s.application}</p>
                    {/* Tip bubble for Rosenhan study */}
                    {s.name === "Rosenhan et al." && (
                      <div className="bg-purple-50 border border-[#7C3AED] rounded-xl p-4 mt-3 flex gap-3 items-start">
                        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5">
                          <Lightbulb className="w-5 h-5 text-[#7C3AED] stroke-[1.8]" />
                        </div>
                        <div className="text-black text-[13px] leading-relaxed">
                          <strong className="text-black font-semibold">Note:</strong> This study and/or the followup can be used in answering an ERQ question regarding confirmation bias or the paper 2 question we have selected! While discussing both demonstrates fundamental understanding of the study, your ERQ should still remain focused on the prescribed question. See our <Link to="/revision#tips" className="text-[#7C3AED] underline underline-offset-2 hover:text-purple-800 transition-colors">tips</Link> for more information!
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Studies content removed from this page (now on /studies) */}

        {/* FAD Content */}
        {activeTab === "fad" && (
          <div className="space-y-6">
            {/* Paper 2 Question Box */}
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <div className="text-[#7C3AED] text-xs font-semibold uppercase tracking-[2px] mb-3">
                Paper 2 · ERQ Question
              </div>
              <div className="text-black text-base font-semibold leading-snug mb-3">
                "Discuss one or more factors of diagnosis of one or more disorders."
              </div>
              <div className="text-gray-600 text-[13px] leading-relaxed">
                A variant of this question was asked during the{' '}
                <a
                  href="/Psychology_paper_2__HL.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C3AED] font-semibold underline underline-offset-2 hover:text-purple-800 transition-colors"
                >
                  November 2019 Session!
                </a>
              </div>
            </div>

            <div className="text-gray-500 text-xs font-medium uppercase tracking-[1.5px]">
              Factors Affecting Diagnosis
            </div>

            {/* Common Mistake Tip */}
            <div className="bg-green-100 rounded-2xl p-4 flex gap-3 items-start border border-green-300">
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5">
                <Lightbulb className="w-5 h-5 text-[#7C3AED] stroke-[1.8]" />
              </div>
              <div className="text-black text-[13px] leading-relaxed">
                <strong className="text-black font-semibold">Common mistake to avoid:</strong> Many students describe the studies in detail but forget to explicitly answer the question. The studies are there to support the significance of the FAD. To score on the higher band of evaluation your ERQ must focus on answering the question, not discussing the studies.
              </div>
            </div>

            {/* FAD Card 1: Confirmation Bias */}
            <div className="bg-white rounded-2xl p-6 mb-4 border border-green-200">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-black text-xl font-bold leading-tight">
                  Confirmation Bias
                </h3>
                <div className="text-[#7C3AED] text-[22px] font-bold">01</div>
              </div>

              {/* Nested Tip */}
              <div className="bg-green-100 rounded-2xl p-4 mb-5 flex gap-3 items-start border border-green-300">
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5">
                  <Lightbulb className="w-5 h-5 text-[#7C3AED] stroke-[1.8]" />
                </div>
                <div className="text-black text-[13px] leading-relaxed">
                  <strong className="text-black font-semibold">ERQ tip:</strong> It is also correct to state labelling as the FAD, and confirmation bias is the mechanism that sustains it.
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  Why It's Important
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                  Once a clinician forms an initial impression, it acts as a filter for all subsequent information. In psychiatry, where there are no objective biomarkers, the clinician's interpretive framework carries enormous weight, making this bias particularly consequential.
                </div>
              </div>

              <div className="h-px bg-green-200 my-4"></div>

              <div className="mb-4">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  Impact
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                  Diagnostic errors become skewed toward confirming first impressions rather than correcting them. Rosenhan (1973) showed this clearly, as pseudopatients' normal behaviour was reinterpreted to fit their schizophrenia label. Note-taking became "obsessive writing." Pacing became "anxiety."
                </div>
              </div>

              <div className="h-px bg-green-200 my-4"></div>

              <div className="mb-4">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  How It Affects Diagnosis
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                  It distorts the clinical encounter from the first moment. Referral notes, appearance, and initial symptoms all prime the clinician before a full picture is gathered. Disconfirming evidence is unconsciously discounted. Once applied, the label becomes almost impossible to remove, as no Rosenhan pseudopatient was ever identified as sane by staff.
                </div>
              </div>

              <div className="bg-green-100 rounded-xl p-4 mt-4 border border-green-200">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  So What?
                </div>
                <div className="text-black text-[13.5px] leading-relaxed">
                 Diagnosis becomes as much a reflection of the clinician's cognitive tendencies as the patient's actual condition. It undermines reliability, raises ethical concerns about whether patient disagreement is genuinely heard, and connects both studies. Rosenhan demonstrates it in practice, while Copeland shows it operating at a cultural and institutional scale.
                </div>
              </div>
            </div>

            {/* FAD Card 2: Cultural Bias */}
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-black text-xl font-bold leading-tight">
                  Cultural Bias
                </h3>
                <div className="text-[#7C3AED] text-[22px] font-bold">02</div>
              </div>

              <div className="mb-4">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  Why It's Important
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                  Diagnosis is a human judgment made within a cultural framework. The DSM was developed through Western psychiatry, meaning clinicians trained within that system apply a culturally narrow lens to patients whose backgrounds may differ significantly.
                </div>
              </div>

              <div className="h-px bg-green-200 my-4"></div>

              <div className="mb-4">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  Impact
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                  Produces systematic diagnostic errors that disproportionately affect ethnic minorities and non-Western individuals. Behaviours that are culturally normative, such as hearing ancestral voices, risk being pathologised by a clinician lacking cultural competence.
                </div>
              </div>

              <div className="h-px bg-green-200 my-4"></div>

              <div className="mb-4">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  How It Affects Diagnosis
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                  At the clinician level, implicit bias shapes which symptoms are weighted. At the instrument level, the DSM itself embeds cultural assumptions. Copeland et al. (1971) demonstrated this directly, as the same patient vignette produced a schizophrenia diagnosis from 69% of American psychiatrists but only 2% of British psychiatrists.
                </div>
              </div>

              <div className="bg-green-100 rounded-xl p-4 mt-4 border border-green-200">
                <div className="text-[#7C3AED] text-[10px] font-semibold uppercase tracking-[2px] mb-2">
                  So What?
                </div>
                <div className="text-black text-[13.5px] leading-relaxed">
                  Misdiagnosis rooted in cultural misunderstanding leads to wrong treatment, unnecessary hospitalisation, and eroded trust in psychiatric services among marginalised communities. It fundamentally challenges the reliability and validity of diagnosis as a universal process.
                </div>
              </div>
              </div>
          </div>
        )}

        {/* Tips Content */}
        {activeTab === "tips" && (
          <div className="space-y-6" id="tips">
            {TIPS.map((tip, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-green-200 space-y-3"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-black text-lg font-bold pt-0.5">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
            <div className="bg-green-100 rounded-2xl p-6 border border-green-200 mt-8">
              <p className="text-gray-600 text-center text-sm">Best of luck! 😁👍</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
