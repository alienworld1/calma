'use client';

import { useState, useEffect } from 'react';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import WebFont from 'webfontloader';
import NextImage from 'next/image';

import { type StoryData, type Character } from '@/types/visual-novel';

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
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [previousCharacter, setPreviousCharacter] = useState<Character | null>(
    null,
  );
  const [characterTransition, setCharacterTransition] =
    useState<boolean>(false);

  // Constants for layout
  const STAGE_WIDTH = 1280;
  const STAGE_HEIGHT = 720;
  const DIALOGUE_HEIGHT = 200;
  const CHARACTER_WIDTH = 300;
  const CHARACTER_HEIGHT = 400;

  // Styles for different dialogue types
  const characterNameStyle = new TextStyle({
    fill: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Pixelify Sans',
  });

  const characterTextStyle = new TextStyle({
    fill: '#ffffff',
    fontSize: 20,
    wordWrap: true,
    wordWrapWidth: STAGE_WIDTH - CHARACTER_WIDTH - 60,
    fontFamily: 'Pixelify Sans',
  });

  const narrationTextStyle = new TextStyle({
    fill: '#e6ccff', // Light purple for narration
    fontSize: 20,
    fontStyle: 'italic',
    wordWrap: true,
    wordWrapWidth: STAGE_WIDTH - 80, // Wider text area for narration
    align: 'center',
    fontFamily: 'Pixelify Sans',
  });

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const currentSceneData = story.scenes[currentScene];
      const characterDialogues = currentSceneData.dialogues.filter(
        (
          dialogue,
        ): dialogue is {
          type: 'character';
          character: Character;
          text: string;
        } => dialogue.type === 'character',
      );
      const characterImages = new Set(
        characterDialogues.map(dialogue => dialogue.character.image),
      );

      const imagesToLoad = [
        currentSceneData.background,
        ...Array.from(characterImages),
      ];

      try {
        await Promise.all(
          imagesToLoad.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            });
          }),
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    setImagesLoaded(false);
    loadImages();
  }, [currentScene]);

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

  // Handle character transitions
  useEffect(() => {
    const currentDialogue = story.scenes[currentScene].dialogues[dialogueIndex];

    if (currentDialogue.type === 'character') {
      const currentCharacter = currentDialogue.character;

      if (
        previousCharacter &&
        previousCharacter.name !== currentCharacter!.name
      ) {
        setCharacterTransition(true);
        const timer = setTimeout(() => {
          setCharacterTransition(false);
        }, 300);
        return () => clearTimeout(timer);
      }

      setPreviousCharacter(currentCharacter!);
    } else {
      setPreviousCharacter(null);
    }
  }, [dialogueIndex, currentScene]);

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

  if (!imagesLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <NextImage
          src="/assets/loading.gif"
          width={1024}
          height={576}
          alt="Loading..."
        />
      </div>
    );
  }

  WebFont.load({
    google: {
      families: ['Pixelify Sans'],
    },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <Stage
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        options={{ backgroundColor: 0x000000 }}
        className="w-full h-full"
      >
        {/* Background Layer */}
        <Container>
          <Sprite
            image={currentSceneData.background}
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
          />
        </Container>

        {/* Dialogue Box Layer */}
        <Container y={STAGE_HEIGHT - DIALOGUE_HEIGHT}>
          {/* Dialogue box background */}
          <Sprite
            image="/api/placeholder/1280/200"
            width={STAGE_WIDTH}
            height={DIALOGUE_HEIGHT}
            alpha={currentDialogue.type === 'narration' ? 0.4 : 0.7}
          />

          {/* Character portrait - only shown for character dialogues */}
          {currentDialogue.type === 'character' && (
            <Container alpha={characterTransition ? 0.5 : 1}>
              <Sprite
                image={currentDialogue.character!.image}
                x={currentDialogue.character!.position?.x ?? 20}
                y={
                  -CHARACTER_HEIGHT +
                  DIALOGUE_HEIGHT +
                  (currentDialogue.character!.position?.y ?? 0)
                }
                width={currentDialogue.character!.width ?? CHARACTER_WIDTH}
                height={currentDialogue.character!.width ?? CHARACTER_HEIGHT}
                scale={currentDialogue.character!.scale || 1}
              />
            </Container>
          )}

          {/* Dialog content */}
          {currentDialogue.type === 'character' ? (
            <>
              {/* Character name */}
              <Text
                text={currentDialogue.character!.name}
                x={CHARACTER_WIDTH + 40}
                y={20}
                style={characterNameStyle}
              />
              {/* Character dialogue */}
              <Text
                text={displayedText}
                x={CHARACTER_WIDTH + 40}
                y={60}
                style={characterTextStyle}
              />
            </>
          ) : (
            /* Narration text - centered and styled differently */
            <Text
              text={displayedText}
              x={STAGE_WIDTH / 2}
              y={DIALOGUE_HEIGHT / 2}
              anchor={0.5}
              style={narrationTextStyle}
            />
          )}
        </Container>
      </Stage>

      <div className="absolute inset-0 cursor-pointer" onClick={handleClick} />
    </div>
  );
}
