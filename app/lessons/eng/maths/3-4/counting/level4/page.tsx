"use client";

import { useRouter } from "next/navigation";
import CountingLessonsEngine from "@/app/components/lessons/CountingLessonsEngine";
import { level4Data } from "./data";

export default function Page() {

  const router = useRouter();

  return (
    <CountingLessonsEngine
      data={level4Data}
      onComplete={() =>
        router.push("/lessons")
      }
    />
  );
}
