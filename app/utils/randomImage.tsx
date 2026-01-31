// /app/utils/randomImage.tsx
// Define the specific keys (the colors) that are valid for imageStructure
type ColorKey = 'red' | 'blue' | 'purple' | 'yellow' | 'white' | 'other';

// Define the type for the image structure object
type ImageStructure = Record<ColorKey, string[]>;

// Define your available image structure
const imageStructure: ImageStructure = {
  red: [
    "/images/objects/red/flower1.jpg",
    "/images/objects/red/flower2.jpg",
    "/images/objects/red/flower3.jpg",
    "/images/objects/red/flower4.jpg",
  ],
  blue: [
    "/images/objects/blue/flower1.jpg",
  ],
  purple: [
    "/images/objects/purple/flower1.jpg",
    "/images/objects/purple/flower2.jpg",
    "/images/objects/purple/flower3.jpg",
    "/images/objects/purple/flower4.jpg",
    "/images/objects/purple/flower5.jpg",
  ],
  yellow: [
    "/images/objects/yellow/flower1.jpg",
    "/images/objects/yellow/flower2.jpg",
  ],
  white: [
    "/images/objects/white/flower1.jpg",
  ],
  other: [
    "/images/objects/other/flower1.jpg",
    "/images/objects/other/flower2.jpg",
    "/images/objects/other/flower3.jpg",
  ],
};

export function getRandomImage(): string {
  // 1. Get the keys. We use 'as Array<ColorKey>' to tell TypeScript
  // that the keys are definitely one of the defined ColorKey types.
  const colors = Object.keys(imageStructure) as Array<ColorKey>;

  // 2. Pick a random color folder. The type of randomColor is now ColorKey.
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // 3. Pick a random image from that folder. This line no longer errors.
  const images = imageStructure[randomColor];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return randomImage;
}
