"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const characters = {
  ladli: {
    message: "Hi! I’m Ladli, your best friend. Let’s learn and play together!",
    video: "/images/characters/animations/Larli_Braid.mp4",
    audio: "/sounds/characters/girl_ladly.mp3",
  },
  gabbu: {
    message: "Hey! I’m Gabbu, your friend. Ready for a fun challenge?",
    video: "/images/characters/animations/Gabbu_and_YoYo(A).mp4",
    audio: "/sounds/characters/boy_gabbu.mp3",
  },
};

type CharacterKey = keyof typeof characters;

export default function Age3to4Page() {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterKey>("ladli");

  useEffect(() => {
    const choice: CharacterKey = Math.random() < 0.5 ? "ladli" : "gabbu";
    setSelectedCharacter(choice);

    window.speechSynthesis.cancel();

    const audio = new Audio(characters[choice].audio);
    audio.volume = 1.0;

    const playAudio = () => {
      audio.play().catch(() => {
        const resume = () => {
          audio.play();
          window.removeEventListener("click", resume);
          window.removeEventListener("touchstart", resume);
        };
        window.addEventListener("click", resume, { once: true });
        window.addEventListener("touchstart", resume, { once: true });
      });
    };

    playAudio();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const c = characters[selectedCharacter];


  const levels = [
    { label: "Level 1", path: "/lessons/eng/maths/3-4/level1/counting" },
    { label: "Level 2", path: "/lessons/eng/maths/3-4/level2/counting" },
    { label: "Level 3", path: "/lessons/eng/maths/3-4/level3/counting" },
    { label: "Level 4", path: "/lessons/eng/maths/3-4/level4/counting" },
  ];

  return (
    <LessonTemplate characterMessage={c.message} videoSrc={c.video}>
      {/* Level Buttons */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {levels.map((l) => (
          <motion.button
            key={l.label}
            onClick={() => router.push(l.path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-between bg-blue-500/80 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-xl text-lg shadow-md"
          >
            {l.label}
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        ))}
      </div>
    </LessonTemplate>
  );
}
