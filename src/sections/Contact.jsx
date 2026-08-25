import { useState } from "react";
import { motion } from "motion/react";

const EMAIL = "jri6773@nyu.edu";

// Defaults to a same-origin Vercel serverless function at /api/contact -- no
// CORS, no second service, no env var needed. Override with VITE_CONTACT_API
// only if the API ever lives on a different host.
// Until /api/contact exists the POST fails and the error message shows the
// address, so the form degrades rather than silently swallowing a message.
const API = import.meta.env.VITE_CONTACT_API || "/api/contact";

const FIELD =
  "w-full rounded-lg bg-white/5 border border-white/20 px-4 py-3 text-white " +
  "placeholder-white/40 transition-all focus:border-white/40 focus:outline-none";

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { website, ...data } = Object.fromEntries(new FormData(e.target));

    // Honeypot: real people can't see this field, bots fill everything.
    // Pretend it worked so the bot doesn't retry with a different shape.
    if (website) {
      setStatus("sent");
      e.target.reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      setStatus("sent");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-10 md:pb-30">
      <h1 className="font-michroma-regular text-white text-3xl md:text-5xl font-bold pb-4 pt-4 md:pt-0 text-center">
        Contact Me
      </h1>
      <p className="text-white/50 text-center pb-8 md:pb-12 max-w-md">
        Got a role, a project, or just want to say hi? Drop a message below.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="w-[90vw] md:w-[70vw] max-w-2xl flex flex-col gap-4 p-6 md:p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input name="name" type="text" required placeholder="Your name" className={FIELD} />
          <input name="email" type="email" required placeholder="Your email" className={FIELD} />
        </div>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your message..."
          className={`${FIELD} resize-none`}
        />

        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="min-w-[200px] mx-auto px-6 py-3 rounded-lg font-bold cursor-pointer transition-all text-base text-white border border-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        {status === "sent" && (
          <p className="text-center text-sm text-green-400">
            Thanks — I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">
            Something went wrong. Email me directly at {EMAIL}.
          </p>
        )}
      </motion.form>
    </div>
  );
}

export default Contact;
