import { defineField, defineType } from "sanity";

export default defineType({
  name: "announcement",
  title: "Announcement Banner",
  type: "document",
  fields: [
    defineField({ name: "message", type: "string", title: "Message", validation: (Rule) => Rule.required() }),
    defineField({ name: "ctaText", type: "string", title: "CTA Button Text" }),
    defineField({ name: "ctaUrl", type: "url", title: "CTA URL" }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Grant", value: "grant" },
          { title: "Paper Accepted", value: "paper" },
          { title: "Event", value: "event" },
          { title: "General", value: "general" }
        ]
      }
    }),
    defineField({ name: "isActive", type: "boolean", title: "Active", initialValue: true })
  ],
  preview: {
    select: { title: "message", subtitle: "type" }
  }
});
