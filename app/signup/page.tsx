"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!acknowledged) {
      setError("Please acknowledge the Privacy Notice to continue.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        privacyNoticeVersion: "v1.0",
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Something went wrong");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm"
      >
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Create your account
        </h1>

        {/* Privacy Notice */}
        <div className="mb-4 rounded border p-3 text-sm text-zinc-700 dark:text-zinc-300">
          <p className="mb-2 font-medium">Privacy Notice (Security Logging)</p>
          <p>
            To protect user accounts and maintain the security of our services,
            we log limited technical information related to authentication
            events (such as successful or failed login attempts).
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Pseudonymised (hashed) IP address</li>
            <li>Browser and device information</li>
            <li>Coarse location data (city, region, country)</li>
            <li>Type and time of authentication event</li>
          </ul>
          <p className="mt-2">
            We do not store raw IP addresses or precise location data. Logs are
            retained for 90 days and used solely for security and abuse
            prevention, based on our legitimate interest.
          </p>
        </div>

        {/* Acknowledgement */}
        <div className="mb-4 flex items-start gap-2">
          <input
            type="checkbox"
            id="ack"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="ack" className="text-sm">
            I have read and understood the Privacy Notice.
          </label>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-zinc-900 py-2 text-zinc-50 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
