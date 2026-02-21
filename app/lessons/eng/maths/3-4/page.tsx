"use client";

import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { motion } from "framer-motion";
import Image from "next/image";

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

export default function Age3to4TasksPage() {
  const router = useRouter();

  return (
    <LessonTemplate
      title=""
      description="Choose a fun activity to start learning 🎈"
    >

    {/* Guide Character - Top Left of Card */}
  <div className="absolute top-4 left-4 z-20 flex items-start gap-3">

    {/* Soft Presence Circle */}
    <div className="relative">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-blue-100  bg-blue-500/10 flex items-center justify-center shadow-md">
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

    {/* Intro Bubble */}
    <div className="bg-white backdrop-blur-md rounded-xl px-3 py-2 shadow-sm max-w-[200px] border border-blue-100">
      <p className="text-xs sm:text-sm font-medium text-zinc-800">
        Kiddo! Let’s choose an activity together! 😊
      </p>
    </div>

  </div>



      {/* Activities */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-md mt-24">
        {tasks.map((task) => (
          <motion.button
            key={task.label}
            onClick={() => router.push(task.path)}
            whileHover={{ scale: 1.03 }}
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

    </LessonTemplate>
  );
}
