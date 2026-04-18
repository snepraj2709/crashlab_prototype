import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image" }),
        defineArrayMember({ type: "code" })
      ]
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "person" }]
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "benchmark-update",
          "research-paper",
          "industry-insight",
          "lab-news",
          "policy"
        ]
      }
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({
      name: "postType",
      type: "string",
      title: "Post Type",
      initialValue: "news",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Blog", value: "blog" }
        ]
      }
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage"
    }
  }
});
