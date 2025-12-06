import { useEffect, useRef } from "react";
import type { Environment } from "@/types/types";

export const useAmbientAudio = (
  environment: Environment,
  isMuted: boolean,
  volume: number
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    //if previous exist clear it
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    if (!environment) return;

    const audio = new Audio(`/ambient-sounds/${environment}.mp3`);
    audio.loop = true;
    audio.volume = volume / 100;
    audioRef.current = audio;

    shouldPlayRef.current = !isMuted;

    if (!isMuted) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        console.error("Autoplay prevented, waiting for user interaction...");

        const resumePlayback = () => {
          if (audioRef.current && shouldPlayRef.current) {
            audioRef.current.play().catch((err) => {
              console.error("Failed to play audio: ", err);
            });
          }
          document.removeEventListener("click", resumePlayback);
        };

        document.addEventListener("click", resumePlayback, { once: true });
      }
    }

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [environment]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Failed to play audio: ", err);
      });
    }
  }, [isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);
};
