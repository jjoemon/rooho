"use client";

type ContentCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "responsive" | "phoneFrame";
  blur?: boolean;
};

export default function ContentCard({
  children,
  className = "",
  variant = "responsive",
  blur = true,
}: ContentCardProps) {
  const baseStyle = {
    background: "rgba(255, 255, 255, 0.08)", // glass tint
    WebkitBackdropFilter: blur ? "blur(18px) saturate(160%)" : "none",
    backdropFilter: blur ? "blur(18px) saturate(160%)" : "none",
  };

  const cardClass = `
    rounded-[2rem]
    border border-white/30
    shadow-[0_8px_32px_rgba(0,0,0,0.15)]
    p-6
    flex flex-col items-center
    text-white
    overflow-hidden
    relative

    before:absolute
    before:inset-0
    before:rounded-[2rem]
    before:bg-gradient-to-br
    before:from-white/20
    before:to-white/0
    before:opacity-40
    before:pointer-events-none
    animate-[pulse_6s_ease-in-out_infinite]

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
