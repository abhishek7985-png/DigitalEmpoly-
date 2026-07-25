import { useEffect, useState } from "react";
import { getAnalytics } from "../../api/analyticsApi";
import { toast } from "react-toastify";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  FiUsers,
  FiBriefcase,
  FiLayers,
  FiFileText,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await getAnalytics();

      console.log(res);

      setData(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Analytics Load Failed");
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-2xl font-semibold">
        Loading Analytics...
      </div>
    );
  }

  const cards = [
    {
      title: "Employees",
      value: data.totalEmployees,
      icon: <FiUsers size={32} />,
      color: "bg-blue-600",
    },
    {
      title: "Departments",
      value: data.totalDepartments,
      icon: <FiBriefcase size={32} />,
      color: "bg-green-600",
    },
    {
      title: "Designations",
      value: data.totalDesignations,
      icon: <FiLayers size={32} />,
      color: "bg-yellow-500",
    },
    {
      title: "Documents",
      value: data.totalDocuments,
      icon: <FiFileText size={32} />,
      color: "bg-red-600",
    },
  ];

  const barData = [
    {
      name: "Employees",
      value: data.totalEmployees,
    },
    {
      name: "Departments",
      value: data.totalDepartments,
    },
    {
      name: "Designations",
      value: data.totalDesignations,
    },
    {
      name: "Documents",
      value: data.totalDocuments,
    },
  ];

  const pieData = [
    {
      name: "Active",
      value: data.activeEmployees,
    },
    {
      name: "Inactive",
      value: data.inactiveEmployees,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-500 text-white p-8 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Analytics Dashboard</h1>

            <p className="mt-3 text-blue-100 text-lg">
              Digital Employee Onboarding Portal
            </p>
          </div>

          <div className="hidden lg:flex">
            <FiTrendingUp size={70} />
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div
              className={`${card.color} p-5 text-white flex justify-between`}
            >
              <h2 className="font-semibold text-lg">{card.title}</h2>

              {card.icon}
            </div>

            <div className="p-6">
              <h1 className="text-5xl font-bold text-slate-800">
                {card.value}
              </h1>

              <p className="text-gray-500 mt-2">Total {card.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Charts */}

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Bar Chart */}

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Overall Statistics</h2>

              <p className="text-gray-500">Company Resources Overview</p>
            </div>

            <FiActivity size={32} className="text-blue-600" />
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Employee Status</h2>

            <p className="text-gray-500">Active vs Inactive Employees</p>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                innerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-green-50 border-l-4 border-green-600 rounded-2xl p-6">
          <h3 className="text-green-700 font-semibold">Active Employees</h3>

          <h1 className="text-5xl font-bold mt-3">{data.activeEmployees}</h1>

          <div className="w-full h-2 bg-green-200 rounded-full mt-5">
            <div
              className="h-2 rounded-full bg-green-600"
              style={{
                width: `${Math.min(
                  (data.activeEmployees / Math.max(data.totalEmployees, 1)) *
                    100,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-600 rounded-2xl p-6">
          <h3 className="text-red-700 font-semibold">Inactive Employees</h3>

          <h1 className="text-5xl font-bold mt-3">{data.inactiveEmployees}</h1>

          <div className="w-full h-2 bg-red-200 rounded-full mt-5">
            <div
              className="h-2 rounded-full bg-red-600"
              style={{
                width: `${Math.min(
                  (data.inactiveEmployees / Math.max(data.totalEmployees, 1)) *
                    100,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-700 rounded-2xl p-6">
          <h3 className="text-blue-700 font-semibold">Departments</h3>

          <h1 className="text-5xl font-bold mt-3">{data.totalDepartments}</h1>

          <p className="text-gray-500 mt-4">Company Departments</p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-2xl p-6">
          <h3 className="text-yellow-700 font-semibold">Documents</h3>

          <h1 className="text-5xl font-bold mt-3">{data.totalDocuments}</h1>

          <p className="text-gray-500 mt-4">Uploaded Documents</p>
        </div>
      </div>

      {/* Footer */}

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-5">Dashboard Summary</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-3">Company Overview</h4>

            <ul className="space-y-3 text-gray-600">
              <li>
                ✅ Total Employees :<strong> {data.totalEmployees}</strong>
              </li>

              <li>
                ✅ Active Employees :<strong> {data.activeEmployees}</strong>
              </li>

              <li>
                ✅ Departments :<strong> {data.totalDepartments}</strong>
              </li>

              <li>
                ✅ Designations :<strong> {data.totalDesignations}</strong>
              </li>

              <li>
                ✅ Documents :<strong> {data.totalDocuments}</strong>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-6">
            <h3 className="text-2xl font-bold">
              Digital Employee Onboarding Portal
            </h3>

            <p className="mt-4 leading-7 text-blue-100">
              This dashboard provides real-time insights into employees,
              departments, designations, and documents. HR can monitor company
              growth and onboarding activities from a single place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
