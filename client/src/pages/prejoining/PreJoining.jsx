import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

import {
  getAllPreJoining,
  deletePreJoining,
} from "../../services/preJoiningService";

const PreJoining = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getAllPreJoining();

      setRecords(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await deletePreJoining(id);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = records.filter((item) => {
    const employee = item.employee?.name || "";
    const email = item.employee?.email || "";

    return (
      (employee.toLowerCase().includes(keyword.toLowerCase()) ||
        email.toLowerCase().includes(keyword.toLowerCase())) &&
      (status === "" || item.status === status)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pre Joining Management</h1>

          <p className="text-gray-500">
            Welcome, onboarding & reporting management
          </p>
        </div>

        <Link
          to="/prejoining/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FiPlus />
          Add Pre Joining
        </Link>
      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-5">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Employee..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border rounded-lg pl-10 p-3"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Status</option>

            <option>Pending</option>

            <option>In Progress</option>

            <option>Completed</option>
          </select>

          <button
            onClick={loadData}
            className="bg-green-600 text-white rounded-lg flex justify-center items-center gap-2"
          >
            <FiRefreshCw />
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Employee</th>

                <th>Email</th>

                <th>Department</th>

                <th>Joining</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-8">
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8">
                    No Records Found
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-semibold">{item.employee?.name}</td>

                    <td>{item.employee?.email}</td>

                    <td>{item.department?.departmentName}</td>

                    <td>
                      {item.joiningDate
                        ? new Date(item.joiningDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-2 justify-center">
                        <Link
                          to={`/prejoining/view/${item._id}`}
                          className="bg-blue-500 text-white p-2 rounded"
                        >
                          <FiEye />
                        </Link>

                        <Link
                          to={`/prejoining/edit/${item._id}`}
                          className="bg-yellow-500 text-white p-2 rounded"
                        >
                          <FiEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-600 text-white p-2 rounded"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PreJoining;
