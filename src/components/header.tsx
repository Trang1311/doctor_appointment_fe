import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faInfoCircle,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    setUsername(storedUsername || null);
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    setUsername(null);
    router.push("/");
  };

  const handleDashboardClick = () => {
    const userRole = Cookies.get("role");
    router.push(`/dashboard?role=${userRole}`);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/content/logo/lotus.png" alt="Logo" />
        <span className="site-name">
          <span className="soul">Soul</span>
          <span className="care">Care</span>
        </span>
      </div>
      <nav className="nav-links">
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>
            <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }} />
            Home
          </a>
        </Link>
        <Link href="/explore" legacyBehavior>
          <a className={router.pathname === "/explore" ? "active" : ""}>
            <FontAwesomeIcon icon={faCompass} style={{ marginRight: "10px" }} />
            Explore
          </a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={router.pathname === "/about" ? "active" : ""}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              style={{ marginRight: "10px" }}
            />
            About Us
          </a>
        </Link>
        <Link href="/harmony-zone" legacyBehavior>
          <a className={router.pathname === "/harmony-zone" ? "active" : ""}>
            <FontAwesomeIcon icon={faSpa} style={{ marginRight: "10px" }} />
            <span className="harmony-zone">
              <span className="harmony reveal-text">Harmony</span>
              <span className="zone reveal-text">Zone</span>
            </span>
          </a>
        </Link>
      </nav>
      <div className="user-actions">
        {username ? (
          <div className="user-info">
            <Link href="/dashboard" legacyBehavior>
              <a
                className={router.pathname === "/dashboard" ? "active" : ""}
                style={{ textDecoration: "none" }}
              >
                <span
                  className="welcome-message"
                  onClick={handleDashboardClick}
                >
                  Hello, {username}
                </span>
              </a>
            </Link>
            <img
              src="content/logo/user-logout.png"
              alt="Logout"
              className="logout-icon"
              onClick={handleLogoutClick}
            />
          </div>
        ) : (
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          max-width: 100vw;
          overflow-x: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 30px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          box-sizing: border-box;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo img {
          height: 55px;
          margin-right: 10px;
        }

        .site-name {
          font-family: "Inika", serif;
          font-size: 32px;
          display: inline-flex;
          align-items: center;
        }

        .soul {
          color: #2f80ed;
          font-weight: bold;
        }

        .care {
          color: #196c17;
          font-weight: bold;
        }

        .nav-links {
          display: flex;
          flex: 1;
          justify-content: center;
        }

        .nav-links :global(a) {
          text-decoration: none;
          color: #464141;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 18px;
          padding: 15px 25px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .nav-links :global(a.active),
        .nav-links :global(a:hover) {
          background-color: #8dbbfa;
          color: #fff;
        }

        .login-button {
          padding: 10px 20px;
          background-color: #8dbbfa;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 18px;
          transition: background-color 0.3s ease;
        }

        .login-button:hover {
          background-color: #2f80ed;
        }

        .user-actions {
          display: flex;
          align-items: center;
        }

        .user-info {
          display: flex;
          align-items: center;
        }

        .welcome-message {
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 18px;
          color: #464141;
          margin-right: 10px;
          text-decoration: none;
        }
        .welcome-message:hover {
          filter: brightness(0.8);
          color: #8dbbfa;
          text-decoration: none;
        }

        .logout-icon {
          height: 30px;
          cursor: pointer;
          transition: filter 0.3s ease, box-shadow 0.3s ease;
        }

        .logout-icon:hover {
          filter: brightness(0.8);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .harmony-zone {
          display: inline-flex;
          align-items: center;
        }

        .reveal-text {
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .harmony {
          color: #c82b2b;
          font-weight: bold;
        }

        .zone {
          color: #2f80ed;
          font-weight: bold;
        }
      `}</style>
    </header>
  );
};

export default Header;
