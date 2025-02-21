export type Character = {
  name: string;
  image: string;
  scale?: number;
  width?: number;
  height?: number;
  position?: {
    x: number;
    y: number;
  };
};

type Dialogue = {
  type: 'character' | 'narration';
  character?: Character;
  text: string;
};

type Scene = {
  background: string;
  dialogues: Dialogue[];
};

export type StoryData = {
  scenes: Scene[];
  characters: { [key: string]: Character };
};
