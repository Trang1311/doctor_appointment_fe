import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">{children}</div>
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
          padding-top: 40px;
        }
      `}</style>
    </div>
  );
};
export default Layout;
