import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <style jsx>{`
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .loading-spinner::after {
        content: "";
        width: 50px;
        height: 50px;
        border: 5px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 5px solid #3498db;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default LoadingSpinner;
