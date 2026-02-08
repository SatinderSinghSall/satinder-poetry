import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/api/api";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/subscribe", { email });

      setMessage(res.data.message);
      setEmail("");
    } catch {
      setMessage("Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-40 bg-slate-50">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_60%)]" />

      <div className="relative max-w-2xl mx-auto px-6">
        <div
          className="
          bg-white/80
          backdrop-blur
          rounded-3xl
          shadow-xl
          p-12
          text-center
        "
        >
          <h2 className="text-4xl font-serif text-slate-800 mb-4">
            Stay Inspired
          </h2>

          <p className="text-slate-500 mb-10">
            Receive new poems directly in your inbox.
          </p>

          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />

            <Button
              onClick={handleSubscribe}
              type="button"
              disabled={loading}
              className="
              bg-slate-900
              text-white
              hover:bg-slate-800
              px-6
              rounded-xl
            "
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          {message && <p className="mt-6 text-sm text-slate-500">{message}</p>}
        </div>
      </div>
    </section>
  );
}
