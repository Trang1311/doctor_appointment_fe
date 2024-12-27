import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Layout from "@/components/layout_nofooter";
import Eight from "@/components/animata/container/featureDashboard";
import Expandable from "@/components/animata/container/explore_info";
import DashboardData from "@/components/dashboard_data";
import SideNav from "@/components/SideNav";
import Dashboard from "./dashboard";

const Explore: React.FC = () => {
  return (
    <div>
      {/* <Expandable />
      <DashboardData/> */}
      <Dashboard />
</div>
  );
};

export default Explore;
