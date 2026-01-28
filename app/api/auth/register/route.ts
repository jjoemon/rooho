import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    console.log(name, "  -- ", email, " --- ", password)

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      { message: "User created", id: user._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        message: "Registration failed",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
