import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;

  if (!apiKey) {
    // Dev mode: no API key configured yet
    console.log(`[subscribe] ${email} (no BUTTONDOWN_API_KEY — dev mode)`);
    return NextResponse.json({ ok: true });
  }

  // Production: forward to Buttondown
  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      type: "regular",
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const code = body?.code as string | undefined;

    // Already subscribed — treat as success
    if (res.status === 409 || code === "email_already_exists") {
      return NextResponse.json({ ok: true });
    }

    // Buttondown firewall blocked the email domain
    if (code === "subscriber_blocked") {
      return NextResponse.json(
        { error: "That email domain isn't accepted. Try a work or personal email." },
        { status: 400 }
      );
    }

    console.error("[subscribe] Buttondown error:", res.status, body);
    return NextResponse.json(
      { error: "Subscription failed. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
