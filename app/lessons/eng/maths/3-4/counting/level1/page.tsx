// src/app/lessons/eng/maths/3-4/counting/level1/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level1Data } from "./data";

export default function CountingLevel1() {
  const [character, setCharacter] = useState<"ladli" | "gabbu">("ladli");

  const characterInfo = {
    ladli: { name: "Ladli", image: "/images/characters/Larli.jpeg" },
    gabbu: { name: "Gabbu", image: "/images/characters/Gabbu.png" },
  }[character];

  useEffect(() => {
    const chars: ("ladli" | "gabbu")[] = ["ladli", "gabbu"];
    setCharacter(chars[Math.floor(Math.random() * chars.length)]);
  }, []);

  return (
    <LessonTemplate
      title="Counting Level 1"
      description="Let’s learn numbers 1, 2, and 3 together!"
    >
      <div className="relative w-full min-h-[80vh] flex flex-col items-center">

        {/* Character guide */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-blue-400">
            <Image
              src={characterInfo.image}
              alt={characterInfo.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>

          <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border">
            <p className="text-sm font-semibold text-gray-800">
              {characterInfo.name} is helping you count!
            </p>
          </div>
        </div>

        {/* Focus card — anchored near top */}
        <div className="relative z-10 w-full max-w-2xl mt-20 bg-white rounded-3xl p-6 shadow-2xl border border-gray-200">

          {/* Engine */}
          <CountingLessonsEngine data={level1Data} />

        </div>

        {/* Soft background dim */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>
    </LessonTemplate>
  );
}
