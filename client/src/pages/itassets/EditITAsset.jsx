import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAssetById, updateAsset } from "../../api/itAssetApi";
import { getAllEmployees } from "../../services/employeeService";

export default function EditITAsset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee: "",
    assetName: "",
    assetCode: "",
    assetType: "",
    brand: "",
    model: "",
    serialNumber: "",
    issueDate: "",
    returnDate: "",
    status: "Assigned",
    remarks: "",
  });

  useEffect(() => {
    loadEmployees();
    loadAsset();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.employees || res.data || res || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAsset = async () => {
    try {
      const res = await getAssetById(id);

      console.log("Edit Asset Response:", res);

      const asset = res.data || res;

      setForm({
        employee: asset.employee?._id || asset.employee || "",
        assetName: asset.assetName || "",
        assetCode: asset.assetCode || "",
        assetType: asset.assetType || "",
        brand: asset.brand || "",
        model: asset.model || "",
        serialNumber: asset.serialNumber || "",
        issueDate: asset.issueDate ? asset.issueDate.substring(0, 10) : "",
        returnDate: asset.returnDate ? asset.returnDate.substring(0, 10) : "",
        status: asset.status || "Assigned",
        remarks: asset.remarks || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to Load Asset");
    }
  };

  const changeHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateAsset(id, form);

      toast.success("Asset Updated Successfully");

      navigate("/itassets");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unable to Update Asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8">Edit IT Asset</h1>

      <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-6">
        <select
          className="border rounded-xl p-3"
          name="employee"
          value={form.employee}
          onChange={changeHandler}
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.employeeCode} - {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>

        <input
          className="border rounded-xl p-3"
          name="assetName"
          placeholder="Asset Name"
          value={form.assetName}
          onChange={changeHandler}
        />

        <input
          className="border rounded-xl p-3"
          name="assetCode"
          placeholder="Asset Code"
          value={form.assetCode}
          onChange={changeHandler}
        />

        <select
          className="border rounded-xl p-3"
          name="assetType"
          value={form.assetType}
          onChange={changeHandler}
        >
          <option value="">Select Asset Type</option>
          <option>Laptop</option>
          <option>Desktop</option>
          <option>Monitor</option>
          <option>Keyboard</option>
          <option>Mouse</option>
          <option>Headphone</option>
          <option>ID Card</option>
          <option>SIM Card</option>
          <option>Access Card</option>
          <option>Other</option>
        </select>

        <input
          className="border rounded-xl p-3"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={changeHandler}
        />

        <input
          className="border rounded-xl p-3"
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={changeHandler}
        />

        <input
          className="border rounded-xl p-3"
          name="serialNumber"
          placeholder="Serial Number"
          value={form.serialNumber}
          onChange={changeHandler}
        />

        <input
          type="date"
          className="border rounded-xl p-3"
          name="issueDate"
          value={form.issueDate}
          onChange={changeHandler}
        />

        <input
          type="date"
          className="border rounded-xl p-3"
          name="returnDate"
          value={form.returnDate}
          onChange={changeHandler}
        />

        <select
          className="border rounded-xl p-3"
          name="status"
          value={form.status}
          onChange={changeHandler}
        >
          <option>Assigned</option>
          <option>Returned</option>
          <option>Damaged</option>
          <option>Lost</option>
        </select>

        <textarea
          rows="4"
          className="border rounded-xl p-3 md:col-span-2"
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={changeHandler}
        />

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Asset"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/itassets")}
            className="border px-8 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
