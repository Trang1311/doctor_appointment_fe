import Layout from "../components/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Topic from "../components/topic";
import Advertisement from "../components/advertisement";
import { io } from "socket.io-client";

interface TopicData {
  _id: string;
  name: string;
  description?: string;
  img: string;
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
});
const Index = () => {
  const [topics, setTopics] = useState<TopicData[]>([]);
  const [clientIp, setClientIp] = useState<string>("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get<TopicData[]>(
          "http://localhost:3000/topics"
        );
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
    socket.on("clientIp", (ip: string) => {
      setClientIp(ip);
    });

    return () => {
      socket.off("clientIp");
    };
  }, []);

  return (
    <Layout>
      <div className="ad-container">
        <Advertisement />

        <div className="container">
          <h2 className="page-title">
            Choose doctor's <span className="highlight">Expertise</span>
          </h2>
          <div className="topics-list">
            {topics.map((topic) => (
              <Topic
                key={topic._id}
                _id={topic._id}
                name={topic.name}
                description={topic.description}
                img={topic.img}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .ad-container {
          padding-top: 40px;
          background-color: #004574;
        }
        .container {
          text-align: center;
          font-family: Georgia, "Times New Roman", Times, serif;
          padding: 20px;
          background-color: #004574;
        }

        .page-title {
          font-size: 38px;
          margin-bottom: 20px;
          color: #fff;
          font-weight: light;
        }

        .highlight {
          font-weight: bold;
          font-family: "Aclonica", serif;
          color: yellow;
        }

        .topics-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          font-family: Georgia, "Times New Roman", Times, serif;
          margin-bottom: 30px;
        }
      `}</style>
    </Layout>
  );
};

export default Index;
