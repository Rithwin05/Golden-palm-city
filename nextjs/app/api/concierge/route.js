import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, interest, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }

    // Log inquiry (replace with DB write if needed)
    console.log("[Concierge Inquiry]", {
      name,
      phone,
      email,
      interest,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received. Our concierge will reach you soon.",
    });
  } catch (err) {
    console.error("Concierge API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
