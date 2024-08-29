import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Menu from '../components/menu';
import { useAuth } from '../components/withAuth'; // Import authentication context
import Cookies from 'js-cookie';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  qualifications: string;
  dailySlots: string[];
  topic: string[];
}

const ListDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { topicId } = router.query;
  const { isAuthenticated } = useAuth(); 

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (topicId) {
      const fetchDoctors = async () => {
        try {
          setLoading(true);
          const token = Cookies.get('token');
          const response = await axios.get<Doctor[]>(`http://localhost:3000/topics/${topicId}/doctors`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          setError('Failed to load doctors.');
        } finally {
          setLoading(false);
        }
      };

      fetchDoctors();
    }
  }, [topicId, isAuthenticated]);

  const handleBookNow = (doctorId: string) => {
    router.push(`/booking?doctorId=${doctorId}`);
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="content-container">
        <Menu />
        <div className="container">
          {error && <p className="error">{error}</p>}
          {doctors.length === 0 && !error && <p>No doctors found for this topic.</p>}
          {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <img src={`/content/logo/doctor.png`} alt={doctor.name} className="profile-img" />
              <div className="doctor-info">
                <h3>Dr: {doctor.name}</h3>
                <p>Experience: {doctor.experience} years</p>
                <button 
                  className="book-now-button" 
                  onClick={() => handleBookNow(doctor._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .content-container {
          display: flex;
          align-items: flex-start; 
          padding: 20px;
        }

        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: left;
          gap: 30px;
          font-family: 'Inika', serif;
          margin-left: 250px;
        }
        .doctor-card {
          display: flex;
          align-items: center; 
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          width: 300px; 
          background-color: #8DBBFA;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .profile-img {
          border-radius: 50%;
          width: 100px;
          height: 100px;
          margin-right: 20px; 
        }

        .doctor-info {
          flex: 1; 
          text-align: left;
        }

        .doctor-info h3 {
          margin: 0 0 10px;
        }

        .book-now-button {
          padding: 10px 20px;
          background-color: #196C17;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Inika';
        }

        .book-now-button:hover {
          background-color: #005bb5;
        }

        .error {
          color: red;
          font-size: 18px;
          margin-bottom: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default ListDoctor;
