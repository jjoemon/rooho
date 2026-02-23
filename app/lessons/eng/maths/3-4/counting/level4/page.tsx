"use client";

import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level4Data } from "./data";

export default function CountingLevel4() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-6">

      {/* Central learning focus */}
      <div className="w-full max-w-5xl flex items-center justify-center">
        <CountingLessonsEngine data={level4Data} />
      </div>

    </div>
  );
}
