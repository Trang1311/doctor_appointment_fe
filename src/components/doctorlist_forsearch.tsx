import React from "react";
import styles from "../styles/doctorList.module.css";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  clinicAddress: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <div className={styles.doctorList}>
      {doctors.map((doctor) => (
        <div key={doctor._id} className={styles.doctorCard}>
          <img
            src="/content/images/doctor-placeholder.png"
            alt={`${doctor.name}'s photo`}
            className={styles.doctorImage}
          />
          <div className={styles.doctorInfo}>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <p>{doctor.clinicAddress}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
