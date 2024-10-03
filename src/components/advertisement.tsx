import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const Advertisement: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    "/content/logo/DisplayFileFormFileName.png",
    "/content/logo/healthcare-stethoscope-symbols-2milkjfopmck18ii.jpg",
    "/content/logo/HD-wallpaper-medical-top-medical-background-hospital.jpg",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="ad-container">
      <div className="left-box">
        <div className="left-text">
          <h3 className="rating-text">
            <FaStar color="#8DBBFA" size={24} />
            __Rated #1 choice for healthcare appointments by users
          </h3>
          <p className="sologan">
            Empowering Your <span className="mind">Mind</span>, <br />
            Enhancing Your <span className="life">Life</span>
          </p>
        </div>
      </div>

      <div className="image-slider">
        <img
          src={images[currentImageIndex]}
          alt={`Healthcare ${currentImageIndex + 1}`}
          className={`ad-image ${fade ? "fade-in" : "fade-out"}`}
        />
        <div className="top-right-text">
          <span className="hour">10k+</span> hours of patient meetings
        </div>
      </div>

      <style jsx>{`
        .ad-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 50px 50px;
          padding: 20px;
          background-image: url("/content/panel/eb036c3b4ab6ac086f8da8ed8ac76eda.gif");
          background-size: cover;
          background-position: center;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          flex-wrap: nowrap;
          margin-top: 60px;
        }

        .left-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 50px;
          max-width: 500px;
        }

        .left-text h3 {
          font-size: 18px;
          color: #8dbbfa;
          background-color: #fff;
          padding: 5px;
          border-radius: 18px;
          white-space: nowrap;
          padding-left: 15px;
          transform: translateX(-15px);
        }

        .rating-text {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          border-right: 1px solid transparent;
          animation: typing 2s steps(40, end) forwards;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .left-text p {
          font-size: 44px;
          margin: 20px -20px 0;
          font-family: Georgia, "Times New Roman", Times, serif;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(50px);
          animation: slideIn 1.5s forwards;
          animation-delay: 0.5s;
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .image-slider {
          position: relative;
          max-width: 500px;
          flex: 1;
          overflow: hidden;
        }

        .ad-image {
          width: 500px;
          height: 300px;
          object-fit: cover;
          border-radius: 10px;
          transition: opacity 0.5s ease-in-out;
          opacity: 1;
        }

        .fade-out {
          opacity: 0.1;
        }

        .fade-in {
          opacity: 1;
        }

        .top-right-text {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 18px;
        }

        .mind {
          font-weight: bold;
          font-family: Georgia, "Times New Roman", Times, serif;
          color: #2f80ed;
        }

        .life {
          font-weight: bold;
          font-family: Georgia, "Times New Roman", Times, serif;
          color: #196c17;
        }

        .hour {
          font-weight: bold;
          color: #d1e9fb;
          font-size: 48px;
        }
      `}</style>
    </div>
  );
};

export default Advertisement;
