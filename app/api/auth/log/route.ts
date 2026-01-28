// app/api/auth/log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import AuthLog from "@/app/models/AuthLog";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    await AuthLog.create({
      ...body,
      ipAddress,
      userAgent,
      consent: true,
    });
  } catch (err) {
    console.error("AuthLog write failed:", err);
  }

  return NextResponse.json({ success: true });
}
