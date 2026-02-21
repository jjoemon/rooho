"use client";

import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { motion } from "framer-motion";
import Image from "next/image";

const levels = [
  { label: "Level 1", path: "/lessons/eng/maths/3-4/counting/level1" },
  { label: "Level 2", path: "/lessons/eng/maths/3-4/counting/level2" },
  { label: "Level 3", path: "/lessons/eng/maths/3-4/counting/level3" },
  { label: "Level 4", path: "/lessons/eng/maths/3-4/counting/level4" },
];

export default function CountingPage() {
  const router = useRouter();

  return (
    <LessonTemplate
      title="Let’s Learn Counting Together!"
      description="Choose a level to start your counting adventure 🌈"
    >
      {/* Wrapper must be relative for absolute positioning */}
      <div className="relative w-full flex flex-col items-center">

        {/* 🧑‍🚀 Kaka Guide */}
        <div className="absolute top-4 left-4 z-20 flex items-start gap-3">

          {/* Soft Presence Circle */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500/30 flex items-center justify-center shadow-md">
              <div className="w-[88%] h-[88%] rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full overflow-hidden">
                  <Image
                    src="/images/characters/kaka.png"
                    alt="Kaka guide"
                    width={120}
                    height={120}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl px-3 py-2 shadow-sm max-w-[200px] border border-blue-100">
            <p className="text-xs sm:text-sm font-medium text-zinc-800">
              Choose your level 🌟
            </p>
          </div>

        </div>

        {/* Levels Card */}
        <div className="mt-28 grid grid-cols-1 gap-4 w-full max-w-sm">
          {levels.map((l) => (
            <motion.button
              key={l.label}
              onClick={() => router.push(l.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                bg-blue-500/80 hover:bg-blue-600
                font-semibold py-3 px-5
                rounded-xl text-lg shadow-md text-white
              "
            >
              {l.label}
            </motion.button>
          ))}
        </div>

      </div>
    </LessonTemplate>
  );
}
