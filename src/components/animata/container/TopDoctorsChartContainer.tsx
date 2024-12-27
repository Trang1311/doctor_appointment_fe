import React, { useEffect, useState } from "react";
import Image from "next/image";
import TopDoctorsChart from "./TopDoctorsChart";

const TopDoctorsChartContainer: React.FC<{ topDoctors: any[] }> = ({
  topDoctors,
}) => {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    if (topDoctors && topDoctors.length > 0) {
      const formattedData = topDoctors.map((doctor) => ({
        name: doctor.doctorName || "N/A",
        count: doctor.appointmentCount,
      }));

      setData(formattedData);
    }
  }, [topDoctors]);

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Các bác sĩ hàng đầu theo số lượng cuộc hẹn
        </h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* Chart */}
      {data.length > 0 ? (
        <TopDoctorsChart data={data} />
      ) : (
        <p>No data available</p> // Hiển thị thông báo nếu không có dữ liệu
      )}
    </div>
  );
};

export default TopDoctorsChartContainer;
