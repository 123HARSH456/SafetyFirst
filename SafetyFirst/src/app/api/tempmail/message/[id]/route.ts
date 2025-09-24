import { NextResponse } from "next/server";

const MAIL_TM_BASE = "https://api.mail.tm";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 

  const token = req.headers.get("authorization");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  try {
    const resp = await fetch(`${MAIL_TM_BASE}/messages/${id}`, {
      headers: { Authorization: token },
    });

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch message", details: err },
      { status: 500 }
    );
  }
}
