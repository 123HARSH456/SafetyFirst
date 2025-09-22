import { NextResponse } from "next/server"

// In a real app, replace this with a DB connection (MongoDB, PostgreSQL, etc.)
let reports: {
  url: string
  reason: string
  createdAt: string
}[] = []

// Handle POST (submit a new report)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url, reason } = body

    if (!url || !reason) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const newReport = {
      url,
      reason,
      createdAt: new Date().toISOString(),
    }

    reports.push(newReport)

    return NextResponse.json({ success: true, report: newReport }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Failed to save report" }, { status: 500 })
  }
}

// Handle GET (retrieve all reports) – optional for admin dashboard
export async function GET() {
  return NextResponse.json({ reports })
}
