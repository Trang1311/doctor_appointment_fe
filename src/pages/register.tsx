import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Registration.module.css";

interface Topic {
  _id: string;
  name: string;
}

export default function Registration() {
  const [role, setRole] = useState<string>("user");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    specialization: "",
    experience: "",
    qualifications: "",
    clinicAddress: "",
    lifeMotto: "",
    topics: [],
  });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/topics");
        setTopics(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chủ đề:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "topics") {
      const value = e.target.value;
      setSelectedTopics((prev: string[]) =>
        prev.includes(value)
          ? prev.filter((topic) => topic !== value)
          : [...prev, value]
      );
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    const data = {
      ...formData,
      experience: Number(formData.experience) || 0,
      topic: selectedTopics,
    };

    try {
      if (role === "user") {
        await axios.post("http://localhost:3000/users/create", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
        });
      } else {
        await axios.post("http://localhost:3000/doctors", data);
      }
      alert("Đăng ký thành công!");
      router.push("/login");
    } catch (error) {
      console.error("Đăng ký không thành công:", error);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="\content\panel\BG.mp4" type="video/mp4" />
      </video>

      <div className="flex flex-col items-center py-10 relative z-10">
        <div className="w-full max-w-4xl bg-white bg-opacity-80 p-5 rounded-lg shadow-md">
          <h1 className="text-3xl text-blue-800 font-bold text-center mb-5">
            ĐĂNG KÝ NGAY
          </h1>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 w-1/2 text-center rounded-t-lg ${
                role === "user" ? "bg-blue-800 text-white" : "bg-gray-200"
              }`}
              onClick={() => setRole("user")}
            >
              Người dùng
            </button>
            <button
              className={`px-4 py-2 w-1/2 text-center rounded-t-lg ${
                role === "doctor" ? "bg-blue-800 text-white" : "bg-gray-200"
              }`}
              onClick={() => setRole("doctor")}
            >
              Bác sĩ
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields for User and Doctor */}
            <div>
              <label className="block font-semibold">Tên đăng nhập</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Nhập lại mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Giới tính</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {role === "doctor" && (
              <div className="grid grid-cols-2 gap-4">
                {/* Doctor Specific Fields */}
                <div className="col-span-2">
                  <label className="block font-semibold">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold">Chuyên khoa</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Kinh nghiệm (năm)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Chứng chỉ</label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Địa chỉ phòng khám
                  </label>
                  <input
                    type="text"
                    name="clinicAddress"
                    value={formData.clinicAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Châm ngôn sống</label>
                  <input
                    type="text"
                    name="lifeMotto"
                    value={formData.lifeMotto}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold">Chủ đề</label>
                  {topics.map((topic) => (
                    <div key={topic._id} className="flex items-center">
                      <input
                        type="checkbox"
                        name="topics"
                        value={topic._id}
                        checked={selectedTopics.includes(topic._id)}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span>{topic.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full text-xl bg-blue-800 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
              style={{ fontWeight: 700 }}
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
