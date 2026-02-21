"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level2Data } from "./data";

export default function CountingLevel2() {
  const [character, setCharacter] = useState<"ladli" | "gabbu">("ladli");

  const characterInfo = {
    ladli: { name: "Ladli", image: "/images/characters/Larli.jpeg" },
    gabbu: { name: "Gabbu", image: "/images/characters/Gabbu.png" },
  }[character];

  // Pick random guide
  useEffect(() => {
    const chars: ("ladli" | "gabbu")[] = ["ladli", "gabbu"];
    setCharacter(chars[Math.floor(Math.random() * chars.length)]);
  }, []);

  return (
    <LessonTemplate
      title="Counting Level 2"
      description="Let’s learn numbers 1, 2, 3, 4, and 5 together!"
    >
      {/* Focus Container */}
      <div className="relative w-full min-h-[85vh] flex justify-center items-start pt-8">

        {/* Soft background dim */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Character guide */}
        <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl bg-blue-400">
            <Image
              src={characterInfo.image}
              alt={characterInfo.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>

          <div className="bg-white px-3 py-1.5 rounded-xl shadow-lg">
            <p className="text-sm font-semibold text-gray-800">
              {characterInfo.name} is helping you count!
            </p>
          </div>
        </div>

        {/* Lesson Card */}
        <div className="relative z-10 w-full max-w-3xl bg-gray-900/90 rounded-3xl p-6 shadow-2xl border border-white/10">

          <CountingLessonsEngine data={level2Data} />

        </div>
      </div>
    </LessonTemplate>
  );
}
