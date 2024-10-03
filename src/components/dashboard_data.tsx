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
          currentPath.includes("appointments"))
    );
    setSelectedItem(currentMenuItem?.label || null);
  }, [router]);

  const menuItems =
    role === "guest"
      ? [
          { label: "Dashboard", icon: <FaHome />, link: "/dashboard" },
          { label: "Profile", icon: <FaUser />, link: `/profile?id=${userId}` },
          {
            label: "Calendar",
            icon: <FaCalendarAlt />,
            link: `/appointments?id=${userId}`,
          },
          { label: "Chat room", icon: <FaComments />, link: "/chat" },
        ]
      : [
          { label: "Dashboard", icon: <FaHome />, link: "/dashboard" },
          { label: "Profile", icon: <FaUser />, link: `/profile?id=${userId}` },
          {
            label: "Schedule",
            icon: <FaClock />,
            link: "/schedule",
          },
          {
            label: "Calendar",
            icon: <FaCalendarAlt />,
            link: "/appointments",
          },
          { label: "Chat room", icon: <FaComments />, link: "/chat" },
        ];

  const handleItemClick = (item: { label: string; link: string }) => {
    setSelectedItem(item.label);
    router.push(item.link);
  };

  return (
    <div className="dashboard-container">
      <div className="drawer">
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
        .dashboard-container {
          display: flex;
          margin: 0;
          font-family: Georgia, "Times New Roman", Times, serif;
          position: fixed;
          top: 85px;
        }
        .drawer {
          width: 200px;
          background-color: #fff;
          padding: 20px;
          height: 100vh;
          font-size: 18px;
        }
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
          background-color: #8dbbfa;
        }
        .drawer li.active {
          font-weight: bold;
          background-color: #8dbbfa;
        }
        .drawer li span {
          margin-left: 10px;
        }
        .content {
          flex: 1;
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
