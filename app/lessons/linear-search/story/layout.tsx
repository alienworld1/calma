import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Commet } from 'react-loading-indicators';

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
      <React.Suspense fallback={<Commet color="#e2ede2" size="medium" />}>
        {children}
      </React.Suspense>
    </div>
  );
}
