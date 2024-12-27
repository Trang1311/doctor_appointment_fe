"use client";
import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/withAuth";
import { transform } from "framer-motion";

interface TopicProps {
  _id: string;
  name: string;
  description?: string;
  img: string;
}

const Topic: React.FC<TopicProps> = ({ _id, name, description, img }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push(`/list_doctor?topicId=${_id}`);
    }
  };

  return (
    <div
      className="flip-card"
      onClick={handleClick}
      style={{
        width: 180,
        height: 180,
        perspective: 1240,
        cursor: "pointer",
        margin: 10,
        
      }}
    >
      <div
        className="flip-card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="flip-card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: 10,
            backgroundColor: "#fbfbfb",
            color: "#464141",
          }}
        >
          <div
            className="icon"
            style={{ width: 60, height: 60, marginBottom: 10 }}
          >
            <img
              src={img}
              alt="Icon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <h3
            className="name"
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {name}
          </h3>
        </div>

        <div
          className="flip-card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: 10,
            backgroundColor: "#000000",
            color: "white",
            transform: "rotateY(180deg)",
          }}
        >
          <h3
            className="name-back"
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {name}
          </h3>
          <hr
            className="divider"
            style={{
              width: "80%",
              height: 1,
              backgroundColor: "white",
              border: "none",
              marginBottom: 10,
            }}
          />
          <p
            className="description"
            style={{
              fontSize: 14,
              textAlign: "center",
              padding: "0 5px",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      <style jsx>{`
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Topic;
