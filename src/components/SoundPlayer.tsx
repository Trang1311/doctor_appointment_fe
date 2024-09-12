"use client";
import { useState, useRef, useEffect } from "react";

interface SoundPlayerProps {
  soundName: string;
  label: string;
  soundUrl: string;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({
  soundName,
  label,
  soundUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volumeLevel = parseFloat(event.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volumeLevel;
    }
    setVolume(volumeLevel);
  };

  return (
    <div className={`sound-item ${isPlaying ? "playing" : ""}`}>
      <img
        src={`/content/sounds/${soundName}.png`}
        alt={label}
        onClick={handlePlayPause}
        className="play-pause-button"
      />
      <div className="sound-label">{label}</div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
      <audio ref={audioRef} src={soundUrl} loop />
      <style jsx>{`
        .sound-item {
          width: 213px;
          height: 214px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          border: 1px solid #ccc;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          background-color: #f9f9f9;
          transition: background-color 0.3s, border-color 0.3s;
        }

        .sound-item.playing {
          background-color: #e9f1ff;
          border-color: #00796b;
          box-shadow: 0 4px 8px rgba(0, 121, 107, 0.3);
        }

        .play-pause-button {
          width: 100px;
          height: 100px;
          cursor: pointer;
        }

        .sound-label {
          margin-top: 10px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }

        .volume-slider {
          width: 100px;
        }
      `}</style>
    </div>
  );
};

export default SoundPlayer;
