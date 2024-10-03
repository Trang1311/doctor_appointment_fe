"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/withAuth";

interface TopicProps {
  _id: string;
  name: string;
  description?: string;
  img: string;
}

const Topic: React.FC<TopicProps> = ({ _id, name, description, img }) => {
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push(`/list_doctor?topicId=${_id}`);
    }
  };

  return (
    <div
      className="item"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      onClick={handleClick}
    >
      <div className="icon">
        <img src={img} alt="Icon" />
      </div>
      <h3>{name}</h3>
      {showDescription && (
        <div className="description">
          <p>{description}</p>
        </div>
      )}

      <style jsx>{`
        .item {
          position: relative;
          flex: 1 0 calc(20% - 50px);
          max-width: calc(20% - 50px);
          box-sizing: border-box;
          background-color: #fff;
          padding: 10px;
          text-align: center;
          border-radius: 8px;
          transition: background-color 0.3s ease;
          cursor: pointer;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 14px;
          color: #464141;
        }
        .item:hover {
          background-color: #5482cb;
        }

        .icon {
          width: 40px;
          height: 40px;
          margin: 0 auto 10px;
        }

        .icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .description {
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 16px;
          z-index: 10;
          pointer-events: none;
        }

        .description::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
        }
      `}</style>
    </div>
  );
};

export default Topic;
