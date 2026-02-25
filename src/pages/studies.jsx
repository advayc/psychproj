import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CheckCircle2, Lightbulb } from "lucide-react";
import Footer from "../components/Footer";
import AnimatedOnScroll from "../components/AnimatedOnScroll";

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
    name: "Rosenhan et al.",
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

const TREATMENTS = [
  {
    category: "Biological",
    items: [
      {
        name: "Antipsychotic Medications",
        desc: "Typical antipsychotics (e.g., Haloperidol) and atypical antipsychotics (e.g., Clozapine, Risperidone) help manage positive symptoms like hallucinations and delusions by regulating neurotransmitters, particularly dopamine.",
      },
      {
        name: "Side Effect Management",
        desc: "Regular monitoring and adjustment of medications to minimize side effects such as weight gain, movement disorders, and metabolic changes.",
      },
    ],
  },
  {
    category: "Cognitive",
    items: [
      {
        name: "Cognitive Behavioral Therapy (CBT)",
        desc: "Helps patients challenge and reframe distorted thoughts, develop coping strategies for symptoms, and improve daily functioning.",
      },
      {
        name: "Family Therapy",
        desc: "Educates family members about schizophrenia, reduces expressed emotion, and improves communication patterns to create a supportive home environment.",
      },
      {
        name: "Social Skills Training",
        desc: "Teaches interpersonal skills, emotion recognition, and practical life skills to improve social functioning and independence.",
      },
    ],
  },
  {
    category: "Social",
    items: [
      {
        name: "Supported Employment Programs",
        desc: "Vocational rehabilitation and job coaching to help individuals maintain meaningful employment and build self-esteem.",
      },
      {
        name: "Community Support Services",
        desc: "Housing assistance, peer support groups, and case management to maintain stability and prevent relapse.",
      },
      {
        name: "Psychoeducation",
        desc: "Teaching patients and families about the disorder, treatment options, early warning signs, and relapse prevention strategies.",
      },
    ],
  },
];

const TIPS = [
  {
    title: "Always Look Back on the Command Term",
    desc: "Remember to look back on the command term and the question the paper is asking. Ensure that your analysis is answering the SIGNIFICANCE of the FADs—Why is it important? What is their impact? How do they impact diagnosis? So what?",
  },
  {
    title: "Consider Historical Context",
    desc: "When evaluating studies, always consider the historical context they were conducted in. Different time periods may have used varying DSM models, thus affecting the generalizability to today's time period.",
  },
  {
    title: "Emphasize the Biopsychosocial Approach",
    desc: "ALWAYS ALWAYS ALWAYS emphasize how treatment usually requires a biopsychosocial approach. These 3 systems must interact with each other.",
  },
  {
    title: "Avoid 'Proven' Language",
    desc: "Nothing is ever proven in psychology, avoid using this terminology especially after synthesis/evaluation of the studies. We recommend alternative terms 'This suggests' or 'This supports…'",
  },
];

export default function studies() {
  const [mode, setMode] = useState("learn");
  const [activeTab, setActiveTab] = useState("dsm");

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

      <div className={`mx-auto px-6 py-6 pb-32 ${mode === "learn" ? (activeTab === "case" ? "max-w-4xl" : "max-w-md") : "max-w-4xl"}`}>
        {/* Mode selector */}
        <div className="max-w-md mx-auto mb-4">

        </div>

        {/* Sub-tabs (dynamic per mode) */}
        <div className="flex gap-0.5 bg-white p-1 rounded-2xl mb-6 border border-green-200 overflow-x-auto justify-center">
          {(mode === "learn" ? [
            { key: "dsm", label: "DSM-5" },
            { key: "case", label: "Case Study" },
            { key: "treatments", label: "Treatment" },
          ] : [
            { key: "fad", label: "FAD" },
            { key: "studies", label: "Studies" },
            { key: "tips", label: "Tips" },
          ]).map((tab) => (
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
                    <div className="w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
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

        {/* Revision mode content: FAD, Studies, Tips */}
        {mode === "revision" && activeTab === "fad" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">FAD</div>
              <p className="text-black text-sm leading-relaxed">FAD resources and key facts for revision. Add your flashcards or summaries here.</p>
            </div>
          </div>
        )}

        {mode === "revision" && activeTab === "studies" && (
          <div className="space-y-4">
            {STUDIES.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-green-200">
                <h3 className="text-black text-base font-bold mb-2">{s.name} — {s.year}</h3>
                <p className="text-gray-700 text-sm"><strong>Aim:</strong> {s.aim}</p>
                <p className="text-gray-700 text-sm mt-2"><strong>Method:</strong> {s.method}</p>
                <p className="text-gray-700 text-sm mt-2"><strong>Results / Conclusion:</strong> {s.results || s.conclusion}</p>
              </div>
            ))}
          </div>
        )}

        {mode === "revision" && activeTab === "tips" && (
          <div className="space-y-4">
            {TIPS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-green-200">
                <h3 className="text-black text-base font-bold mb-2">{t.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
