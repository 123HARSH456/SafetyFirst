import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Fetch available domains from the mail.tm service
    const domainResponse = await fetch("https://api.mail.tm/domains", {
        // Use cache-busting to get the most recent list of domains
        next: { revalidate: 0 }
    });
    if (!domainResponse.ok) {
      console.error("Failed to fetch domains:", await domainResponse.text());
      throw new Error("Could not fetch available domains for temp mail.");
    }
    const domains = await domainResponse.json();
    // Use the first available domain from the list
    const domain = domains["hydra:member"][0]?.domain;
    if (!domain) {
      throw new Error("No available domains found from the service.");
    }

    // 2. Generate random credentials for the new email address
    const randomId = Math.random().toString(36).substring(2, 12);
    const address = `${randomId}@${domain}`;
    const password = Math.random().toString(36).substring(2, 20);

    // 3. Create a new email account using the mail.tm API
    const accountResponse = await fetch("https://api.mail.tm/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: address,
        password: password,
      }),
    });

    if (!accountResponse.ok) {
      console.error("Mail.tm account creation failed:", await accountResponse.text());
      throw new Error("Failed to create the temporary email account.");
    }

    // 4. Log in to the newly created account to get an authentication JWT token
    const tokenResponse = await fetch("https://api.mail.tm/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: address,
        password: password,
      }),
    });

    if (!tokenResponse.ok) {
       console.error("Mail.tm token fetch failed:", await tokenResponse.text());
       throw new Error("Failed to get authentication token after account creation.");
    }

    const { token } = await tokenResponse.json();

    // 5. Return the new email address and the auth token to the client
    return NextResponse.json({ address, token }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/tempmail/create:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
