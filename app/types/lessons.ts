export type LessonObject = {
  name: string;
  folder: string;
  ext?: string;
  colors: string[];
};

export type LessonData = {
  numbers: number[];
  numberColors: Record<number, string>;
  objects: LessonObject[];
  audioBase: string;
};
