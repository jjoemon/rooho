// app/api/admin/logs/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/app/lib/mongoose";
import AuthLog from "@/app/models/AuthLog";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const logs = await AuthLog.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  return NextResponse.json(logs);
}
