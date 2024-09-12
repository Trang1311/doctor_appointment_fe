import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  // Dữ liệu biểu đồ đường
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Appointments",
        data: [10, 20, 15, 30, 25, 40],
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Dữ liệu biểu đồ cột
  const barData = {
    labels: ["Anxiety", "Depression", "Sleep", "Trauma", "Family Counseling"],
    datasets: [
      {
        label: "Patients",
        data: [35, 25, 40, 20, 30],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-blue-800 to-blue-900 h-full ${
          open ? "w-64" : "w-20"
        } transition-all duration-300 text-white`}
      >
        <div className="flex items-center justify-between p-5">
          <h1 className={`font-semibold text-2xl ${!open && "hidden"}`}>
            Dashboard
          </h1>
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-10 space-y-6 px-4">
          <a
            href="#"
            className="block py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded-md transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-blue-700 rounded-md transition"
          >
            Appointments
          </a>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-blue-700 rounded-md transition"
          >
            Patients
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Dashboard Overview
        </h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Total Appointments
            </h2>
            <p className="text-4xl font-bold text-blue-600">45</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Completed Sessions
            </h2>
            <p className="text-4xl font-bold text-green-500">38</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Pending Sessions
            </h2>
            <p className="text-4xl font-bold text-yellow-500">5</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Canceled Sessions
            </h2>
            <p className="text-4xl font-bold text-red-500">2</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Appointments Over Time
            </h2>
            <div className="relative h-64">
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Patients by Category
            </h2>
            <div className="relative h-64">
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
