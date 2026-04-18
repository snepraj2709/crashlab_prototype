import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "person",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug" }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "shortBio",
      type: "text",
      description: "50 words max — for team cards"
    }),
    defineField({
      name: "fullBio",
      type: "array",
      of: [defineArrayMember({ type: "block" })]
    }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "credentials",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "researchFocus",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "socialLinks",
      type: "object",
      fields: [
        defineField({ name: "twitter", type: "url" }),
        defineField({ name: "googleScholar", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "personalWebsite", type: "url" }),
        defineField({ name: "researchgate", type: "url" })
      ]
    }),
    defineField({ name: "isPrincipalInvestigator", type: "boolean" }),
    defineField({ name: "isActive", type: "boolean" }),
    defineField({ name: "joinedAt", type: "date" }),
    defineField({ name: "position", type: "number" }),
    defineField({
      name: "alumniYear",
      title: "Alumni year",
      type: "number",
      description: "Year this person left the lab. Only fill in when isActive is false."
    }),
    defineField({
      name: "currentInstitution",
      title: "Current institution",
      type: "string",
      description: "Where this person is now. Only fill in when isActive is false."
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo"
    }
  }
});
