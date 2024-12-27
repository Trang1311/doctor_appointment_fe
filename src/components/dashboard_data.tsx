import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import {
  FaUser,
  FaCalendarAlt,
  FaComments,
  FaClock,
  FaHome,
} from "react-icons/fa";
import Footer from "./footer";

const DashboardData: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();
  const userId = Cookies.get("userId");

  useEffect(() => {
    const userRole = Cookies.get("role");
    setRole(userRole || null);

    if (!Cookies.get("token")) {
      router.push("/login");
    }

    const currentPath = router.asPath;
    const currentMenuItem = menuItems.find(
      (item) =>
        currentPath.includes(item.link) ||
        (item.link.includes("appointments") &&
          currentPath.includes("appointments")) ||
        (item.label === "Chat room" && currentPath.includes("/chat"))
    );
    setSelectedItem(currentMenuItem?.label || null);
  }, [router]);

  const menuItems =
    role === "guest"
      ? [
          { label: "Tổng Quan", icon: <FaHome />, link: "/dashboard" },
          { label: "Hồ Sơ", icon: <FaUser />, link: `/profile?id=${userId}` },
          {
            label: "Lịch Khám",
            icon: <FaCalendarAlt />,
            link: `/appointments?id=${userId}`,
          },
          { label: "Trò Chuyện", icon: <FaComments />, link: "/chat" },
        ]
      : [
          { label: "Tổng Quan", icon: <FaHome />, link: "/dashboard" },
          { label: "Hồ Sơ", icon: <FaUser />, link: `/profile?id=${userId}` },
          {
            label: "Thời Gian Biểu",
            icon: <FaClock />,
            link: "/schedule",
          },
          {
            label: "Lịch Hẹn",
            icon: <FaCalendarAlt />,
            link: "/appointments",
          },
          { label: "Trò Chuyện", icon: <FaComments />, link: "/chat" },
        ];

  const handleItemClick = (item: { label: string; link: string }) => {
    setSelectedItem(item.label);
    router.push(item.link);
  };

  return (
    <div
      className="dashboard-container"
      style={{
        display: "flex",
        margin: 0,
        fontFamily: "Roboto, serif",
        color: "#fff",
        position: "fixed",
        top: "75px",
        height: "635px",
      }}
    >
      <div
        className="drawer"
        style={{
          width: "240px",
          backgroundColor: "#1D1E4B",
          padding: "20px",
          fontSize: "18px",
        }}
      >
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleItemClick(item)}
              className={selectedItem === item.label ? "active" : ""}
            >
              {item.icon} <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {!role && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .drawer ul {
          list-style: none;
          padding: 0;
        }
        .drawer li {
          display: flex;
          align-items: center;
          padding: 20px;
          cursor: pointer;
        }
        .drawer li:hover {
          font-weight: bold;
          color: white;
          box-sizing: border-box;
          box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.15);
          border: 2px solid #fff;
          boder-radius: 10px;
        }
        .drawer li.active {
          font-weight: bold;
          color: white;
          box-sizing: border-box;
          box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.15);
          border: 2px solid #fff;
          boder-radius: 10px;
        }
        .drawer li span {
          margin-left: 10px;
        }
        .content {
          flex-grow: 1;
          align-items: center;
          padding: 20px;
          margin: 0;
        }
        .loading {
          position: center;
          font-size: 60px;
        }
        h1 {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
};

export default DashboardData;
