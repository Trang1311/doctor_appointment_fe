"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faInfoCircle,
  faSpa,
  faSearch,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styles from "../styles/headernoscroll.module.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

const Header: React.FC = () => {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false); 
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null); 
  const [imageURL, setImageURL] = useState<string | null>(null);  
  const searchRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    const storedEmail = Cookies.get("email"); 
    const storedImageURL = Cookies.get("imageURL"); 
    setUsername(storedUsername || null);
    setEmail(storedEmail || null);
    setImageURL(storedImageURL || null);
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("imageURL");
    setUsername(null);
    setEmail(null);
    setImageURL(null);
    router.push("/");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchText)}`);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (
      searchRef.current &&
      !searchRef.current.contains(target) &&
      !isSearchFocused
    ) {
      setIsSearchActive(false);
    }
    if (
      !(target instanceof HTMLElement) ||
      !target.closest(`.${styles.dropdown}`)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchFocused]);

  const handleDashboardClick = () => {
    const userRole = Cookies.get("role");
    router.push(`/dashboard?role=${userRole}`);
  };
  console.log(imageURL);
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <div className={styles.logoContainer}>
          <img
            src="/content/logo/lotus.png"
            alt="Logo"
            className={styles.logo}
          />
          <span className={styles.siteName}>
            <span className={styles.soul}>Soul</span>
            <span className={styles.care}>Care</span>
          </span>
        </div>
      </div>

      {/* Center: Navigation links */}
      <nav className={styles.navLinks}>
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? styles.active : ""}>
            <FontAwesomeIcon icon={faHome} className={styles.navIcon} />
            Trang chủ
          </a>
        </Link>
        <Link href="/explore" legacyBehavior>
          <a className={router.pathname === "/explore" ? styles.active : ""}>
            <FontAwesomeIcon icon={faCompass} className={styles.navIcon} />
            Khám phá
          </a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={router.pathname === "/about" ? styles.active : ""}>
            <FontAwesomeIcon icon={faInfoCircle} className={styles.navIcon} />
            Về chúng tôi
          </a>
        </Link>
        <Link href="/harmony-zone" legacyBehavior>
          <a
            className={router.pathname === "/harmony-zone" ? styles.active : ""}
          >
            <FontAwesomeIcon icon={faSpa} className={styles.navIcon} />
            Harmony Zone
          </a>
        </Link>
      </nav>

      {/* Right: Search and login button */}
      <div className={styles.rightContainer}>
        <div
          className={styles.searchContainer}
          ref={searchRef}
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
        >
          <motion.div
            className={styles.searchButtonWrapper}
            initial={{ width: "40px" }}
            animate={{
              width:
                isSearchActive || isSearchHovered || isSearchFocused
                  ? "300px"
                  : "42px", 
            }}
            transition={{ duration: 0.3 }}
          >
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <button
                className={styles.searchButton}
                type="button"
                onClick={() => setIsSearchActive(true)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>

              {(isSearchActive || isSearchHovered || isSearchFocused) && (
                <motion.input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className={styles.searchInput}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)} // NEW: Set focus state
                  onBlur={() => setIsSearchFocused(false)} // NEW: Reset focus state
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </form>
          </motion.div>
        </div>

        {username ? (
          <div className={styles.userInfo}>
            <Link href="/dashboard" legacyBehavior>
              <a
                className={
                  router.pathname === "/dashboard" ? styles.active : ""
                }
                style={{ textDecoration: "none" }}
              >
                <span
                  className={styles.welcomeMessage}
                  onClick={handleDashboardClick}
                >
                  <span
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {isHovered ? (
                      <NotificationsActiveRoundedIcon
                        style={{
                          color: " #3474ff",
                          marginRight: "10px",
                          marginBottom: 5,
                        }}
                      />
                    ) : (
                      <NotificationsRoundedIcon
                        style={{
                          color: " #3474ff",
                          marginRight: "10px",
                          marginBottom: 5,
                        }}
                      />
                    )}
                  </span>
                  Xin chào, {username}
                </span>
              </a>
            </Link>
            <div className={styles.logoutIconWrapper}>
              <img
                src="content/logo/user-logout.png"
                alt="Logout"
                className={styles.logoutIcon}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <img
                      src={imageURL || "../content/panel/noAvatar.png"}
                      alt="Avatar"
                      className={styles.avatar}
                    />
                    <div className={styles.userInfoContainer}>
                      <span className={styles.userName}>{username}</span>
                      <span className={styles.userEmail}>{email}</span>
                    </div>
                  </div>
                  <div className={styles.dropdownOptions}>
                    <button onClick={() => router.push("/profile")}>
                      <FontAwesomeIcon
                        icon={faCog}
                        className={styles.optionIcon}
                      />
                      Quản lý hồ sơ
                    </button>
                    <button onClick={handleLogoutClick}>
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className={styles.optionIcon}
                      />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button className={styles.loginButton} onClick={handleLoginClick}>
            Đăng Nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
