const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We are a company dedicated to providing the best services. Our goal
            is to ensure customer satisfaction with top-notch quality.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="/harmony-zone">Harmorny Zone</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Phone: +123 456 7890</p>
          <p>Email: info@soulcare.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 SoulCare | All Rights Reserved
      </div>

      <style jsx>{`
        .footer {
          background-color: black;
          color: #fff;
          padding: 20px 0;
          font-family: Georgia, "Times New Roman", Times, serif;
          position: relative;
          z-index: 2;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .footer-section {
          flex: 1;
          margin-right: 16px;
        }

        .footer-section h3 {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .footer-section p {
          font-size: 14px;
          line-height: 1.5;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 10px;
        }

        .footer-section ul li a {
          color: #fff;
          text-decoration: none;
        }

        .footer-section ul li a:hover {
          text-decoration: underline;
        }

        .footer-bottom {
          text-align: center;
          padding: 10px;
          border-top: 1px solid #666;
          font-size: 14px;
        }

        .footer-bottom p {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Footer;
