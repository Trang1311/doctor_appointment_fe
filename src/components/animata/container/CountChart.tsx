"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";


const CountChart = ({ guests, doctors }: { guests: number; doctors: number }) => {
  const data = [
    {
      name: "Total",
      count: guests + doctors,
      fill: "white",
    },

    {
      name: "Patients",
      count: guests,
      fill: "#73d8ff",
    },
    {
      name: "Doctors",
      count: doctors,
      fill: "#387eff",
    },
  ];

  return (
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="80%"
          barSize={30}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src="/content/panel/guestDoctor.png"
        alt=""
        width={100}
        height={100}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default CountChart;