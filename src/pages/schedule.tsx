import { useEffect, useState } from "react";
import api from "@/utils/api";
import Cookies from "js-cookie";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Layout from "@/components/layout_nofooter";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";

interface Slot {
  startTime: string;
  endTime: string;
}

interface DailySlot {
  date: string;
  slots: Slot[];
}

const Schedule = () => {
  const userId = Cookies.get("userId");
  const [dailySlots, setDailySlots] = useState<DailySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [experience, setExperience] = useState(5);

  useEffect(() => {
    const fetchSlots = async () => {
      const response = await api.get(`http://localhost:3000/doctors/${userId}`);
      const slots: DailySlot[] = response.data.dailySlots.map((slot: any) => ({
        date: new Date(slot.date).toISOString().split("T")[0],
        slots: [
          {
            startTime: slot.startTime,
            endTime: slot.endTime,
          },
        ],
      }));

      const groupedSlots: { [key: string]: Slot[] } = {};
      slots.forEach((slot) => {
        if (!groupedSlots[slot.date]) {
          groupedSlots[slot.date] = [];
        }
        groupedSlots[slot.date] = [...groupedSlots[slot.date], ...slot.slots];
      });

      const dailySlotsArray = Object.keys(groupedSlots).map((date) => ({
        date,
        slots: groupedSlots[date],
      }));

      setDailySlots(dailySlotsArray);
    };

    fetchSlots();
  }, [userId]);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
  };

  const dayCellDidMount = (info: any) => {
    if (info.dateStr === selectedDate) {
      info.el.style.backgroundColor = "rgba(0, 32, 213, 0.76)";
      info.el.style.border = "2px solid rgba(0, 32, 213, 0.76)";
      info.el.style.fontWeight = "bold";
      info.el.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    } else {
      info.el.style.backgroundColor = "";
      info.el.style.border = "";
      info.el.style.boxShadow = "";
    }
    info.el.addEventListener("mouseenter", () => {
      if (info.dateStr !== selectedDate) {
        info.el.style.backgroundColor = "#e0e0e0";
      }
    });

    info.el.addEventListener("mouseleave", () => {
      if (info.dateStr !== selectedDate) {
        info.el.style.backgroundColor = "";
      }
    });
  };

  const isOverlapping = (
    newStart: string,
    newEnd: string,
    existingSlots: Slot[]
  ) => {
    const newStartTime = new Date(`1970-01-01T${newStart}:00`).getTime();
    const newEndTime = new Date(`1970-01-01T${newEnd}:00`).getTime();

    return existingSlots.some(({ startTime, endTime }) => {
      const existingStartTime = new Date(
        `1970-01-01T${startTime}:00`
      ).getTime();
      const existingEndTime = new Date(`1970-01-01T${endTime}:00`).getTime();
      return (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
        (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
      );
    });
  };

  const handleAddSlot = () => {
    if (!selectedDate || !startTime || !endTime) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (startTime >= endTime) {
      setErrorMessage("Thời gian kết thúc phải sau thời gian bắt đầu.");
      return;
    }

    const existingDate = dailySlots.find((slot) => slot.date === selectedDate);
    if (existingDate && isOverlapping(startTime, endTime, existingDate.slots)) {
      setErrorMessage(
        "Khung giờ bị trùng lặp với lịch đã đăng ký. Vui lòng chọn lại."
      );
      return;
    }

    const newSlot: DailySlot = {
      date: selectedDate,
      slots: [
        {
          startTime,
          endTime,
        },
      ],
    };

    setDailySlots((prev) => {
      if (existingDate) {
        return prev.map((slot) =>
          slot.date === selectedDate
            ? {
                ...slot,
                slots: [...slot.slots, { startTime, endTime }],
              }
            : slot
        );
      }
      return [...prev, newSlot];
    });

    setStartTime("");
    setEndTime("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    try {
      await api.patch(`http://localhost:3000/doctors/${userId}`, {
        dailySlots,
        experience,
      });
      alert("Lịch biểu đã được cập nhật thành công!");
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra trong quá trình cập nhật lịch biểu.");
      console.error("Error updating schedule:", error);
    }
  };

  const renderEventContent = (eventInfo: any) => {
    const iconStyle = {
      fontSize: selectedDate === eventInfo.event.startStr ? 55 : 34,
    };

    return (
      <div className="text-center">
        {eventInfo.event.title === "Đã đăng ký" ? (
          <EventAvailableIcon style={{ color: "green", ...iconStyle }} />
        ) : (
          <CalendarTodayIcon style={{ color: "#a5a4a4", ...iconStyle }} />
        )}
      </div>
    );
  };

  const events = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const hasEvent = dailySlots.some((slot) => slot.date === dateStr);
    events.push({
      title: hasEvent ? "Đã đăng ký" : "Chưa có lịch",
      date: dateStr,
      color: "transparent",
    });
  }

  const currentMonthSlots = dailySlots.filter((slot) => {
    const slotDate = new Date(slot.date);
    return (
      slotDate.getMonth() === currentMonth &&
      slotDate.getFullYear() === currentYear
    );
  });

  return (
    <Layout>
      <div
        className="flex justify-between w-full mx-auto p-6 bg-white shadow-md rounded-lg"
        style={{ marginTop: 55 }}
      >
        {/* Card cho lịch */}
        <div className="w-full pr-4" style={{ height: "100%" }}>
          <h1
            className="text-4xl font-bold text-center text-gray-800 mb-6"
            style={{ color: "#3474FF" }}
          >
            Lịch
          </h1>
          <div className="calendar-container" style={{ height: "100%" }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              dayCellDidMount={dayCellDidMount}
              eventContent={renderEventContent}
              eventClassNames={(arg) =>
                arg.event.startStr === selectedDate ? "selected-date" : ""
              }
              locale="vi"
              buttonText={{
                today: "Hôm nay",
              }}
            />
          </div>
        </div>
        {/* Card cho chọn thời gian */}
        <div className="w-full pl-4">
          <h1
            className="text-4xl font-bold text-center text-gray-800 mb-6"
            style={{ color: "#3474FF" }}
          >
            Chọn Thời Gian
          </h1>

          {selectedDate && (
            <div className="mt-6">
              <div className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                Ngày đã chọn:
                <div
                  className="text-xl font-medium text-gray-700 ml-2"
                  style={{ fontWeight: 700 }}
                >
                  {selectedDate}
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-lg font-medium text-gray-700">
                  Chọn thời gian bắt đầu:
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-lg font-medium text-gray-700">
                  Chọn thời gian kết thúc:
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAddSlot}
                  className="bg-blue-600 text-lg text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
                  style={{ backgroundColor: "#1e40af" }}
                >
                  Thêm Khung Giờ
                </button>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-center mt-4">
                  {errorMessage}
                </div>
              )}
            </div>
          )}

          <div
            className="mt-6"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Khung Giờ Đã Thêm Trong Tháng Này:
            </h2>
            <ul className="list-disc pl-5 mt-3">
              {currentMonthSlots.length > 0 ? (
                [...currentMonthSlots].reverse().map(
                  (
                    slot // Đảo ngược thứ tự mảng
                  ) => (
                    <li key={slot.date} className="text-gray-700">
                      <div className="text-lg font-medium">{slot.date}:</div>
                      <div className="pl-4">
                        {slot.slots.map((s, index) => (
                          <span
                            key={index}
                            className="inline-block text-gray-600"
                          >
                            {s.startTime} - {s.endTime}
                            {index < slot.slots.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </li>
                  )
                )
              ) : (
                <li className="text-gray-600">
                  Chưa có khung giờ nào được thêm.
                </li>
              )}
            </ul>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-xl text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
            >
              <ScheduleSendIcon style={{ marginRight: 10, fontSize: 28 }} />
              Gửi Lịch Biểu
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
