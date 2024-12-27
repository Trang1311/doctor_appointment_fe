import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faInfoCircle,
  faSpa,
  faPhone,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
              <a href="#">
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ marginRight: "10px" }}
                />
                Home
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faCompass}
                  style={{ marginRight: "10px" }}
                />
                Explore
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ marginRight: "10px" }}
                />
                About Us
              </a>
            </li>
            <li>
              <Link href="/harmony-zone" legacyBehavior passHref>
                <a style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faSpa}
                    style={{ marginRight: "10px" }}
                  />
                  Harmony Zone
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "10px" }} />
            Phone: +123 456 7890
          </p>
          <p>
            <FontAwesomeIcon
              icon={faMailBulk}
              style={{ marginRight: "10px" }}
            />
            Email: info@soulcare.com
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 SoulCare | All Rights Reserved
      </div>

      <style jsx>{`
        .footer {
          background-color: black;
          color: #fff;
          font-family: Roboto, serif;
          position: relative;
          z-index: 2;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin-left: 230px;
          padding: 10px;
        }
        .footer-section {
          flex: 1;
          margin-right: 16px;
        }

        .footer-section h3 {
          font-size: 14px;
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
          font-size: 14px;
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
