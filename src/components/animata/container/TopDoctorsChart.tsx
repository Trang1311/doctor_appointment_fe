import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TopDoctorsChart = ({
  data,
}: {
  data: { name: string; count: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#000000" }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tick={{ fill: "#ababab" }}
          tickLine={false}
          label={{ value: "Tổng cuộc hẹn", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          formatter={(value) => [`Tổng cuộc hẹn: ${value}`]}
        />
        <Legend formatter={() => "Tổng cuộc hẹn"} />
        <Bar dataKey="count" fill="#3B82F6" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopDoctorsChart;
