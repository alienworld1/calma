import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full flex justify-between px-7 py-4 items-center">
        <h1 className="font-bold text-accent-dark text-2xl">Calma</h1>
        <nav>
          <ul className="flex gap-4">
            <li className="text-primary font-medium hover:text-accent-dark">
              <Link href="/log-in">Log in</Link>
            </li>
            <li className="text-primary font-medium hover:text-accent-dark">
              <Link href="/sign-up">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 flex items-center flex-col gap-4">
        <Image
          src={'/assets/logo.png'}
          alt="Calma Logo"
          width={200}
          height={200}
        />
        <div className="max-w-lg text-center text-3xl font-bold">
          Code and learn through magical adventures.
        </div>
        <nav className="flex gap-8">
          <Link
            className="px-4 py-2 text-lg rounded-md bg-accent-dark text-white hover:bg-accent-light transition-colors"
            href="/sign-up"
          >
            Create an Account
          </Link>
          <Link
            className="px-4 py-2 text-lg rounded-md text-white bg-primary/75 hover:bg-primary/50 transition-colors"
            href="/log-in"
          >
            Log In
          </Link>
        </nav>
      </main>
    </div>
  );
}
