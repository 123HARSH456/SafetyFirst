import { NextRequest, NextResponse } from "next/server";

// Helper function to introduce a delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const fetchHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // Add a User-Agent header to mimic a real browser request
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};


export async function POST(req: NextRequest) {
  try {
    // 1. Fetch available domains from the mail.tm service
    console.log("Fetching domains from mail.tm...");
    const domainResponse = await fetch("https://api.mail.tm/domains", {
        headers: {
            'Accept': fetchHeaders.Accept,
            'User-Agent': fetchHeaders['User-Agent']
        },
        // Use cache-busting to get the most recent list of domains
        next: { revalidate: 0 }
    });

    if (!domainResponse.ok) {
      const errorBody = await domainResponse.text();
      console.error("Failed to fetch domains:", domainResponse.status, errorBody);
      throw new Error(`Could not fetch available domains for temp mail. Status: ${domainResponse.status}`);
    }
    const domains = await domainResponse.json();
    console.log("Successfully fetched domains.");

    // Use the first available domain from the list
    const domain = domains["hydra:member"]?.[0]?.domain;
    if (!domain) {
      console.error("No domains found in the response:", domains);
      throw new Error("No available domains found from the service.");
    }
    console.log("Using domain:", domain);


    // 2. Generate random credentials for the new email address
    const randomId = Math.random().toString(36).substring(2, 12);
    const address = `${randomId}@${domain}`;
    const password = Math.random().toString(36).substring(2, 20);
    console.log("Generated new address:", address);

    // 3. Create a new email account using the mail.tm API
    console.log("Creating account on mail.tm...");
    const accountResponse = await fetch("https://api.mail.tm/accounts", {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({
        address: address,
        password: password,
      }),
    });

    if (!accountResponse.ok) {
      const errorBody = await accountResponse.text();
      console.error("Mail.tm account creation failed:", accountResponse.status, errorBody);
      throw new Error(`Failed to create the temporary email account. Status: ${accountResponse.status}`);
    }
    console.log("Account created successfully.");

    // Add a small delay to ensure the account is propagated on the mail.tm servers
    await delay(1000); // Wait for 1 second

    // 4. Log in to the newly created account to get an authentication JWT token
    console.log("Fetching authentication token...");
    const tokenResponse = await fetch("https://api.mail.tm/token", {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({
        address: address,
        password: password,
      }),
    });

    if (!tokenResponse.ok) {
       const errorBody = await tokenResponse.text();
       console.error("Mail.tm token fetch failed:", tokenResponse.status, errorBody);
       throw new Error(`Failed to get authentication token after account creation. Status: ${tokenResponse.status}`);
    }

    const { token } = await tokenResponse.json();
    console.log("Successfully fetched token.");

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

