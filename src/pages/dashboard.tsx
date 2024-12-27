import { useEffect, useState } from "react";
import Layout from "@/components/layout_nofooter";
import RankingChart from "@/components/animata/container/RankingChart";
import CountChartContainer from "@/components/animata/container/CountChartContainer";
import TopicAndAppointments from "@/components/animata/container/TopicAndAppointments";
import TopDoctorsChartContainer from "@/components/animata/container/TopDoctorsChartContainer";

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setChartData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  const topDoctors = chartData.topDoctors?.[0]?.topDoctors || [];
  console.log(topDoctors);

  return (
    <Layout>
      <div className="ml-auto mr-auto mt-[24px] w-full h-full p-8 space-y-6 bg-slate-50">
        {/* Row 1: Các thẻ Topic */}
        <div className="flex flex-wrap gap-10">
          <TopicAndAppointments />
        </div>
        {/* Row 3: Bar Chart for Top Doctors */}
        <div className="w-full">
          <TopDoctorsChartContainer topDoctors={topDoctors} />{" "}
          {/* Truyền topDoctors vào đây */}
        </div>
        {/* Row 2: Hai Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-20 w-full">
            <RankingChart data={chartData.provinceWithMostClinics} />
          </div>

          <div className="w-full md:w-[710px]">
            <CountChartContainer stats={chartData.userStats} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
