"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { ImageAsset } from "@/types/content";

const placeholderHeadshot = "/team/person-placeholder.svg";

function getInitials(name: string): string {
  const normalizedName = name.replace(/^(dr|mr|ms)\.?\s+/i, "").trim();
  const parts = normalizedName.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";

  return (first + last).toUpperCase() || "CL";
}

interface PersonPhotoProps {
  name: string;
  photo?: ImageAsset | null;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function PersonPhoto({
  name,
  photo,
  className,
  imageClassName,
  fallbackClassName,
  priority = false,
  sizes = "100vw",
}: PersonPhotoProps): React.ReactElement {
  const [hasImageError, setHasImageError] = useState(false);
  const imageSrc =
    photo?.url && photo.url !== placeholderHeadshot ? photo.url : null;

  useEffect(() => {
    setHasImageError(false);
  }, [imageSrc]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {imageSrc && !hasImageError ? (
        <Image
          alt={photo?.alt || `${name} portrait`}
          className={cn("object-cover", imageClassName)}
          fill
          onError={() => setHasImageError(true)}
          priority={priority}
          sizes={sizes}
          src={imageSrc}
        />
      ) : (
        <div
          aria-label={`${name} initials`}
          className={cn(
            "flex h-full w-full items-center justify-center bg-bg-elevated font-medium text-text-muted",
            fallbackClassName,
          )}
          role="img"
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}
