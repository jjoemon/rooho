// app/.../level3/data.ts
import { LessonData } from "@/app/types/lessons";
import { basicObjects } from "@/app/data/countingObjects";

export const level3Data: LessonData = {
  numbers: [1, 2, 3, 4, 5, 6, 7],

  numberColors: {
    1: "red",
    2: "blue",
    3: "yellow",
    4: "green",
    5: "brown",
    6: "purple",
    7: "black"
  },

  objects: basicObjects,

  audioBase: "/sounds/numbers/boy"
};
