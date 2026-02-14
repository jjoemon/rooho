"use client";

import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { motion } from "framer-motion";

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
      title="3-4 Maths Activities"
      description="Choose an activity to start learning numbers, colours, or animals"
    >
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
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
    </LessonTemplate>
  );
}
