import { useState, useRef } from "react";

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
    <div className="sound-category">
      <div className="buttons">
        <button onClick={() => playCategorySounds("relax")}>Relax</button>
        <button onClick={() => playCategorySounds("noiseBlocker")}>
          Noise Blocker
        </button>
        <button onClick={() => playCategorySounds("motivation")}>
          Motivation
        </button>
        <button onClick={() => playCategorySounds("productivity")}>
          Productivity
        </button>
        <button onClick={playRandomSound}>Random</button>
      </div>
      <div className="sounds-list">
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
              className="volume-slider"
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
        .sound-category {
          text-align: center;
          margin- left: 90px;
          margin-top: 65px;

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
          font-family: Georgia, "Times New Roman", Times, serif;
          color:#ffff;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          background-image: url("/content/panel/a556502cc776e90f0b2d257283e04ca8.gif");
          background-size: cover;
          background-position: center;
           border: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .buttons button:hover {
          font-family: Georgia, "Times New Roman", Times, serif;
          color:#ffff;
          font-size: 20px;
          font-weight: bold;
          color:#000000;
          background-image: url("/content/panel/b3219a2b07fad62637ba3583f9347d67.gif");
          background-size: cover;
          background-position: center;
          
}

        .sounds-list {
            display: grid;
            grid-template-columns: repeat(4, 213px);
            gap: 15px;
            justify-content: center;
            margin: 60px auto 0 auto;
            padding: 0 20px;
            margin-bottom: 30px;
        }
        .sound-item {
          width: 180px;
          height: 170px;
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
          background-color: #c4d9fe;
          border-color: #00796b;
          box-shadow: 0 4px 8px rgba(0, 121, 107, 0.3);
        }
        .sound-item img {
          width: 80px;
          height: 80px;
          cursor: pointer;
          margin-top: 30px;
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

export default SoundCategory;
