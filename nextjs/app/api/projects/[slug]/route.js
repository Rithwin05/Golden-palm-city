import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return NextResponse.json({ detail: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}
