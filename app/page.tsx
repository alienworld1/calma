import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center gap-4 p-4">
        {/* <Image
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
        </nav> */}
        <div>
          <Image
            src={'/assets/logo.png'}
            alt="Calma Logo"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col items-center gap-8">
          <p className="max-w-lg text-center text-3xl font-bold">
            Code and learn through magical adventures.
          </p>
          <div className="flex gap-2 max-w-xl">
            <Image
              src={'/assets/characters/calma/1.png'}
              alt="Calma"
              width={200}
              height={200}
            />
            <div className="rounded shadow-md bg-accent-light p-4 border-2 border-black text-lg flex items-center justify-center">
              Explore the magical lands of Arrayia and embark on an adventure of
              learning and fun.
            </div>
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
        </div>
      </main>
    </div>
  );
}
