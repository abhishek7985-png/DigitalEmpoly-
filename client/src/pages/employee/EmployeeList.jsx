import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const response = await getEmployees({
        page,
        limit,
        keyword,
        status,
        department,
      });

      setEmployees(response.data.data || []);

      setTotalEmployees(response.data.total || 0);

      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page, keyword, status, department]);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete Employee?")) return;

    await deleteEmployee(id);
    loadEmployees();
  };

  const resetFilters = () => {
    setKeyword("");
    setStatus("");
    setDepartment("");
    setPage(1);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Employee Management
            </h1>

            <p className="text-gray-500">Total Employees : {totalEmployees}</p>
          </div>

          <Link
            to="/employees/add"
            className="
bg-blue-600 
hover:bg-blue-700 
text-white 
px-5 
py-3 
rounded-lg
w-full
sm:w-auto
text-center
"
          >
            + Add Employee
          </Link>
        </div>

        <div
          className="
grid 
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-4 
mt-6
"
        >
          <input
            type="text"
            placeholder="Search Name / Email / Employee ID"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="
border
rounded-lg
p-3
w-full
"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Admin">Admin</option>
            <option value="Sales">Sales</option>
          </select>

          <button
            onClick={resetFilters}
            className="
bg-gray-700
hover:bg-gray-800
text-white
rounded-lg
p-3
w-full
"
          >
            Reset Filters
          </button>
        </div>

        {/* ===== Employee Table Part-2 yahin se start hoga ===== */}

        {/* ================= Employee Table ================= */}

        <div
          className="
overflow-x-auto
mt-8
rounded-lg
"
        >
          <table
            className="
min-w-[900px]
w-full
border
border-gray-200
rounded-lg
"
          >
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-4 py-3 text-left">Employee ID</th>

                <th className="border px-4 py-3 text-left">Name</th>

                <th className="border px-4 py-3 text-left">Email</th>

                <th className="border px-4 py-3 text-left">Phone</th>

                <th className="border px-4 py-3 text-left">Department</th>

                <th className="border px-4 py-3 text-left">Designation</th>

                <th className="border px-4 py-3 text-left">Joining Date</th>

                <th className="border px-4 py-3 text-center">Status</th>

                <th className="border px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-12 text-blue-600 font-semibold"
                  >
                    Loading Employees...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-gray-500">
                    No Employee Found
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-slate-50 duration-200">
                    <td className="border px-4 py-3">{emp.employeeId}</td>

                    <td className="border px-4 py-3 font-medium">{emp.name}</td>

                    <td className="border px-4 py-3">{emp.email}</td>

                    <td className="border px-4 py-3">{emp.phone || "-"}</td>

                    <td className="border px-4 py-3">
                      {emp.department?.departmentName || "-"}
                    </td>

                    <td className="border px-4 py-3">
                      {emp.designation || "-"}
                    </td>

                    <td className="border px-4 py-3">
                      {emp.joiningDate
                        ? new Date(emp.joiningDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="border px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    <td className="border px-4 py-3">
                      <div
                        className="
flex
flex-wrap
justify-center
gap-2
"
                      >
                        <Link
                          to={`/employee/view/${emp._id}`}
                          className="bg-green-600 hover:bg-green-700 text-whitepx-3 py-2 text-smrounded"
                        >
                          View
                        </Link>

                        <Link
                          to={`/employees/edit/${emp._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-smrounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteEmployee(emp._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= Summary ================= */}

        <div
          className="
mt-6
flex
flex-col
lg:flex-row
justify-between
items-center
gap-4
"
        >
          <div className="text-gray-600">
            Showing
            <span className="font-semibold mx-2">{employees.length}</span>
            of
            <span className="font-semibold mx-2">{totalEmployees}</span>
            Employees
          </div>

          <button
            onClick={loadEmployees}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
          >
            Refresh List
          </button>
        </div>

        {/* ===== Part-3 se Pagination start hoga ===== */}

        {/* ================= Pagination ================= */}

        <div
          className="
flex
flex-col
lg:flex-row
justify-between
items-center
mt-8
gap-4
"
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-5 py-2 rounded-lg text-white ${
              page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                  page === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
            className={`px-5 py-2 rounded-lg text-white ${
              page === totalPages || totalPages === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>

        {/* ================= Footer ================= */}

        <div className="mt-8 border-t pt-4 text-center text-gray-500 text-sm">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
