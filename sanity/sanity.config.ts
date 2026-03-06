import { defineConfig } from "sanity";
import { codeInput } from "@sanity/code-input";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "CRASH Lab Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [deskTool({ structure }), codeInput()],
  schema: {
    types: schemaTypes
  }
});
