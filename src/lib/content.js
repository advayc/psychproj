// Centralised editable content for non-developers
export const DSM_CRITERIA = [
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

export const STUDIES = [
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
  {
    name: "Copeland et al.",
    year: "1971",
    aim: "Investigate if psychiatrists from US vs UK diagnose the same patient differently for schizophrenia.",
    method:
      "Quasi-experimental design using standardized clinical case descriptions shown to psychiatrists in both countries.",
    procedure:
      "The researchers created descriptions of psychiatric patients through videotaped interviews. These tapes showed patients presenting clinical symptoms relevant to psychiatric diagnoses. 134 trained psychiatrists from the USA and 194 from the UK were shown the same videos, and were asked to give a diagnosis.",
    results:
      "69% of US psychiatrists diagnosed schizophrenia, while only 2% of UK psychiatrists did for identical patient presentations. British clinicians often diagnosed mood disorders instead.",
    conclusion:
      "Diagnosis is influenced by cultural and professional context. Psychiatric diagnosis is not purely objective—identical symptoms can be interpreted differently depending on training and country.",
    application:
      "Clinicians need awareness of cultural differences. Diagnostic tools (DSM/ICD) must be applied carefully considering patient's cultural background.",
  },
];

export const TREATMENTS = [
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

export const TIPS = [
  {
    title: "Always Look Back on the Command Term",
    desc: "Remember to look back on the command term and the question the paper is asking. Ensure that your analysis is answering the SIGNIFICANCE of the FADs—Why is it important? What is their impact? How do they impact diagnosis? So what?",
  },
  {
    title: "Consider Historical Context",
    desc: "When evaluating studies, always consider the historical context they were conducted in. Different time periods may have used varying DSM models, thus affecting the generalizability to today's time period. Are the FAD's still present in today's manual?",
  },
  {
    title: "Emphasize the Biopsychosocial Approach",
    desc: "Demonstrating psychological understanding isn't simply limited to just the abnormal approach. To reach that 6-7 band, we suggest also discussing how schema's and heuristics play a role in developing these FAD's.",
  },
  {
    title: "Avoid 'Proven' Language",
    desc: "Nothing is ever proven in psychology, avoid using this terminology especially after synthesis/evaluation of the studies. We recommend alternative terms 'This suggests' or 'This supports…'",
  },
];
