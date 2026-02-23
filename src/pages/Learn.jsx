import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CheckCircle2, Lightbulb } from "lucide-react";
import Footer from "../components/Footer";

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

export default function Learn() {
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

      <div className="max-w-md mx-auto px-6 py-6 pb-32">
        {/* Tabs */}
        <div className="flex bg-white p-1 rounded-2xl mb-6 border border-green-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("dsm")}
            className={`flex-1 py-3 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "dsm" ? "bg-[#7C3AED] text-white" : "text-gray-600"
            }`}
          >
            DSM-5
          </button>
          <button
            onClick={() => setActiveTab("treatments")}
            className={`flex-1 py-3 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "treatments" ? "bg-[#7C3AED] text-white" : "text-gray-600"
            }`}
          >
            Treatments
          </button>
          <button
            onClick={() => setActiveTab("studies")}
            className={`flex-1 py-3 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "studies"
                ? "bg-[#7C3AED] text-white"
                : "text-gray-600"
            }`}
          >
            Studies
          </button>
          <button
            onClick={() => setActiveTab("fad")}
            className={`flex-1 py-3 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "fad" ? "bg-[#7C3AED] text-white" : "text-gray-600"
            }`}
          >
            FAD
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex-1 py-3 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "tips" ? "bg-[#7C3AED] text-white" : "text-gray-600"
            }`}
          >
            Tips
          </button>
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

        {/* Treatments Content */}
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

        {/* Studies Content */}
        {activeTab === "studies" && (
          <div className="space-y-6">
            {STUDIES.map((study, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-green-200 space-y-5"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-black text-2xl font-bold">
                    {study.name}
                  </h3>
                  <span className="text-[#7C3AED] text-lg font-bold">
                    {study.year}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[#7C3AED] text-xs font-medium uppercase tracking-wider mb-2">
                      Aim
                    </div>
                    <p className="text-black text-sm leading-relaxed">
                      {study.aim}
                    </p>
                  </div>

                  <div>
                    <div className="text-[#7C3AED] text-xs font-medium uppercase tracking-wider mb-2">
                      Method
                    </div>
                    <p className="text-black text-sm leading-relaxed">
                      {study.method}
                    </p>
                  </div>

                  {study.procedure && (
                    <div>
                      <div className="text-[#7C3AED] text-xs font-medium uppercase tracking-wider mb-2">
                        Procedure
                      </div>
                      <p className="text-black text-sm leading-relaxed">
                        {study.procedure}
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="text-[#7C3AED] text-xs font-medium uppercase tracking-wider mb-2">
                      Results
                    </div>
                    <p className="text-black text-sm leading-relaxed">
                      {study.results}
                    </p>
                  </div>

                  <div className="bg-green-100 rounded-xl p-4 border border-green-200">
                    <div className="text-[#7C3AED] text-xs font-medium uppercase tracking-wider mb-2">
                      Conclusion
                    </div>
                    <p className="text-black text-sm font-medium leading-relaxed">
                      {study.conclusion}
                    </p>
                  </div>

                  <div>
                    <div className="text-[#7C3AED] text-xs font-medium uppercase tracking-wider mb-2">
                      Application
                    </div>
                    <p className="text-black text-sm leading-relaxed">
                      {study.application}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
                  href="https://repo.pirateib.su/IB%20PAST%20PAPERS%20-%20SUBJECT/Group%203%20-%20Individuals%20and%20Societies/Psychology_HL/2019%20November%20Examination%20Session/Psychology_paper_2__HL.pdf"
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

            {/* FAD Card 1: Cultural Bias */}
            <div className="bg-white rounded-2xl p-6 mb-4 border border-green-200">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-black text-xl font-bold leading-tight">
                  Cultural Bias
                </h3>
                <div className="text-[#7C3AED] text-[22px] font-bold">01</div>
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

            {/* FAD Card 2: Confirmation Bias */}
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-black text-xl font-bold leading-tight">
                  Confirmation Bias
                </h3>
                <div className="text-[#7C3AED] text-[22px] font-bold">02</div>
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
          </div>
        )}

        {/* Tips Content */}
        {activeTab === "tips" && (
          <div className="space-y-6">
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
