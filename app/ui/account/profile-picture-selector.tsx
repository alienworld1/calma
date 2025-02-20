'use client';

import { User } from '@prisma/client';
import { useRef, useState, ChangeEventHandler } from 'react';
import Image from 'next/image';

type FileChangeHandler = (file: File) => void;

export default function ProfilePictureSelector({
  user,
  onChange,
}: {
  user: User;
  onChange: FileChangeHandler;
}) {
  const [image, setImage] = useState(user.profilePictureUrl);
  const [isOpen, setIsOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler = event => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImage(e.target!.result as string);
        setIsOpen(false);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="w-32 h-32 rounded-full bg-gray-500 cursor-pointer overflow-hidden flex items-center justify-center border-2 border-white hover:border-accent-light transition-colors"
      >
        <Image
          src={image}
          alt="Profile Picture"
          className="h-full w-full object-cover"
          height={128}
          width={128}
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-400 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Upload Profile Picture</h2>
            <button
              onClick={e => {
                e.preventDefault();
                fileInput.current?.click();
              }}
              className="bg-accent-dark text-white px-4 py-2 rounded-md hover:bg-accent-light transition-colors duration-300"
            >
              Select Image
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md ml-2 transition-colors duration-300"
            >
              Cancel
            </button>
            <input
              type="file"
              ref={fileInput}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
