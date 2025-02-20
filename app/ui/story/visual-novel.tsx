'use client';

import { useState, useEffect } from 'react';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { type StoryData, type SceneCharacters } from '@/types/visual-novel';

type VisualNovelProps = {
  initialScene?: number;
  onSceneComplete?: (sceneIndex: number) => void;
  onNovelComplete?: () => void;
  story: StoryData;
};

export default function VisualNovel({
  initialScene = 0,
  onSceneComplete,
  onNovelComplete,
  story,
}: VisualNovelProps) {
  const [currentScene, setCurrentScene] = useState<number>(initialScene);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [characterStates, setCharacterStates] = useState<SceneCharacters>({});

  // Initialize or update character states when scene changes
  useEffect(() => {
    const currentSceneData = story.scenes[currentScene];
    setCharacterStates(currentSceneData.characters);
  }, [currentScene]);

  // Update character states based on dialogue
  useEffect(() => {
    const currentSceneData = story.scenes[currentScene];
    const currentDialogue = currentSceneData.dialogues[dialogueIndex];

    // Update speaking state for all characters
    const updatedStates = { ...characterStates };
    Object.keys(updatedStates).forEach(charName => {
      updatedStates[charName] = {
        ...updatedStates[charName],
        speaking: charName === currentDialogue.character,
      };
    });

    // Apply any dialogue-specific character changes
    if (currentDialogue.expression || currentDialogue.movement) {
      updatedStates[currentDialogue.character] = {
        ...updatedStates[currentDialogue.character],
        expression:
          currentDialogue.expression ||
          updatedStates[currentDialogue.character].expression,
        position: {
          ...updatedStates[currentDialogue.character].position,
          ...currentDialogue.movement,
        },
      };
    }

    setCharacterStates(updatedStates);
  }, [dialogueIndex, currentScene]);

  // Text animation effect
  useEffect(() => {
    if (!isTyping) return;

    const currentDialogue = story.scenes[currentScene].dialogues[dialogueIndex];
    let charIndex = displayedText.length;

    const typingInterval = setInterval(() => {
      if (charIndex >= currentDialogue.text.length) {
        setIsTyping(false);
        clearInterval(typingInterval);
        return;
      }

      setDisplayedText(currentDialogue.text.slice(0, charIndex + 1));
      charIndex++;
    }, 50);

    return () => clearInterval(typingInterval);
  }, [isTyping, currentScene, dialogueIndex, displayedText]);

  const handleClick = (): void => {
    if (isTyping) {
      const currentDialogue =
        story.scenes[currentScene].dialogues[dialogueIndex];
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      return;
    }

    const currentSceneData = story.scenes[currentScene];

    if (dialogueIndex < currentSceneData.dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
      setDisplayedText('');
      setIsTyping(true);
    } else if (currentScene < story.scenes.length - 1) {
      onSceneComplete?.(currentScene);
      setCurrentScene(currentScene + 1);
      setDialogueIndex(0);
      setDisplayedText('');
      setIsTyping(true);
    } else {
      onNovelComplete?.();
    }
  };

  useEffect(() => {
    if (displayedText === '') {
      setIsTyping(true);
    }
  }, [currentScene, dialogueIndex]);

  const currentSceneData = story.scenes[currentScene];
  const currentDialogue = currentSceneData.dialogues[dialogueIndex];

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="relative w-full max-w-4xl aspect-video">
        <Stage
          width={1280}
          height={720}
          options={{ backgroundColor: 0x000000 }}
          className="w-full h-full"
        >
          {/* Background Layer */}
          <Container>
            <Sprite
              image={currentSceneData.background}
              width={1280}
              height={720}
            />
          </Container>

          {/* Characters Layer */}
          <Container>
            {Object.entries(characterStates).map(([charName, charState]) => (
              <Sprite
                key={charName}
                image={charState.image}
                x={charState.position.x}
                y={charState.position.y}
                width={400}
                height={600}
                scale={[charState.position.flip ? -1 : 1, 1]}
                alpha={charState.speaking ? 1 : 0.8}
              />
            ))}
          </Container>

          {/* Dialogue Box Layer */}
          <Container y={520}>
            <Sprite
              image="/api/placeholder/1280/200"
              width={1280}
              height={200}
              alpha={0.7}
            />
            <Text
              text={currentDialogue.character}
              x={40}
              y={20}
              style={
                new TextStyle({
                  fill: '#ffffff',
                  fontSize: 24,
                  fontWeight: 'bold',
                })
              }
            />
            <Text
              text={displayedText}
              x={40}
              y={60}
              style={
                new TextStyle({
                  fill: '#ffffff',
                  fontSize: 20,
                  wordWrap: true,
                  wordWrapWidth: 1200,
                })
              }
            />
          </Container>
        </Stage>

        {/* Click overlay */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
