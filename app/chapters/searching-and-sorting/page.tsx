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
          Chapter 1: Searching and Sorting
        </h1>
      </header>
      <main className="flex-1">
        <h2 className="text-3xl font-bold text-white pb-4 px-4">
          Unlocked Lessons
        </h2>
        <article className="flex gap-8 m-4 text-lg">
          <Link
            href="/lessons/linear-search/story"
            className="rounded px-4 py-2 bg-accent-light hover:bg-accent-dark transition-colors duration-300 flex flex-col items-center"
          >
            <Image
              src={'/assets/characters/sir-linearus/1.png'}
              alt="Sir Linearus"
              width={120}
              height={64}
              className="flex-none h-auto"
            />
            <span className="text-xl font-bold text-white">Linear Search</span>
          </Link>
          <Link
            href="/lessons/binary-search/story"
            className="rounded px-4 py-2 bg-gray-700 hover:bg-gray-800 transition-colors duration-300 flex flex-col items-center"
          >
            <img
              src="/assets/binaryblade.png"
              alt="Binary Blade"
              // width={120}
              className="h-28 rotate-12 hover:rotate-45 transition-transform"
            />
            <span className="text-xl font-bold text-white">Binary Search</span>
          </Link>
        </article>
      </main>
    </div>
  );
}
