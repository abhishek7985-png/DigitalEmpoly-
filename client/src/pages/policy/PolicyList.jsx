import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { getPolicies, deletePolicy } from "../../api/policyApi";

export default function PolicyList() {
  const [policies, setPolicies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      setLoading(true);

      const res = await getPolicies();

      console.log("POLICY LIST RESPONSE:", res.data);

      setPolicies(res.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to Load Policies");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    const result = await Swal.fire({
      title: "Delete Policy?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deletePolicy(id);

      toast.success("Policy Deleted Successfully");

      loadPolicies();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const filtered = policies.filter((item) =>
    item.title?.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Policies</h1>

          <p className="text-gray-500">Manage HR Policies</p>
        </div>

        <Link
          to="/policy/add"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >
          <FiPlus />
          Add Policy
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div className="relative mb-5">
          <FiSearch className="absolute left-3 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Policy..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded-xl w-full pl-10 pr-4 py-3"
          />
        </div>

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Policy No</th>

              <th className="text-left">Title</th>

              <th className="text-left">Category</th>

              <th className="text-left">Version</th>

              <th className="text-left">Status</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-8">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-8">
                  No Policy Found
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item._id} className="border-b hover:bg-slate-50">
                  <td className="p-4">{item.policyNumber}</td>

                  <td>{item.title}</td>

                  <td>{item.category}</td>

                  <td>{item.version}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm

                      ${
                        item.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }

                      `}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-4">
                      <Link to={`/policy/view/${item._id}`}>
                        <FiEye className="text-blue-600" />
                      </Link>

                      <Link to={`/policy/edit/${item._id}`}>
                        <FiEdit className="text-green-600" />
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
