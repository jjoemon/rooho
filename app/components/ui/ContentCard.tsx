"use client";

import React from "react";

type ContentCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "phoneFrame" | "responsive";
  blur?: boolean;      // NEW
};

export default function ContentCard({
  children,
  className = "",
  variant = "responsive",
  blur = true,
}: ContentCardProps) {
  const baseStyle = {
    backgroundColor: "rgba(255,255,255,0.1)", // slightly stronger
    WebkitBackdropFilter: blur ? "blur(14px)" : "none",
    backdropFilter: blur ? "blur(14px)" : "none",
  };

  const cardClass = `
    rounded-[2rem]
    border border-white/20
    shadow-[0_4px_20px_rgba(255,255,255,0.05)]
    p-4
    flex flex-col items-center
    text-white
    overflow-hidden
    ${className}
  `;

  if (variant === "phoneFrame") {
    return (
      <div
        className={`max-w-[390px] aspect-[9/19.5] w-full ${cardClass}`}
        style={baseStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-[520px] ${cardClass}`}
      style={baseStyle}
    >
      {children}
    </div>
  );
}
