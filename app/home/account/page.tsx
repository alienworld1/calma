import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import prisma from '@/app/utils/prisma';
import EditAccountForm from '@/app/ui/account/edit-account-form';

export default async function Page() {
  const session = await getServerSession();
  const email = session!.user!.email || '';
  const currentUser = await prisma.user.findFirst({
    where: { email },
  });
  if (!currentUser) {
    redirect('/log-in');
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white">Edit Account Details</h1>
      <EditAccountForm currentUser={currentUser} />
    </div>
  );
}
