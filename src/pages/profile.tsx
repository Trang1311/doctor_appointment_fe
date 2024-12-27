"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Cookies from "js-cookie";
import Layout from "@/components/layout_nofooter";
import { FaPen } from "react-icons/fa";
import ResetPassword from "../components/ResetPasswordModal";
import ResetPasswordModal from "../components/ResetPasswordModal";
import LockResetIcon from "@mui/icons-material/LockReset";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  specialization?: string;
  experience?: number;
  qualifications?: string;
  clinicAddress?: string;
  dailySlots?: DailySlot[];
  imageURL?: string;
}

interface DailySlot {
  date: string;
  slots: { time: string }[];
}

const Profile: React.FC = () => {
  const userId = Cookies.get("userId");
  const [isHovered, setIsHovered] = useState(false);
  const username = Cookies.get("username");
  const role = Cookies.get("role");
  const [user, setUser] = useState<User | null>(null);
  const [originalUserData, setOriginalUserData] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<User, "_id" | "role">>({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    experience: undefined,
    qualifications: "",
    clinicAddress: "",
    dailySlots: [],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      const endpoint =
        role === "guest" ? `/users/${username}` : `/doctors/${userId}`;
      try {
        const response = await api.get(endpoint);
        setUser(response.data);
        setOriginalUserData(response.data);
        setFormData({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          specialization: response.data.specialization || "",
          experience: response.data.experience,
          qualifications: response.data.qualifications || "",
          clinicAddress: response.data.clinicAddress || "",
          dailySlots: response.data.dailySlots || [],
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [userId, role, username]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpdate = async () => {
    if (user) {
      const updateEndpoint =
        role === "guest" ? `/users/update/${user._id}` : `/doctors/${user._id}`;
      const method = role === "guest" ? "put" : "patch";

      setLoading(true);
      setSaving(true);
      setErrorMessage("");

      const formDataToUpdate = new FormData();
      if (selectedFile) {
        formDataToUpdate.append("image", selectedFile);
      }
      formDataToUpdate.append("name", formData.name);
      formDataToUpdate.append("username", formData.username);
      formDataToUpdate.append("email", formData.email);
      formDataToUpdate.append("phoneNumber", formData.phoneNumber);
      formDataToUpdate.append("specialization", formData.specialization || "");
      formDataToUpdate.append(
        "experience",
        formData.experience !== undefined && formData.experience !== null
          ? `${formData.experience}`
          : "0"
      );
      formDataToUpdate.append("qualifications", formData.qualifications || "");
      formDataToUpdate.append("clinicAddress", formData.clinicAddress || "");

      try {
        const response = await api[method](updateEndpoint, formDataToUpdate, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 20000,
        });
        setUser(response.data);
        setEditing(false);
        setSelectedFile(null);
      } catch (error) {
        setErrorMessage("Failed to update user. Please try again.");
        console.error("Failed to update user:", error);
      } finally {
        setLoading(false);
        setSaving(false);
      }
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedFile(null);
    setFormData({
      name: originalUserData?.name || "",
      username: originalUserData?.username || "",
      email: originalUserData?.email || "",
      phoneNumber: originalUserData?.phoneNumber || "",
      specialization: originalUserData?.specialization || "",
      experience: originalUserData?.experience,
      qualifications: originalUserData?.qualifications || "",
      clinicAddress: originalUserData?.clinicAddress || "",
      dailySlots: originalUserData?.dailySlots || [],
    });
  };
  const openResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  // Hàm để đóng modal
  const closeResetPasswordModal = () => {
    setShowResetPasswordModal(false);
  };
  if (!user) return <div>Loading...</div>;

  return (
    <Layout>
      <div
        className="relative min-h-screen"
        style={{
          backgroundImage:
            'url("/content/panel/7bb2a3886ee2eed843abf1b2fe05ca19.gif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="max-w-xl mx-auto bg-white bg-opacity-80 rounded-lg shadow-md p-6"
          style={{ marginTop: 85 }}
        >
          <div className="flex items-center mb-4">
            <div className="relative">
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : user.imageURL || "/content/logo/doctor.png"
                }
                alt="Profile Picture"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
              {editing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="absolute bottom-0 right-0 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <FaPen
                      className={`text-white bg-blue-600 rounded-full p-1 ${
                        isHovered ? "opacity-100" : "opacity-50"
                      }`}
                      style={{ fontSize: "16px" }}
                    />
                  </label>
                </>
              )}
            </div>
            <h1
              className="text-2xl mx-auto font-bold ml-4"
              style={{ marginLeft: 75 }}
            >
              Hồ sơ Người dùng
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {errorMessage && (
              <div className="text-red-500 col-span-2">{errorMessage}</div>
            )}
            <div>
              <label className="block text-sm font-medium">Họ tên:</label>
              {editing ? (
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Tên đăng nhập:
              </label>
              {editing ? (
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              ) : (
                <span>{user.username}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Email:</label>
              {editing ? (
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Số điện thoại:
              </label>
              {editing ? (
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              ) : (
                <span>{user.phoneNumber}</span>
              )}
            </div>
            {role === "doctor" && (
              <>
                <div>
                  <label className="block text-sm font-medium">
                    Chuyên môn:
                  </label>
                  {editing ? (
                    <input
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{user.specialization}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Kinh nghiệm:
                  </label>
                  {editing ? (
                    <input
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      type="number"
                      name="experience"
                      value={formData.experience || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{user.experience}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Bằng cấp:</label>
                  {editing ? (
                    <input
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      type="text"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{user.qualifications}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Địa chỉ phòng khám:
                  </label>
                  {editing ? (
                    <input
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      type="text"
                      name="clinicAddress"
                      value={formData.clinicAddress}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{user.clinicAddress}</span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="mt-6 flex space-x-4">
            {!editing ? (
              <button
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={handleEdit}
                style={{ backgroundColor: "#3474FF" }}
              >
                ✒️ Chỉnh Sửa
              </button>
            ) : (
              <>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  onClick={handleUpdate}
                  disabled={loading}
                  style={{ backgroundColor: "#3474FF" }}
                >
                  {loading ? "Loading..." : saving ? "Saving..." : "Lưu"}
                </button>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Hủy
                </button>
              </>
            )}
            {/* Dòng chữ Đổi Mật Khẩu */}
            <span
              className="cursor-pointer text-blue-600 hover:underline ml-auto"
              onClick={openResetPasswordModal}
              style={{ marginTop: 5, marginLeft: 260, fontSize: 16 }}
            >
              <LockResetIcon
                style={{
                  color: " #3474ff",
                  marginRight: "10px",
                  marginBottom: 5,
                }}
              />
              Đổi Mật Khẩu
            </span>
          </div>
          {/* Hiển thị ResetPasswordModal nếu cần */}
          {showResetPasswordModal && (
            <ResetPasswordModal
              isOpen={showResetPasswordModal}
              onClose={closeResetPasswordModal}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
