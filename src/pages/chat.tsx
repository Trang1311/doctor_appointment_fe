import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            console.log("Setting video stream");
            videoRef.current.srcObject = stream;
          } else {
            console.error("videoRef.current is null");
          }
          setStream(stream);
        })
        .catch((err) => console.error("Error accessing media devices.", err));
    }
  }, []);

  return (
    <div>
      <h1>Video Call</h1>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
};

export default Home;
