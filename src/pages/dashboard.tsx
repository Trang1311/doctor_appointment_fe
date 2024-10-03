import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import DashboardData from "@/components/dashboard_data";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <DashboardData></DashboardData>
    </Layout>
  );
};

export default Dashboard;
