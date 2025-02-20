import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Commet } from 'react-loading-indicators';
import Image from 'next/image';

import SignOut from '@/app/ui/dashboard/sign-out';

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

  return (
    <div className="h-screen flex gap-2">
      <div className="flex flex-col px-2 py-4 justify-between items-center my-4 mx-2 bg-primary/40 rounded">
        <Image
          src={'/assets/logo.png'}
          alt="Calma Logo"
          width={96}
          height={96}
        />
        <SignOut />
      </div>
      <div className="flex-1 bg-primary/40 rounded m-4">
        <React.Suspense fallback={<Commet color="#e2ede2" size="medium" />}>
          {children}
        </React.Suspense>
      </div>
    </div>
  );
}
