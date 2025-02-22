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
        <h2 className="text-2xl font-bold text-white px-4 pb-4">
          Unlocked Chapters
        </h2>
        <article className="flex gap-2 text-lg items-center justify-center w-full h-full">
          <Link
            href="/chapters/searching-and-sorting"
            className="flex flex-col bg-accent-light items-center justify-center hover:bg-accent-dark rounded-lg p-4 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/assets/searching-and-sorting.png"
              width={400}
              height={400}
              alt="Searching and Sorting"
            />
            <h3 className="text-white text-center text-3xl">
              Searching and Sorting
            </h3>
          </Link>
        </article>
      </main>
    </div>
  );
}
