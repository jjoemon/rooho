"use client";

import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tasks = [
  {
    label: "🔢 Counting",
    path: "/lessons/eng/maths/3-4/counting",
    desc: "Learn numbers and counting",
  },
  {
    label: "🎨 Colours",
    path: "/lessons/eng/maths/3-4/colours",
    desc: "Learn primary colours",
  },
  {
    label: "🐶 Animals",
    path: "/lessons/eng/maths/3-4/animals",
    desc: "Learn animals and sounds",
  },
];

const characters = [
  { name: "Gabbu", video: "/images/characters/animations/Gabbu_YoYo.mp4" },
  { name: "Larli", video: "/images/characters/animations/Larli_Braid.mp4" },
];

export default function Age3to4TasksPage() {
  const router = useRouter();
  const [character, setCharacter] = useState<string>("");
  const [backgroundMode, setBackgroundMode] = useState(false);

  

  useEffect(() => {
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    setCharacter(randomChar.video);

    const timer = setTimeout(() => {
      setBackgroundMode(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LessonTemplate title="" description="Choose a fun activity to start learning 🎈">

    <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center">

      {/* FULLSCREEN CHARACTER ANIMATION */}
      {character && (
        <motion.video
          key={character}
          autoPlay
          muted
          loop
          playsInline
          className={`
            absolute inset-0
            w-full h-full
            object-cover
            z-0
            pointer-events-none
            transition-all duration-1500
            ${backgroundMode
              ? "scale-110 blur-[2px] opacity-60"
              : "scale-100 blur-0 opacity-100"}
          `}
        >
          <source src={character} type="video/mp4" />
        </motion.video>
      )}

      {/* SOFT OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />

      {/* GREETING TEXT */}
      {!backgroundMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800">
            Why don't you choose an activity?
          </h2>
        </motion.div>
      )}

      {/* ACTIVITY BUTTONS */}
      <div className="relative z-20 grid grid-cols-1 gap-4 w-full max-w-md mt-20">
        {tasks.map((task) => (
          <motion.button
            key={task.label}
            onClick={() => router.push(task.path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              rounded-2xl
              p-5
              shadow-lg
              text-left
              transition
            "
          >
            <div className="text-lg">{task.label}</div>
            <div className="text-sm opacity-90 mt-1">{task.desc}</div>
          </motion.button>
        ))}
      </div>
      </div>
      </LessonTemplate>
  );
}
