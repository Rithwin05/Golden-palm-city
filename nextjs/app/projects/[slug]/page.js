import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.name} — Golden Palm City`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Golden Palm City`,
      description: project.tagline,
      images: [{ url: project.image_url }],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const others = PROJECTS.filter((p) => p.slug !== project.slug);

  return <ProjectDetailClient project={project} others={others} />;
}
