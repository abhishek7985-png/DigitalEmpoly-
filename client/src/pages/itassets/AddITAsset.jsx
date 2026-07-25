import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAsset } from "../../api/itAssetApi";
//import { useEffect } from "react";
import { getAllEmployees } from "../../services/employeeService";

export default function AddITAsset() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    assetName: "",
    assetCode: "",
    assetType: "",
    brand: "",
    serialNumber: "",
    issueDate: "",
    returnDate: "",
    status: "Assigned",
    remarks: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data.employees || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // const loadEmployees = async () => {
  //   try {
  //     const data = await getAllEmployees();
  //     setEmployees(data.employees || data || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createAsset(form);

      toast.success("Asset Assigned Successfully");

      navigate("/itassets");
    } catch (err) {
      console.log(err.response?.data);

      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold mb-8">Assign IT Asset</h1>

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
          placeholder="Asset Name"
          name="assetName"
          value={form.assetName}
          onChange={changeHandler}
        />

        <input
          className="border rounded-xl p-3"
          placeholder="Asset Code"
          name="assetCode"
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
          placeholder="Brand"
          name="brand"
          value={form.brand}
          onChange={changeHandler}
        />

        <input
          className="border rounded-xl p-3"
          placeholder="Model"
          name="model"
          value={form.model || ""}
          onChange={changeHandler}
        />

        <input
          className="border rounded-xl p-3"
          placeholder="Serial Number"
          name="serialNumber"
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
          placeholder="Remarks"
          name="remarks"
          value={form.remarks}
          onChange={changeHandler}
        />

        <div className="md:col-span-2 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
            {loading ? "Saving..." : "Assign Asset"}
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
