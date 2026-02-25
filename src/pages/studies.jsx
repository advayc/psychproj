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

export default function studies() {
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
        {/* Tabs: DSM-5, Treatments, Case Study */}
        <div className="flex gap-0.5 bg-white p-1 rounded-2xl mb-6 border border-green-200 overflow-x-auto justify-center">
          <button
            onClick={() => setActiveTab("dsm")}
            className={`flex-1 py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "dsm" ? "bg-[#7C3AED] text-white" : "text-gray-600"
            }`}
          >
            DSM-5
          </button>
          <button
            onClick={() => setActiveTab("treatments")}
            className={`flex-1 py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "treatments" ? "bg-[#7C3AED] text-white" : "text-gray-600"
            }`}
          >
            Treatments
          </button>
          <button
            onClick={() => setActiveTab("case")}
            className={`flex-1 py-2.5 px-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === "case" ? "bg-[#7C3AED] text-white" : "text-gray-600"
            }`}
          >
            Case Study
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

        {/* Case Study Content: interactive case file for GLORIA LEE */}
        {activeTab === "case" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-green-200 space-y-4">
              <h2 className="text-black text-2xl font-bold">GLORIA LEE — Case File</h2>
              <div className="text-gray-500 text-xs uppercase tracking-wider">Patient Details</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-gray-700 text-sm"><strong>Patient Name:</strong> GLORIA SUYEON LEE</div>
                  <div className="text-gray-700 text-sm"><strong>Age:</strong> 17</div>
                  <div className="text-gray-700 text-sm"><strong>Date of Birth:</strong> MAY 18, 2008</div>
                  <div className="text-gray-700 text-sm"><strong>Sex:</strong> FEMALE</div>
                </div>
                <div>
                  <div className="text-gray-700 text-sm"><strong>Referred For:</strong> Psychiatric Evaluation</div>
                  <div className="text-gray-700 text-sm"><strong>Presenting Symptoms:</strong> hallucinations, disorganized thinking, social withdrawal</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-green-200 space-y-4">
              <div className="text-gray-500 text-xs uppercase tracking-wider">Patient History</div>
              <div className="space-y-2 text-gray-700 text-sm">
                <div><strong>Medical History:</strong> No prior psychiatric diagnosis; reports sleep disturbance for 8+ months; difficulty concentrating.</div>
                <div><strong>Family History:</strong> Mother: JENNIFER LEE; Father: MICHAEL LEE; maternal uncle diagnosed with schizophrenia; father diagnosed with major depressive disorder.</div>
                <div><strong>Trauma & Developmental History:</strong> History of childhood physical abuse; reports of emotional neglect; difficulty regulating emotions in adolescence; high levels of anxiety during adolescence.</div>
                <div><strong>Social History:</strong> Lives alone; limited peer support; recently lost employment.</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-green-200 space-y-4">
              <div className="text-gray-500 text-xs uppercase tracking-wider">Investigations</div>
              <div className="space-y-2 text-gray-700 text-sm">
                <div><strong>Structural MRI Findings:</strong> Mild ventricular enlargement; reduced grey matter volume in frontal regions; reduced activity in prefrontal cortex; no evidence of lesions or tumors.</div>
                <div><strong>Neurochemical Screening:</strong> Elevated dopamine activity in mesolimbic pathway; reduced dopamine activity in prefrontal cortex; dopamine levels are imbalanced; no abnormalities detected in serotonin levels.</div>
                <div><strong>Clinical Note:</strong> Prefrontal cortex implicated in decision-making, planning, and working memory. Enlarged ventricles observed.</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <img src="/Case FIle/1.png" alt="case page 1" className="w-full rounded-lg border" />
                <img src="/Case FIle/2.png" alt="case page 2" className="w-full rounded-lg border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <img src="/Case FIle/3.png" alt="case page 3" className="w-full rounded-lg border" />
                <img src="/Case FIle/4.png" alt="case page 4" className="w-full rounded-lg border" />
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
