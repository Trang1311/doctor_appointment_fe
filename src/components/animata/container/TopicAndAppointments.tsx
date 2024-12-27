import React, { useEffect, useState } from "react";
import InfoCard from "./InfoCard";

const TopicAndAppointments: React.FC = () => {
  const [data, setData] = useState<{
    topicWithMostDoctors?: { name: string; doctorCount: number };
    totalAppointments?: number;
    onlineAppointments?: number;
    inPersonAppointments?: number;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/stats")
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap gap-5">
      {/* Thẻ thông tin chủ đề có nhiều bác sĩ nhất */}
      {data.topicWithMostDoctors && (
        <InfoCard
          title={`${data.topicWithMostDoctors.name}`}
          value={`${data.topicWithMostDoctors.doctorCount} Bác sĩ`}
          bgColor="bg-blue-100"
        />
      )}
      {/* Tổng số lịch hẹn */}
      <InfoCard
        title="Lịch hẹn hôm nay"
        value={data.totalAppointments || 0}
        bgColor="bg-green-100"
      />
      {/* Lịch hẹn trực tuyến */}
      <InfoCard
        title="Lịch hẹn Online"
        value={data.onlineAppointments || 0}
        bgColor="bg-purple-100"
      />
      {/* Lịch hẹn tại chỗ */}
      <InfoCard
        title="Lịch hẹn trực tiếp"
        value={data.inPersonAppointments || 0}
        bgColor="bg-yellow-100"
      />
    </div>
  );
};

export default TopicAndAppointments;
