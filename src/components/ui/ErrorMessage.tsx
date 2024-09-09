import React from "react";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => (
  <div className="error-overlay">
    <div className="error-message">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
    <style jsx>{`
      .error-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .error-message {
        background: #f8d7da;
        color: #721c24;
        padding: 20px;
        border: 1px solid #f5c6cb;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .error-message button {
        margin-top: 10px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #721c24;
        color: #fff;
        cursor: pointer;
      }

      .error-message button:hover {
        background-color: #491217;
      }
    `}</style>
  </div>
);

export default ErrorMessage;
