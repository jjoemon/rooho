"use client";

import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

// --- CRITICAL: This was missing or misplaced ---
const levels = [
  { label: "Level 1", path: "/lessons/eng/maths/3-4/counting/level1" },
  { label: "Level 2", path: "/lessons/eng/maths/3-4/counting/level2" },
  { label: "Level 3", path: "/lessons/eng/maths/3-4/counting/level3" },
  { label: "Level 4", path: "/lessons/eng/maths/3-4/counting/level4" },
];

export default function CountingPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ensure the path is exactly correct in your public folder
    const audioPath = "/sounds/characters/activity/kaka_nathan_maths_level.mp3";
    const audio = new Audio(audioPath);
    audio.volume = 1.0;
    audioRef.current = audio;

    const playAudio = () => {
      audio.play().catch((e) => console.log("Autoplay blocked:", e));
      window.removeEventListener("click", playAudio);
    };

    // Try playing immediately (works if coming from another page)
    audio.play().catch(() => {
      // Fallback: wait for the first click anywhere on the page
      window.addEventListener("click", playAudio);
    });

    return () => {
      window.removeEventListener("click", playAudio);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <LessonTemplate
      title="Let’s Learn Counting Together!"
      description="Choose a level to start your counting adventure 🌈"
    >
      <div className="relative w-full flex flex-col items-center">

        {/* Kaka Guide Section */}
        <div className="absolute top-4 left-4 z-20 flex items-start gap-3">
          <motion.div
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              }
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
          >
            {/* Round wrapper with explicit relative position */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-blue-100">
              <Image
                src="/images/characters/kaka.png"
                alt="Kaka guide"
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Speech Bubble */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-md border border-blue-100 mt-2">
            <p className="text-sm font-bold text-zinc-800">Choose a level! 🌟</p>
          </div>
        </div>

        {/* Levels Grid - This uses the 'levels' array defined at the top */}
        <div className="mt-40 grid grid-cols-1 gap-4 w-full max-w-sm px-6">
          {levels.map((l) => (
            <motion.button
              key={l.label}
              onClick={() => {
                // Stop audio before moving to the next page
                if (audioRef.current) audioRef.current.pause();
                router.push(l.path);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-3xl text-xl shadow-xl transition-colors"
            >
              {l.label}
            </motion.button>
          ))}
        </div>
      </div>
    </LessonTemplate>
  );
}
