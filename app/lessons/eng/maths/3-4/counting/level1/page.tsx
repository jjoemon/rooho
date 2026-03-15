// src/app/lessons/eng/maths/3-4/counting/level1/page.tsx
"use client";

import { useRouter } from "next/navigation";
import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level1Data } from "./data";

export default function Page() {

  const router = useRouter();

  return (
    <CountingLessonsEngine
      data={level1Data}
      onComplete={() =>
        router.push("/lessons/eng/maths/3-4/counting/level2")
      }
    />
    
  );
}
