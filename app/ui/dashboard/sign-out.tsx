'use client';

import { signOut } from 'next-auth/react';
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';

export default function SignOut() {
  return (
    <button
      className="text-slate-300 font-semibold text-2xl flex items-center gap-2 p-2 w-full rounded hover:bg-bluegray/30"
      onClick={async () => {
        await signOut({ callbackUrl: '/' });
      }}
    >
      <Icon path={mdiLogout} size={1.5} className="inline" />
      <span>Log Out</span>
    </button>
  );
}
