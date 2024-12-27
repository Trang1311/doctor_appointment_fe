"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import styles from "../styles/appointments.module.css";
import Layout from "@/components/layout_nofooter";
import SideNav from "@/components/SideNav";
import BookingDetailModal from "@/components/BookingDetailModal";

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

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [view, setView] = useState<"week" | "month">("week");
  const userId = Cookies.get("userId");

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/appointments/user/${userId}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userId]);

  const renderTimeSlots = (date: Date, hour: number) => {
    const time = new Date(date);
    time.setHours(hour, 0, 0, 0);
    const isSameDay = (d1: Date, d2: Date) => {
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    };

    const appointment = appointments.find((appt) => {
      const appointmentDate = new Date(appt.date);
      const appointmentStartHour = parseInt(appt.startTime.split(":")[0], 10);
      const appointmentEndHour = parseInt(appt.endTime.split(":")[0], 10);

      return (
        isSameDay(appointmentDate, time) &&
        hour >= appointmentStartHour &&
        hour < appointmentEndHour
      );
    });

    return (
      <div
        className={`${styles.timeSlot} ${
          appointment ? styles.hasAppointment : ""
        }`}
        onClick={() => {
          if (appointment) {
            setSelectedAppointmentId(appointment._id);
            setIsModalOpen(true);
          }
        }}
      >
        {appointment ? (
          <Tooltip title={`Có cuộc hẹn với ${appointment.doctorname}`} arrow>
            <div>✅</div>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </div>
    );
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointmentId(null);
  };
  const renderWeekView = () => {
    const weekStart = new Date(currentWeekStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);

    return (
      <div className={styles.weekView}>
        <div className={styles.header}>
          <div className={styles.timeHeader}>
            <div className={styles.dateText}>Ngày</div>
            <div className={styles.timeText}>Giờ</div>
          </div>
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            return (
              <div className={styles.dayHeader} key={i}>
                <div>{date.toLocaleDateString()}</div>
                <div>{date.toDateString().slice(0, 3)}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.slotsContainer}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div className={styles.row} key={i}>
              <div className={styles.timeLabel}>{7 + i}:00</div>
              {Array.from({ length: 7 }).map((_, j) => {
                const date = new Date(weekStart);
                date.setDate(weekStart.getDate() + j);
                return (
                  <div className={styles.timeSlotWrapper} key={j}>
                    {renderTimeSlots(date, 7 + i)}{" "}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekNavigation = () => {
    const weekStart = new Date(currentWeekStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return (
      <div className={styles.weekNavigation}>
        <button
          className="inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded border-0 bg-[#FCFCFD] px-4 font-mono leading-none text-slate-800 no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset]"
          onClick={() =>
            setCurrentWeekStart(
              new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7))
            )
          }
        >
          Tuần trước
        </button>
        <span>
          {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
        </span>
        <button
          className="inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded border-0 bg-[#FCFCFD] px-4 font-mono leading-none text-slate-800 no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset]"
          onClick={() =>
            setCurrentWeekStart(
              new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7))
            )
          }
        >
          Tuần sau
        </button>
      </div>
    );
  };

  const renderMonthNavigation = () => {
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    return (
      <div className={styles.monthNavigation}>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
            )
          }
        >
          Tháng trước
        </button>
        <span>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
            )
          }
        >
          Tháng sau
        </button>
      </div>
    );
  };

  const renderMonthView = () => {
    return <div>Month view is under construction.</div>;
  };

  return (
    <Layout>
      <div className={styles.mainContainer}>
        <div className={styles.buttonContainer}>
          <button
            className="inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded border-0 bg-[#FCFCFD] px-4 font-mono leading-none text-slate-800 no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset]"
            onClick={() => setView("week")}
          >
            Xem theo tuần
          </button>
          <button
            className="inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded border-0 bg-[#FCFCFD] px-4 font-mono leading-none text-slate-800 no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset]"
            onClick={() => setView("month")}
          >
            Xem theo tháng
          </button>
        </div>
        {view === "week" && (
          <>
            {renderWeekNavigation()} {renderWeekView()}
          </>
        )}
        {view === "month" && (
          <>
            {renderMonthNavigation()}
            {renderMonthView()}
          </>
        )}
        {/* Conditionally render the modal */}
        {isModalOpen && selectedAppointmentId && (
          <BookingDetailModal
            _id={selectedAppointmentId}
            onClose={closeModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
