// app/lessons/eng/maths/3-4/counting/level4/data.ts
import { LessonData } from "@/app/types/lessons";
import { basicObjects } from "@/app/data/countingObjects";

export const level4Data: LessonData = {
  numbers: [1,2,3,4,5,6,7,8,9,10],

  numberColors: {
    1: "red",
    2: "blue",
    3: "yellow",
    4: "green",
    5: "brown",
    6: "purple",
    7: "black",
    8: "orange",
    9: "pink",
    10: "white"
  },

  objects: basicObjects,

  audioBase: "/sounds/numbers/boy"
};
