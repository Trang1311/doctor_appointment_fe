import Layout from "@/components/layout";
import SoundCategory from "../components/SoundCategory";

const HarmonyZone = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const sounds = [
    {
      name: "rain",
      label: "Rain",
      url: `${baseUrl}/sounds/rain-sound-188158.mp3`,
    },
    {
      name: "forest",
      label: "Forest",
      url: `${baseUrl}/sounds/forest-wind-and-birds-6881.mp3`,
    },
    {
      name: "waves",
      label: "Waves",
      url: `${baseUrl}/sounds/ocean-waves-112906.mp3`,
    },
    {
      name: "birds",
      label: "Birds",
      url: `${baseUrl}/sounds/bird-voices-7716.mp3`,
    },
    {
      name: "campfire",
      label: "Campfire",
      url: `${baseUrl}/sounds/campfire-crackling-fireplace-sound-119594.mp3`,
    },
    {
      name: "bell",
      label: "Bell",
      url: `${baseUrl}/sounds/church-bell-5993.mp3`,
    },
    {
      name: "cave",
      label: "Cave",
      url: `${baseUrl}/sounds/dripping-water-in-cave-114694.mp3`,
    },
    {
      name: "night",
      label: "Night",
      url: `${baseUrl}/sounds/night-ambience-17064.mp3`,
    },
    {
      name: "river",
      label: "River",
      url: `${baseUrl}/sounds/river-in-the-forest-17271.mp3`,
    },
    {
      name: "leaves",
      label: "Leaves",
      url: `${baseUrl}/sounds/rustling-leaves-6875.mp3`,
    },
    {
      name: "wind",
      label: "Wind",
      url: `${baseUrl}/sounds/smooth-cold-wind-looped-135538.mp3`,
    },
    {
      name: "thunder",
      label: "Thunder",
      url: `${baseUrl}/sounds/thunder-sounds-long-73277.mp3`,
    },
    {
      name: "chime",
      label: "Chime",
      url: `${baseUrl}/sounds/wind-chime-small-64660.mp3`,
    },
    {
      name: "water",
      label: "Water",
      url: `${baseUrl}/sounds/touching-the-water-176713.mp3`,
    },
    {
      name: "coffee",
      label: "Coffee",
      url: `${baseUrl}/sounds/cafe-noise-32940.mp3`,
    },
    {
      name: "libary",
      label: "Libary",
      url: `${baseUrl}/sounds/library-ambiance-60000.mp3`,
    },
    {
      name: "train",
      label: "Train",
      url: `${baseUrl}/sounds/inside-the-old-train-66350.mp3`,
    },
    {
      name: "snow",
      label: "Snow",
      url: `${baseUrl}/sounds/snow.mp3`,
    },
    {
      name: "vacum",
      label: "Vacum",
      url: `${baseUrl}/sounds/vacuum-cleaner-70792.mp3`,
    },
    {
      name: "white",
      label: "White",
      url: `${baseUrl}/sounds/white-noise-6971.mp3`,
    },
  ];

  return (
    <Layout>
      <div className="harmony-zone">
        
        <SoundCategory  sounds={sounds} />
        <style jsx>{`
          .harmony-zone {
            background-color:#1D1E4B;
            background-size: cover;
            background-position: center;
            text-align: center;
            font-family: Georgia, "Times New Roman", Times, serif;
            margin: 0 auto;
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -39px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default HarmonyZone;
