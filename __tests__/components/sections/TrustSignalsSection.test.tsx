import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TrustSignalsSection } from "@/components/sections/TrustSignalsSection";
import type { TrustSectionSeed } from "@/types/trust";

const mockSection: TrustSectionSeed = {
  eyebrow: "Affiliated with",
  title: "Test title",
  description: "Test description.",
  logos: [
    {
      id: "test-org",
      name: "Test Organisation",
      href: "https://example.com",
      category: "academic",
      position: 1,
      logo: { url: "/logos/test.svg", alt: "Test Organisation logo", width: 160, height: 40 }
    },
    {
      id: "no-link-org",
      name: "No Link Org",
      category: "clinical",
      position: 2,
      logo: { url: "/logos/no-link.svg", alt: "No Link Org logo", width: 160, height: 40 }
    }
  ],
  credentials: [
    {
      id: "test-award",
      label: "Test Award 2023",
      supportingText: "Supporting context.",
      href: "https://example.com/award",
      kind: "award",
      position: 1
    },
    {
      id: "no-text-credential",
      label: "No Supporting Text",
      kind: "milestone",
      position: 2
    }
  ]
};

describe("TrustSignalsSection", () => {
  it("renders logo names as alt text", () => {
    render(<TrustSignalsSection section={mockSection} />);
    expect(screen.getByAltText("Test Organisation logo")).toBeInTheDocument();
    expect(screen.getByAltText("No Link Org logo")).toBeInTheDocument();
  });

  it("wraps logo in <a> when href is present", () => {
    render(<TrustSignalsSection section={mockSection} />);
    const link = screen.getByRole("link", { name: /Visit Test Organisation/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does NOT wrap logo in <a> when href is absent", () => {
    render(<TrustSignalsSection section={mockSection} />);
    const links = screen.getAllByRole("link");
    const noLinkOrgLinks = links.filter((link) =>
      link.getAttribute("aria-label")?.includes("No Link Org")
    );
    expect(noLinkOrgLinks).toHaveLength(0);
  });

  it("renders credential labels", () => {
    render(<TrustSignalsSection section={mockSection} />);
    expect(screen.getByText("Test Award 2023")).toBeInTheDocument();
    expect(screen.getByText("No Supporting Text")).toBeInTheDocument();
  });

  it("renders supporting text when present", () => {
    render(<TrustSignalsSection section={mockSection} />);
    expect(screen.getByText("Supporting context.")).toBeInTheDocument();
  });

  it("does NOT render empty supporting text element when absent", () => {
    render(<TrustSignalsSection section={mockSection} />);
    const container = screen.getByText("No Supporting Text").closest("[class]");
    const children = Array.from(container?.children ?? []);
    children.forEach((child) => {
      expect(child.textContent?.trim()).not.toBe("");
    });
  });

  it("renders featured variant with at most 3 credentials", () => {
    const sectionWith5 = {
      ...mockSection,
      credentials: [
        ...mockSection.credentials,
        { id: "c3", label: "C3", kind: "funding" as const, position: 3 },
        { id: "c4", label: "C4", kind: "affiliation" as const, position: 4 },
        { id: "c5", label: "C5", kind: "publication" as const, position: 5 }
      ]
    };
    render(<TrustSignalsSection section={sectionWith5} variant="featured" />);
    expect(screen.getByText("Test Award 2023")).toBeInTheDocument();
    expect(screen.getByText("No Supporting Text")).toBeInTheDocument();
    expect(screen.getByText("C3")).toBeInTheDocument();
    expect(screen.queryByText("C4")).not.toBeInTheDocument();
    expect(screen.queryByText("C5")).not.toBeInTheDocument();
  });

  it("renders compact variant with all credentials", () => {
    const sectionWith5 = {
      ...mockSection,
      credentials: [
        ...mockSection.credentials,
        { id: "c3", label: "C3", kind: "funding" as const, position: 3 },
        { id: "c4", label: "C4", kind: "affiliation" as const, position: 4 },
        { id: "c5", label: "C5", kind: "publication" as const, position: 5 }
      ]
    };
    render(<TrustSignalsSection section={sectionWith5} variant="compact" />);
    expect(screen.getByText("C4")).toBeInTheDocument();
    expect(screen.getByText("C5")).toBeInTheDocument();
  });

  it("returns null when both logos and credentials are empty", () => {
    const empty = { ...mockSection, logos: [], credentials: [] };
    const { container } = render(<TrustSignalsSection section={empty} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders without crashing when logos array is empty but credentials exist", () => {
    const noLogos = { ...mockSection, logos: [] };
    render(<TrustSignalsSection section={noLogos} />);
    expect(screen.getByText("Test Award 2023")).toBeInTheDocument();
  });

  it("defaults to compact variant when no variant prop is passed", () => {
    const sectionWith5 = {
      ...mockSection,
      credentials: [
        ...mockSection.credentials,
        { id: "c3", label: "CredentialFive", kind: "funding" as const, position: 3 }
      ]
    };
    render(<TrustSignalsSection section={sectionWith5} />);
    expect(screen.getByText("CredentialFive")).toBeInTheDocument();
  });
});
