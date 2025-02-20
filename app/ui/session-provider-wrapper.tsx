'use client';

import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({
  session,
  children,
}: {
  session: Session;
  children: ReactNode;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
