export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© FaF</p>

        <div className="flex gap-6">
          <a href="/info/about" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            About
          </a>
          <a href="/info/contact" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
