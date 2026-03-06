"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Badge, Card } from "@/components/ui";
import type { ProjectSeed } from "@/types/research";

interface ProjectCardProps {
  project: ProjectSeed;
  showMetadata?: boolean;
}

export function ProjectCard({
  project,
  showMetadata = false
}: ProjectCardProps): React.ReactElement {
  const status =
    project.seekingCollaborators && project.status !== "published"
      ? "seeking-collaborators"
      : project.status;

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="group flex h-full flex-col justify-between border-border transition duration-200 hover:border-accent-cyan">
        <div>
          <div className="flex items-start justify-between gap-4">
            <Badge status={status} />
            {showMetadata && project.venue ? (
              <span className="text-right text-xs uppercase tracking-[0.18em] text-text-tertiary">
                {project.venue}
              </span>
            ) : null}
          </div>
          <h3 className="mt-6 line-clamp-2 text-xl font-semibold text-white">
            {project.problemStatement}
          </h3>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-accent-cyan">{project.title}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-text-secondary">
            {project.summary}
          </p>
          {showMetadata ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <Link
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition group-hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          href={`/research/${project.slug}`}
        >
          View Research <ArrowRight className="size-4" />
        </Link>
      </Card>
    </motion.div>
  );
}
