import React, { ReactNode } from 'react';
import Header from './header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const headerHeight = 80; // Adjust this value to match the height of your header

  return (
    <div>
      <Header />
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          padding-top: ${headerHeight}px; /* Ensure content is below the fixed header */
          font-family: 'Inika', serif;
        }
      `}</style>
    </div>
  );
};

export default Layout;
