import { useEffect, useState } from "react";
import { getEmployeeReport } from "../../api/reportApi";

import { FiSearch, FiRefreshCw, FiPrinter, FiDownload } from "react-icons/fi";

import { toast } from "react-toastify";

export default function EmployeeReport() {
  const [employees, setEmployees] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  // ===============================
  // Load Report
  // ===============================

  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await getEmployeeReport({
        keyword,
        department,
        status,
      });

      setEmployees(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [keyword, department, status]);

  // ===============================
  // Print
  // ===============================

  const printReport = () => {
    window.print();
  };

  // ===============================
  // Export CSV
  // ===============================

  const exportCSV = () => {
    let csv = "Employee Code,Employee Name,Department,Designation,Status\n";

    employees.forEach((emp) => {
      csv += `${emp.employeeCode},${emp.firstName} ${emp.lastName},${emp.department?.departmentName || ""},${emp.designation?.designationName || ""},${emp.status}\n`;
    });

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Employee_Report.csv";

    link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading Report...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-3xl font-bold">Employee Report</h1>

        <p className="text-gray-500 mt-2">Employee Report & Export</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border rounded-lg pl-10 py-3"
            />
          </div>

          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded-lg px-3 py-3"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-3 py-3"
          >
            <option value="">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>

          <button
            onClick={fetchReport}
            className="bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FiRefreshCw />
            Refresh
          </button>

          <div className="flex gap-2">
            <button
              onClick={printReport}
              className="bg-green-600 text-white flex-1 rounded-lg flex items-center justify-center gap-2"
            >
              <FiPrinter />
              Print
            </button>

            <button
              onClick={exportCSV}
              className="bg-blue-600 text-white flex-1 rounded-lg flex items-center justify-center gap-2"
            >
              <FiDownload />
              CSV
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>

              <th className="p-4 text-left">Code</th>

              <th className="p-4 text-left">Department</th>

              <th className="p-4 text-left">Designation</th>

              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  {emp.firstName} {emp.lastName}
                </td>

                <td className="p-4">{emp.employeeCode}</td>

                <td className="p-4">{emp.department?.departmentName}</td>

                <td className="p-4">{emp.designation?.designationName}</td>

                <td className="p-4">{emp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
