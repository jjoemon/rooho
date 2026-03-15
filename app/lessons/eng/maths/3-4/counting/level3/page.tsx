"use client";

import { useRouter } from "next/navigation";
import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level3Data } from "./data";

export default function Page() {

  const router = useRouter();

  return (
    <CountingLessonsEngine
      data={level3Data}
      onComplete={() =>
        router.push("/lessons/eng/maths/3-4/counting/level4")
      }
    />
  );
}
