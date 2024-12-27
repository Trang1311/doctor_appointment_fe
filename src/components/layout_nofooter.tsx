import React, { ReactNode } from "react";
import Header from "./headernoscroll";
import Footer from "./footer";
import SideNav from "./SideNav"; // Import SideNav
import { AnimatePresence, motion } from "framer-motion";
import router from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="main-content"
        >
          <div className="content-container">
            <SideNav /> {/* Đặt SideNav ở bên trái */}
            <div className="main-content">{children}</div>
          </div>
        </motion.div>
      </AnimatePresence>
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
        .content-container {
          flex: 1;
          display: flex;
          flex-direction: row;
          margin-top: 40px;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Layout;
