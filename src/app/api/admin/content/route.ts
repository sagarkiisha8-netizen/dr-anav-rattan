import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSiteContent, updateSiteContent, deepMergeSiteContent } from "@/lib/db";
import { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Public GET so public pages or client components can fetch latest content
export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(
      { ...content, content },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (err: unknown) {
    console.error("Error reading content:", err);
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

// Protected PUT to update entire or partial content
export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
    }

    const current = await getSiteContent();
    const updatedContent = deepMergeSiteContent(current, body);

    const result = await updateSiteContent(updatedContent);

    return NextResponse.json(
      {
        success: result.success,
        content: updatedContent,
        persistedTo: result.persistedTo,
        savedAt: result.savedAt,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: unknown) {
    console.error("Error updating content:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update content" },
      { status: 500 }
    );
  }
}
