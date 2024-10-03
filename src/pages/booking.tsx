import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Cookies from "js-cookie";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import Notification from "../components/ui/Notification";

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
        "Please do not exit the page, your request is being processed."
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
        "Thank you for your appointment. Please check your email for confirmation."
      );
      setTimeout(() => {}, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setNotificationType("error");
      setNotification(
        "The selected time slot is not available. Please choose another time."
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
    <Layout>
      <div className="booking-container">
        {notification && notificationType && (
          <Notification
            message={notification}
            type={notificationType}
            onClose={() => setNotification(null)}
          />
        )}
        {doctor && (
          <div className="cards-container">
            <div className="card doctor-info">
              <img
                src={doctor.imageURL || `/content/logo/doctor.png`}
                alt={doctor.name}
                className="profile-img"
              />
              <div className="info">
                <h2>Dr. {doctor.name}</h2>
                <p>
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p>
                  <strong>Experience:</strong> {doctor.experience} years
                </p>
                <p>
                  <strong>Clinic Address:</strong> {doctor.clinicAddress}
                </p>
                <p>
                  <strong>Phone Number:</strong> {doctor.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p>
                  <strong>Life Motto:</strong> {doctor.lifeMotto}
                </p>
              </div>
            </div>
            <div className="card booking-form">
              <h2>Book Now</h2>
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <label htmlFor="slot">Select Time Slot:</label>
              <select
                id="slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">Select a time slot</option>
                {filteredSlots.length === 0 && selectedDate && (
                  <option value="">No available slots for this date</option>
                )}
                {filteredSlots.map((slot) => (
                  <option key={slot._id} value={slot.startTime}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </select>
              <label htmlFor="appointmentType">Appointment Type:</label>
              <select
                id="appointmentType"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <option value="In-Person">In-Person</option>
                <option value="Video Call">Video Call</option>
              </select>
              <div className="button-container">
                <button onClick={handleBookAppointment}>
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}
        <style jsx>{`
          .booking-container {
            padding: 100px;
            font-family: Georgia, "Times New Roman", Times, serif;
            font-size: 18px;
            background-color: #004574;
            background-size: cover;
            justify-content: center;
            margin-top: 30px;
            width: calc(100% - 150px);
          }

          .cards-container {
            display: flex;
            justify-content: space-between;
            max-width: 1000px;
            margin: 0 auto;
            gap: 20px;
            background-color: #004574;
          }

          .card {
            flex: 1;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 1);
            background-color: #ffff;
          }

          .doctor-info {
            display: flex;
            align-items: flex-start;
            font-size: 16px;
          }

          .profile-img {
            border-radius: 50%;
            width: 90px;
            height: 90px;
            margin-right: 20px;
            object-fit: cover;
          }

          .info {
            flex: 1;
          }

          .info h2 {
            color: #004574;
            font-size: 18px;
            margin-bottom: 10px;
          }

          .info p {
            margin: 5px 0;
            line-height: 1.4;
          }

          .booking-form {
            display: flex;
            flex-direction: column;
          }

          .booking-form h2 {
            color: #004574;
            font-size: 16px;
            margin-bottom: 10px;
          }

          .booking-form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }

          .booking-form select,
          .booking-form input {
            display: block;
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            font-size: 14px;
            box-sizing: border-box;
            font-family: Georgia, "Times New Roman", Times, serif;
          }

          .button-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }

          .booking-form button {
            padding: 10px 20px;
            background-color: #004574;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-family: Georgia, "Times New Roman", Times, serif;
          }

          .booking-form button:hover {
            background-color: #005bb5;
          }
          .card booking-form {
            font-size: 16px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Booking;
