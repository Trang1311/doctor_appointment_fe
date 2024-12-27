import React, { ReactNode } from "react";
import Header from "./headerscroll";
import Footer from "./footer";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

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
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: row;
          padding-top: 0px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
