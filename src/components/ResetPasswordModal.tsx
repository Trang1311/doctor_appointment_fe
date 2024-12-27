import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<number | string>(""); // Thay đổi kiểu để có thể nhập số
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(300);

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    const savedUserId = Cookies.get("userId");
    if (savedEmail) setEmail(savedEmail);
    if (savedUserId) setUserId(savedUserId);
  }, []);

  useEffect(() => {
    if (verificationSent && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [verificationSent, timeLeft]);

  const handleRequestVerification = async (): Promise<void> => {
    if (!email) {
      alert("Vui lòng nhập email!");
      return;
    }

    try {
      if (!userId) {
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data as Array<{ _id: string; email: string }>;
        const user = users.find((user) => user.email === email);
        if (!user) {
          alert("Email không tồn tại!");
          return;
        }
        setUserId(user._id);
      }

      await axios.post(
        `http://localhost:3000/users/${userId}/request-password-reset`
      );
      setVerificationSent(true);
      setTimeLeft(300);
      alert("Mã xác thực đã được gửi!");
    } catch (error) {
      console.error(error);
      alert("Gửi mã xác thực thất bại!");
    }
  };

  const handleResetPassword = async (): Promise<void> => {
    if (!verificationCode || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      // Chuyển đổi verificationCode sang dạng số nếu cần
      const codeAsNumber = Number(verificationCode);
      await axios.post(`http://localhost:3000/users/${userId}/reset-password`, {
        code: codeAsNumber,
        newPassword: newPassword,
      });
      alert("Đổi mật khẩu thành công!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Đổi mật khẩu thất bại!");
    }
  };

  const formatTime = (): string => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Đặt lại Mật khẩu
        </h2>
        {!verificationSent ? (
          <div>
            <p className="mb-4 text-center text-gray-700">
              Bạn đang yêu cầu đổi mật khẩu/quên mật khẩu. Vui lòng nhập email
              của bạn để tiếp tục.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleRequestVerification}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Gửi mã xác thực
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-center text-gray-700">
              Vui lòng nhập mã xác thực và mật khẩu mới. Mã xác thực hết hạn sau{" "}
              {formatTime()}.
            </p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Nhập mã xác thực"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Đặt lại mật khẩu
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
