import CountChart from "./CountChart";


const CountChartContainer = ({ stats }: { stats: any }) => {
  const guests = stats.guestCount || 0;
  const doctors = stats.doctorCount || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Người dùng</h1>
      </div>
      <CountChart guests={guests} doctors={doctors} />
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-blue-500 rounded-full" />
          <h1 className="font-bold">{doctors}</h1>
          <h2 className="text-xs text-gray-400">
            Bác sĩ ({Math.round((doctors / (doctors + guests)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{guests}</h1>
          <h2 className="text-xs text-gray-400">
            Bệnh nhân ({Math.round((guests / (doctors + guests)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
