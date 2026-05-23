import { PROJECTS } from "@/lib/projects";
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Golden Palm City — Discover Tomorrow Early",
  description:
    "India's first cinematic future-land. RERA & HMDA approved premium villa plots in Shadnagar, Hyderabad. Starting ₹5,000/sq.yd. A Kings Pride initiative.",
};

export default function HomePage() {
  return <HomeClient projects={PROJECTS} />;
}
