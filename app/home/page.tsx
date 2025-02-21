import { getServerSession } from 'next-auth';
import Link from 'next/link';
import prisma from '@/app/utils/prisma';
import Image from 'next/image';

export default async function Page() {
  const session = await getServerSession();
  const email = session!.user!.email || '';
  const currentUser = await prisma.user.findFirst({
    where: { email },
  });

  return (
    <div className="h-full w-full flex justify-center flex-col gap-6 cursor-default relative">
      <header>
        <h1 className="text-4xl font-bold text-white p-4 border-b-4 border-accent-dark">
          Welcome, {currentUser?.username}!
        </h1>
      </header>
      <main className="flex-1">
        <h2 className="text-2xl font-bold text-white p-4">Unlocked Chapters</h2>
        <ul className="flex flex-col gap-2 m-4 text-lg">
          <li className="flex items-center gap-4">
            <Image
              src={'/assets/characters/sir-linearus/1.png'}
              alt="Sir Linearus"
              width={120}
              height={64}
              className="flex-none"
            />
            <Link
              href={'/chapters/searching-and-sorting'}
              className="rounded px-4 py-2 bg-accent-light text-black hover:bg-accent-dark transition-colors duration-300"
            >
              Searching and Sorting
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
