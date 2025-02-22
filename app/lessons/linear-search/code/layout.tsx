import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { type Metadata } from 'next';
import Image from 'next/image';

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
    <div className="h-screen">
      <React.Suspense
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
      </React.Suspense>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Linear Search',
  description: 'Learn how to search for an element in an array',
};
