"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-4">

      {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/faf.png"
            alt="faf logo"
            width={1200}
            height={1200}
            priority
            className="dark:hidden h-10 w-auto md:h-12 lg:h-14"
          />
          </Link>
        </div>

        {/* Center: Title */}
        <div className="text-center">
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
             Roots & Horizons
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            play and learn as you go
          </p>
        </div>

        {/* Right: Navigation + Auth */}
        <div className="flex items-center justify-end gap-6 text-sm">
          {status === "loading" ? null : session ? (
            <>
              <span className="text-zinc-600 dark:text-zinc-400">
                { session.user?.name}
                {session.user?.email}
              </span>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                Sign in
              </Link>

              {/* Divider */}
              <span className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />

              <Link
                href="/signup"
                className="rounded-full bg-zinc-900 px-4 py-1.5 text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
