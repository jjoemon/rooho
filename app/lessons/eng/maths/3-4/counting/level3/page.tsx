"use client";

import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level3Data } from "./data";

export default function CountingLevel3() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 px-6">

      {/* Learning Focus Area */}
      <div className="w-full max-w-4xl flex items-center justify-center">
        <CountingLessonsEngine data={level3Data} />
      </div>

    </div>
  );
}
