// /app/utils/randomBackground.ts

/**
 * Returns a random background image path from /public/images/background
 */
 export function getRandomBackgroundImage(): string {
   const backgrounds = [
     "/images/background/background1.jpg",
     "/images/background/background2.jpg",
     "/images/background/background3.jpg",
    "/images/background/background4.jpg",
   ];

   const randomIndex = Math.floor(Math.random() * backgrounds.length);
   return backgrounds[randomIndex];
 }
