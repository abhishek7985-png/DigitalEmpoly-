import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getTransportationById,
  updateTransportation,
} from "../../api/transportationApi";

export default function EditTransportation() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    transportType: "",
    travelDate: "",
    ticketNumber: "",
    fromLocation: "",
    toLocation: "",
    pickupLocation: "",
    dropLocation: "",
    pickupTime: "",
    status: "Pending",
    remarks: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getTransportationById(id);

      const data = res.data.data;

      setForm({
        employee: data.employee?._id || data.employee || "",
        transportType: data.transportType || "",
        travelDate: data.travelDate ? data.travelDate.substring(0, 10) : "",
        ticketNumber: data.ticketNumber || "",
        vehicleNumber: data.vehicleNumber || "",
        fromLocation: data.fromLocation || "",
        toLocation: data.toLocation || "",
        pickupLocation: data.pickupLocation || "",
        dropLocation: data.dropLocation || "",
        pickupTime: data.pickupTime || "",
        driverName: data.driverName || "",
        driverContact: data.driverContact || "",
        status: data.status || "Pending",
        remarks: data.remarks || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to load transportation");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateTransportation(id, form);

      toast.success("Transportation Updated");

      navigate("/transportation");
    } catch (error) {
      console.log(error);

      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Transportation</h1>

      <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-5">
        <input
          className="border p-3 rounded-xl"
          name="transportType"
          value={form.transportType}
          onChange={handleChange}
          placeholder="Transport Type"
        />

        <input
          className="border p-3 rounded-xl"
          name="ticketNumber"
          value={form.ticketNumber}
          onChange={handleChange}
          placeholder="Ticket Number"
        />

        <input
          className="border p-3 rounded-xl"
          name="fromLocation"
          value={form.fromLocation}
          onChange={handleChange}
          placeholder="From Location"
        />

        <input
          className="border p-3 rounded-xl"
          name="toLocation"
          value={form.toLocation}
          onChange={handleChange}
          placeholder="To Location"
        />

        <input
          className="border p-3 rounded-xl"
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
        />

        <input
          className="border p-3 rounded-xl"
          name="dropLocation"
          value={form.dropLocation}
          onChange={handleChange}
          placeholder="Drop Location"
        />

        <input
          type="date"
          className="border p-3 rounded-xl"
          name="travelDate"
          value={form.travelDate?.substring(0, 10)}
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-xl"
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          placeholder="Pickup Time"
        />

        <select
          className="border p-3 rounded-xl"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>

          <option>Booked</option>

          <option>Completed</option>

          <option>Cancelled</option>
        </select>

        <textarea
          className="border p-3 rounded-xl md:col-span-2"
          rows="4"
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          placeholder="Remarks"
        />

        <div className="md:col-span-2 flex gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl">
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/transportation")}
            className="border px-8 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
