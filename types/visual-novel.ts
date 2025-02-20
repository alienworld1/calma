type Dialogue = {
  character: string;
  text: string;
  expression?: string;
  movement?: Partial<CharacterPosition>;
};

type Scene = {
  background: string;
  characters: SceneCharacters;
  dialogues: Dialogue[];
};

export type StoryData = {
  scenes: Scene[];
  title?: string;
};

type CharacterPosition = {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
};

type CharacterState = {
  image: string;
  position: CharacterPosition;
  expression?: string;
  speaking?: boolean;
};

export type SceneCharacters = {
  [character: string]: CharacterState;
};
