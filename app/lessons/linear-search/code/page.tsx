import { getServerSession } from 'next-auth';
import prisma from '@/app/utils/prisma';
import Image from 'next/image';
import LinearSearch from './ui/linear-search';

export default async function Page() {
  const session = await getServerSession();
  const email = session!.user!.email || '';
  const currentUser = await prisma.user.findFirst({
    where: { email },
  });

  return (
    <div className="h-full w-full flex justify-center flex-col gap-6 cursor-default relative">
      <header className="flex justify-between items-center px-4 py-2 bg-accent-dark">
        <h1 className="text-2xl font-semibold text-white">Linear Search</h1>
        <h1 className="text-2xl font-semibold text-white">
          {currentUser?.username}
        </h1>
      </header>
      <main className="flex-1 flex justify-center">
        <LinearSearch />
      </main>
    </div>
  );
}
