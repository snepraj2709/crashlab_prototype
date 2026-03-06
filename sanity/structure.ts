import type { StructureBuilder } from "sanity/desk";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("CRASH Lab")
    .items([
      S.documentTypeListItem("research").title("Research Projects"),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("post").title("Blog Posts"),
      S.documentTypeListItem("application").title("Research Applications")
    ]);
