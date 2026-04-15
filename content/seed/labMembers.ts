import type { TeamDirectoryGroup, TeamDirectoryMember } from "@/types/team";

export interface LabMemberVisualSeed {
  id: string;
  name: string;
  role: string;
  initials: string;
  image: string;
  isLead: boolean;
}

export const labMemberGroups: TeamDirectoryGroup[] = [
  {
    id: "leadership-core",
    label: "Leadership & Core Researchers",
    order: 1
  },
  {
    id: "research-students",
    label: "Research Students & Staff (Ashoka)",
    order: 2
  },
  {
    id: "clinical-collaborators",
    label: "Clinical Collaborators",
    order: 3
  },
  {
    id: "alumni",
    label: "Alumni",
    order: 4
  }
];

export const labMemberVisuals: LabMemberVisualSeed[] = [
  {
    id: "suvrankar-datta",
    name: "Dr. Suvrankar Datta",
    role: "Group Lead",
    initials: "SD",
    image: "/team/suvrankar-datta.jpeg",
    isLead: true
  },
  {
    id: "hakikat-bir-singh-bhatti",
    name: "Dr. Hakikat Bir Singh Bhatti",
    role: "Researcher",
    initials: "HB",
    image: "/team/hakikat-bhatti.jpeg",
    isLead: false
  },
  {
    id: "mrudula-bhalke",
    name: "Dr. Mrudula Bhalke",
    role: "Researcher",
    initials: "MB",
    image: "/team/mrudula-bhalke.jpeg",
    isLead: false
  },
  {
    id: "nishtha-mahajan",
    name: "Dr. Nishtha Mahajan",
    role: "Researcher",
    initials: "NM",
    image: "/team/nishtha-mahajan.jpeg",
    isLead: false
  },
  {
    id: "lakshmi-vennela-chowdary-kaza",
    name: "Dr. Lakshmi Vennela Chowdary Kaza",
    role: "Researcher",
    initials: "LK",
    image: "/team/lakshmi-vennela.jpeg",
    isLead: false
  },
  {
    id: "shreyas-reddy-k",
    name: "Dr. Shreyas Reddy K",
    role: "Researcher",
    initials: "SR",
    image: "/team/shreyas-reddy.jpeg",
    isLead: false
  },
  {
    id: "bhavya-ratan-maroo",
    name: "Dr. Bhavya Ratan Maroo",
    role: "Researcher",
    initials: "BR",
    image: "/team/bhavya-ratan.jpeg",
    isLead: false
  },
  {
    id: "divya-buchireddygari",
    name: "Dr. Divya Buchireddygari",
    role: "Researcher",
    initials: "DB",
    image: "/team/divya-buchireddygari.jpeg",
    isLead: false
  },
  {
    id: "kautik-singh",
    name: "Kautik Singh",
    role: "Researcher",
    initials: "KS",
    image: "/team/kautik-singh.jpeg",
    isLead: false
  },
  {
    id: "siddharth-reddy-anthireddy",
    name: "Siddharth Reddy Anthireddy",
    role: "Researcher",
    initials: "SA",
    image: "/team/siddharth-reddy.jpeg",
    isLead: false
  },
  {
    id: "upasana-karnwal",
    name: "Upasana Karnwal",
    role: "Researcher",
    initials: "UK",
    isLead: false,
    image: "/team/upasana-karnwal.jpeg"
  },
  {
    id: "haritha-r",
    name: "Haritha R",
    role: "Researcher",
    initials: "HR",
    image: "/team/haritha.jpeg",
    isLead: false
  },
  {
    id: "gadha-lekshmi-p",
    name: "Gadha Lekshmi P",
    role: "Researcher",
    initials: "LP",
    image: "/team/gadha-lekshmi.jpeg",
    isLead: false
  },
  {
    id: "swarna-radhakrishnan",
    name: "Swarna Radhakrishnan",
    role: "Researcher",
    initials: "SR",
    image: "/team/swarna-radhakrishnan.jpeg",
    isLead: false
  }
];

function getTeamMemberName(id: string): string {
  return labMemberVisuals.find((member) => member.id === id)?.name ?? "Team Member";
}

export const labMembers: TeamDirectoryMember[] = [
  {
    id: "suvrankar-datta",
    name: getTeamMemberName("suvrankar-datta"),
    profileSlug: "suvrankar-datta",
    tenure: "2025-Present",
    affiliation: "Group Lead @ Ashoka University",
    groupId: "leadership-core",
    isActive: true,
    position: 1,
    projectSlugs: [
      "radle-benchmark",
      "autonomous-report-generation",
      "data-commons",
      "india-ai-validation",
      "human-ai-collaboration",
      "healthcare-ai-governance"
    ],
    highlights: [
      { label: "RSNA'25", tone: "blue" },
      { label: "RadLE", tone: "amber" }
    ]
  },
  {
    id: "hakikat-bir-singh-bhatti",
    name: getTeamMemberName("hakikat-bir-singh-bhatti"),
    tenure: "2025-Present",
    affiliation: "Research Engineer @ Ashoka",
    groupId: "research-students",
    isActive: true,
    position: 1,
    projectSlugs: ["radle-benchmark", "india-ai-validation"],
    highlights: [
      { label: "MICCAI'25", tone: "amber" },
      { label: "RSNA'25", tone: "blue" }
    ]
  },
  {
    id: "mrudula-bhalke",
    name: getTeamMemberName("mrudula-bhalke"),
    tenure: "2025-Present",
    affiliation: "MS by Research @ Ashoka",
    groupId: "research-students",
    isActive: true,
    position: 2,
    projectSlugs: ["autonomous-report-generation", "human-ai-collaboration"],
    highlights: [{ label: "TMI'26", tone: "blue" }]
  },
  {
    id: "nishtha-mahajan",
    name: getTeamMemberName("nishtha-mahajan"),
    tenure: "2025-Present",
    affiliation: "Data Systems Fellow @ CRASH Lab",
    groupId: "research-students",
    isActive: true,
    position: 3,
    projectSlugs: ["data-commons", "india-ai-validation"],
    highlights: [{ label: "Data Commons", tone: "emerald" }]
  },
  {
    id: "lakshmi-vennela-chowdary-kaza",
    name: getTeamMemberName("lakshmi-vennela-chowdary-kaza"),
    tenure: "2025-Present",
    affiliation: "Senior Radiology Resident @ AIIMS",
    groupId: "clinical-collaborators",
    isActive: true,
    position: 1,
    projectSlugs: ["radle-benchmark", "healthcare-ai-governance"],
    highlights: [{ label: "Clinical Review", tone: "rose" }]
  },
  {
    id: "shreyas-reddy-k",
    name: getTeamMemberName("shreyas-reddy-k"),
    tenure: "2025-Present",
    affiliation: "Clinician Research Fellow @ CRASH Lab",
    groupId: "clinical-collaborators",
    isActive: true,
    position: 2,
    projectSlugs: ["autonomous-report-generation", "human-ai-collaboration"],
    highlights: [{ label: "Workflow Design", tone: "blue" }]
  },
  {
    id: "bhavya-ratan-maroo",
    name: getTeamMemberName("bhavya-ratan-maroo"),
    tenure: "2025-Present",
    affiliation: "Policy & Ethics Fellow @ Ashoka",
    groupId: "clinical-collaborators",
    isActive: true,
    position: 3,
    projectSlugs: ["data-commons", "healthcare-ai-governance"],
    highlights: [{ label: "Governance", tone: "amber" }]
  },
  {
    id: "divya-buchireddygari",
    name: getTeamMemberName("divya-buchireddygari"),
    tenure: "2024-2025",
    affiliation: "Research Intern @ Ashoka",
    groupId: "alumni",
    isActive: false,
    position: 1,
    projectSlugs: ["india-ai-validation"],
    highlights: [{ label: "Nature Medicine'26", tone: "rose" }]
  },
  {
    id: "kautik-singh",
    name: getTeamMemberName("kautik-singh"),
    tenure: "2024-2025",
    affiliation: "Systems Engineer @ CRASH Lab",
    groupId: "alumni",
    isActive: false,
    position: 2,
    projectSlugs: ["data-commons"],
    highlights: [
      { label: "NeurIPS D&B", tone: "blue" },
      { label: "Infra Lead", tone: "emerald" }
    ]
  },
  {
    id: "siddharth-reddy-anthireddy",
    name: getTeamMemberName("siddharth-reddy-anthireddy"),
    tenure: "2024-2025",
    affiliation: "Design Research Associate @ Ashoka",
    groupId: "alumni",
    isActive: false,
    position: 3,
    projectSlugs: ["human-ai-collaboration"],
    highlights: [{ label: "CHI'25", tone: "amber" }]
  }
];
