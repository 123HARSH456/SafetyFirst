import { NextResponse } from "next/server";

const MAIL_TM_BASE = "https://api.mail.tm";

export async function POST() {
  try {
    // get domain
    const domainsResp = await fetch(`${MAIL_TM_BASE}/domains`);
    const domains = await domainsResp.json();
    const domain = domains["hydra:member"][0].domain;

    // random username & password
    const username = Math.random().toString(36).substring(2, 8);
    const address = `${username}@${domain}`;
    const password = Math.random().toString(36).substring(2, 12);

    // create account
    await fetch(`${MAIL_TM_BASE}/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, password }),
    });

    // get token
    const tokenResp = await fetch(`${MAIL_TM_BASE}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, password }),
    });

    const tokenJson = await tokenResp.json();

    return NextResponse.json({
      address,
      token: tokenJson.token,
    });
  } catch (err) {
    return NextResponse.json({ error: "Account creation failed", details: err }, { status: 500 });
  }
}
