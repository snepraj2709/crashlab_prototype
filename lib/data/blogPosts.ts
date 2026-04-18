import type { BlogPostData } from "./blogTypes";

export const blogPosts: BlogPostData[] = [
  {
    id: 'gemini-3-0-radle',
    title: "Gemini 3.0 Pro Surpasses Radiology Trainees on Radiology's Last Exam (RadLE)",
    subtitle: 'Gemini 3.0 Pro Surpasses Trainees',
    category: 'Benchmark Update',
    date: 'Nov 20, 2025',
    readTime: '5 Min Read',
    author: { name: 'Dr. Suvrankar Datta', initials: 'SD', role: 'Group Lead, CRASH Lab' },
    authors: [
      { name: 'Suvrankar Datta', initials: 'SD' },
      { name: 'Divya Buchireddygari', initials: 'DB' },
      { name: 'Lakshmi Vennela Chowdary Kaza', initials: 'LK' },
      { name: 'Upasana Karnwal', initials: 'UK' },
      { name: 'Hakikat Bir Singh Bhatti', initials: 'HB' },
      { name: 'Kautik Singh', initials: 'KS' }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2664&auto=format&fit=crop',
    imageAlt: 'Radiology Scan',
    imageOverlay: {
      badge: 'Benchmark Update',
      stat: { label: 'Accuracy Delta', value: '+6.0%', sublabel: 'vs Trainees' }
    },
    tldr: "On our RadLE v1 benchmark of complex radiology cases, Gemini 3.0 Pro is now the first generalist AI model to outperform radiology trainees (51% vs 45%), but it still performs below board certified radiologists (83%).",
    content: [
      { type: 'heading', content: 'Background' },
      {
        type: 'text',
        content: "Over the last few months, at the Centre for Responsible Autonomous Systems in Healthcare (CRASH Lab), we have been systematically benchmarking frontier AI models on Radiology's Last Exam (RadLE v1), a spectrum biased diagnostic dataset designed to reflect the kind of complex, multi-system cases radiologists routinely struggle with. In our previous analysis done on September 2025, every major model: GPT-5, Gemini 2.5 Pro, o3, Claude Opus 4.1, had performed below radiology trainees."
      },
      {
        type: 'text',
        content: "In our current blog, we share a small but important update. With the release of Gemini 3.0 Pro, we tested the model on our privately held same benchmark, using the same prompt, the same 50 cases from v1 dataset, and following the same evaluation rubric. The results demonstrate a clear upward shift and significant advancement in the multimodal reasoning capabilities of Gemini 3.0 Pro."
      },
      { type: 'heading', content: 'Benchmarking Setup' },
      {
        type: 'list',
        content: [
          '**Dataset:** RadLE v1 (50 difficult radiology cases; CT, MRI, radiographs).',
          '**New Models tested:**\n  - Gemini 3.0 Pro (Preview) on Google AI Studio\n  - Gemini 3.0 Pro via API high-thinking mode, repeated three times for reproducibility.'
        ]
      },
      {
        type: 'text',
        content: 'All other settings remained unchanged from the original RadLE v1 experiment. This ensures the comparison is direct and fair.'
      },
      { type: 'heading', content: 'Results' },
      {
        type: 'table',
        content: {
          headers: ['Group / Model', 'Accuracy (%)', 'Score (/50)'],
          rows: [
            { cells: ['Expert Radiologists', '83%', '41.5'], highlight: false },
            { cells: ['Gemini 3.0 Pro (API High Thinking) NEW', '57%', '28.5'], highlight: true },
            { cells: ['Gemini 3.0 Pro (Web)', '51%', '25.5'], highlight: false },
            { cells: ['Radiology Trainees', '45%', '22.5'], highlight: false },
            { cells: ['Prior SOTA GPT-5 Thinking', '30%', '15'], highlight: false }
          ]
        }
      },
      {
        type: 'text',
        content: 'These results are significant, because for the first time in our evaluations, a generalist AI model has crossed radiology-trainee level performance on our benchmark (51% vs 45%). While still far from expert radiologist-level performance, the jump from previous models is noteworthy and demonstrates significant progress of generalist models.'
      },
      { type: 'heading', content: 'An Example where Gemini 3.0 outperformed prior SOTA' },
      {
        type: 'text',
        content: "One of the clearest improvements appeared in an acute appendicitis case. This was a case that earlier frontier models, including GPT-5 (reasoning-high), had not been able to diagnose. In our prior experiment GPT-5 had shown poor anatomical localisation and premature diagnostic closure."
      },
      {
        type: 'text',
        content: 'In contrast, Gemini 3.0 Pro demonstrated a noticeably more structured and radiologist-like approach:'
      },
      {
        type: 'list',
        content: [
          '✓ **Correct anatomical identification** - It located the appendix in the "right lower quadrant, anterior to the psoas, near the caecum."',
          '✓ **Clear description of imaging features** - "Dilated tubular appendix, wall enhancement, periappendiceal fat stranding, fluid-filled lumen."',
          '✓ **Systematic exclusion of mimics** - Explicitly ruled out "mucocele, Crohn disease, epiploic appendagitis, diverticulitis, and ureteric stone."',
          '✓ **Cohesive chain-of-thought** - The reasoning progressed in stable, sequential steps rather than jumping between diagnoses.'
        ]
      },
      { type: 'heading', content: 'Conclusion' },
      {
        type: 'text',
        content: "We update the results on the Radiology's Last Exam (RadLE v1) dataset. We show significant progress of generalist models but still short of readiness for deployment, autonomy or diagnostic replacement."
      },
      {
        type: 'text',
        content: '**Gemini 3.0 Pro becomes the first generalist AI model to surpass radiology trainees on the RadLE v1 benchmark.**'
      },
      {
        type: 'callout',
        content: {
          title: "Join Us to shape India's Healthcare AI Story",
          description: "If you're a physician, resident or medical student who wants hands-on experience with responsible AI in real clinical workflows, feel free to reach out. We have spots for motivated trainees who want to shape how healthcare evolves.",
          buttonText: 'Apply as Researcher',
          buttonLink: 'mailto:suvrankar.datta@ashoka.edu.in'
        }
      }
    ]
  },
  {
    id: 'radle-benchmark',
    title: "Radiology's Last Exam (RadLE)",
    category: 'Benchmark',
    date: '2025',
    readTime: '10 Min Read',
    author: { name: 'CRASH Lab', initials: 'CL' },
    venue: 'arXiv',
    description: 'Benchmarking frontier multimodal AI against human experts with a taxonomy of visual reasoning errors in radiology. Part of work accepted at RSNA 2025 (Cutting Edge Oral Presentation).',
    link: 'https://arxiv.org/abs/2509.25559',
    content: []
  },
  {
    id: 'rsna-2025-head-ct',
    title: 'Learning to Write Like a Radiologist: Multidimensional Evaluation and Benchmarking of Autonomous Optimization Pipelines for Hyper-Personalized Head CT Report Generation',
    category: 'Accepted Abstract',
    date: 'RSNA 2025',
    readTime: '8 Min Read',
    author: { name: 'CRASH Lab', initials: 'CL' },
    venue: 'RSNA 2025',
    description: 'Multidimensional evaluation framework for autonomous optimization pipelines in personalized head CT report generation',
    content: []
  },
  {
    id: 'rsna-2025-chest-xray-validation',
    title: 'Stress-Test and Radiologist Blinded Validation of Multimodal Foundation Models on an Unseen Chest Radiograph Dataset Using a Novel Multi-Metric Evaluation Framework',
    category: 'Accepted Abstract',
    date: 'RSNA 2025',
    readTime: '8 Min Read',
    author: { name: 'CRASH Lab', initials: 'CL' },
    venue: 'RSNA 2025',
    description: 'Comprehensive evaluation framework for multimodal foundation models in chest radiograph analysis with radiologist-blinded validation',
    content: []
  },
  {
    id: 'rsna-2025-style-aware',
    title: 'Style-Aware Radiology Reporting: A Scalable Autonomous Optimisation Pipeline for Improving Head CT Report Generation Quality',
    category: 'Accepted Abstract',
    date: 'RSNA 2025',
    readTime: '8 Min Read',
    author: { name: 'CRASH Lab', initials: 'CL' },
    venue: 'RSNA 2025',
    description: 'Scalable autonomous optimization pipeline focused on style-aware improvements in head CT report generation',
    content: []
  },
  {
    id: 'rsna-2025-hyperpersonalized',
    title: 'Towards Hyper-Personalised Radiology Reporting: A Scalable Autonomous Optimisation Pipeline for Improving Chest X-Ray Report Generation Quality',
    category: 'Accepted Abstract',
    date: 'RSNA 2025',
    readTime: '8 Min Read',
    author: { name: 'CRASH Lab', initials: 'CL' },
    venue: 'RSNA 2025',
    description: 'Autonomous optimization pipeline for hyper-personalized chest X-ray report generation with quality improvements',
    content: []
  },
  {
    id: 'rsna-2025-trust',
    title: 'TRUST: A Novel Five-Point Scale for Assessment of Reliability and Referencing Integrity in AI Agent Generated Radiology Reports',
    category: 'Accepted Abstract',
    date: 'RSNA 2025',
    readTime: '7 Min Read',
    author: { name: 'CRASH Lab', initials: 'CL' },
    venue: 'RSNA 2025',
    description: 'Novel assessment scale for evaluating reliability and referencing integrity in AI-generated radiology reports',
    content: []
  },
  {
    id: 'rsna-2025-radar-trust-validation',
    title: 'Validation of RADAR and TRUST Metrics: Analyzing Inter-Reader Agreement and Draft Variability in Agentic Radiology Reporting',
    category: 'Accepted Abstract',
    date: 'RSNA 2025',
    readTime: '7 Min Read',
    author: { name: 'CRASH Lab', initials: 'CL' },
    venue: 'RSNA 2025',
    description: 'Analysis of inter-reader agreement and draft variability using RADAR and TRUST metrics in agentic radiology reporting',
    content: []
  }
];
