// lib/getLocationFromHeaders.ts
export function getLocationFromHeaders(headers: Headers) {
  return {
    city: headers.get("x-vercel-ip-city"),
    region: headers.get("x-vercel-ip-country-region"),
    country: headers.get("x-vercel-ip-country"),
  };
}
