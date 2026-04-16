import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title("CRASH Lab")
    .items([
      S.documentTypeListItem("research").title("Research Projects"),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("post").title("Blog Posts"),
      S.documentTypeListItem("application").title("Research Applications")
    ]);
