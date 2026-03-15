"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Make sure to import this!

type LessonObject = {
  name: string;
  folder: string;
  colors: string[];
  ext?: string;
};

type LessonData = {
  numbers: number[];
  objects: LessonObject[];
  numberColors: Record<number, string>;
};

interface CountingLessonsEngineProps {
  data: LessonData;
  onComplete?: () => void;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.85;
  utter.pitch = 1.1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function generateGroups(data: LessonData) {
  return data.objects.map((obj) =>
    data.numbers.map((num) => {
      // 1. Get the color name directly from your numberColors map
      // e.g., data.numberColors[4] returns "green"
      const color = data.numberColors[num];

      const ext = obj.ext ?? "png";

      // 2. Your specific constraint: filename capped at 3
      const imageNum = num > 3 ? 3 : num;

      return {
        number: num,
        object: obj.name,
        // This ensures Number 4 ALWAYS looks in the /green/ folder
        // and Number 5 ALWAYS looks in the /brown/ folder
        image: `/images/objects/${obj.folder}/${color}/${color}${imageNum}.${ext}`,
      };
    })
  );
}

function NumberCircle({ number, color }: { number: number; color: string }) {
  return (
    <div
      className="flex items-center justify-center text-white font-bold text-4xl w-24 h-24 rounded-full shadow-lg border-4 border-white"
      style={{ backgroundColor: color || "#3b82f6" }}
    >
      {number}
    </div>
  );
}

export default function CountingLessonsEngine({ data, onComplete }: CountingLessonsEngineProps) {
  const groups = useMemo(() => generateGroups(data), [data]);

  const [started, setStarted] = useState(false);
  const [objectIndex, setObjectIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"count" | "explain" | "teacher" | "done">("count");
  const [visibleCount, setVisibleCount] = useState(0);

  const group = groups[objectIndex];
  const item = group?.[stepIndex];

  function nextExample() {
    if (stepIndex < group.length - 1) {
      setStepIndex((s) => s + 1);
      setPhase("count");
      return;
    }
    if (objectIndex < groups.length - 1) {
      setObjectIndex((o) => o + 1);
      setStepIndex(0);
      setPhase("count");
      return;
    }
    setPhase("done");
  }

  useEffect(() => {
    if (!started || !item) return;

    let cancelled = false;

    async function runLesson() {
      if (phase === "count") {
        setVisibleCount(0);
        for (let i = 1; i <= item.number; i++) {
          if (cancelled) return;
          speak(String(i));
          setVisibleCount(i);
          await wait(1000);
        }
        setPhase("explain");
      }

      if (phase === "explain") {
        const text = `${item.number} means ${item.number} ${item.object}${item.number > 1 ? "s" : ""}`;
        speak(text);
        await wait(2500);

        if (objectIndex === 0 && stepIndex === group.length - 1) {
          setPhase("teacher");
        } else {
          nextExample();
        }
      }

      if (phase === "teacher") {
        speak(`You learned to count up to ${item.number}. Excellent!`);
        await wait(2000);
        speak("Let's count together.");
        setVisibleCount(0);
        await wait(800);

        for (let i = 1; i <= item.number; i++) {
          if (cancelled) return;
          speak(String(i));
          setVisibleCount(i);
          await wait(900);
        }
        speak(`Great! Now you know how to count to ${item.number}.`);
      }
    }

    runLesson();

    return () => {
      cancelled = true;
    };

    // ENSURE THIS EXACT LINE IS USED:
  }, [phase, started, objectIndex, stepIndex, item?.number, item?.image]);



  if (!item) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <h1 className="text-5xl font-black text-blue-600">Let's Count!</h1>
        <button
          onClick={() => setStarted(true)}
          className="px-12 py-6 text-3xl bg-green-500 text-white rounded-3xl shadow-2xl hover:scale-105 transition-transform"
        >
          Tap to Start 🚀
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <h1 className="text-5xl font-bold text-orange-500">Great Job! 🎉</h1>
        <button
          onClick={() => onComplete?.()}
          className="px-10 py-5 text-2xl bg-orange-500 text-white rounded-2xl shadow-lg"
        >
          Next Level →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 p-8">
      <NumberCircle number={item.number} color={data.numberColors[item.number]} />

      <div className="flex flex-wrap justify-center gap-6 max-w-2xl min-h-[150px]">
        {Array.from({ length: visibleCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-yellow-400 bg-white flex items-center justify-center shadow-md"
          >
            <Image
              src={item.image}
              alt={item.object}
              width={80}
              height={80}
              className="object-contain"
            />
          </motion.div>
        ))}
      </div>

      {phase === "teacher" && (
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/images/characters/Didi.png"
            alt="Teacher"
            width={180}
            height={180}
            className="animate-bounce"
          />
          <button
            onClick={nextExample}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
