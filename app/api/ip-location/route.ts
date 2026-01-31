// app/api/ip-location/route.ts
export const runtime = "edge";

export async function GET(req: Request) {
  const headers = req.headers;

  const city = headers.get("x-vercel-ip-city");
  const region = headers.get("x-vercel-ip-country-region");
  const country = headers.get("x-vercel-ip-country");

  // Preferred path: platform-provided headers (Vercel)
  if (city || region || country) {
    return new Response(
      JSON.stringify({ city, region, country }),
      { headers: { "content-type": "application/json" } }
    );
  }

  // ⚠️ Dev-only fallback (avoid in production for GDPR reasons)
  if (process.env.NODE_ENV !== "production") {
    try {
      const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return new Response(
          JSON.stringify({
            city: data.city ?? null,
            region: data.region ?? null,
            country: data.country_name ?? null,
          }),
          { headers: { "content-type": "application/json" } }
        );
      }
    } catch {
      // ignore
    }
  }

  return new Response(
    JSON.stringify({ city: null, region: null, country: null }),
    { headers: { "content-type": "application/json" } }
  );
}
