'use client';
import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;

      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <audio ref={audioRef} loop>
        <source src="/assets/audio/bgm.wav" type="audio/mp3" />
      </audio>
      <button
        onClick={toggleMusic}
        className="p-2 rounded-full bg-gray-800 text-white"
      >
        {isPlaying ? '🔇 Mute' : '🔊 Play'}
      </button>
    </div>
  );
}
