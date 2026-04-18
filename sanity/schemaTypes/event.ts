import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
    defineField({ name: "date", type: "datetime", title: "Date & Time", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", type: "string", title: "Location" }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({ name: "eventUrl", type: "url", title: "Event URL" }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Conference", value: "conference" },
          { title: "Seminar", value: "seminar" },
          { title: "Workshop", value: "workshop" },
          { title: "Lab Event", value: "lab-event" }
        ]
      }
    })
  ],
  preview: {
    select: { title: "title", subtitle: "date" }
  }
});
