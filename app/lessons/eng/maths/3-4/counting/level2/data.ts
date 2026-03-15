import { LessonData } from "@/app/types/lessons";
import { basicObjects } from "@/app/data/countingObjects";

export const level2Data: LessonData = {
  numbers: [1, 2, 3, 4, 5],

  numberColors: {
    1: "red",
    2: "blue",
    3: "yellow",
    4: "green",
    5: "brown"
  },

  objects: basicObjects,

  audioBase: "/sounds/numbers/boy"
};
