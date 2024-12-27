"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/router";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  lifeMotto: string;
  imageURL: string;
}

const ListAllDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/doctors/all");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const truncateLifeMotto = (text: string, limit: number) => {
    if (!text) return "";
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const firstRowDoctors = doctors.filter((_, index) => index % 3 === 0);
  const secondRowDoctors = doctors.filter((_, index) => index % 3 === 1);

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Roboto",
      }}
    >
      <Marquee
        gradient={false}
        speed={30}
        direction="left"
        style={{ overflowY: "hidden" }}
      >
        <div className="flex">
          {firstRowDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="flex items-center p-4 mx-4 shadow-lg rounded-lg"
              style={{
                height: "150px",
                width: "300px",
                margin: "10px",
                backgroundColor: "#fff", // Màu nền trắng
                
              }}
            >
              <div className="w-1/2 h-full">
                <img
                  src={doctor.imageURL || "/content/logo/doctor.png"}
                  alt={doctor.name}
                  width={180}
                  height={100}
                  className="rounded-l-lg object-cover w-full h-full"
                />
              </div>

              <div
                className="p-1 flex flex-col justify-between h-full w-2/3"
                style={{
                  color: "#000", // Màu chữ đen
                }}
              >
                <h3 className="text-l font-semibold">{doctor.name}</h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#707275", // Màu chữ cho specialization
                  }}
                >
                  {doctor.specialization}
                </p>
                <p className="text-sm italic">
                  {truncateLifeMotto(doctor.lifeMotto || "", 50)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Marquee>

      <Marquee
        gradient={false}
        speed={30}
        direction="right"
        style={{ overflowY: "hidden" }}
      >
        <div className="flex">
          {secondRowDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="flex items-center p-4 mx-4 shadow-lg rounded-lg"
              style={{
                height: "150px",
                width: "300px",
                margin: "10px",
                backgroundColor: "#fff", // Màu nền trắng
                
              }}
            >
              <div className="w-1/2 h-full">
                <img
                  src={doctor.imageURL || "/content/logo/doctor.png"}
                  alt={doctor.name}
                  width={180}
                  height={100}
                  className="rounded-l-lg object-cover w-full h-full"
                />
              </div>
              <div
                className="p-1 flex flex-col justify-between h-full w-2/3"
                style={{
                  color: "#000", // Màu chữ đen
                }}
              >
                <h3 className="text-l font-semibold">{doctor.name}</h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#707275", // Màu chữ cho specialization
                  }}
                >
                  {doctor.specialization}
                </p>
                <p className="text-sm italic">
                  {truncateLifeMotto(doctor.lifeMotto || "", 50)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ListAllDoctor;
