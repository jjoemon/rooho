import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { dbConnect } from "@/app/lib/mongoose";
import AuthLog from "@/app/models/AuthLog";
import { AuthEvent, AuthLogPayload } from "@/app/types/authLog";

function hashIP(ip: string) {
  const salt = process.env.IP_HASH_SALT;
  if (!salt) return null;

  return crypto
    .createHash("sha256")
    .update(ip + salt)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = (await req.json()) as AuthLogPayload;

  // Whitelist expected fields only
  const { userId, event } = body;

  if (!Object.values(AuthEvent).includes(event)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const rawIp =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    null;

  const ipHash = rawIp ? hashIP(rawIp) : null;
  const userAgent = req.headers.get("user-agent") || "unknown";

  const city = req.headers.get("x-vercel-ip-city");
  const region = req.headers.get("x-vercel-ip-country-region");
  const country = req.headers.get("x-vercel-ip-country");

  try {
    await AuthLog.create({
      userId,
      event,

      ipHash,
      userAgent,

      location: {
        city: city ?? null,
        region: region ?? null,
        country: country ?? null,
      },

      purpose: "authentication-security",

      consent: {
        given: true,
        version: "v1.0",
        timestamp: new Date(),
      },
    });
  } catch (err) {
    console.error("AuthLog write failed:", err);
  }

  return NextResponse.json({ success: true });
}
