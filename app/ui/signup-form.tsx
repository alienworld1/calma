'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

import { UserState, createUser } from '../lib/actions';

export default function SignupForm() {
  const initialState: UserState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createUser, initialState);
  const { pending } = useFormStatus();

  return (
    <form className="space-y-4" action={formAction}>
      <section>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white"
          aria-describedby="email-error"
        >
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
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map(error => (
              <p
                className="mt-2 text-sm text-red-500 font-semibold"
                key={error}
              >
                {error}
              </p>
            ))}
        </div>
      </section>
      <section>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-white"
        >
          Username
        </label>
        <input
          type="text"
          required
          id="username"
          name="username"
          className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white"
          placeholder="Enter your username here..."
          aria-describedby="username-error"
        />
        <div id="username-error" aria-live="polite" aria-atomic="true">
          {state.errors?.username &&
            state.errors.username.map(error => (
              <p
                className="mt-2 text-sm text-red-500 font-semibold"
                key={error}
              >
                {error}
              </p>
            ))}
        </div>
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
          aria-describedby="password-error"
        />
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.errors?.password &&
            state.errors.password.map(error => (
              <p
                className="mt-2 text-sm text-red-500 font-semibold"
                key={error}
              >
                {error}
              </p>
            ))}
        </div>
      </section>
      <section>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-white"
        >
          Confirm Password
        </label>
        <input
          type="password"
          required
          id="confirm-password"
          name="confirm-password"
          className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white"
          placeholder="Retype your password here..."
          aria-describedby="confirm-password-error"
        />
        <div id="confirm-password-error" aria-live="polite" aria-atomic="true">
          {state.errors?.confirmPassword &&
            state.errors.confirmPassword.map(error => (
              <p
                className="mt-2 text-sm text-red-500 font-semibold"
                key={error}
              >
                {error}
              </p>
            ))}
        </div>
      </section>
      <button
        type="submit"
        className="w-full bg-accent-light hover:bg-accent-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
        disabled={pending}
      >
        {pending ? 'Creating an account...' : 'Sign Up'}
      </button>
      <p className="text-white">
        Already have an account?{' '}
        <Link
          href="/log-in"
          className="text-accent-veryLight hover:text-accent-light"
        >
          Log in.
        </Link>
      </p>
    </form>
  );
}
