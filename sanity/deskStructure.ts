import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("CRASH Lab")
    .items([
      S.documentTypeListItem("research").title("Research Projects"),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("post").title("Blog Posts"),
      S.documentTypeListItem("application").title("Research Applications")
    ]);
