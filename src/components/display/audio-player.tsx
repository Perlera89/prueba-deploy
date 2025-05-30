"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Repeat,
  Music,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // Inicializar el reproductor
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLooping]);

  // Manejar la reproducción/pausa
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Manejar el volumen y silencio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Manejar el loop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = isLooping;
  }, [isLooping]);

  // Formatear tiempo (segundos a MM:SS)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Manejar el cambio en la barra de progreso
  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Manejar el cambio de volumen
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Avanzar/retroceder 10 segundos
  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  // Calcular el porcentaje de progreso
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-black/90 rounded-lg overflow-hidden p-6">
      <div className="flex flex-col items-center">
        {/* Elemento de audio oculto */}
        <audio ref={audioRef} src={src} preload="metadata" />

        {/* Visualización de audio */}
        <div className="w-full mb-6 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center transition-transform duration-500 ${isPlaying ? "scale-95 animate-pulse" : ""}`}
            >
              <Music className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Título */}
        {title && (
          <h3 className="text-white font-medium text-lg mb-4 text-center">
            {title}
          </h3>
        )}

        {/* Barra de progreso */}
        <div className="w-full mb-4">
          <Slider
            value={[progressPercentage]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="h-1"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controles principales */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={skipBackward}
            className="text-white hover:text-green-400 transition-colors p-2"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white hover:bg-green-400 text-black rounded-full p-3 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>

          <button
            onClick={skipForward}
            className="text-white hover:text-green-400 transition-colors p-2"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Controles secundarios */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={cn(
              "text-white p-2 transition-colors",
              isLooping ? "text-green-400" : "hover:text-green-400"
            )}
          >
            <Repeat className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-green-400 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <div className="w-20">
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="h-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
