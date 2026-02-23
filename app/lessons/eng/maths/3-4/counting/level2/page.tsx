"use client";

import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level2Data } from "./data";

export default function CountingLevel2() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100">

      {/* Central learning focus */}
      <div className="w-full max-w-4xl p-6">

        <CountingLessonsEngine data={level2Data} />

      </div>

    </div>
  );
}
