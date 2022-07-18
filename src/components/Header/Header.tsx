import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="flex justify-between items-center">
        <div className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-red-300 to-orange-600">
          <Link href="/">
            <a className="block w-fit">
              <h1>pollmaker</h1>
            </a>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-6">
          <div>
            <Link href="/create">
              <a className="block px-2 py-1 text-xl bg-red-500 w-fit hover:bg-red-400 rounded">
                Create Question
              </a>
            </Link>
          </div>
          <div>
            {session && session.user ? (
              <div className="flex gap-2">
                <p>Hi {session.user?.name}</p>
                <Link href="/api/auth/signout">
                  <a className="text-red-500">Logout</a>
                </Link>
              </div>
            ) : (
              <Link href="/api/auth/signin">
                <a className="text-green-500">Sign in</a>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
