import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Menu from "../components/menu";
import { useAuth } from "../components/withAuth";
import Cookies from "js-cookie";

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
  imageURL: string; // Ensure this is part of the Doctor interface
}

interface PaginateResponse {
  total: number;
  current: number;
  limit: number;
  totalPages: number;
  doctors: Doctor[];
}

const ListDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const router = useRouter();
  const { topicId } = router.query;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (topicId) {
      const fetchDoctors = async () => {
        try {
          setLoading(true);
          const token = Cookies.get("token");
          const response = await axios.get<PaginateResponse>(
            `http://localhost:3000/topics/${topicId}/doctors`,
            {
              params: { current: currentPage, limit: 9 },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDoctors(response.data.doctors);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setError("Failed to load doctors.");
          router.push("/login");
        } finally {
          setLoading(false);
        }
      };

      fetchDoctors();
    }
  }, [topicId, isAuthenticated, currentPage]);

  const handleBookNow = (doctorId: string) => {
    router.push(`/booking?doctorId=${doctorId}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="content-container">
        <Menu />
        <div className="container">
          {error && <p className="error">{error}</p>}
          {doctors.length === 0 && !error && (
            <p>No doctors found for this topic.</p>
          )}
          {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <img
                src={doctor.imageURL || `/content/logo/doctor.png`}
                alt={doctor.name}
                className="profile-img"
              />
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
          <div className="pagination">
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
                <span key={index} className="pagination-ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={`pagination-button ${
                    number === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(number as number)}
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
        </div>
      </div>

      <style jsx>{`
        .content-container {
          display: flex;
          flex: 1;
          margin-top: 35px;
          background-color: #004574;
        }

        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: left;
          gap: 30px;
          font-family: Georgia, "Times New Roman", Times, serif;
          margin-left: 330px;
          margin-top: 30px;
          width: calc(100% - 250px);
          box-sizing: border-box;
        }
        .doctor-card {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          width: 300px;
          background-color: #ffff;
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
          font-size: 16px;
        }

        .doctor-info h3 {
          margin: 0 0 10px;
          font-size: 16px;
        }

        .book-now-button {
          padding: 10px 20px;
          background-color: #004574;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          font-family: Georgia, "Times New Roman", Times, serif;
        }

        .book-now-button:hover {
          background-color: #005bb5;
        }

        .error {
          color: red;
          font-size: 18px;
          margin-bottom: 20px;
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 5px;
          width: 100%;
          margin-bottom: 20px;
        }

        .pagination-button {
          padding: 15px;
          margin: 0 5px;
          border: 1px;
          border-radius: 5px;
          background-color: #fff;
          color: #005bb5;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Georgia, "Times New Roman", Times, serif;
        }

        .pagination-button.active {
          background-color: #005bb5;
          color: #fff;
        }
        .pagination-button:disabled {
          background-color: #ddd;
          cursor: not-allowed;
        }
        .pagination-ellipsis {
          padding: 10px;
          margin: 0 5px;
          font-size: 16px;
          font-family: Georgia, "Times New Roman", Times, serif;
        }
      `}</style>
    </Layout>
  );
};

export default ListDoctor;
