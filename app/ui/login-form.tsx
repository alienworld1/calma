'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '../lib/auth';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function LoginForm() {
  const initialState: string | null = '';
  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state === null) {
      redirect('/home');
    }
  }, [state]);

  return (
    <form className="space-y-4" action={formAction}>
      <section>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          required
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white"
          placeholder="example@domain.com"
        />
      </section>
      <section>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          name="password"
          className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white"
          placeholder="Enter your password here..."
        />
      </section>
      <div id="login-error">
        {state && (
          <p className="mt-2 text-red-500 text-sm font-semibold">{state}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-accent-light hover:bg-accent-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
        disabled={pending}
      >
        Log In
      </button>
      <p className="text-white">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="text-accent-veryLight hover:text-accent-light"
        >
          Sign Up.
        </Link>
      </p>
    </form>
  );
}
