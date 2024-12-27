// components/IncomingCallModal.tsx
import React from 'react';

interface IncomingCallModalProps {
  onAccept: () => void;
  onDecline: () => void;
  callerId: string;
}

const IncomingCallModal: React.FC<IncomingCallModalProps> = ({ onAccept, onDecline, callerId }) => {
  return (
      <div className="modal">
          <div className="modal-content">
              <h2>Cuộc gọi video từ {callerId}</h2>
              <button onClick={onAccept}>Chấp nhận</button>
              <button onClick={onDecline}>Từ chối</button>
          </div>
      </div>
  );
};

export default IncomingCallModal;