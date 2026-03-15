"use client";

import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const tasks = [
  { label: "🔢 Counting", path: "/lessons/eng/maths/3-4/counting", desc: "Learn numbers" },
  { label: "🎨 Colours", path: "/lessons/eng/maths/3-4/colours", desc: "Learn colours" },
  { label: "🐶 Animals", path: "/lessons/eng/maths/3-4/animals", desc: "Learn sounds" },
];

const characters = [
  {
    name: "Gabbu",
    video: "/images/characters/animations/Gabbu_YoYo.mp4",
    audio: "/sounds/en/characters/activity/gabbu_ollie.mp3",
  },
  {
    name: "Larli",
    video: "/images/characters/animations/Larli_Braid.mp4",
    audio: "/sounds/en/characters/activity/larli.mp3",
  },
];

export default function Age3to4TasksPage() {
  const router = useRouter();
  const [character, setCharacter] = useState<typeof characters[0] | null>(null);
  const [phase, setPhase] = useState<'greeting' | 'menu'>('greeting');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-load the other character's audio in the background
    const otherChar = characters.find(c => c.name !== character?.name);
    if (otherChar) {
      const img = new Image(); // Pre-load video thumbnail
      const audio = new Audio(otherChar.audio);
      audio.preload = "auto";
    }
  }, [character]);

  useEffect(() => {
    // Select character once on mount
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    setCharacter(randomChar);

    // Initialise audio
    const audio = new Audio(randomChar.audio);
    audio.load(); // Force load for Larli
    audioRef.current = audio;
    audio.volume = 1.0;

    const handleAudioEnd = () => setPhase('menu');
    audio.addEventListener("ended", handleAudioEnd);

    // Small timeout to ensure video/audio are ready to play together
    const playTimeout = setTimeout(() => {
      audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    }, 500);

    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
      audio.pause();
      clearTimeout(playTimeout);
    };
  }, []);

  return (
    <LessonTemplate title="" description="">
      {/* Container must be overflow-hidden to "crop" the scaling video */}
      <div className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl">

        {/* CHARACTER VIDEO */}
        {character && (
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              scale: phase === 'greeting' ? 1 : 1.25, // Reduced scale to keep them in frame
              filter: phase === 'greeting' ? "blur(0px)" : "blur(12px)",
              opacity: phase === 'greeting' ? 1 : 0.3
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center" // object-center keeps the character centered
            >
              <source src={character.video} type="video/mp4" />
            </video>
          </motion.div>
        )}

        {/* WHITE WASH OVERLAY */}
        <motion.div
          animate={{ opacity: phase === 'greeting' ? 0.1 : 0.6 }}
          className="absolute inset-0 bg-white z-10 pointer-events-none"
        />

        {/* UI CONTENT */}
        <div className="relative z-20 flex flex-col items-center w-full max-w-sm px-6">

          <AnimatePresence>
            {phase === 'greeting' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center mb-10 bg-white/80 p-6 rounded-full shadow-xl border-4 border-yellow-400"
              >
                <h2 className="text-2xl font-black text-zinc-800">
                  {character?.name} is here! 👋
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: phase === 'menu' ? 1 : 0,
              y: phase === 'menu' ? 0 : 50,
              display: phase === 'menu' ? 'block' : 'none'
            }}
            className="w-full space-y-4"
          >
            {tasks.map((task) => (
              <button
                key={task.label}
                onClick={() => router.push(task.path)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl p-5 shadow-lg transition-transform active:scale-95 text-left"
              >
                <div className="text-lg">{task.label}</div>
                <div className="text-xs opacity-80">{task.desc}</div>
              </button>
            ))}
          </motion.div>
        </div>

      </div>
    </LessonTemplate>
  );
}
