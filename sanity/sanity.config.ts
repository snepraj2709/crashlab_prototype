import { defineConfig } from "sanity";
import { codeInput } from "@sanity/code-input";
import { structureTool } from "sanity/structure";
import {visionTool} from '@sanity/vision'

import { schemaTypes } from "./schemaTypes";
import { structure } from "./deskStructure";

export default defineConfig({
  name: "default",
  title: "CRASH Lab Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool({ structure }), codeInput(), visionTool()],
  schema: {
    types: schemaTypes
  }
});
