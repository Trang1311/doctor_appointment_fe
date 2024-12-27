import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";

const TabMapping = {
  sleep_disorders: "Rối loạn giấc ngủ",
  trauma: "Chấn thương tâm lý",
  anxiety_stress: "Lo lắng và căng thẳng",
  career_counseling: "Tư vấn nghề nghiệp",
  depression: "Trầm cảm",
  child_psychology: "Tư vấn tâm lý trẻ em",
} as const;

type TabKey = keyof typeof TabMapping;

interface Doctor {
  doctorId: string;
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
  imageURL: string;
}

interface DoctorTopic {
  _id: string;
  doctor: Doctor;
  topicName: string;
}

const DoctorInfoTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("sleep_disorders");
  const [doctorsData, setDoctorsData] = useState<Record<TabKey, DoctorTopic[]>>(
    {
      sleep_disorders: [],
      trauma: [],
      anxiety_stress: [],
      career_counseling: [],
      depression: [],
      child_psychology: [],
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard/stats");
        const data = await response.json();

        const categorizedDoctors: Record<TabKey, DoctorTopic[]> = {
          sleep_disorders: [],
          trauma: [],
          anxiety_stress: [],
          career_counseling: [],
          depression: [],
          child_psychology: [],
        };

        data.topExperiencedDoctorsByTopic.forEach((doc: DoctorTopic) => {
          if (doc.topicName.includes("Rối loạn giấc ngủ")) {
            categorizedDoctors.sleep_disorders.push(doc);
          } else if (doc.topicName.includes("Chấn thương tâm lý")) {
            categorizedDoctors.trauma.push(doc);
          } else if (doc.topicName.includes("Lo lắng và căng thẳng")) {
            categorizedDoctors.anxiety_stress.push(doc);
          } else if (doc.topicName.includes("Tư vấn nghề nghiệp")) {
            categorizedDoctors.career_counseling.push(doc);
          } else if (doc.topicName.includes("Trầm cảm")) {
            categorizedDoctors.depression.push(doc);
          } else if (doc.topicName.includes("Tư vấn tâm lý trẻ em")) {
            categorizedDoctors.child_psychology.push(doc);
          }
        });

        setDoctorsData(categorizedDoctors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctorsData();
  }, []);

  const openModal = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctorId(null);
  };
  const TabContent = () => (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      {doctorsData[activeTab].length > 0 ? (
        doctorsData[activeTab].map((doc) => (
          <div key={doc._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ marginBottom: "40px" }}>
                  <img
                    src="/content/panel/verify.png"
                    alt="Verify Icon"
                    width={70}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {doc.doctor.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#707275",
                      textAlign: "left",
                    }}
                  >
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "160px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    doc.doctor.imageURL
                      ? doc.doctor.imageURL
                      : "/content/panel/adver_bg.jpg"
                  }
                  alt="Doctor"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#000",
                backgroundColor: "#f4f4f4",
                padding: "16px",
                borderRadius: "25px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <strong>Chuyên ngành</strong>
                <span>{doc.topicName}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <strong>Kinh nghiệm</strong>
                <span>{doc.doctor.experience} năm</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <strong>Địa chỉ phòng khám</strong>
                <span>{doc.doctor.clinicAddress}</span>
              </div>
              <div>
                <button
                  onClick={() => openModal(doc.doctor.doctorId)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "30px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Đặt lịch ngay !
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No doctors found for this topic.</p>
      )}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Info Card */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <TabContent />
      </motion.div>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px 0px",
          width: "100%",
          padding: "0px",
          backgroundColor: "transparent",
          borderRadius: "25px",
        }}
      >
        {Object.entries(TabMapping).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as TabKey)}
            style={{
              padding: "10px 20px",
              minWidth: "140px",
              textAlign: "center",
              borderRadius: "30px",
              border: "2px solid #fff",
              backgroundColor: activeTab === key ? "#fff" : "transparent",
              color: activeTab === key ? "#007bff" : "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "all 0.5s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {isModalOpen && selectedDoctorId && (
        <BookingModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          doctorId={selectedDoctorId}
        />
      )}
    </div>
  );
};

export default DoctorInfoTab;
