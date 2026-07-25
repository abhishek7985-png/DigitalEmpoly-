import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
  getTransportation,
  deleteTransportation,
} from "../../api/transportationApi";

export default function Transportation() {
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await getTransportation();

      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);

      setList(res?.data?.data || []);
    } catch (error) {
      console.log("TRANSPORTATION ERROR:", error);
      toast.error("Failed to load transportation");
    } finally {
      setLoading(false);
    }
  };
  const remove = async (id) => {
    const result = await Swal.fire({
      title: "Delete Transportation?",

      icon: "warning",

      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteTransportation(id);

      toast.success("Deleted Successfully");

      loadData();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transportation</h1>

          <p className="text-gray-500">Employee travel management</p>
        </div>

        <Link
          to="/transportation/add"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >
          <FiPlus />
          Add Transportation
        </Link>
      </div>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Employee</th>

              <th>Type</th>

              <th>From</th>

              <th>To</th>

              <th>Date</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-10">
                  Loading...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-10">
                  No Data Found
                </td>
              </tr>
            ) : (
              Array.isArray(list) &&
              list.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-4">
                    {item.employee?.firstName} {item.employee?.lastName}
                  </td>

                  <td>{item.transportType}</td>

                  <td>{item.fromLocation}</td>

                  <td>{item.toLocation}</td>

                  <td>{item.travelDate?.substring(0, 10)}</td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-3">
                      <Link to={`/transportation/view/${item._id}`}>
                        <FiEye />
                      </Link>

                      <Link to={`/transportation/edit/${item._id}`}>
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

//export default Transportation;
