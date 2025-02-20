import { getServerSession } from 'next-auth';
import prisma from '../utils/prisma';

export default async function Page() {
  const session = await getServerSession();
  const email = session!.user!.email || '';
  const currentUser = await prisma.user.findFirst({
    where: { email },
  });

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-6 cursor-default relative">
      <header>
        <h1 className="text-4xl font-bold text-white p-4">
          Welcome, {currentUser?.username}!
        </h1>
      </header>
      <main className="flex-1">
        <p className="text-white text-lg p-4">
          You are now signed in with the email address {email}.
        </p>
      </main>
    </div>
  );
}
