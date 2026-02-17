"use client";

import { ReactNode, useEffect, useState } from "react";
import { getRandomBackgroundImage } from "@/app/utils/randomBg";

export default function Layout3to4({ children }: { children: ReactNode }) {
  const [background, setBackground] = useState("/images/background/background1.jpg");

  useEffect(() => {
    setBackground(getRandomBackgroundImage());
  }, []);

  return (
    <section
      className="min-h-screen flex items-start justify-center bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${background})` }}
    >
        <div className="relative min-h-screen">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background/background1.jpg')" }}
        />

        {/* Mirror */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-cover bg-center scale-y-[-1] opacity-30 blur-md"
          style={{ backgroundImage: "url('/images/background/background1.jpg')" }}
        />

        {/* Ambient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />

        {/* Glass overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />
      </div>

      {children}
    </div>

    
    </section>
  );
}
