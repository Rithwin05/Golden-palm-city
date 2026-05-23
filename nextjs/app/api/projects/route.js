import { PROJECTS } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(PROJECTS);
}
