"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Topic {
  _id: string;
  name: string;
}

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get<Topic[]>(
          "http://localhost:3000/topics"
        );
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicClick = (topicId: string) => {
    router.push(`/list_doctor?topicId=${topicId}`);
    setIsOpen(false);
  };

  return (
    <div className="menu-container">
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      {isOpen && (
        <div className="menu">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="menu-item"
              onClick={() => handleTopicClick(topic._id)}
            >
              {topic.name}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .menu-container {
          position: fixed;
          top: 110px;
          left: 20px;
          z-index: 1100;
        }

        .hamburger {
          font-size: 44px;
          padding: 10px 20px;
          background-color: #8dbbfa;
          color: #fff;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          font-family: "Inika", serif;
          transition: background-color 0.3s ease;
        }
        .hamburger-button:hover {
          background-color: #2f80ed;
        }

        .menu {
          background-color: #d1e9fb;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          padding: 10px;
          margin-top: 10px;
          width: 200px;
        }

        .menu-item {
          padding: 10px;
          cursor: pointer;
          font-family: "Inika", serif;
        }

        .menu-item:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default Menu;
