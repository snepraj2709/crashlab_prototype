import type { TeamDirectoryGroup, TeamDirectoryMember } from "@/types/team";

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

const teamMembers = [
  {
    name: "Dr. Suvrankar Datta",
    role: "Group Lead",
    initials: "SD",
    image: "/team/suvrankar-datta.jpeg",
    isLead: true
  },
  {
    name: "Dr. Hakikat Bir Singh Bhatti",
    role: "Researcher",
    initials: "HB",
    image: "/team/hakikat-bhatti.jpeg",
    isLead: false
  },
  {
    name: "Dr. Mrudula Bhalke",
    role: "Researcher",
    initials: "MB",
    image: "/team/mrudula-bhalke.jpeg",
    isLead: false
  },
  {
    name:"Dr. Nishtha Mahajan",
    role:"Researcher",
    initials:"NM",
    image:"/team/nishtha-mahajan.jpeg",
    isLead:false
  },
  {
    name: "Dr. Lakshmi Vennela Chowdary Kaza",
    role: "Researcher",
    initials: "LK",
    image: "/team/lakshmi-vennela.jpeg",
    isLead: false
  },
  {
    name: "Dr. Shreyas Reddy K",
    role: "Researcher",
    initials: "SR",
    image: "/team/shreyas-reddy.jpeg",
    isLead: false
  },
   {
    name:"Dr. Bhavya Ratan Maroo",
    role:"Researcher",
    initials:"BR",
    image:"/team/bhavya-ratan.jpeg",
    isLead:false
  },
  {
    name:"Dr. Divya Buchireddygari",
    role:"Researcher",
    initials:"DB",
    image:"/team/divya-buchireddygari.jpeg",
    isLead:false
  },
  {
    name: "Kautik Singh",
    role: "Researcher",
    initials: "KS",
    image: "/team/kautik-singh.jpeg",
    isLead: false
  },
  {
    name: "Siddharth Reddy Anthireddy",
    role: "Researcher",
    initials: "SA",
    image: "/team/siddharth-reddy.jpeg",
    isLead: false
  },
  {
    name: "Upasana Karnwal",
    role: "Researcher",
    initials: "UK",
    isLead: false,
    image:"/team/upasana-karnwal.jpeg"
  },
  {
    name:"Haritha R",
    role:"Researcher",
    initials:"HR",
    image:"/team/haritha.jpeg",
    isLead:false
  },
  {
    name:"Gadha Lekshmi P",
    role:"Researcher",
    initials:"LP",
    image:"/team/gadha-lekshmi.jpeg",
    isLead:false
  },
  {
    name:"Swarna Radhakrishnan",
    role:"Researcher",
    initials:"SR",
    image:"/team/swarna-radhakrishnan.jpeg",
    isLead:false
  }
];

function getTeamMemberName(index: number): string {
  return teamMembers[index]?.name ?? `Team Member ${index + 1}`;
}

export const labMembers: TeamDirectoryMember[] = [
  {
    id: "suvrankar-datta",
    name: getTeamMemberName(0),
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
    name: getTeamMemberName(1),
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
    name: getTeamMemberName(2),
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
    name: getTeamMemberName(3),
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
    name: getTeamMemberName(4),
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
    name: getTeamMemberName(5),
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
    name: getTeamMemberName(6),
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
    name: getTeamMemberName(7),
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
    name: getTeamMemberName(8),
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
    name: getTeamMemberName(9),
    tenure: "2024-2025",
    affiliation: "Design Research Associate @ Ashoka",
    groupId: "alumni",
    isActive: false,
    position: 3,
    projectSlugs: ["human-ai-collaboration"],
    highlights: [{ label: "CHI'25", tone: "amber" }]
  }
];
