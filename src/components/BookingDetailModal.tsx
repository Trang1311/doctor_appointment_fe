import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Appointment {
  _id: string;
  userid: string;
  doctorid: string;
  username: string;
  doctorname: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  appointmentType: string;
  status: string;
}
interface BookingDetailModalProps {
  _id: string;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  _id,
  onClose,
}) => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [topicName, setTopicName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userRole = Cookies.get("role");
  const translateStatus = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      Pending: "Đang chờ xác nhận",
      Confirmed: "Đã xác nhận",
      Canceled: "Đã hủy",
      Completed: "Đã hoàn thành",
    };
    return statusMap[status] || status;
  };
  const translateAppointmentType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      "In-Person": "Gặp mặt trực tiếp",
      "Video Call": "Tư vấn qua video",
    };
    return typeMap[type] || type;
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/appointments/${_id}`
        );
        console.log("Fetched appointment:", response.data);
        setAppointment(response.data[0]);
        const topicResponse = await axios.get(
          `http://localhost:3000/topics/${response.data[0].topic}`
        );
        console.log("Fetched topic:", topicResponse.data);
        setTopicName(topicResponse.data.name);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      }
    };

    fetchAppointment();
  }, [_id]);

  const handleCancelAppointment = async () => {
    if (!appointment) return;

    try {
      setIsLoading(true);
      await axios.patch(
        `http://localhost:3000/appointments/${appointment._id}/confirm`,
        { status: "Canceled" }
      );
      setAppointment({ ...appointment, status: "Canceled" });
      alert("Lịch hẹn đã được hủy");
    } catch (error) {
      console.error("Error canceling appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAppointment = async () => {
    if (!appointment) return;

    try {
      setIsLoading(true);
      await axios.patch(
        `http://localhost:3000/appointments/${appointment._id}/confirm`,
        { status: "Confirmed" }
      );

      setAppointment({ ...appointment, status: "Confirmed" });
      alert("Lịch hẹn đã được xác nhận");
    } catch (error) {
      console.error("Error confirming appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteAppointment = async () => {
    if (!appointment) return;

    try {
      setIsLoading(true);
      await axios.patch(
        `http://localhost:3000/appointments/${appointment._id}/confirm`,
        { status: "Completed" }
      );
      setAppointment({ ...appointment, status: "Completed" });
      alert("Lịch hẹn đã hoàn thành");
    } catch (error) {
      console.error("Error completing appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isPastAppointment = () => {
    if (!appointment) return false;

    const appointmentEnd = new Date(appointment.date);
    const [endHour, endMinute] = (appointment.endTime || "00:00")
      .split(":")
      .map(Number);

    appointmentEnd.setHours(endHour, endMinute);

    return new Date() > appointmentEnd;
  };

  if (!appointment || !topicName) {
    return <div>Loading appointment details...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-120 max-w-full shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Thông tin chi tiết Cuộc hẹn
        </h3>
        <p>
          <strong>Tên người dùng:</strong> {appointment.username}
        </p>
        <p>
          <strong>Tên bác sĩ:</strong> {appointment.doctorname}
        </p>
        <p>
          <strong>Chủ đề:</strong> {topicName}
        </p>
        <p>
          <strong>Ngày hẹn:</strong>{" "}
          {new Date(appointment.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Thời gian :</strong> {appointment.startTime} -{" "}
          {appointment.endTime}
        </p>
        <p>
          <strong>Loại cuộc hẹn:</strong>{" "}
          {translateAppointmentType(appointment.appointmentType)}{" "}
          {/* Translated Type */}
        </p>
        <p>
          <strong>Trạng thái:</strong> {translateStatus(appointment.status)}{" "}
          {/* Translated Status */}
        </p>

        <div className="mt-4 flex gap-2">
          {userRole === "guest" && (
            <button
              onClick={handleCancelAppointment}
              disabled={appointment.status !== "Pending" || isLoading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              Hủy lịch hẹn
            </button>
          )}
          {userRole === "doctor" && (
            <>
              <button
                onClick={handleConfirmAppointment}
                disabled={appointment.status !== "Pending" || isLoading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Xác nhận lịch hẹn
              </button>
              <button
                onClick={handleCancelAppointment}
                disabled={appointment.status === "Canceled" || isLoading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
              >
                Hủy lịch hẹn
              </button>
              <button
                onClick={handleCompleteAppointment}
                disabled={
                  !isPastAppointment() ||
                  appointment.status !== "Confirmed" ||
                  isLoading
                }
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Cuộc hẹn hoàn thành
              </button>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default BookingDetailModal;
