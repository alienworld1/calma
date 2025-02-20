'use client';

import { useState } from 'react';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';

import ProfilePictureSelector from './profile-picture-selector';
import { editAccount, SimpleFormState } from '@/app/lib/actions';

export default function EditAccountForm({
  currentUser,
}: {
  currentUser: User;
}) {
  const [state, setState] = useState<SimpleFormState>({});
  const [image, setImage] = useState<File | null>(null);

  async function editAccountWithImage(formData: FormData) {
    if (image) {
      formData.append('profile-picture', image);
    }
    const newState = await editAccount(currentUser.id, state, formData);
    if (newState.success) {
      redirect('/home');
    } else {
      setState(newState);
    }
  }

  return (
    <form className="py-4" action={editAccountWithImage}>
      <section>
        <label
          htmlFor="username"
          className="block text-xl font-medium text-white"
        >
          Username
        </label>
        <input
          type="text"
          required
          id="username"
          name="username"
          className="px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white my-2"
          placeholder="Enter your username here..."
          aria-describedby="username-error"
          defaultValue={currentUser.username}
        />
      </section>
      <section className="my-4">
        <label
          htmlFor="username"
          className="block text-xl font-medium text-white mb-2"
        >
          Profile Picture
        </label>
        <ProfilePictureSelector
          user={currentUser}
          onChange={file => setImage(file)}
        />
        <input
          type="text"
          name="profilePictureUrl"
          defaultValue={currentUser.profilePictureUrl}
          hidden
        />
      </section>
      <section>
        <button
          type="submit"
          className="bg-accent-dark text-white px-4 py-2 rounded-md hover:bg-accent-light transition-colors duration-300"
        >
          Save Changes
        </button>
      </section>
      <div id="edit-account-error">
        {state && (
          <p className="mt-2 text-red-500 text-sm font-semibold">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
