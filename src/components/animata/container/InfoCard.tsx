import React from "react";

interface InfoCardProps {
  title: string;
  value: number | string;
  bgColor?: string;
  className?: string;  
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  bgColor,
  className,
}) => {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col justify-between min-w-[130px] h-[150px] w-[330px] ${
        bgColor || "bg-white"
      } ${className}`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/12
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4">{value}</h1>
      <h2 className="capitalize text-sm font-medium text-black mt-auto">
        {title}
      </h2>
    </div>
  );
};

export default InfoCard;
