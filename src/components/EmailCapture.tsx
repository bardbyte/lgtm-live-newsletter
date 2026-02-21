"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function getNextTuesday(): string {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 2=Tue
  const daysUntilTuesday = (2 - day + 7) % 7 || 7; // always next Tue, not today
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilTuesday);
  return next.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

const SUBSCRIBER_COUNT = "100";

interface EmailCaptureProps {
  className?: string;
  variant?: "default" | "footer";
}

export default function EmailCapture({
  className = "",
  variant = "default",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const nextTuesday = getNextTuesday();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");

      // Track subscription in Plausible
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).plausible) {
        (window as unknown as Record<string, (...args: unknown[]) => void>).plausible("Subscribe", {
          props: { variant },
        });
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 ${className}`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-emerald"
        >
          <path
            d="M3 7.5 L5.5 10 L11 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-sm text-emerald">
          Welcome. You&apos;re joining {SUBSCRIBER_COUNT}+ technical leaders.
          Next deep dive lands {nextTuesday}.
        </span>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-0"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading"}
          className="w-56 bg-transparent border-b border-accent/30 px-0 py-2 text-sm text-foreground placeholder:text-muted-dark/40 focus:outline-none focus:border-accent transition-colors font-mono disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="ml-3 font-mono text-sm text-accent/80 hover:text-accent transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Get the Briefing \u2192"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 font-mono text-[10px] text-red-500 tracking-wide">
          {errorMsg}
        </p>
      )}
      {status !== "error" && variant === "default" && (
        <p className="mt-2 font-mono text-[10px] text-muted-dark/60 tracking-wide">
          Next issue: {nextTuesday} &middot; Free &middot; Unsubscribe anytime
        </p>
      )}
      {status !== "error" && variant === "footer" && (
        <p className="mt-2 font-mono text-[10px] text-muted-dark/60 tracking-wide">
          Free &middot; Biweekly Tuesdays &middot; Unsubscribe anytime
        </p>
      )}
    </div>
  );
}
