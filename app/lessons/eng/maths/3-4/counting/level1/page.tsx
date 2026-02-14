// src/app/lessons/eng/maths/3-4/counting/level1/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Phase = "intro" | "numbers" | "examples" | "repeat" | "done";

const numberData = [
  { number: 1, color: "#FF6B6B", flower: "/images/objects/red/flower1.jpg", audio: "/sounds/numbers/boy/1.mp3" },
  { number: 2, color: "#FFD93D", flower: "/images/objects/yellow/flower1.jpg", audio: "/sounds/numbers/boy/2.mp3" },
  { number: 3, color: "#6BCB77", flower: "/images/objects/blue/flower1.jpg", audio: "/sounds/numbers/boy/3.mp3" },
];

export default function CountingLevel1() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [character, setCharacter] = useState<"ladli" | "gabbu">("ladli");

  const characterInfo = {
    ladli: { name: "Ladli", image: "/images/characters/Larli.jpeg" },
    gabbu: { name: "Gabbu", image: "/images/characters/Gabbu.png" },
  }[character];

  // Pick random main character
  useEffect(() => {
    const chars: ("ladli" | "gabbu")[] = ["ladli", "gabbu"];
    setCharacter(chars[Math.floor(Math.random() * chars.length)]);
  }, []);

  // Phase 1: Introduction
  useEffect(() => {
    if (phase !== "intro") return;
    const utter = new SpeechSynthesisUtterance("Let's count together! One, two, three!");
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setTimeout(() => setPhase("numbers"), 2500);
  }, [phase]);

  // Phase 2: Counting numbers (1 → 3)
  useEffect(() => {
    if (phase !== "numbers") return;
    let step = 0;
    const run = () => {
      if (step >= numberData.length) {
        setTimeout(() => setPhase("examples"), 1500);
        return;
      }
      const num = numberData[step];
      setCurrentNumber(num.number);
      new Audio(num.audio).play();
      step++;
      setTimeout(run, 2500);
    };
    run();
  }, [phase]);

  // Phase 3: Show examples (1 flower, 2 flowers, etc.)
  useEffect(() => {
    if (phase !== "examples") return;
    let step = 0;
    const explain = () => {
      if (step >= numberData.length) {
        const utter = new SpeechSynthesisUtterance("Now you learned one, two, and three! Let's count again!");
        utter.rate = 0.95;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
        setTimeout(() => setPhase("repeat"), 4000);
        return;
      }
      const num = numberData[step];
      setCurrentNumber(num.number);
      const utter = new SpeechSynthesisUtterance(
        step === 0
          ? "Look! One means one flower."
          : step === 1
          ? "Now, two means two flowers."
          : "And three means three flowers!"
      );
      utter.rate = 0.95;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
      step++;
      setTimeout(explain, 4000);
    };
    explain();
  }, [phase]);

  // Phase 4: Repeat learning (reinforcement)
  useEffect(() => {
    if (phase !== "repeat") return;
    let step = 0;
    const repeat = () => {
      if (step >= numberData.length) {
        setTimeout(() => setPhase("done"), 4000);
        return;
      }
      const num = numberData[step];
      setCurrentNumber(num.number);
      const utter = new SpeechSynthesisUtterance(`${num.number}`);
      utter.rate = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
      new Audio(num.audio).play();
      step++;
      setTimeout(repeat, 3000);
    };
    repeat();
  }, [phase]);

  const handlePlayAgain = () => {
    setCurrentNumber(0);
    setPhase("intro");
  };

  const handleContinue = () => {
    router.push("/lessons/eng/maths/3-4/counting/level2");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-blue-100 to-pink-100 text-gray-800 text-center px-6 py-10 space-y-8">

      {/* Character avatar */}
      {phase !== "done" && (
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={characterInfo.image}
              alt={characterInfo.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold">{characterInfo.name} is helping you count!</h2>
        </div>
      )}

      {/* Giligili congratulates */}
      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center text-center space-y-6"
        >
          <Image
            src="/images/characters/Giligili.png"
            alt="Giligili"
            width={200}
            height={200}
            className="rounded-full border-4 border-green-300 shadow-lg"
          />
          <h1 className="text-2xl font-bold text-green-700">Giligili says:</h1>
          <p className="text-xl font-semibold">“You have done an amazing job!”</p>

          {/* Play Again / Continue buttons */}
          <div className="flex flex-col gap-3 mt-4 w-40">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayAgain}
              className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold shadow-md text-white"
            >
              ▶ Play Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold shadow-md text-white"
            >
              ➡ Continue
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Main counting area */}
      {phase !== "done" && (
        <>
          <motion.h1
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold"
          >
            {phase === "intro"
              ? "Let's Count Together!"
              : phase === "numbers"
              ? "Count with Me!"
              : phase === "examples"
              ? "See What the Numbers Mean!"
              : "Let's Count Again!"}
          </motion.h1>

          {currentNumber > 0 && (
            <motion.div
              key={`num-${currentNumber}-${phase}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Number circle */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-6xl font-extrabold text-white shadow-xl"
                style={{ backgroundColor: numberData[currentNumber - 1].color }}
              >
                {currentNumber}
              </div>

              {/* Flowers */}
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {Array.from({ length: currentNumber }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <Image
                      src={numberData[currentNumber - 1].flower}
                      alt="Flower"
                      width={70}
                      height={70}
                      className="rounded-full border-4 border-pink-200 shadow-sm"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
