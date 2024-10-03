"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Topic {
  _id: string;
  name: string;
  img: string;
}

const Menu: React.FC = () => {
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
  };

  return (
    <div>
      <div className="drawer">
        <div className="menu">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="menu-item"
              onClick={() => handleTopicClick(topic._id)}
            >
              <img src={topic.img} alt={topic.name} className="topic-icon" />
              {topic.name}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .drawer {
          width: 250px;
          background-color: #fff;
          height: calc(100vh - 65px);
          overflow-y: auto;
          padding: 15px;
          position: fixed;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 15px;
          cursor: pointer;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 16px;
          color: #464141;
          line-height: 2;
          white-space: normal;
        }

        .menu-item:hover {
          background-color: #8dbbfa;
        }

        .topic-icon {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Menu;
