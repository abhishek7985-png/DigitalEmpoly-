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
  getAllJoiningForms,
  deleteJoiningForm,
} from "../../services/joiningFormService";

export default function JoiningForm() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getAllJoiningForms();

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
    if (!window.confirm("Delete this Joining Form?")) return;

    try {
      await deleteJoiningForm(id);

      alert("Deleted Successfully");

      loadData();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filteredData = records.filter((item) => {
    const name = `${item.firstName || ""} ${item.lastName || ""}`.toLowerCase();

    const email = (item.email || "").toLowerCase();

    return (
      (name.includes(keyword.toLowerCase()) ||
        email.includes(keyword.toLowerCase())) &&
      (status === "" || item.status === status)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Joining Form Management</h1>

          <p className="text-gray-500">Manage Employee Joining Forms</p>
        </div>

        <Link
          to="/joining-form/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FiPlus />
          Add Joining Form
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
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={loadData}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg flex justify-center items-center gap-2"
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

                <th>Phone</th>

                <th>Joining Date</th>

                <th>Status</th>

                <th className="text-center">Actions</th>
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
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    No Joining Forms Found
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-semibold">
                          {item.firstName} {item.lastName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {item.employeeCode}
                        </p>
                      </div>
                    </td>

                    <td>{item.email}</td>

                    <td>{item.phone}</td>

                    <td>
                      {item.joiningDate
                        ? new Date(item.joiningDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : item.status === "Submitted"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/joining-form/view/${item._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                        >
                          <FiEye />
                        </Link>

                        <Link
                          to={`/joining-form/edit/${item._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                        >
                          <FiEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
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
}
