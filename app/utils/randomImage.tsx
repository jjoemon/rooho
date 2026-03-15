// /app/utils/randomImage.tsx
// Define the specific keys (the colors) that are valid for imageStructure
type ColorKey = 'red' | 'blue' | 'yellow' | 'white' | 'pink' | 'orange';

// Define the type for the image structure object
type ImageStructure = Record<ColorKey, string[]>;

// Define your available image structure
const imageStructure: ImageStructure = {
  red: [
    "/images/objects/flowers/red/red1.jpg",
    "/images/objects/flowers/red/red2.jpg",
    "/images/objects/flowers/red/red3.jpg",
    "/images/objects/flowers/red/red4.jpg",
  ],
  blue: [
    "/images/objects/flowers/blue/blue1.jpg",
    "/images/objects/flowers/blue/blue2.jpg",
    "/images/objects/flowers/blue/blue3.jpg",
  ],
  pink: [
    "/images/objects/flowers/pink/pink1.jpg",
    "/images/objects/flowers/pink/pink2.jpg",
    "/images/objects/flowers/pink/pink3.jpg",
    "/images/objects/flowers/pink/pink4.jpg",
    "/images/objects/flowers/pink/pink5.jpg",
  ],
  yellow: [
    "/images/objects/flowers/yellow/yellow1.jpg",
    "/images/objects/flowers/yellow/yellow2.jpg",
    "/images/objects/flowers/yellow/yellow3.jpg",
  ],
  white: [
    "/images/objects/flowers/white/white1.jpg",
    "/images/objects/flowers/white/white2.jpg",
  ],
  orange: [
    "/images/objects/flowers/orange/orange1.jpg",
    "/images/objects/flowers/orange/orange2.jpg",
    "/images/objects/flowers/orange/orange3.jpg",
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
