import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "research",
  title: "Research Project",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required()
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "problemStatement", type: "string" }),
    defineField({ name: "summary", type: "text" }),
    defineField({
      name: "body",
      type: "array",
      of: [defineArrayMember({ type: "block" })]
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: ["active", "published", "completed", "seeking-collaborators"]
      }
    }),
    defineField({ name: "venue", type: "string" }),
    defineField({ name: "publishedAt", type: "date" }),
    defineField({ name: "paperUrl", type: "url" }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          "radiology",
          "benchmark",
          "multimodal-AI",
          "chest-xray",
          "report-generation",
          "foundation-models",
          "federated-learning",
          "data-commons",
          "human-AI-collaboration",
          "governance",
          "India-healthcare",
          "NLP",
          "computer-vision"
        ]
      }
    }),
    defineField({
      name: "audience",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: ["researcher", "industry", "investor", "all"] }
    }),
    defineField({
      name: "lead",
      type: "reference",
      to: [{ type: "person" }]
    }),
    defineField({
      name: "team",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "person" }] })]
    }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "seekingCollaborators", type: "boolean" }),
    defineField({
      name: "metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "string" }),
            defineField({
              name: "type",
              type: "string",
              options: { list: ["human", "ai", "gap"] }
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "problemStatement"
    }
  }
});
