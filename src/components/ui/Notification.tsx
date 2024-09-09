import React from "react";

interface NotificationProps {
  message: string;
  type: "loading" | "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => (
  <div className="notification-overlay">
    <div className={`notification-message ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
    <style jsx>{`
      .notification-overlay {
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

      .notification-message {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .notification-message.loading {
        border-left: 5px solid #007bff;
      }

      .notification-message.success {
        border-left: 5px solid #28a745;
      }

      .notification-message.error {
        border-left: 5px solid #dc3545;
      }

      .notification-message button {
        margin-top: 10px;
        padding: 10px 16px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
      }

      .notification-message button:hover {
        background-color: #0056b3;
      }
    `}</style>
  </div>
);

export default Notification;
