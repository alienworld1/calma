import VisualNovelWrapper from '@/app/ui/story/visual-novel-wrapper';
import { type StoryData, type Character } from '@/types/visual-novel';

const SirLinearus: Character = {
  name: 'Sir Linearus',
  image: '/assets/characters/sir-linearus/1.png',
  scale: 1,
  width: 338,
  height: 300,
};

const Calma: Character = {
  name: 'Calma',
  image: '/assets/characters/calma/1.png',
  scale: 1,
  width: 300,
  height: 250,
  position: {
    x: 20,
    y: -20,
  },
};

const Narrator: Character = {
  name: 'Narrator',
  image: '/assets/characters/sir-linearus/1.png',
  scale: 1,
  width: 338,
  height: 300,
};

export default function Page() {
  const story: StoryData = {
    scenes: [
      {
        background: '/assets/background/dungeon-entrance.jpg',
        dialogues: [
          {
            character: SirLinearus,
            text: 'Calma, what is a linear search?',
          },
          {
            character: Calma,
            text: 'A linear search is a simple search algorithm that finds the position of a target value within a list. It sequentially checks each element of the list until a match is found or the whole list has been searched.',
          },
          {
            character: Narrator,
            text: 'Interesting! Can you show me an example?',
          },
          {
            character: Calma,
            text: "Dude it's linear search you moron.",
          },
        ],
      },
    ],
    characters: {
      'Sir Linearus': SirLinearus,
      Calma: {
        name: 'Calma',
        image: '/assets/characters/calma/1.png',
      },
      Narrator: SirLinearus,
    },
  };

  return (
    <VisualNovelWrapper
      story={story}
      redirectLink="/lessons/linear-search/code"
    />
  );
}
