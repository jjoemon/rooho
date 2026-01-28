export const metadata = {
  title: "Contact · eDebator",
  description: "Contact the eDebator team",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">
        Contact
      </h1>

      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        For enquiries, feedback, or collaboration opportunities,
        please get in touch.
      </p>

      <div className="mt-8 space-y-2 text-zinc-700 dark:text-zinc-300">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:contact@edebator.org"
            className="underline hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            contact@edebator.org
          </a>
        </p>

        <p>
          <strong>Affiliation:</strong> Academic & research-led project
        </p>
      </div>
    </section>
  );
}
