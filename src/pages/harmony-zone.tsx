import Layout from "@/components/layout";
import SoundCategory from "../components/SoundCategory";

const HarmonyZone = () => {
  const sounds = [
    {
      name: "rain",
      label: "Rain",
      url: "http://localhost:3000/sounds/rain-sound-188158.mp3",
    },
    {
      name: "forest",
      label: "Forest",
      url: "http://localhost:3000/sounds/forest-wind-and-birds-6881.mp3",
    },
    {
      name: "waves",
      label: "Waves",
      url: "http://localhost:3000/sounds/ocean-waves-112906.mp3",
    },
    {
      name: "birds",
      label: "Birds",
      url: "http://localhost:3000/sounds/bird-voices-7716.mp3",
    },
    {
      name: "campfire",
      label: "Campfire",
      url: "http://localhost:3000/sounds/campfire-crackling-fireplace-sound-119594.mp3",
    },
    {
      name: "bell",
      label: "Bell",
      url: "http://localhost:3000/sounds/church-bell-5993.mp3",
    },
    {
      name: "cave",
      label: "Cave",
      url: "http://localhost:3000/sounds/dripping-water-in-cave-114694.mp3",
    },
    {
      name: "night",
      label: "Night",
      url: "http://localhost:3000/sounds/night-ambience-17064.mp3",
    },
    {
      name: "river",
      label: "River",
      url: "http://localhost:3000/sounds/river-in-the-forest-17271.mp3",
    },
    {
      name: "leaves",
      label: "Leaves",
      url: "http://localhost:3000/sounds/rustling-leaves-6875.mp3",
    },
    {
      name: "wind",
      label: "Wind",
      url: "http://localhost:3000/sounds/smooth-cold-wind-looped-135538.mp3",
    },
    {
      name: "thunder",
      label: "Thunder",
      url: "http://localhost:3000/sounds/thunder-sounds-long-73277.mp3",
    },
    {
      name: "chime",
      label: "Chime",
      url: "http://localhost:3000/sounds/wind-chime-small-64660.mp3",
    },
    {
      name: "water",
      label: "Water",
      url: "http://localhost:3000/sounds/touching-the-water-176713.mp3",
    },
    {
      name: "coffee",
      label: "Coffee",
      url: "http://localhost:3000/sounds/cafe-noise-32940.mp3",
    },
    {
      name: "libary",
      label: "Libary",
      url: "http://localhost:3000/sounds/library-ambiance-60000.mp3",
    },
    {
      name: "train",
      label: "Train",
      url: "http://localhost:3000/sounds/inside-the-old-train-66350.mp3",
    },
    {
      name: "snow",
      label: "Snow",
      url: "http://localhost:3000/sounds/snow.mp3",
    },
    {
      name: "vacum",
      label: "Vacum",
      url: "http://localhost:3000/sounds/vacuum-cleaner-70792.mp3",
    },
    {
      name: "white",
      label: "White",
      url: "http://localhost:3000/sounds/white-noise-6971.mp3",
    },
  ];

  return (
    <Layout>
      <div className="harmony-zone">
        <SoundCategory sounds={sounds} />
        <div className="sounds-container"></div>
        <style jsx>{`
          .harmony-zone {
            background-image: url("/content/logo/hand-painted-watercolor-pastel-sky-cloud-background_41066-1919.jpg");
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
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default HarmonyZone;
