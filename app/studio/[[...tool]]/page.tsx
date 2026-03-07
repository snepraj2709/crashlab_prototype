"use client";

import { Studio } from "sanity";

import config from "@/sanity/sanity.config";

export default function StudioPage(): React.ReactElement {
  return <Studio config={config} unstable_globalStyles />;
}
