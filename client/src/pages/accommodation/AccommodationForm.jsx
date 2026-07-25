import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";

export default function AccommodationForm({
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
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-700">
        Accommodation Details
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
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
                {emp.employeeCode} - {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Accommodation Type</label>

          <select
            name="accommodationType"
            value={formData.accommodationType || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="">Select Type</option>

            <option>Company Guest House</option>

            <option>Hotel</option>

            <option>Hostel</option>

            <option>Rental</option>

            <option>Own</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Accommodation Name</label>

          <input
            name="accommodationName"
            value={formData.accommodationName || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Hotel / Guest House Name"
          />
        </div>

        <div>
          <label className="font-semibold">City</label>

          <input
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Check In Date</label>

          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Check Out Date</label>

          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Room Number</label>

          <input
            name="roomNumber"
            value={formData.roomNumber || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Contact Person</label>

          <input
            name="contactPerson"
            value={formData.contactPerson || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Contact Number</label>

          <input
            name="contactNumber"
            value={formData.contactNumber || ""}
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

            <option>Allocated</option>

            <option>Completed</option>

            <option>Cancelled</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Address</label>

          <textarea
            name="address"
            rows="3"
            value={formData.address || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Remarks</label>

          <textarea
            name="remarks"
            rows="3"
            value={formData.remarks || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Accommodation"}
        </button>
      </div>
    </form>
  );
}
