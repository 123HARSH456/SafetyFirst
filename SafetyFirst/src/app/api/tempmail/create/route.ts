// /app/api/tempmail/create/route.ts
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store (resets on each serverless function cold start)
let tempEmails: { [token: string]: string } = {};

export async function POST(req: NextRequest) {
  try {
    // Generate random email
    const randomId = Math.random().toString(36).substring(2, 10);
    const address = `${randomId}@example.com`; // Replace with your domain if needed

    // Generate a simple token
    const token = Math.random().toString(36).substring(2, 20);
    tempEmails[token] = address;

    console.log("Generated temp email:", address, "token:", token);

    return NextResponse.json(
      { address, token },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in /api/tempmail/create:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
