import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CheckCircle2, Book, Lightbulb } from "lucide-react";

const DSM_CRITERIA = [
  {
    title: "Hallucinations",
    desc: "Experiencing sensations that are not real, such as hearing voices (most common), seeing, smelling, or feeling things.",
  },
  {
    title: "Delusions",
    desc: "Strongly held false beliefs not based in reality, often involving paranoia.",
  },
  {
    title: "Disorganized Speech",
    desc: "Difficulty organizing thoughts, switching topics rapidly, or speaking in 'word salad'.",
  },
  {
    title: "Disorganized Motor Behavior",
    desc: "Ranging from child-like silliness to unpredictable agitation or catatonia.",
  },
  {
    title: "Negative Symptoms",
    desc: "Reduced motivation (avolition), flat affect, and lack of pleasure (anhedonia).",
  },
];

const STUDIES = [
  {
    name: "Copeland et al.",
    year: "1971",
    aim: "Investigate if psychiatrists from US vs UK diagnose the same patient differently for schizophrenia.",
    method:
      "Quasi-experimental design using standardized clinical case descriptions shown to psychiatrists in both countries.",
    results:
      "69% of US psychiatrists diagnosed schizophrenia, while only 2% of UK psychiatrists did for identical patient presentations. British clinicians often diagnosed mood disorders instead.",
    conclusion:
      "Diagnosis is influenced by cultural and professional context. Psychiatric diagnosis is not purely objective—identical symptoms can be interpreted differently depending on training and country.",
    application:
      "Clinicians need awareness of cultural differences. Diagnostic tools (DSM/ICD) must be applied carefully considering patient's cultural background.",
  },
  {
    name: "Rosenhan",
    year: "1973",
    aim: "Test if psychiatrists can distinguish between sane and insane individuals and examine validity of psychiatric diagnosis.",
    method:
      "Field experiment with covert participant observation. 8 mentally healthy 'pseudopatients' sought admission to 12 US hospitals.",
    procedure:
      "Pseudopatients claimed to hear voices saying 'empty,' 'hollow,' 'thud.' After admission, behaved completely normally.",
    results:
      "7 diagnosed with schizophrenia, 1 with manic depression. Stayed 7–52 days (avg. 19). All discharged with 'schizophrenia in remission.' Normal behaviors like note-taking were interpreted as symptoms.",
    conclusion:
      "Clinicians could not reliably distinguish sane from insane. Diagnostic labels strongly influenced staff interpretation of behavior. Psychiatric diagnosis at the time lacked validity.",
    application:
      "Led to improved diagnostic criteria (DSM-III), structured interviews, and increased awareness of labeling and stigma.",
  },
];

const TIPS = [
  "Always discuss cultural bias in diagnosis. Use Copeland (1971) to show how geography influences diagnostic labels.",
  "Mention validity vs. reliability. Rosenhan (1973) is your go-to for questioning diagnostic validity.",
  "Evaluate your studies: Consider ethical issues (Rosenhan), generalizability, and application to real-world clinical practice.",
  "Use proper APA terminology: 'participants' not 'subjects,' 'diagnosed with' not 'suffering from.'",
  "Structure SAQs clearly: State, Explain, Apply. For ERQs: Introduction, 2-3 studies with APFC, Evaluation, Conclusion.",
];

export default function Learn() {
  const [activeTab, setActiveTab] = useState("dsm");

  return (
    <div className="min-h-screen bg-[#18181B]">
      {/* Header */}
      <div className="bg-[#18181B] sticky top-0 z-10 border-b border-zinc-800">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="w-10 h-10 bg-[#27272A] rounded-full flex items-center justify-center active:scale-95 transition-transform">
              <ChevronLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div>
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                Resources
              </div>
              <h1 className="text-white text-xl font-bold">Learn</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-32">
        {/* Tabs */}
        <div className="flex bg-[#27272A] p-1 rounded-2xl mb-6">
          <button
            onClick={() => setActiveTab("dsm")}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "dsm" ? "bg-[#FF6B4A] text-white" : "text-zinc-400"
            }`}
          >
            DSM-5
          </button>
          <button
            onClick={() => setActiveTab("studies")}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "studies"
                ? "bg-[#FF6B4A] text-white"
                : "text-zinc-400"
            }`}
          >
            Studies
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "tips" ? "bg-[#FF6B4A] text-white" : "text-zinc-400"
            }`}
          >
            Tips
          </button>
        </div>

        {/* DSM Content */}
        {activeTab === "dsm" && (
          <div className="space-y-4">
            <div className="bg-[#27272A] rounded-2xl p-6 border border-zinc-800">
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                Definition
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Schizophrenia is a chronic, severe brain disorder affecting how
                a person thinks, feels, and acts, often causing them to lose
                touch with reality.
              </p>
            </div>

            {DSM_CRITERIA.map((item, i) => (
              <div
                key={i}
                className="bg-[#27272A] rounded-2xl p-5 border border-zinc-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#FF6B4A]/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6B4A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-base font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Studies Content */}
        {activeTab === "studies" && (
          <div className="space-y-6">
            {STUDIES.map((study, i) => (
              <div
                key={i}
                className="bg-[#27272A] rounded-2xl p-6 border border-zinc-800 space-y-5"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-white text-2xl font-bold">
                    {study.name}
                  </h3>
                  <span className="text-[#FF6B4A] text-lg font-bold">
                    {study.year}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                      Aim
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {study.aim}
                    </p>
                  </div>

                  <div>
                    <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                      Results
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {study.results}
                    </p>
                  </div>

                  <div className="bg-[#18181B] rounded-xl p-4 border border-zinc-800">
                    <div className="text-[#FF6B4A] text-xs font-medium uppercase tracking-wider mb-2">
                      Conclusion
                    </div>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {study.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Content */}
        {activeTab === "tips" && (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-white text-2xl font-bold mb-2">
                Paper 2 Strategy
              </h2>
              <p className="text-zinc-400 text-sm">
                Essential guidelines for IB Psychology assessments
              </p>
            </div>

            {TIPS.map((tip, i) => (
              <div
                key={i}
                className="bg-[#27272A] rounded-2xl p-5 border border-zinc-800 flex items-start space-x-4"
              >
                <div className="w-8 h-8 bg-[#FF6B4A] rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed pt-1">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
