import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "application",
  title: "Research Application",
  type: "document",
  fields: [
    defineField({ name: "referenceId", type: "string" }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "currentRole", type: "string" }),
    defineField({ name: "institution", type: "string" }),
    defineField({
      name: "researchInterests",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "portfolioUrl", type: "url" }),
    defineField({ name: "cvUrl", type: "url" }),
    defineField({ name: "motivation", type: "text" }),
    defineField({ name: "availability", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" })
  ]
});
