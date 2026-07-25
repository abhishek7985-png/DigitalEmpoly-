import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
  getAllAccommodation,
  deleteAccommodation,
} from "../../services/accommodationService";

export default function Accommodation() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getAllAccommodation();

      setList(data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to Load Accommodation");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    const result = await Swal.fire({
      title: "Delete Accommodation?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAccommodation(id);

      toast.success("Accommodation Deleted Successfully");

      loadData();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Accommodation</h1>

          <p className="text-gray-500">Employee Accommodation Management</p>
        </div>

        <Link
          to="/accommodation/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FiPlus />
          Add Accommodation
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="text-left">Accommodation</th>
              <th className="text-left">City</th>
              <th className="text-left">Check In</th>
              <th className="text-left">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  No Accommodation Found
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item._id} className="border-b hover:bg-slate-50">
                  <td className="p-4">
                    {item.employee
                      ? `${item.employee.firstName} ${item.employee.lastName}`
                      : "-"}
                  </td>

                  <td>{item.accommodationName}</td>

                  <td>{item.city}</td>

                  <td>
                    {item.checkInDate
                      ? new Date(item.checkInDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <Link to={`/accommodation/view/${item._id}`}>
                        <FiEye />
                      </Link>

                      <Link to={`/accommodation/edit/${item._id}`}>
                        <FiEdit />
                      </Link>

                      <button onClick={() => remove(item._id)}>
                        <FiTrash2 className="text-red-600" />
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
  );
}
