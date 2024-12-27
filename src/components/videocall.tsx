import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import styles from "../styles/videocall.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";

interface VideoCallModalProps {
  isCaller: boolean;
  onEndCall: () => void;
  socket: any;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isCaller,
  onEndCall,
  socket,
}) => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }

        const peerInstance = new SimplePeer({
          initiator: isCaller,
          trickle: false,
          stream: stream,
        });

        peerInstance.on("signal", (data) => {
          socket.emit("videoSignal", data);
        });

        peerInstance.on("stream", (peerStream) => {
          if (peerVideo.current) {
            peerVideo.current.srcObject = peerStream;
          }
        });

        socket.on("videoSignal", (data: string | SimplePeer.SignalData) => {
          peerInstance.signal(data);
        });

        setPeer(peerInstance);
      });

    return () => {
      socket.off("videoSignal");
      if (peer) peer.destroy();
    };
  }, [isCaller, socket]);

  return (
    <div className={styles.videoCallModal}>
      <video ref={myVideo} autoPlay muted className={styles.myVideo} />
      <video ref={peerVideo} autoPlay className={styles.peerVideo} />
      <button className={styles.endCallButton} onClick={onEndCall}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>
    </div>
  );
};

export default VideoCallModal;
