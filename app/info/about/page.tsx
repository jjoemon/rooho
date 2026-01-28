export const metadata = {
  title: "About · eDebator",
  description: "About the eDebator platform",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">
        About eDebator
      </h1>

      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        eDebator is a platform designed to support structured,
        evidence-based debate. It encourages critical thinking,
        transparency of sources, and respectful dialogue.
      </p>

      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        The project explores how digital tools can help people
        argue more clearly by grounding claims in verifiable
        evidence.
      </p>
    </section>
  );
}
