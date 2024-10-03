import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import styles from "../styles/appointments.module.css";
import Layout from "@/components/layout";
import DashboardData from "@/components/dashboard_data";

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
      const appointmentDate = new Date(appt.date); // Convert to Date object
      const appointmentStartHour = parseInt(appt.startTime.split(":")[0], 10);
      const appointmentEndHour = parseInt(appt.endTime.split(":")[0], 10);

      return (
        isSameDay(appointmentDate, time) && // Check if same day
        hour >= appointmentStartHour && // Check if time slot is within appointment start time
        hour < appointmentEndHour // Check if time slot is within appointment end time
      );
    });

    return (
      <div
        className={`${styles.timeSlot} ${
          appointment ? styles.hasAppointment : ""
        }`}
        onClick={() =>
          appointment &&
          (window.location.href = `/appointments/${appointment._id}`)
        }
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
  const renderWeekView = () => {
    const weekStart = new Date(currentWeekStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);

    return (
      <div className={styles.weekView}>
        <div className={styles.header}>
          <div className={styles.timeHeader}>
            <div className={styles.dateText}>Date</div>
            <div className={styles.timeText}>Time</div>
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
          onClick={() =>
            setCurrentWeekStart(
              new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7))
            )
          }
        >
          Previous Week
        </button>
        <span>
          {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
        </span>
        <button
          onClick={() =>
            setCurrentWeekStart(
              new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7))
            )
          }
        >
          Next Week
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
          Previous Month
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
          Next Month
        </button>
      </div>
    );
  };

  const renderMonthView = () => {
    return <div>Month view is under construction.</div>;
  };

  return (
    <Layout>
      <DashboardData />
      <div className={styles.mainContainer}>
        <div className={styles.buttonContainer}>
          <button onClick={() => setView("week")}>Week View</button>
          <button onClick={() => setView("month")}>Month View</button>
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
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
