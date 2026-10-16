"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center">
      <h1 className="text-2xl font-semibold text-white">Admin sign in</h1>
      <p className="mt-2 text-sm text-zinc-400">Authorized staff only. No public registration.</p>
      <form
        className="mt-8 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setPending(true);
          const fd = new FormData(e.currentTarget);
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: fd.get("email"),
              password: fd.get("password"),
            }),
          });
          setPending(false);
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error ?? "Login failed");
            return;
          }
          router.push("/admin");
          router.refresh();
        }}
      >
        <label className="block text-sm">
          <span className="text-zinc-400">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-400">Password</span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-amber-700 py-2.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}
