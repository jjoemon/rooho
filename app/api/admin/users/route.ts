// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import {dbConnect} from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const users = await User.find({}, "name email role").lean();
  return NextResponse.json({ users });
}
