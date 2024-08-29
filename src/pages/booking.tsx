import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Cookies from 'js-cookie';

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
  dailySlots: AvailableSlot[]; // Array of AvailableSlot objects
  topic: string[];
}

const Booking = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { doctorId } = router.query;

  useEffect(() => {
    if (doctorId) {
      const fetchDoctor = async () => {
        try {
          setLoading(true);
          const token = Cookies.get('token');

          // Fetch doctor details
          const doctorResponse = await axios.get<Doctor>(`http://localhost:3000/doctors/${doctorId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDoctor(doctorResponse.data);
          setSlots(doctorResponse.data.dailySlots); // Extract slots directly
        } catch (error) {
          console.error('Error fetching doctor or slots:', error);
          setError('Failed to load details.');
        } finally {
          setLoading(false);
        }
      };

      fetchDoctor();
    }
  }, [doctorId]);

  // Filter slots based on selected date
  const filteredSlots = slots.filter(slot => {
    // Convert slot.date to YYYY-MM-DD for comparison
    const slotDate = new Date(slot.date).toISOString().split('T')[0];
    return slotDate === selectedDate;
  });

  const handleBookAppointment = async () => {
    try {
      const token = Cookies.get('token');
      const username = Cookies.get('username');
      const selectedSlotDetails = slots.find(slot => slot.startTime === selectedSlot);
  
      if (!selectedSlotDetails) {
        throw new Error('Selected slot details not found.');
      }
  
      await axios.post('http://localhost:3000/appointments', {
        doctorname: doctor?.name,
        doctor: doctor?._id,
        username: Cookies.get('username'),  
        topic: doctor?.topic?.[0], 
        date: selectedDate,
        startTime: selectedSlotDetails.startTime,
        endTime: selectedSlotDetails.endTime, // Use endTime from the selected slot
        appointmentType: 'Video Call', // or 'in-person'
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      router.push('/confirmation'); // Redirect to confirmation page or show a success message
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError('The selected time slot is not available. Please choose another time.');
    }
  };
  

  useEffect(() => {
    if (selectedDate) {
      setSelectedSlot(''); // Reset selected slot when date changes
    }
  }, [selectedDate]);

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="booking-container">
        {error && <p className="error">{error}</p>}
        {doctor && (
          <div className="booking-details">
            <h2>Book an Appointment with Dr. {doctor.name}</h2>
            <div className="doctor-info">
              <img src={`/content/logo/doctor.png`} alt={doctor.name} className="profile-img" />
              <div className="info">
                <p>Specialization: {doctor.specialization}</p>
                <p>Experience: {doctor.experience} years</p>
                <p>Qualifications: {doctor.qualifications}</p>
              </div>
            </div>
            <div className="slots">
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
              <button onClick={handleBookAppointment}>Book Appointment</button>
            </div>
          </div>
        )}
        <style jsx>{`
          .booking-container {
            padding: 20px;
            font-family: 'Inika', serif;
            font-size: 24px;
          }
          
          .booking-details {
            max-width: 600px;
            margin: 0 auto;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .doctor-info {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }

          .profile-img {
            border-radius: 50%;
            width: 150px;
            height: 150px;
            margin-right: 20px;
          }

          .info {
            flex: 1;
          }

          .slots {
            margin-top: 20px;
          }

          .slots label {
            display: block;
            margin-bottom: 5px;
          }

          .slots select, .slots input {
            display: block;
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
          }

          .slots button {
            padding: 10px 20px;
            background-color: #196C17;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-family: 'Inika';
          }

          .slots button:hover {
            background-color: #005bb5;
          }

          .error {
            color: red;
            font-size: 18px;
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Booking;
