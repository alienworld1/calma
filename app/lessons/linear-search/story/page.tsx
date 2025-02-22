import VisualNovelWrapper from '@/app/ui/story/visual-novel-wrapper';
import { type StoryData, type Character } from '@/types/visual-novel';

import BackgroundMusic from '@/components/background-music';

const SirLinearus: Character = {
  name: 'Sir Linearus',
  image: '/assets/characters/sir-linearus/1.png',
  scale: 1,
  width: 338,
  height: 300,
  position: {
    x: 0,
    y: 50,
  },
};

const Calma: Character = {
  name: 'Calma',
  image: '/assets/characters/calma/1.png',
  scale: 1,
  width: 300,
  height: 250,
  position: {
    x: 20,
    y: 50,
  },
};

export default function Page() {
  const story: StoryData = {
    scenes: [
      {
        background: '/assets/background/dungeon-entrance.jpg',
        dialogues: [
          {
            type: 'narration',
            text: 'The land of Arrayia is famous for its many twisting, tricky labyrinth that challenge brave warriors.',
          },
          {
            type: 'narration',
            text: 'These labyrinth are full of traps and confusing paths, and many who enter never make it out.',
          },
          {
            type: 'narration',
            text: 'But there’s one maze that’s different—the LINEAR Labyrinth. Unlike the others, it’s completely straight and seems to go on forever.',
          },
          {
            type: 'narration',
            text: 'Now, appears an individual named Sir Linearus, known for his fearlessness and tenacious nature who challenges The LINEAR Labyrinth...',
          },
          {
            type: 'character',
            character: Calma,
            text: 'So, this is the "labyrinth"…? I was expecting twists and traps. This just looks like a long hallway.',
          },
          {
            type: 'character',
            character: SirLinearus,
            text: 'Exactly. No forks, no turns—just one path forward. Every room is in a straight line, one after the other.',
          },
          {
            type: 'character',
            character: Calma,
            text: 'That’s… oddly simple. So, what’s the plan?',
          },
          {
            type: 'character',
            character: SirLinearus,
            text: 'We check every room, one by one. If there’s treasure, we take it. If not, we move on to the next.',
          },
          {
            type: 'character',
            character: Calma,
            text: 'No shortcuts? No secret passages?',
          },
          {
            type: 'character',
            character: SirLinearus,
            text: "Nope. Just patience and persistence. We search until we find what we're looking for—or reach the end.",
          },
          {
            type: 'character',
            character: Calma,
            text: 'Huh. Sounds like a tedious process, but I guess it works. Let’s get started.',
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
    <>
      <VisualNovelWrapper
        story={story}
        redirectLink="/lessons/linear-search/code"
      />
      <BackgroundMusic />
    </>
  );
}
