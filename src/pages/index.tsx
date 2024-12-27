"use client";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Topic from "../components/topic";
import Advertisement from "../components/advertisement";
import { io } from "socket.io-client";
import ListAllDoctor from "@/components/animata/container/alldoctor";
import HeroSectionTextHover from "@/components/animata/graphs/herotext";
import OverviewPage from "@/components/overview";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OverviewTwo from "@/components/feature";
import FeatureSection from "@/components/feature";
import TrustedCompanies from "@/components/companies";
import PromotionalSection from "@/components/overviewTwo";

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

  // Framer Motion animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Use Intersection Observer
  const [overviewRef, overviewInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [overviewTwoRef, overviewTwoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [companiesRef, companiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [doctorRef, doctorInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const destinations = [
    {
      emoji: "👩‍⚕️",
      position:
        "-left-20 top-3 group-hover:-rotate-[10deg] group-hover:-translate-y-12",
    },
    {
      emoji: "🧬",
      position:
        "-left-[72px] top-0 group-hover:-rotate-[20deg] group-hover:-translate-x-10",
    },
    {
      emoji: "🧠",
      position:
        "left-[150px] top-0 group-hover:rotate-[10deg] group-hover:-translate-y-10",
    },
    {
      emoji: "✨",
      position:
        "left-[105px] top-0 group-hover:rotate-[20deg] group-hover:translate-x-16",
    },
  ];
  const items = [
    {
      text: "Chủ Đề",
      icons: destinations,
      hoverColor: "#ffebee",
    },
  ];
  return (
    <Layout>
      <div className="ad-container">
        <Advertisement />

        <motion.div
          ref={overviewTwoRef}
          initial="hidden"
          animate={overviewTwoInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <FeatureSection />
        </motion.div>

        <motion.div
          ref={overviewRef}
          initial="hidden"
          animate={overviewInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <OverviewPage />
        </motion.div>

        <motion.div
          ref={doctorRef}
          initial="hidden"
          animate={doctorInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <ListAllDoctor />
        </motion.div>

        <div className="container">
          <h2 className="page-title">
            Chọn{" "}
            <span className="highlight">
              <HeroSectionTextHover items={items} />{" "}
            </span>{" "}
            Bạn Quan Tâm
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

        {/* <PromotionalSection /> */}
        <motion.div
          ref={companiesRef}
          initial="hidden"
          animate={companiesInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <TrustedCompanies />
        </motion.div>
      </div>
      <style jsx>{`
        .ad-container {
          padding-top: 0px;
          background-color: #f0f0f0;
          width: 100%;
        }
        .container {
          text-align: center;
          font-family: Roboto;
          padding: 20px;
          background-color: #f0f0f0;
        }

        .page-title {
          font-size: 38px;
          margin-bottom: 20px;
          color: #464141;
          font-weight: 500;
          margin-left: 309px;
        }

        .highlight {
          font-weight: bold;
          font-family: Roboto;
          color: red;
        }

        .topics-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-item: center;
          width: 80%; /* Set width to 100% for responsive centering */
          gap: 8px;
          font-family: Roboto;
          margin-left: 324px;
        }
      `}</style>
    </Layout>
  );
};

export default Index;
