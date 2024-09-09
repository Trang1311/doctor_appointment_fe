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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const categories: { [key: string]: string[] } = {
    relax: ["rain", "forest", "waves", "birds"],
    noiseBlocker: ["white", "vacum"],
    motivation: ["train", "snow"],
    productivity: ["bell", "waves"],
  };

  const playCategorySounds = (category: string) => {
    if (currentCategory === category) {
      if (isPlaying) {
        audioRefs.current.forEach((audio) => audio.pause());
        setIsPlaying(false);
      } else {
        audioRefs.current.forEach((audio) => {
          if (
            categories[category].some((soundName) =>
              audio.src.includes(soundName)
            )
          ) {
            audio.play();
            setIsPlaying(true);
          }
        });
      }
      return;
    }

    audioRefs.current.forEach((audio) => audio.pause());

    setCurrentCategory(category);
    setIsPlaying(true);

    const categorySounds = categories[category] || [];
    categorySounds.forEach((soundName) => {
      const audio = audioRefs.current.find((ref) =>
        ref.src.includes(soundName)
      );
      if (audio) {
        audio.play();
      }
    });
  };

  // Explicitly typing selectedSounds array
  const playRandomSound = () => {
    const numSoundsToPlay = Math.floor(Math.random() * sounds.length) + 1; // Choose how many sounds to play (1 to all sounds)

    // Explicitly typing as an array of sound objects
    const selectedSounds: (typeof sounds)[0][] = [];

    while (selectedSounds.length < numSoundsToPlay) {
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      if (!selectedSounds.includes(randomSound)) {
        selectedSounds.push(randomSound);
      }
    }

    // Pause all sounds first
    audioRefs.current.forEach((audio) => audio.pause());

    setCurrentCategory("random");
    setIsPlaying(true);

    selectedSounds.forEach((sound) => {
      const audio = audioRefs.current.find((ref) =>
        ref.src.includes(sound.name)
      );
      if (audio) {
        audio.play();
      }
    });
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
      {sounds.map((sound) => (
        <audio
          key={sound.name}
          ref={(el) => {
            if (el) audioRefs.current.push(el);
          }}
          src={sound.url}
          loop
        />
      ))}
      <style jsx>{`
        .sound-category {
          text-align: center;
          margin: 20px 0;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .buttons button {
          padding: 10px 20px;
          width: 225px;
          height: 130px;
          font-family: "Roboto";
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          background-color: #e9f1ff;

          border: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .buttons button:hover {
          background-color: #8dbbfa;
        }
      `}</style>
    </div>
  );
};

export default SoundCategory;
