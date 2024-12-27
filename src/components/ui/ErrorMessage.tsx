import React from "react";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => (
  <div className="error-overlay">
    <div className="error-message">
      <p>{message}</p>
      <button
        className="inline-flex h-10 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded border-0 bg-[#004574] px-4 font-mono leading-none text-slate-800 no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset]"
        onClick={onClose}
      >
        Đóng
      </button>
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
