import { faCompass, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AiButton from "./animata/button/ai-button";
import TextBorderAnimation from "./animata/button/bordertext";
import GlitchText from "./animata/graphs/glitch-text";
import HeroSectionTextHover from "./animata/graphs/herotext";
import { TextGenerateEffect } from "./animata/graphs/generatetext";
import TypingText from "./animata/graphs/typing-text";
import { FeatureTwo } from "./animata/container/featureDashboard";
import DoctorInfoTab from "./doctorinfotab";

const Advertisement: React.FC = () => {
  const destinations = [
    {
      emoji: "✨",
      position:
        "left-[150px] top-0 group-hover:rotate-[10deg] group-hover:-translate-y-10",
    },
    {
      emoji: "💡",
      position:
        "left-[105px] top-0 group-hover:rotate-[20deg] group-hover:translate-x-16",
    },
  ];
  const items = [
    {
      text: "Tâm Trí",
      icons: destinations,
      hoverColor: "#ffebee",
    },
  ];
  const destinations2 = [
    {
      emoji: "🌈",
      position:
        "left-[240px] top-0 group-hover:rotate-[10deg] group-hover:-translate-y-10",
    },
    {
      emoji: "🌱",
      position:
        "left-[155px] bottom-15 group-hover:rotate-[20deg] group-hover:translate-x-16",
    },
  ];
  const items2 = [
    {
      text: "Cuộc Sống",
      icons: destinations2,
      hoverColor: "#ffebee",
    },
  ];
  return (
    <div
      className="ad-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "20px 0px",
        width: "100%",
        height: "780px",
        padding: "0px 60px",
        position: "relative", // Make the container relative to position the video
        zIndex: 1,
        marginTop: "0px",
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="\content\panel\BG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="left-box"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "50px",
          marginTop: "60px",
          maxWidth: "50%",
          height: "80%",
          //backgroundColor: "#000",
          borderRadius: "10px",
        }}
      >
        <div className="left-text">
          <div
            className="rating-text"
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontFamily: "Roboto, serif",
              borderRight: "1px solid transparent",
              transform: "translateX(-20px)",
            }}
          >
            <TypingText
              text="⭐ Lựa chọn số 1 cho đặt lịch chăm sóc sức khỏe được người dùng đánh giá cao."
              className="font-roboto font-bold text-white text-xl"
            />
          </div>

          {/* Thêm FeatureTwo */}
          <div style={{ marginBottom: "40px" }}>
            <FeatureTwo />
          </div>

          <p
            className="slogan"
            style={{
              fontSize: "44px",
              fontFamily: "Roboto",
              color: "#1a1a1e",
            }}
          >
            <div
              className="line"
              style={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <TextGenerateEffect
                words="Khai Mở"
                className="inline-text"
                filter={true}
                duration={3}
              />
              <span
                style={{
                  fontWeight: 800,
                  fontFamily: "'Roboto', serif",
                  color: "#2baeff",
                  fontSize: "68px",
                }}
              >
                &nbsp;
                <HeroSectionTextHover items={items} />{" "}
              </span>
            </div>
            <div
              className="line"
              style={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <TextGenerateEffect
                words="Nâng Tầm"
                className="inline-text"
                filter={true}
                duration={3}
              />
              <span
                style={{
                  fontWeight: 800,
                  fontFamily: "'Roboto', serif",
                  color: "#00ea00",
                  fontSize: "68px",
                }}
              >
                &nbsp;
                <HeroSectionTextHover items={items2} />{" "}
              </span>
            </div>
          </p>
        </div>
        <AiButton></AiButton>
      </div>
      <div
        className="right-box"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75%",
          maxWidth: "38%",
          marginRight: "60px",
          marginTop: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "25px",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DoctorInfoTab />
      </div>
    </div>
  );
};

export default Advertisement;
