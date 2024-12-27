"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/layout_nofooter";
import Cookies from "js-cookie";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import Notification from "../components/ui/Notification";
import Menu from "@/components/menu";

interface AvailableSlot {
  _id: string;
  startTime: string;
  endTime: string;
  date: string;
}

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  qualifications: string;
  dailySlots: AvailableSlot[];
  topic: string[];
  clinicAddress: string;
  phoneNumber: string;
  email: string;
  lifeMotto: string;
  imageURL: string;
}

const Booking = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("Video Call");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<
    "loading" | "success" | "error" | null
  >(null);
  const router = useRouter();
  const { doctorId } = router.query;

  useEffect(() => {
    if (doctorId) {
      const fetchDoctor = async () => {
        try {
          setLoading(true);
          const token = Cookies.get("token");

          const doctorResponse = await axios.get<Doctor>(
            `http://localhost:3000/doctors/${doctorId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDoctor(doctorResponse.data);
          setSlots(doctorResponse.data.dailySlots);
        } catch (error) {
          console.error("Error fetching doctor or slots:", error);
          setError("Failed to load details.");
        } finally {
          setLoading(false);
        }
      };

      fetchDoctor();
    }
  }, [doctorId]);

  const filteredSlots = slots.filter((slot) => {
    const slotDate = new Date(slot.date).toISOString().split("T")[0];
    return slotDate === selectedDate;
  });

  const handleBookAppointment = async () => {
    try {
      setNotificationType("loading");
      setNotification(
        "Vui lòng không thoát khỏi trang. Yêu cầu của bạn đang được xử lý"
      );

      const token = Cookies.get("token");
      const selectedSlotDetails = slots.find(
        (slot) => slot.startTime === selectedSlot
      );

      if (!selectedSlotDetails) {
        throw new Error("Selected slot details not found.");
      }

      await axios.post(
        "http://localhost:3000/appointments",
        {
          userid: Cookies.get("userId"),
          doctorname: doctor?.name,
          doctorid: doctor?._id,
          username: Cookies.get("username"),
          topic: doctor?.topic?.[0],
          date: selectedDate,
          startTime: selectedSlotDetails.startTime,
          endTime: selectedSlotDetails.endTime,
          appointmentType: appointmentType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotificationType("success");
      setNotification(
        "Cảm ơn vì đã đặt lịch trên trang web của chúng tôi. Vui lòng kiểm tra thông báo chi tiết trong mail!"
      );
      setTimeout(() => {}, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setNotificationType("error");
      setNotification(
        "Thời gian đặt lịch không khả dụng. Vui lòng chọn khung giờ khác."
      );
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setSelectedSlot("");
    }
  }, [selectedDate]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message={error} onClose={() => setError(null)} />;

  return (
    <div
      style={{
        padding: "0px 3%",
        fontFamily: '"Roboto", serif',
        fontSize: "16px",
        //backgroundColor: "#000",
        backgroundSize: "cover",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {notification && notificationType && (
        <Notification
          message={notification}
          type={notificationType}
          onClose={() => setNotification(null)}
        />
      )}
      {doctor && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            maxWidth: "1000px",
            margin: "0 auto",
            gap: "8px",
            overflowY: "auto",
          }}
        >
          <div
            className="left-column"
            style={{
              flex: "1",
              fontSize: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                height: "89%",
                padding: "20px",
                borderRadius: "15px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                overflowY: "auto",
              }}
            >
              <img
                src={doctor.imageURL || `/content/logo/doctor.png`}
                alt={doctor.name}
                style={{
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#404178",
                  }}
                >
                  Dr. {doctor.name}
                </h2>
                <p>
                  <strong>Chuyên ngành:</strong> {doctor.specialization}
                </p>
                <p>
                  <strong>Kinh nghiệm:</strong> {doctor.experience} năm
                </p>
                <p>
                  <strong>Địa chỉ phòng khám:</strong> {doctor.clinicAddress}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {doctor.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p>
                  <strong>Châm ngôn sống:</strong> {doctor.lifeMotto}
                </p>
              </div>
            </div>
          </div>
          <div
            className="right-column"
            style={{
              flex: "1",
              fontSize: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="card booking-form"
              style={{
                padding: "20px",
                borderRadius: "15px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#404178",
                  marginBottom: "20px",
                }}
              >
                Đặt Lịch
              </h2>

              <label htmlFor="date" style={{ fontWeight: "600" }}>
                Chọn ngày:
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "20px",
                  width: "100%",
                }}
              />

              <label htmlFor="slot" style={{ fontWeight: "600" }}>
                Chọn khung giờ:
              </label>
              <select
                id="slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "20px",
                  width: "100%",
                  backgroundColor: "#fff",
                }}
              >
                <option value="">Chọn khung giờ</option>
                {filteredSlots.length === 0 && selectedDate && (
                  <option value="">Không còn chỗ trống cho ngày này</option>
                )}
                {filteredSlots.map((slot) => (
                  <option key={slot._id} value={slot.startTime}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </select>

              <label htmlFor="appointmentType" style={{ fontWeight: "600" }}>
                Loại cuộc hẹn:
              </label>
              <select
                id="appointmentType"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "20px",
                  width: "100%",
                  backgroundColor: "#fff",
                }}
              >
                <option value="In-Person">Gặp mặt trực tiếp</option>
                <option value="Video Call">Cuộc gọi Video</option>
              </select>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded bg-[#004574] px-6 py-2 text-white"
                  onClick={handleBookAppointment}
                  style={{
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#004574",
                    color: "#fff",
                    padding: "12px 20px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Đặt Lịch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
