import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiMonitor } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { getAssets, deleteAsset } from "../../api/itAssetApi";

export default function ITAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);

      const res = await getAssets();

      console.log("IT Assets Response:", res);

      // res = { success:true, count:3, data:[...] }
      setAssets(res.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load assets");
    } finally {
      setLoading(false);
    }
  };

  const removeAsset = async (id) => {
    const result = await Swal.fire({
      title: "Delete Asset?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAsset(id);

      toast.success("Asset Deleted Successfully");

      loadAssets();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">IT Assets</h1>
          <p className="text-gray-500">
            Laptop, Desktop, Monitor & Other Assets
          </p>
        </div>

        <Link
          to="/itassets/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FiPlus />
          Assign Asset
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="text-left">Asset</th>
              <th className="text-left">Asset Code</th>
              <th className="text-left">Serial No.</th>
              <th className="text-left">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  No Assets Found
                </td>
              </tr>
            ) : (
              assets.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {item.employee ? (
                      <>
                        <div className="font-semibold">
                          {item.employee.employeeCode}
                        </div>

                        <div className="text-sm text-gray-500">
                          {item.employee.firstName || ""}{" "}
                          {item.employee.lastName || ""}
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <FiMonitor />
                      {item.assetName}
                    </div>
                  </td>

                  <td>{item.assetCode}</td>

                  <td>{item.serialNumber || "-"}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.status === "Assigned"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Returned"
                              ? "bg-blue-100 text-blue-700"
                              : item.status === "Damaged"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-4">
                      <Link to={`/itassets/view/${item._id}`}>
                        <FiEye className="text-blue-600 text-lg" />
                      </Link>

                      <Link to={`/itassets/edit/${item._id}`}>
                        <FiEdit className="text-green-600 text-lg" />
                      </Link>

                      <button onClick={() => removeAsset(item._id)}>
                        <FiTrash2 className="text-red-600 text-lg" />
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
