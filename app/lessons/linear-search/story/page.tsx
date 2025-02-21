import { redirect } from 'next/navigation';

import VisualNovelWrapper from '@/app/ui/story/visual-novel-wrapper';
import { type StoryData } from '@/types/visual-novel';

export default function Page() {
  const story: StoryData = {
    scenes: [
      {
        background: '/assets/background/dungeon-entrance.jpg',
        dialogues: [
          {
            character: {
              name: 'Sir Linearus',
              image: '/assets/characters/sir-linearus/1.png',
              scale: 1,
            },
            text: 'Calma, what is a linear search?',
          },
          {
            character: {
              name: 'Calma',
              image: '/assets/characters/calma/1.png',
              scale: 1,
            },
            text: 'A linear search is a simple search algorithm that finds the position of a target value within a list. It sequentially checks each element of the list until a match is found or the whole list has been searched.',
          },
          {
            character: {
              name: 'Sir Linearus',
              image: '/assets/characters/sir-linearus/1.png',
              scale: 1,
            },
            text: 'Interesting! Can you show me an example?',
          },
          {
            character: {
              name: 'Calma',
              image: '/assets/characters/calma/1.png',
              scale: 1,
            },
            text: "Dude it's linear search you moron.",
          },
        ],
      },
    ],
    characters: {
      'Sir Linearus': {
        name: 'Sir Linearus',
        image: '/assets/characters/sir-linearus/1.png',
      },
      Calma: {
        name: 'Calma',
        image: '/assets/characters/calma/1.png',
      },
    },
  };

  return (
    <VisualNovelWrapper
      story={story}
      redirectLink="/lessons/linear-search/code"
    />
  );
}
