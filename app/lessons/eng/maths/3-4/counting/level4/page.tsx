"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LessonTemplate from "@/app/components/ui/LessonTemplate";
import { useRouter } from "next/navigation";

type Phase = "intro" | "numbers" | "examples" | "repeat" | "done";

// Level 4 data: count 1 → 10
const numberData = [
  { number: 1, color: "#FF6B6B", flower: "/images/objects/red/flower1.jpg", audio: "/sounds/numbers/boy/1.mp3" },
  { number: 2, color: "#FFD93D", flower: "/images/objects/yellow/flower1.jpg", audio: "/sounds/numbers/boy/2.mp3" },
  { number: 3, color: "#6BCB77", flower: "/images/objects/blue/flower1.jpg", audio: "/sounds/numbers/boy/3.mp3" },
  { number: 4, color: "#4D96FF", flower: "/images/objects/green/flower1.jpg", audio: "/sounds/numbers/boy/4.mp3" },
  { number: 5, color: "#FF4DA6", flower: "/images/objects/pink/flower1.jpg", audio: "/sounds/numbers/boy/5.mp3" },
  { number: 6, color: "#FFA500", flower: "/images/objects/orange/flower1.jpg", audio: "/sounds/numbers/boy/6.mp3" },
  { number: 7, color: "#8A2BE2", flower: "/images/objects/purple/flower1.jpg", audio: "/sounds/numbers/boy/7.mp3" },
  { number: 8, color: "#00CED1", flower: "/images/objects/cyan/flower1.jpg", audio: "/sounds/numbers/boy/8.mp3" },
  { number: 9, color: "#FF4500", flower: "/images/objects/red/flower2.jpg", audio: "/sounds/numbers/boy/9.mp3" },
  { number: 10, color: "#32CD32", flower: "/images/objects/green/flower2.jpg", audio: "/sounds/numbers/boy/10.mp3" },
];

export default function CountingLevel4() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [character, setCharacter] = useState<"ladli" | "gabbu">("ladli");

  const characterInfo = {
    ladli: { name: "Ladli", image: "/images/characters/Larli.jpeg" },
    gabbu: { name: "Gabbu", image: "/images/characters/Gabbu.png" },
  }[character];

  useEffect(() => {
    const chars: ("ladli" | "gabbu")[] = ["ladli", "gabbu"];
    setCharacter(chars[Math.floor(Math.random() * chars.length)]);
  }, []);

  useEffect(() => {
    if (phase !== "intro") return;
    const utter = new SpeechSynthesisUtterance("Let's count together! One to ten!");
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setTimeout(() => setPhase("numbers"), 2500);
  }, [phase]);

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

  useEffect(() => {
    if (phase !== "examples") return;
    let step = 0;
    const explain = () => {
      if (step >= numberData.length) {
        const utter = new SpeechSynthesisUtterance("Now you learned one to ten! Let's count again!");
        utter.rate = 0.95;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
        setTimeout(() => setPhase("repeat"), 4000);
        return;
      }
      const num = numberData[step];
      setCurrentNumber(num.number);
      const utter = new SpeechSynthesisUtterance(
        `Number ${num.number} means ${num.number} flower${num.number > 1 ? "s" : ""}.`
      );
      utter.rate = 0.95;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
      step++;
      setTimeout(explain, 4000);
    };
    explain();
  }, [phase]);

  useEffect(() => {
    if (phase !== "repeat") return;
    let step = 0;
    const repeat = () => {
      if (step >= numberData.length) {
        setCurrentNumber(numberData.length); // show all numbers together
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

  useEffect(() => {
    if (phase !== "done") return;
    const utter = new SpeechSynthesisUtterance("Wow! You have done an amazing job!");
    utter.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, [phase]);

  const handlePlayAgain = () => {
    setPhase("intro");
    setCurrentNumber(0);
  };

  return (
    <LessonTemplate
      title="Counting Level 4"
      description="Learn to count from 1 to 10 with flowers!"
      onPlayAgain={handlePlayAgain}
      continuePath="/lessons/eng/maths/3-4/counting/summary"
    >
      <div className="flex flex-col items-center justify-center gap-6">

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

        {phase !== "done" && (
          <div className="flex flex-col items-center gap-4 w-full">

            {currentNumber > 0 && currentNumber < numberData.length && (
              <motion.div
                key={`num-${currentNumber}-${phase}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-6xl font-extrabold text-white shadow-xl"
                  style={{ backgroundColor: numberData[currentNumber - 1].color }}
                >
                  {currentNumber}
                </div>
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

            {currentNumber === numberData.length && (
              <motion.div
                className="flex flex-col items-center gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {numberData.map((num) => (
                  <div key={num.number} className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md"
                      style={{ backgroundColor: num.color }}
                    >
                      {num.number}
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: num.number }).map((_, i) => (
                        <Image
                          key={i}
                          src={num.flower}
                          alt="Flower"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-pink-200"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </div>
        )}
      </div>
    </LessonTemplate>
  );
}
