import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-red-300 to-orange-600">
          <Link href="/">
            <a className="block w-fit">
              <h1>pollmaker</h1>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/create">
            <a className="block mt-5 px-2 py-1 text-xl bg-red-500 w-fit hover:bg-red-400 rounded">
              Create Question
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
