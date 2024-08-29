import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Header: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    setUsername(storedUsername || null);
  }, []);

  const handleLoginClick = () => {
    router.push('/login'); 
  };

  const handleLogoutClick = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setUsername(null);
    router.push('/');
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
          <a className={router.pathname === '/' ? 'active' : ''}>Home</a>
        </Link>
        <Link href="/explore" legacyBehavior>
          <a className={router.pathname === '/explore' ? 'active' : ''}>Explore</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={router.pathname === '/about' ? 'active' : ''}>About Us</a>
        </Link>
        <Link href="/harmony-zone" legacyBehavior>
          <a className={router.pathname === '/harmony-zone' ? 'active' : ''}>
            <span className="harmony-zone">
              <span className="harmony">Harmony</span>
              <span className="zone">Zone</span>
            </span>
          </a>
        </Link>
      </nav>
      <div className="user-actions">
        {username ? (
          <div className="user-info">
            <span className="welcome-message">Hello, {username}</span>
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
          background-color: #D1E9FB;
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
          font-family: 'Inika', serif;
          font-size: 32px;
          display: inline-flex;
          align-items: center;
        }

        .soul {
          color: #2F80ED;
          font-weight: bold;
        }

        .care {
          color: #196C17;
          font-weight: bold;
        }

        .nav-links {
          display: flex;
          flex: 1;
          justify-content: center; 
        }

        .nav-links :global(a) {
          text-decoration: none;
          color: #808080;
          font-family: 'Inter', serif;
          font-size: 20px;
          padding: 15px 25px; 
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .nav-links :global(a.active), .nav-links :global(a:hover) {
          background-color: #8DBBFA;
          color: #fff;
        }

        .login-button {
          padding: 10px 20px;
          background-color: #8DBBFA;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inika', serif;
          font-size: 20px;
          transition: background-color 0.3s ease;
        }

        .login-button:hover {
          background-color: #2F80ED;
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
          font-family: 'Inter', serif;
          font-size: 20px;
          color: #808080 ;
          margin-right: 10px;
        }

        .logout-icon {
          height: 40px; 
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

        .harmony {
          color: #C82B2B;
          font-weight: bold;
          text-shadow: 3px 3px 9px rgba(0, 0, 0, 0.3);
        }

        .zone {
          color: #2F80ED;
          font-weight: bold;
          text-shadow: 3px 3px 9px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </header>
  );
};

export default Header;
