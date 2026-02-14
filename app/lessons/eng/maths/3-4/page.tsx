"use client";

import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { motion } from "framer-motion";

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
      title="Age 3–4 Learning Activities"
      description="Choose an activity to start learning!"
      hideControls
    >
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
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
