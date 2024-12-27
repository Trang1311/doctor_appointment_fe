const RankingChart = ({ data }: { data: any }) => {
  if (!data) return <p>No data available</p>;

  return (
    <div className="bg-white rounded-xl w-full h-full p-6">
      <h1 className="text-left text-xl font-semibold mb-2">
        Top 10 tỉnh có nhiều phòng khám nhất
      </h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-2 text-left text-slate-500 font-normal">#</th>
            <th className="px-2 text-left w-[420px] text-slate-500 font-normal">
              TỈNH/THÀNH PHỐ
            </th>
            <th className="px-2 text-left text-slate-500 font-normal">
              SỐ LƯỢNG PHÒNG KHÁM
            </th>
          </tr>
        </thead>
        <tbody>
          {data.allProvinces.map((province: any, index: number) => (
            <tr key={index}>
              <td className="px-2 py-2">{index + 1}</td>
              <td className="px-2 py-2">{province.province || "N/A"}</td>
              <td className="px-2 py-2">{province.clinicCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingChart;
