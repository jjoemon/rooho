import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/components/ui/fonts";
import Link from "next/link";

type RooHoLogoProps = {
  size?: number;        // base size in px
  className?: string;
};

export default function RooHoLogo({ size = 36, className = "" }: RooHoLogoProps) {
  return (
    <div
      className={`${lusitana.className} flex items-center gap-2 leading-none text-red-500 ${className}`}
      style={{ fontSize: size }}
    >
      <Link href="/" className="flex items-center gap-2">

        {/* Icon */}
        <GlobeAltIcon
          style={{ width: size, height: size }}
          className="rotate-[15deg] flex-shrink-0"
        />

        {/* Optional text if you ever want it back */}
        {/* <span className="font-extrabold">RooHO!</span> */}

      </Link>
    </div>
  );
}
