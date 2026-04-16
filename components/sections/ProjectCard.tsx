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
      <Card className="group flex h-full flex-col justify-between transition duration-200 hover:border-border-focus">
        <div>
          <div className="flex items-start justify-between gap-4">
            <Badge status={status} />
            {showMetadata && project.venue ? (
              <span className="text-right text-xs uppercase tracking-[0.18em] text-text-tertiary">
                {project.venue}
              </span>
            ) : null}
          </div>
          <h3 className="mt-6 line-clamp-2 text-xl font-semibold text-text-default">
            {project.problemStatement}
          </h3>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-accent-cyan">{project.title}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-text-muted">
            {project.summary}
          </p>
          {showMetadata ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span className="ui-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <Link
          className="ui-focus-ring mt-8 inline-flex items-center gap-2 text-sm font-medium text-text-default transition group-hover:text-border-focus"
          href={`/research/${project.slug}`}
        >
          View Research <ArrowRight className="size-4" />
        </Link>
      </Card>
    </motion.div>
  );
}
