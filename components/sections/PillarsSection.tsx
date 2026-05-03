"use client";

import type { ReactElement } from "react";
import { useCallback, useEffect, useId, useState } from "react";
import { Activity, Bot, Database, UserRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils/cn";

type PillarCapability = {
    title: string;
    body: string;
};

type PillarDetail = {
    positioning: string;
    context: string;
    capabilities: [PillarCapability, PillarCapability, PillarCapability];
};

const PILLARS: {
    number: string;
    title: string;
    tagline: string;
    bullets: string[];
    detail: PillarDetail;
    Icon: LucideIcon;
    accent: {
        icon: string;
        arrow: string;
        modalBorder: string;
    };
}[] = [
    {
        number: "01",
        title: "Data Commons",
        tagline: "National and International scale clinical data networks",
        bullets: [
            "Consortia across public and private institutions",
            "DPDP Act compliant data sharing",
            "Networks of public and private clinics powering national-scale AI"
        ],
        detail: {
            positioning: "We are helping build consortia needed for training foundational AI models.",
            context:
                "Indian healthcare data is fragmented across private hospitals and under-digitised public institutions, making national-scale AI research nearly impossible today. CRASH Lab is building the consortia and the trusted infrastructure that lets this data work together — consented and governed by Indian law. Our partnerships span public and private hospitals, imaging centres, and academic institutions with extensive data-sharing networks both for research and partnerships.",
            capabilities: [
                {
                    title: "Consortium-Built Data Platforms",
                    body: "We build consortia across public and private institutions, aggregating diverse healthcare data from EHRs and imaging archives. The goal is a shared substrate for Indian healthcare AI rather than isolated and siloed datasets."
                },
                {
                    title: "Privacy-Preserving Collaboration",
                    body: "Our data-sharing networks are designed for ethical and DPDP Act-compliant collaboration — solving India's healthcare data fragmentation problem while protecting patient privacy at every layer."
                },
                {
                    title: "National-Scale AI Development and Evaluation",
                    body: "We are laying the groundwork for AI benchmarking, model training and rapid clinical innovation by building trusted networks of national and international partners."
                }
            ]
        },
        Icon: Database,
        accent: {
            icon: "text-accent-cyan",
            arrow: "text-accent-cyan",
            modalBorder: "border-l border-l-accent-cyan/90"
        }
    },
    {
        number: "02",
        title: "Standards & Benchmarks",
        tagline: "Real-world, complex clinical benchmarks for frontier medical AI systems",
        bullets: [
            "Hard benchmarks grounded in real clinical cases",
            "Bias and subgroup audits",
            "Failure-mode taxonomies for safer deployment"
        ],
        detail: {
            positioning: "We measure what generic healthcare benchmarks miss in AI models before they are deployed.",
            context:
                "Most AI benchmarks have drifted from clinical reality and score models on cases they have already seen, on simplified tasks far from how medicine is practiced in the real world. CRASH Lab builds rigorous, real-world and clinically complex benchmarks — co-designed with practising clinicians and stress-tested across contexts. We also map how models fail, to help the field build something better and safer.",
            capabilities: [
                {
                    title: "Evals beyond Accuracy",
                    body: "We design robust evaluation frameworks that assess AI not just for raw accuracy, but for fairness, reproducibility and clinical utility under real diagnostic scenarios."
                },
                {
                    title: "Bias and Subgroup Audits",
                    body: "We build dashboards and tools for bias audits, subgroup analysis and scenario-based stress-testing of AI before deployment — surfacing failures the headline metric hides."
                },
                {
                    title: "Defining the Gold Standard for Novel AI Workflows",
                    body: "We develop benchmarks and best practices that help regulators, providers and innovators build trust in emerging healthcare AI technologies and publish failure-mode taxonomies."
                }
            ]
        },
        Icon: Activity,
        accent: {
            icon: "text-accent-orange",
            arrow: "text-accent-orange",
            modalBorder: "border-l border-l-accent-orange/90"
        }
    },
    {
        number: "03",
        title: "Foundational AI Models for India",
        tagline: "Foundation models for South Asian population",
        bullets: [
            "Models that work for South Asian patients",
            "Novel geometric and topological architectures",
            "Bias mitigation in AI models"
        ],
        detail: {
            positioning: "Foundational Models built for our patients.",
            context:
                "Most clinical AI today is trained on Western populations and Western workflows and it does not generalise to India. CRASH Lab develops foundation models tailored to South Asian healthcare with models that understand the patients, disease prevalence and the clinical reality of the subcontinent. We pair this with novel architectures that move beyond brute-force scaling, and bias mitigation built into the model itself.",
            capabilities: [
                {
                    title: "Models That Work for South Asians",
                    body: "We build foundation models and AI systems designed for South Asian clinical context combining imaging, clinical notes and real-world demographic data."
                },
                {
                    title: "Novel Geometric and Topological Architectures",
                    body: "We explore cutting-edge methods like geometric and topology-driven learning to uncover insights and architectures that outperform existing approaches, especially in low-data, high-stakes settings characteristic of Indian healthcare."
                },
                {
                    title: "Bias Mitigation in AI Models",
                    body: "We develop and test bias mitigation strategies for ensuring equitable and explainable AI systems that are validated with clinicians and real-world Indian datasets before they ever reach our patients."
                }
            ]
        },
        Icon: Bot,
        accent: {
            icon: "text-accent-yellow",
            arrow: "text-accent-yellow",
            modalBorder: "border-l border-l-accent-yellow/90"
        }
    },
    {
        number: "04",
        title: "Human-Centric Multi-Agent Systems",
        tagline: "Clinician-centred AI, with framing of policies built for what comes next",
        bullets: [
            "Multi-agent systems co-designed with clinicians",
            "Forward-looking policies for autonomous AI",
            "Trusted, edge-deployable AI agents"
        ],
        detail: {
            positioning: "AI co-built with clinicians for the future of care delivery.",
            context:
                "We believe that the future of clinical AI is not a single model but a team of specialised agents working alongside clinicians at the point of care. CRASH Lab is building human-centric multi-agent systems designed with frontline clinicians, deployable at the edge and grounded in policies for the autonomous era of healthcare. Technical capability without governance is unsafe and governance without technical capability is performative theatrics — and we work on both.",
            capabilities: [
                {
                    title: "Multi-Agent Systems",
                    body: "We work alongside frontline healthcare professionals to design multi-agent AI systems that fit seamlessly into daily practice with coordinated specialised agents that augment clinical workflows."
                },
                {
                    title: "Future-Proof Policies for Autonomous Systems",
                    body: "We propose policy frameworks for the autonomous AI era of healthcare covering accountability, oversight escalation pathways and the governance questions that current regulation has not yet caught up with."
                },
                {
                    title: "Trusted, Edge-Deployable Assistants",
                    body: "We build reliable AI-native workflows that run on edge devices in real clinical environments, with orchestration and built-in evaluation through thoughtful human-centred design."
                }
            ]
        },
        Icon: UserRound,
        accent: {
            icon: "text-accent-green",
            arrow: "text-accent-green",
            modalBorder: "border-l border-l-accent-green/90"
        }
    }
];

export interface PillarsSectionProps {
    id?: string;
    /** Small uppercase line above the title (e.g. HOW WE DIVIDE OUR WORK) */
    overline?: string;
    /** Main heading — serif, white */
    title?: string;
    /** Supporting line under the title */
    subtitle?: string;
    /** Optional link shown top-right of the header row */
    cta?: {
        href: string;
        label: string;
    };
    /** Footer line; set empty string or null to hide */
    flowLine?: string | null;
}

export function PillarsSection({
    id,
    overline = "HOW WE DIVIDE OUR WORK",
    title = "Four pillars. One mission.",
    subtitle = "Each pillar reinforces the others to form the foundation for safe and responsible healthcare AI.",
    cta,
    flowLine = "Each pillar feeds the next: data → benchmarks → models → deployment."
}: PillarsSectionProps): ReactElement {
    const [openNumber, setOpenNumber] = useState<string | null>(null);
    const modalTitleId = useId();

    const openPillar = useCallback((number: string) => {
        setOpenNumber(number);
    }, []);

    const closeModal = useCallback(() => {
        setOpenNumber(null);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        if (openNumber) {
            document.addEventListener("keydown", onKey);
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.removeEventListener("keydown", onKey);
                document.body.style.overflow = prev;
            };
        }
    }, [openNumber, closeModal]);

    const activePillar = openNumber ? PILLARS.find((p) => p.number === openNumber) : undefined;

    return (
        <section className="relative overflow-hidden border-t border-white/10 bg-navy-900 py-5 lg:py-7" id={id}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-cyan/[0.07] via-transparent to-navy-800/40" />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[length:32px_32px] bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.05]"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div className="text-center lg:text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-cyan">{overline}</p>
                        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
                            {title}
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-steel-200 lg:mx-0">
                            {subtitle}
                        </p>
                    </div>
                    {cta ? (
                        <a
                            className="inline-flex shrink-0 items-center justify-center gap-2 self-center text-sm font-medium text-steel-200 transition hover:text-white hover:underline lg:self-auto"
                            href={cta.href}
                        >
                            {cta.label}
                            <span aria-hidden>→</span>
                        </a>
                    ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {PILLARS.map((pillar) => (
                        <PillarCard
                            key={pillar.number}
                            pillar={pillar}
                            onOpenDetail={() => openPillar(pillar.number)}
                        />
                    ))}
                </div>

                {flowLine !== null && flowLine !== "" ? (
                    <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-steel-300 md:text-[15px]">
                        <FlowSentence text={flowLine} />
                    </p>
                ) : null}
            </div>

            {activePillar ? (
                <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center" role="presentation">
                    <button
                        aria-label="Close pillar details"
                        className="absolute inset-0 bg-navy-950/75 backdrop-blur-sm transition-opacity"
                        type="button"
                        onClick={closeModal}
                    />
                    <div
                        aria-labelledby={modalTitleId}
                        className="relative z-10 flex max-h-[min(92vh,860px)] w-full max-w-lg flex-col overflow-hidden rounded-none border border-white/[0.08] bg-navy-900 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)] sm:max-w-2xl"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div
                            className={cn(
                                "flex shrink-0 items-start justify-between gap-4 bg-navy-800/50 px-6 py-5 sm:px-8 sm:py-6",
                                activePillar.accent.modalBorder,
                                "pl-6 sm:pl-8"
                            )}
                        >
                            <div className="min-w-0 pl-1">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-steel-500">
                                    Pillar {activePillar.number}
                                </p>
                                <h2 className="mt-2 font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-white sm:text-2xl" id={modalTitleId}>
                                    {activePillar.title}
                                </h2>
                            </div>
                            <button
                                className="ui-focus-ring shrink-0 rounded-none p-2 text-steel-400 transition hover:bg-white/5 hover:text-white"
                                type="button"
                                aria-label="Close"
                                onClick={closeModal}
                            >
                                <X className="size-5" aria-hidden />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8">
                            <p className="text-[15px] font-medium leading-relaxed text-white/95">{activePillar.detail.positioning}</p>
                            <p className="mt-5 text-[14px] leading-[1.65] text-steel-400">{activePillar.detail.context}</p>

                            <div className="mt-10">
                                {activePillar.detail.capabilities.map((cap, idx) => (
                                    <div
                                        className={cn(idx > 0 && "mt-6 border-t border-white/[0.06] pt-6")}
                                        key={cap.title}
                                    >
                                        <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-steel-500">{cap.title}</h3>
                                        <p className="mt-3 text-[14px] leading-[1.65] text-steel-300">{cap.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
}

function PillarCard({
    pillar,
    onOpenDetail
}: {
    pillar: (typeof PILLARS)[number];
    onOpenDetail: () => void;
}): ReactElement {
    const labelId = useId();

    return (
        <div
            aria-labelledby={labelId}
            className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-none border border-white/[0.15] bg-gradient-to-b from-white/[0.07] to-transparent text-left",
                "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10)] transition-all duration-300 ease-out",
                "hover:border-white/25 hover:from-white/[0.10]",
                "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
            )}
            role="button"
            tabIndex={0}
            onClick={onOpenDetail}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenDetail();
                }
            }}
        >
            <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-5 pt-6">
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.12] pb-4 transition-colors duration-300 group-hover:border-white/20">
                    <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-steel-300">
                        {pillar.number}
                    </span>
                    <div className="rounded-none bg-white/[0.08] p-2 ring-1 ring-white/[0.12] transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0">
                        <pillar.Icon
                            aria-hidden
                            className={cn("size-[18px] shrink-0 text-current", pillar.accent.icon)}
                            strokeWidth={1.65}
                        />
                    </div>
                </div>

                <span className="sr-only">Opens the full pillar brief in a dialog. Press Enter.</span>

                <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-white sm:text-[1.125rem]" id={labelId}>
                    {pillar.title}
                </h3>
                <p className="mt-2 text-[13px] leading-snug text-steel-300 transition-colors duration-300 group-hover:text-steel-200">
                    {pillar.tagline}
                </p>

                <div className="relative isolate mt-5 flex-1">
                    <ul
                        className={cn(
                            "space-y-2.5 text-[13px] leading-relaxed text-steel-200 transition-all duration-300",
                            "lg:group-hover:pointer-events-none lg:group-hover:opacity-0"
                        )}
                    >
                        {pillar.bullets.map((line) => (
                            <li className="flex gap-2.5" key={line}>
                                <span className={cn("mt-0.5 shrink-0 text-[11px] font-medium", pillar.accent.arrow)} aria-hidden>
                                    →
                                </span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                    <p
                        className={cn(
                            "pointer-events-none absolute inset-0 text-[13px] font-medium leading-[1.55] text-white opacity-0 transition-opacity duration-300 ease-out",
                            "max-lg:hidden lg:group-hover:opacity-100"
                        )}
                    >
                        {pillar.detail.positioning}
                    </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.12] pt-4 transition-colors duration-300 group-hover:border-white/20">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-steel-300 transition-colors duration-300 group-hover:text-steel-200">
                        Click for full brief
                    </span>
                    <span className={cn("text-xs transition-colors duration-300 group-hover:text-white", pillar.accent.icon)} aria-hidden>
                        →
                    </span>
                </div>
            </div>
        </div>
    );
}

/** Strips accidental leading arrows (e.g. pasted “→ →”) before coloring keywords */
function normalizeFlowLine(raw: string): string {
    return raw.trim().replace(/^(\s*[→\u2192]\s*)+/u, "");
}

/** Colors “data → benchmarks → models → deployment” to match pillar accents */
function FlowSentence({ text }: { text: string }): ReactElement {
    const normalized = normalizeFlowLine(text);
    const parts = normalized.split(/\b(data|benchmarks|models|deployment)\b/gi);
    const tone = (word: string): string => {
        const w = word.toLowerCase();
        if (w === "data") return "text-accent-cyan";
        if (w === "benchmarks") return "text-accent-orange";
        if (w === "models") return "text-accent-yellow";
        if (w === "deployment") return "text-accent-green";
        return "";
    };

    return (
        <>
            {parts.map((part, i) => {
                const cls = tone(part);
                if (cls) {
                    return (
                        <span className={cls} key={`w-${i}`}>
                            {part}
                        </span>
                    );
                }
                return <span key={`t-${i}`}>{part}</span>;
            })}
        </>
    );
}

export default PillarsSection;
