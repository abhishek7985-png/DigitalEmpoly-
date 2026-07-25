import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";

export default function TransportationForm({
  formData,
  setFormData,
  onSubmit,
  loading = false,
}) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      employee: data.employee?._id || "",
      transportType: data.transportType || "",
      travelDate: data.travelDate ? data.travelDate.split("T")[0] : "",
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
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-700">
        Transportation Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Employee */}

        <div>
          <label className="font-semibold">Employee</label>

          <select
            name="employee"
            value={formData.employee || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId || emp.employeeCode} -{" "}
                {emp.name || emp.firstName}
              </option>
            ))}
          </select>
        </div>

        {/* Transport Type */}

        <div>
          <label className="font-semibold">Transport Type</label>

          <select
            name="transportType"
            value={formData.transportType || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="">Select Type</option>

            <option>Flight</option>

            <option>Train</option>

            <option>Bus</option>

            <option>Cab</option>

            <option>Company Vehicle</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Travel Date</label>

          <input
            type="date"
            name="travelDate"
            value={formData.travelDate || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Ticket Number</label>

          <input
            name="ticketNumber"
            value={formData.ticketNumber || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">From Location</label>

          <input
            name="fromLocation"
            value={formData.fromLocation || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">To Location</label>

          <input
            name="toLocation"
            value={formData.toLocation || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Pickup Location</label>

          <input
            name="pickupLocation"
            value={formData.pickupLocation || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Drop Location</label>

          <input
            name="dropLocation"
            value={formData.dropLocation || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Pickup Time</label>

          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Status</label>

          <select
            name="status"
            value={formData.status || "Pending"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option>Pending</option>

            <option>Booked</option>

            <option>Completed</option>

            <option>Cancelled</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Remarks</label>

          <textarea
            rows="4"
            name="remarks"
            value={formData.remarks || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Transportation"}
        </button>
      </div>
    </form>
  );
}
