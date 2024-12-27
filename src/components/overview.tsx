"use client";
import React from "react";
import Eight from "./animata/container/featureDashboard";

const OverviewPage: React.FC = () => {
  return (
    <div className="overview-container">
      {/* Phần 1: Giới thiệu */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src="/content/panel/about2.jpg" alt="About Us" />
          </div>
          <div className="about-text">
            <h2>Về chúng tôi</h2>
            <p>
              SoulCare là nền tảng chăm sóc sức khỏe tinh thần tiên phong, được
              xây dựng bởi đội ngũ chuyên gia tận tâm trong lĩnh vực tâm lý và
              công nghệ. Chúng tôi không chỉ mang đến những giải pháp hỗ trợ cá
              nhân hóa mà còn tạo ra một không gian an toàn, nơi bạn có thể chia
              sẻ, lắng nghe, và tìm thấy sự đồng cảm. Với SoulCare, sức khỏe
              tinh thần của bạn luôn là ưu tiên hàng đầu.
            </p>
          </div>
        </div>
      </section>

      {/* Phần 2: Thống kê nổi bật */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="highlight">100K+</span>
            <span className="description">Người dùng toàn cầu</span>
          </div>
          <div className="stat-item">
            <span className="highlight">30%</span>
            <span className="description">Tỷ lệ tiết kiệm tối đa</span>
          </div>
          <div className="stat-item">
            <span className="highlight">$100M</span>
            <span className="description">Vốn huy động</span>
          </div>
          <div className="stat-item">
            <span className="highlight">60+</span>
            <span className="description">Bác sĩ</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        .overview-container {
          background-color: #f0f0f0;
          font-family: Roboto, sans-serif;
          padding: 0px 20px;
        }

        /* Phần 2 */
        .stats-section {
          background-color: #fff;
          padding: 60px 200px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin: 20px auto; /* Đưa phần này vào giữa theo chiều ngang */
          border-radius: 8px;

          width: 100%; /* Đảm bảo khả năng responsive */
        }
        .stats-container {
          display: flex;
          justify-content: space-around;
          text-align: center;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .highlight {
          font-size: 54px;
          font-weight: bold;
          color: #000;
        }
        .description {
          font-size: 14px;
          color: #343a40;
          margin-top: -10px;
        }

        /* Phần 1 */
        .about-section {
          display: flex;
          background-color: #fff;
          border-radius: 8px;
          margin-bottom: 20px;
          overflow: hidden;
          padding: 0px 60px;
          margin: 20px auto; /* Đưa phần này vào giữa */
          max-width: 100%; /* Giới hạn chiều ngang */
          width: 100%; /* Đảm bảo khả năng responsive */
        }
        .about-container {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
        .about-image {
          flex: 1; /* Chiếm 50% chiều ngang */
          padding: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .about-image img {
          width: 100%; /* Chiếm toàn bộ chiều rộng của khung */
          height: auto;
          object-fit: cover;
          border-radius: 25px; /* Thêm bo góc nhẹ nếu cần */
        }
        .about-text {
          flex: 1;
          padding: 20px;
          margin-right: 20px;
          font-size: 24px;
          color: #343a40;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .about-text h2 {
          margin-bottom: 20px;
          font-size: 44px;
          font-weight: bold;
        }
        .about-text p {
          font-size: 22px;
          line-height: 1.5;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default OverviewPage;
