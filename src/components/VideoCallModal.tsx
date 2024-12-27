import React from "react";

interface VideoCallModalProps {
  onClose: () => void;
  onStartCall: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
  onClose,
  onStartCall,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Bắt đầu Cuộc gọi Video
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onStartCall}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Bắt Đầu
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
