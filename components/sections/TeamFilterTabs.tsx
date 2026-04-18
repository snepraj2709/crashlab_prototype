"use client";

import { useState } from "react";

import { PeopleDirectory } from "@/components/sections/PeopleDirectory";
import type { TeamMemberProfile } from "@/types/team";

type FilterTab = "all" | "active" | "alumni";

const tabs: Array<{ label: string; value: FilterTab }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Alumni", value: "alumni" }
];

interface TeamFilterTabsProps {
  profiles: TeamMemberProfile[];
}

export function TeamFilterTabs({ profiles }: TeamFilterTabsProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "active"
      ? profiles.filter((p) => p.isActive === true)
      : activeTab === "alumni"
        ? profiles.filter((p) => p.isActive === false || p.isActive == null)
        : profiles;

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeTab === tab.value
                ? "border-border-focus bg-status-info-surface text-border-focus"
                : "border-border-default text-text-muted hover:border-border-focus hover:text-border-focus"
            }`}
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <PeopleDirectory profiles={filtered} />
    </>
  );
}
