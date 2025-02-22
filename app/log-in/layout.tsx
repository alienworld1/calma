import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';
import Image from 'next/image';

export default async function Page({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (session) {
    redirect('/home');
  }

  return (
    <div className="h-screen">
      <Suspense
        fallback={
          <Image
            src="/assets/loading.gif"
            width={1024}
            height={576}
            alt="Loading..."
            className="w-full h-full"
          />
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
