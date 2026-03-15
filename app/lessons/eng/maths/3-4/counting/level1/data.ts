import { LessonData } from "@/app/types/lessons";
import { basicObjects } from "@/app/data/countingObjects";

export const level1Data: LessonData = {
  numbers: [1, 2, 3],

  numberColors: {
    1: "red",
    2: "blue",
    3: "yellow"
  },

  objects: basicObjects,

  audioBase: "/sounds/numbers/boy"
};
