"use client";

import Link from "next/link";
import Image from "next/image";
import RooHoLogo from "@/app/components/ui/logo-rooho";
import { signOut, useSession } from "next-auth/react";
import { lusitana } from '@/app/components/ui/fonts';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b border-zinc-200 bg-black text-white dark:border-zinc-800">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-4">

      {/* Left: Logo */}
        <div className="flex items-center">
          <RooHoLogo />
        </div>

        {/* Center: Title */}
        <div className="flex-1 text-center min-w-[120px]">
          <h1
            className={`${lusitana.className} font-extrabold text-red-500 drop-shadow-lg leading-tight
            text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl truncate`}
          >
            Roots & Horizons
          </h1>
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
                className="rounded-full bg-zinc-900 px-4 py-1.5 text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
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
