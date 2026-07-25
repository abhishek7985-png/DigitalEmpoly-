import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiBriefcase,
  FiFileText,
  FiClipboard,
  FiCalendar,
  FiLayers,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    joiningToday: 0,
    totalDepartments: 0,
    totalDesignations: 0,
    pendingDocuments: 0,
    verifiedDocuments: 0,
    rejectedDocuments: 0,
    expiryDocuments: 0,
    pendingChecklist: 0,

    monthlyJoining: [],
    departmentWise: [],
    documentStatus: [],

    recentEmployees: [],
    recentDocuments: [],
  });

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/dashboard");

      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <div className="text-center">
          <FiRefreshCw className="animate-spin text-5xl mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-blue-700">
            Loading Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Employees",
      value: dashboard.totalEmployees,
      icon: <FiUsers size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "Active Employees",
      value: dashboard.activeEmployees,
      icon: <FiUserCheck size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Inactive Employees",
      value: dashboard.inactiveEmployees,
      icon: <FiUserX size={28} />,
      color: "bg-red-500",
    },
    {
      title: "Joining Today",
      value: dashboard.joiningToday,
      icon: <FiCalendar size={28} />,
      color: "bg-indigo-600",
    },
    {
      title: "Departments",
      value: dashboard.totalDepartments,
      icon: <FiBriefcase size={28} />,
      color: "bg-purple-600",
    },
    {
      title: "Designations",
      value: dashboard.totalDesignations,
      icon: <FiLayers size={28} />,
      color: "bg-cyan-600",
    },
    {
      title: "Pending Documents",
      value: dashboard.pendingDocuments,
      icon: <FiClock size={28} />,
      color: "bg-orange-500",
    },
    {
      title: "Verified Documents",
      value: dashboard.verifiedDocuments,
      icon: <FiCheckCircle size={28} />,
      color: "bg-emerald-600",
    },
    {
      title: "Rejected Documents",
      value: dashboard.rejectedDocuments,
      icon: <FiAlertTriangle size={28} />,
      color: "bg-rose-600",
    },
    {
      title: "Expiring Documents",
      value: dashboard.expiryDocuments,
      icon: <FiFileText size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Pending Checklist",
      value: dashboard.pendingChecklist,
      icon: <FiClipboard size={28} />,
      color: "bg-pink-600",
    },
  ];

  return (
    <div
      className="
space-y-6
sm:space-y-8
w-full
overflow-hidden
"
    >
      {/* Header */}

      <div
        className="
rounded-3xl
bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-700
text-white
p-5
sm:p-8
shadow-xl
"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold">
              Digital Employee Onboarding Portal
            </h1>

            <p className="mt-3 text-blue-100 text-lg">Welcome HR Team 👋</p>

            <p className="text-blue-200 mt-2">{new Date().toDateString()}</p>
          </div>

          <button
            onClick={loadDashboard}
            className="flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-blue-100"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}

      <div
        className="
grid
grid-cols-1
xs:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-4
sm:gap-6
"
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2
                  className="
text-3xl
sm:text-4xl
font-bold
mt-3
"
                >
                  {card.value}
                </h2>
              </div>

              <div className={`${card.color} p-4 rounded-2xl text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* =========================
          Analytics Charts
      ========================== */}

      <div
        className="
grid
grid-cols-1
lg:grid-cols-3
gap-4
sm:gap-4 sm:-6
"
      >
        {/* Monthly Joining */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Monthly Joining</h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={
                dashboard.monthlyJoining?.map((item) => ({
                  month: [
                    "",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][item._id],
                  Employees: item.total,
                })) || []
              }
            >
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="Employees"
                radius={[8, 8, 0, 0]}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Wise */}

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:-6">
          <h2 className="text-xl font-bold mb-6">Department Wise</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={
                  dashboard.departmentWise?.map((item) => ({
                    name: item._id,
                    value: item.total,
                  })) || []
                }
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {(dashboard.departmentWise || []).map((item, index) => (
                  <Cell
                    key={index}
                    fill={
                      [
                        "#2563eb",
                        "#16a34a",
                        "#ea580c",
                        "#7c3aed",
                        "#db2777",
                        "#0891b2",
                        "#dc2626",
                        "#0f766e",
                      ][index % 8]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Document Status */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Document Status</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={dashboard.documentStatus || []}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {(dashboard.documentStatus || []).map((item, index) => (
                  <Cell
                    key={index}
                    fill={
                      [
                        "#f59e0b", // Pending
                        "#22c55e", // Verified
                        "#ef4444", // Rejected
                      ][index % 3]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* =========================
          Bottom Section
      ========================= */}

      <div className="grid lg:grid-cols-3 gap-4 sm:-6">
        {/* =========================
            Recent Employees
        ========================= */}

        <div
          className="
lg:col-span-2
w-full
"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Employees</h2>

              <span className="text-sm text-gray-500">Last 5 Employees</span>
            </div>

            <div className="overflow-x-auto">
              <table
                className="
w-full
min-w-[700px]
"
              >
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-4">Employee</th>

                    <th className="text-left p-4">Department</th>

                    <th className="text-left p-4">Designation</th>

                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard?.recentEmployees?.length ? (
                    dashboard.recentEmployees.map((emp) => (
                      <tr key={emp._id} className="border-b hover:bg-slate-50">
                        <td className="p-4">
                          <div>
                            <h4 className="font-semibold">{emp.name}</h4>

                            <p className="text-sm text-gray-500">
                              {emp.officialEmail || emp.email}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          {emp.department?.departmentName || "-"}
                        </td>

                        <td className="p-4">
                          {emp.designation?.designationName || "-"}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              emp.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : emp.status === "Inactive"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-8 text-gray-500">
                        No Recent Employees
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =========================
              Recent Documents
          ========================= */}

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
            <div className="px-6 py-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Documents</h2>

              <span className="text-sm text-gray-500">Last 5 Uploads</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-4">Employee</th>

                    <th className="text-left p-4">Document</th>

                    <th className="text-left p-4">Status</th>

                    <th className="text-left p-4">Uploaded</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard?.recentDocuments?.length ? (
                    dashboard.recentDocuments.map((doc) => (
                      <tr key={doc._id} className="border-b hover:bg-slate-50">
                        <td className="p-4">{doc.employee?.name || "-"}</td>

                        <td className="p-4">{doc.documentType}</td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              doc.status === "Verified"
                                ? "bg-green-100 text-green-700"
                                : doc.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </td>

                        <td className="p-4">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-8 text-gray-500">
                        No Recent Documents
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* =========================
            Right Side Widgets
        ========================= */}

        <div
          className="
space-y-4
sm:space-y-6
"
        >
          {/* Today's Summary */}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-5">Today's Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Joining Today</span>

                <span className="font-bold text-blue-600 text-lg">
                  {dashboard.joiningToday}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Documents</span>

                <span className="font-bold text-orange-600 text-lg">
                  {dashboard.pendingDocuments}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Checklist</span>

                <span className="font-bold text-pink-600 text-lg">
                  {dashboard.pendingChecklist}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Departments</span>

                <span className="font-bold text-green-600 text-lg">
                  {dashboard.totalDepartments}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Documents</span>

                <span className="font-bold text-indigo-600 text-lg">
                  {dashboard.totalDocuments}
                </span>
              </div>
            </div>
          </div>

          {/* HR Overview */}

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl text-white p-6 shadow-xl">
            <h3 className="text-2xl font-bold">HR Overview</h3>

            <p className="mt-4 text-blue-100 leading-7">
              Monitor employees, onboarding, document verification, department
              statistics and checklist completion in real-time.
            </p>

            <button
              onClick={loadDashboard}
              className="mt-6 w-full bg-white text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-100 transition"
            >
              Refresh Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          Quick Actions
      ========================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
          <div>
            <h2 className="text-2xl font-bold">Quick Actions</h2>

            <p className="text-gray-500 mt-2">Frequently Used HR Operations</p>
          </div>

          <div
            className="
flex
flex-col
sm:flex-row
flex-wrap
gap-3
w-full
"
          >
            <button
              onClick={() => navigate("/employees/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Add Employee
            </button>

            <button
              onClick={() => navigate("/documents")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              Documents
            </button>

            <button
              onClick={() => navigate("/pre-joining")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition"
            >
              Pre Joining
            </button>

            <button
              onClick={() => navigate("/departments")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
            >
              Departments
            </button>

            <button
              onClick={loadDashboard}
              className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
      {/* =========================
          Footer
      ========================= */}

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl text-white p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold">
              Digital Employee Onboarding Portal
            </h2>

            <p className="text-slate-300 mt-2">HR Management Dashboard</p>

            <p className="text-slate-400 text-sm mt-3">
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

          <div
            className="
grid
grid-cols-2
sm:grid-cols-4
gap-4
sm:gap-6
text-center
"
          >
            <div>
              <h3 className="text-2xl sm:-3xl font-bold text-blue-400">
                {dashboard.totalEmployees}
              </h3>

              <p className="text-slate-300">Employees</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-400">
                {dashboard.totalDepartments}
              </h3>

              <p className="text-slate-300">Departments</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                {dashboard.totalDocuments}
              </h3>

              <p className="text-slate-300">Documents</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-pink-400">
                {dashboard.pendingChecklist}
              </h3>

              <p className="text-slate-300">Checklist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
