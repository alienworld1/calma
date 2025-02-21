'use client';

import { useRouter } from 'next/navigation';

import VisualNovel from './visual-novel';
import { type StoryData } from '@/types/visual-novel';

export default function VisualNovelWrapper({
  story,
  redirectLink,
}: {
  story: StoryData;
  redirectLink: string;
}) {
  const router = useRouter();

  return (
    <VisualNovel
      story={story}
      onNovelComplete={() => router.push(redirectLink)}
    />
  );
}
