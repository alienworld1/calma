import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import LoginForm from '../ui/login-form';

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    redirect('/home');
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md border-4 border-white bg-midnight-purple/50 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
