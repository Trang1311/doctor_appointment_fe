"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/layout_nofooter";
import Menu from "../components/menu";
import { useAuth } from "../components/withAuth";
import Cookies from "js-cookie";
import styles from "../styles/listdoctor.module.css";
import BookingModal from "@/components/BookingModal";
import { FaFilter } from "react-icons/fa";
import debounce from "lodash.debounce";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  qualifications: string;
  dailySlots: string[];
  topic: string[];
  clinicAddress: string;
  phoneNumber: string;
  contactEmail: string;
  lifeMotto: string;
  imageURL: string;
}
interface ProvinceStats {
  provinces: { province: string; totalDoctors: number }[];
  experienceStats: { maxExperience: number; minExperience: number };
}

interface PaginateResponse {
  total: number;
  current: number;
  limit: number;
  totalPages: number;
  data: Doctor[];
}

const ListDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filter, setFilter] = useState({
    Search: "",
    minExperience: 0,
    maxExperience: 50,
    IsAsc: "asc",
    clinicAddress: [] as string[],
  });
  const [provinceStats, setProvinceStats] = useState<ProvinceStats | null>(
    null
  );
  const router = useRouter();
  const { topicId } = router.query;
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [clinicAddress, setclinicAddress] = useState<string[]>([]);

  const openModal = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctorId(null);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const clinicAddressParam = filter.clinicAddress.join(",");
      const response = await axios.get<PaginateResponse>(
        `http://localhost:3000/doctors/pag`,
        {
          params: {
            current: currentPage - 1,
            limit: 12,
            topicId: topicId || "",
            ...filter,
            clinicAddress: clinicAddressParam,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const doctorsData = response.data.data || [];
      setDoctors(doctorsData);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  };
  const fetchProvinceStats = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get<ProvinceStats>(
        `http://localhost:3000/doctors/province-stats`,
        {
          params: { topicId, ...filter },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProvinceStats(response.data);
    } catch (error) {
      console.error("Error fetching province stats:", error);
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (topicId) {
      fetchDoctors();
      fetchProvinceStats();
    }
  }, [topicId, currentPage, filter, isAuthenticated]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchDoctors();
    fetchProvinceStats();
    closeModal();
  };
  const handleClearFilters = () => {
    setFilter({
      Search: "",
      minExperience: 0,
      maxExperience: 50,
      IsAsc: "asc",
      clinicAddress: [],
    });
    setCurrentPage(1);
    fetchDoctors();
    fetchProvinceStats();
    closeModal2();
  };
  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(event.target.value);
    if (type === "min" && value <= filter.maxExperience) {
      setFilter((prev) => ({
        ...prev,
        minExperience: value,
      }));
    } else if (type === "max" && value >= filter.minExperience) {
      setFilter((prev) => ({
        ...prev,
        maxExperience: value,
      }));
    }
  };

  const getPaginationNumbers = () => {
    const numbers: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      numbers.push(1);
      if (currentPage > 3) numbers.push("...");
      for (
        let i = Math.max(currentPage - 1, 2);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        numbers.push(i);
      }
      if (currentPage < totalPages - 2) numbers.push("...");
      numbers.push(totalPages);
    }
    return numbers;
  };

  const handleProvinceSelection = (province: string) => {
    setFilter((prevFilter) => {
      const updatedClinicAddresses = prevFilter.clinicAddress.includes(province)
        ? prevFilter.clinicAddress.filter((address) => address !== province)
        : [...prevFilter.clinicAddress, province];

      return {
        ...prevFilter,
        clinicAddress: updatedClinicAddresses,
      };
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="relative flex flex-1 mt-9 bg-gray-200">
        {" "}
        {/* Đảm bảo rằng parent có position relative */}
        <button
          onClick={openModal2}
          className="absolute px-4 top-4 right-4 bg-blue-500 text-white font-semibold py-4 rounded-lg hover:bg-blue-600 transition"
        >
          <FaFilter className="mr-auto ml-auto" />
        </button>
        {/* Cột bên trái cho Menu */}
        <div className="w-1/4 ">
          <Menu />
        </div>
        {/* Phần hiển thị modal */}
        {isModalOpen2 && provinceStats && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3 max-h-[80vh] overflow-auto">
              <h3 className="text-xl font-semibold mb-4">
                Chọn tỉnh thành và Kinh nghiệm
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[40vh]">
                {provinceStats.provinces.map((province, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={province.province}
                      disabled={province.totalDoctors === 0}
                      checked={filter.clinicAddress.includes(province.province)} // Sửa ở đây
                      onChange={() =>
                        handleProvinceSelection(province.province)
                      }
                      className="mr-2 accent-blue-500"
                    />
                    <label
                      htmlFor={province.province}
                      className={
                        province.totalDoctors === 0 ? "text-gray-500" : ""
                      }
                    >
                      {province.province} ({province.totalDoctors} bác sĩ)
                      {filter.clinicAddress.includes(province.province) && (
                        <span className="ml-2 text-green-500">✓</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="mr-2">Kinh nghiệm:</label>
                <div className="flex items-center w-full">
                  Tối thiểu:
                  <input
                    type="range"
                    name="minExperience"
                    min={0}
                    max={50}
                    value={filter.minExperience}
                    onChange={(e) => handleExperienceChange(e, "min")}
                    className="w-full"
                  />
                  <span>{filter.minExperience} năm</span>
                </div>
                <div className="flex items-center w-full mt-2">
                  Tối đa:
                  <input
                    type="range"
                    name="maxExperience"
                    min={filter.minExperience}
                    max={50}
                    value={filter.maxExperience}
                    onChange={(e) => handleExperienceChange(e, "max")}
                    className="w-full"
                  />
                  <span>{filter.maxExperience} năm</span>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleClearFilters}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Xóa bộ lọc
                </button>
                <button
                  onClick={closeModal2}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="container mx-auto p-4">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {doctors.length === 0 && !error && (
            <p className="text-center text-gray-500">
              No doctors found for this topic.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 mr-20">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="flex items-center border rounded-lg p-4 shadow-lg bg-white"
              >
                {/* Avatar */}
                <img
                  src={doctor.imageURL || `/content/logo/doctor.png`}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover mr-4"
                />

                {/* Thông tin bác sĩ */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">
                    Chuyên gia: {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Kinh nghiệm: {doctor.experience} năm
                  </p>
                  {/* Nút Đặt lịch */}
                  <button
                    onClick={() => openModal(doctor._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Đặt Lịch Ngay!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
              className="pagination-button"
            >
              &laquo;
            </button>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="pagination-button"
            >
              &lt;
            </button>
            {getPaginationNumbers().map((number, index) =>
              number === "..." ? (
                <span key={index} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(Number(number))}
                  className={`px-3 py-2 rounded-md ${
                    number === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </button>
              )
            )}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="pagination-button"
            >
              &gt;
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
              className="pagination-button"
            >
              &raquo;
            </button>
          </div>

          {isModalOpen && selectedDoctorId && (
            <BookingModal
              isOpen={isModalOpen}
              closeModal={closeModal}
              doctorId={selectedDoctorId}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ListDoctor;
