import { redirect } from "next/navigation";

/** Site is 6 pages: hub + five businesses. Former about content lives on the landing page. */
export default function AboutPage() {
  redirect("/");
}
