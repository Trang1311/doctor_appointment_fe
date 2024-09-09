import React from "react";

interface WarningMessageProps {
  message: string;
}

const WarningMessage: React.FC<WarningMessageProps> = ({ message }) => (
  <div className="warning-message">
    <style jsx>{`
      .warning-message {
        padding: 10px;
        background-color: #fff3cd;
        color: #856404;
        border: 1px solid #ffeeba;
        border-radius: 4px;
        margin: 10px 0;
      }
    `}</style>
    <p>{message}</p>
  </div>
);

export default WarningMessage;
