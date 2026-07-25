import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";

export default function PreJoiningForm({
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
    } catch (err) {
      console.log(err);
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
      className="bg-white rounded-xl shadow-lg p-8 space-y-8"
    >
      <h2 className="text-2xl font-bold text-blue-700">
        Pre Joining Information
      </h2>

      {/* Employee Information */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                {emp.employeeId} - {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Reporting Manager</label>

          <select
            name="reportingManager"
            value={formData.reportingManager || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="">Select Manager</option>

            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Joining Date</label>

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Reporting Time</label>

          <input
            type="time"
            name="reportingTime"
            value={formData.reportingTime || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Office Location</label>

          <input
            type="text"
            name="reportingLocation"
            value={formData.reportingLocation || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Seat Number</label>

          <input
            type="text"
            name="seatNumber"
            value={formData.seatNumber || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>
        <div>
          <label className="font-semibold">Welcome Message Sent</label>

          <select
            name="welcomeMessageSent"
            value={formData.welcomeMessageSent || false}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">WhatsApp Message Sent</label>

          <select
            name="whatsappMessageSent"
            value={formData.whatsappMessageSent || false}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Accommodation Required</label>

          <select
            name="accommodationRequired"
            value={formData.accommodationRequired || "No"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Transport Required</label>

          <select
            name="transportRequired"
            value={formData.transportRequired || "No"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Laptop Required</label>

          <select
            name="laptopRequired"
            value={formData.laptopRequired || "No"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">ID Card Required</label>

          <select
            name="idCardRequired"
            value={formData.idCardRequired || "No"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">HR Welcome Kit</label>

          <select
            name="welcomeKitIssued"
            value={formData.welcomeKitIssued || "No"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Buddy Assigned</label>

          <select
            name="buddyAssigned"
            value={formData.buddyAssigned || "No"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Orientation Scheduled</label>

          <select
            name="orientationScheduled"
            value={formData.orientationScheduled || "No"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Documents Verified</label>

          <select
            name="documentsVerified"
            value={formData.documentsVerified || "Pending"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="font-semibold">Instructions</label>

          <textarea
            rows={4}
            name="joiningInstructions"
            value={formData.joiningInstructions || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Reporting instructions for employee..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">HR Notes</label>

          <textarea
            rows={4}
            name="hrNotes"
            value={formData.hrNotes || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Internal HR notes..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Employee Remarks</label>

          <textarea
            rows={4}
            name="remarks"
            value={formData.remarks || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Additional remarks..."
          />
        </div>

        <div>
          <label className="font-semibold">Overall Status</label>

          <select
            name="status"
            value={formData.status || "Pending"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="Pending">Pending</option>

            <option value="Contacted">Contacted</option>

            <option value="Documents Pending">Documents Pending</option>

            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="reset"
          className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Pre Joining"}
        </button>
      </div>
    </form>
  );
}
