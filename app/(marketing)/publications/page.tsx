import { redirect } from "next/navigation";

export default function PublicationsPage(): never {
  redirect("/research#publications");
}
