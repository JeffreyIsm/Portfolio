/**
 * Vercel Serverless Function -> POST /api/contact
 *
 * Same origin as the site, so there is no CORS to configure. Uses Resend's REST
 * API directly via fetch (Node 18+ has it built in) rather than the SDK, so this
 * adds no dependency to the project.
 *
 * Required env var, set in Vercel -> Settings -> Environment Variables:
 *   RESEND_API_KEY
 */

// Where submissions are delivered. Must be the address that owns the Resend
// account while FROM is the shared onboarding@resend.dev sender -- that sender
// only delivers to the account owner. This is deliberately NOT the address
// shown on the site (jri6773@nyu.edu); the two serve different purposes.
const TO = "globalmonkey100@gmail.com";

// Resend's shared sender. Works with no domain verification, but only delivers
// to the address that owns the Resend account -- fine here, since that's you.
// Swap for something on your own domain once you've verified one in Resend.
const FROM = "Portfolio <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};

  // Never trust the client's validation -- the form's `required` attributes are
  // trivially bypassed by posting here directly.
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing name, email, or message." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (message.length > 5000 || name.length > 200) {
    return res.status(400).json({ error: "Message too long." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Mail is not configured." });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email, // hitting Reply in your inbox answers the sender
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n--\n${name} <${email}>`,
      }),
    });

    if (!r.ok) {
      console.error("resend responded", r.status, await r.text());
      return res.status(502).json({ error: "Could not send message." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact send failed", err);
    return res.status(502).json({ error: "Could not send message." });
  }
}
