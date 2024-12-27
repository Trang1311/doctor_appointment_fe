"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface SoundCategoryProps {
  sounds: {
    name: string;
    label: string;
    url: string;
  }[];
}
const SoundCategory: React.FC<SoundCategoryProps> = ({ sounds }) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [playingSounds, setPlayingSounds] = useState<Set<string>>(new Set());
  const [volumeLevels, setVolumeLevels] = useState<{ [key: string]: number }>(
    {}
  );
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  if (Object.keys(volumeLevels).length === 0) {
    const initialVolumeLevels = sounds.reduce((acc, sound) => {
      acc[sound.name] = 0.2;
      return acc;
    }, {} as { [key: string]: number });
    setVolumeLevels(initialVolumeLevels);
  }

  const categories: { [key: string]: string[] } = {
    relax: ["chime", "forest", "river", "birds"],
    noiseBlocker: ["white", "rain"],
    motivation: ["train", "snow"],
    productivity: ["bell", "waves"],
  };

  const playCategorySounds = (category: string) => {
    if (currentCategory === category) {
      if (playingSounds.size > 0) {
        playingSounds.forEach((soundName) => {
          const audio = audioRefs.current[soundName];
          if (audio) audio.pause();
        });
        setPlayingSounds(new Set());
      } else {
        const categorySounds = categories[category] || [];
        categorySounds.forEach((soundName) => {
          const audio = audioRefs.current[soundName];
          if (audio) {
            audio.play();
            setPlayingSounds((prev) => new Set(prev).add(soundName));
          }
        });
      }
      setCurrentCategory(category);
      return;
    }

    playingSounds.forEach((soundName) => {
      const audio = audioRefs.current[soundName];
      if (audio) audio.pause();
    });
    setPlayingSounds(new Set());

    setCurrentCategory(category);

    const categorySounds = categories[category] || [];
    categorySounds.forEach((soundName) => {
      const audio = audioRefs.current[soundName];
      if (audio) {
        audio.play();
        setPlayingSounds((prev) => new Set(prev).add(soundName));
      }
    });
  };

  const playRandomSound = () => {
    const numSoundsToPlay = Math.floor(Math.random() * sounds.length) + 1;
    const selectedSounds: (typeof sounds)[0][] = [];

    while (selectedSounds.length < numSoundsToPlay) {
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      if (!selectedSounds.includes(randomSound)) {
        selectedSounds.push(randomSound);
      }
    }

    playingSounds.forEach((soundName) => {
      const audio = audioRefs.current[soundName];
      if (audio) audio.pause();
    });
    setPlayingSounds(new Set());

    selectedSounds.forEach((sound) => {
      const audio = audioRefs.current[sound.name];
      if (audio) {
        audio.play();
        setPlayingSounds((prev) => new Set(prev).add(sound.name));
      }
    });
    setCurrentCategory("random");
  };

  const handleVolumeChange = (
    soundName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const volumeLevel = parseFloat(event.target.value);
    const audio = audioRefs.current[soundName];
    if (audio) {
      audio.volume = volumeLevel;
    }
    setVolumeLevels((prev) => ({ ...prev, [soundName]: volumeLevel }));
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginLeft: "20px",
        marginTop: "135px",
      }}
    >
      <div
        className="buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button onClick={() => playCategorySounds("relax")}>Thư Giản</button>
        <button onClick={() => playCategorySounds("noiseBlocker")}>
          Chống Tiếng Ồn
        </button>
        <button onClick={() => playCategorySounds("motivation")}>
          Động Lực
        </button>
        <button onClick={() => playCategorySounds("productivity")}>
          Hiệu Quả
        </button>
        <button onClick={playRandomSound}>Ngẫu Nhiên</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 213px)",
          gap: "40px",
          justifyContent: "center",
          margin: "40px",
          padding: "0 10px",
          marginBottom: "70px",
          marginLeft: "75px",
        }}
      >
        {sounds.map((sound) => (
          <div
            key={sound.name}
            className={`sound-item ${
              playingSounds.has(sound.name) ? "playing" : ""
            }`}
          >
            <img
              src={`/content/sounds/${sound.name}.png`}
              alt={sound.label}
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                marginTop: "30px",
              }}
              onClick={() => {
                const audio = audioRefs.current[sound.name];
                if (audio) {
                  audio.volume = volumeLevels[sound.name] || 0.2;
                  if (audio.paused) {
                    audio.play();
                    setPlayingSounds((prev) => new Set(prev).add(sound.name));
                  } else {
                    audio.pause();
                    setPlayingSounds((prev) => {
                      const newSet = new Set(prev);
                      newSet.delete(sound.name);
                      return newSet;
                    });
                  }
                }
              }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumeLevels[sound.name] || 0.2}
              onChange={(e) => handleVolumeChange(sound.name, e)}
              style={{ width: 100, height: 3 }}
            />
            <audio
              ref={(el) => {
                if (el) audioRefs.current[sound.name] = el;
              }}
              src={sound.url}
              loop
              onPlay={() =>
                setPlayingSounds((prev) => new Set(prev).add(sound.name))
              }
              onPause={() =>
                setPlayingSounds((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(sound.name);
                  return newSet;
                })
              }
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          
        }
        .buttons button {
          padding: 10px 20px;
          width: 200px;
          height: 100px;
          font-family: Roboto, serif;
          color:#ffff;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          background-image: url("/content/panel/76682b74730e2adf24b165a71d476dea.gif");
          background-size: cover;
          background-position: center;
           border: none;
          border-radius: 5px;
          transition: background-color 0.3s;

        }
        .buttons button:hover {
          font-family: Roboto, serif;
          color:#ffff;
          font-size: 20px;
          font-weight: bold;
          color:#000000;
          background-image: url("/content/panel/b3219a2b07fad62637ba3583f9347d67.gif");
          background-size: cover;
          background-position: center;     
        }

        .sound-item {
          width: 180px;
          height: 170px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          //border: 1px solid #49D3FF;
          //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          //background-color: #2c2d6e;
          background-color: transparent;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .sound-item.playing {
          //background-color: #5456bf;
          background-color: #2c2d6e;
          //border-color: #49D3FF;
          //box-shadow: 0 4px 8px rgba(0, 121, 107, 0.3);
          //border-width: 5px; 
          border-style: solid; 
          border-radius: 8px;  
}
      `}</style>
    </div>
  );
};

export default SoundCategory;
