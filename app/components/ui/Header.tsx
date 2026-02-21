"use client";

import Link from "next/link";
import RooHoLogo from "@/app/components/ui/logo-rooho";
import { signOut, useSession } from "next-auth/react";
import { lusitana } from "@/app/components/ui/fonts";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* Left: Logo */}
        <div className="flex items-center gap-2">
        <RooHoLogo
          size={40}
          className="sm:[font-size:32px] md:[font-size:40px] lg:[font-size:48px]"
        />
        </div>

        {/* Center: Brand */}
        <div className="flex flex-col items-center text-center leading-none select-none">
          <h1
            className={`
              ${lusitana.className}
              font-extrabold
              text-red-500
              drop-shadow-lg
              tracking-wide
              text-xl sm:text-2xl md:text-3xl lg:text-4xl
            `}
          >
            RooHo!
          </h1>
          <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-zinc-300">
            roots and horizons
          </span>
        </div>

        {/* Right: Auth */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {status === "loading" ? null : session ? (
            <>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-2 py-1 rounded-md border border-zinc-700 hover:bg-zinc-800 transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-2 py-1 rounded-md hover:bg-zinc-800 transition"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold"
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
