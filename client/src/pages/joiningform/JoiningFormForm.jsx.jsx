import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";

export default function JoiningFormForm({
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
      setEmployees(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-lg p-8 space-y-8"
    >
      <h2 className="text-2xl font-bold text-blue-700">Joining Form</h2>

      {/* ================= Employee Details ================= */}

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Employee Details
        </h3>

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
                  {emp.employeeCode} - {emp.firstName} {emp.lastName}
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
        </div>
      </div>

      {/* ================= Joining Details ================= */}

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Joining Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <label className="font-semibold">Joining Time</label>

            <input
              type="time"
              name="joiningTime"
              value={formData.joiningTime || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Office Location</label>

            <input
              type="text"
              name="officeLocation"
              value={formData.officeLocation || ""}
              onChange={handleChange}
              placeholder="Office Location"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Work Location</label>

            <input
              type="text"
              name="workLocation"
              value={formData.workLocation || ""}
              onChange={handleChange}
              placeholder="Work Location"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Employee Type</label>

            <select
              name="employeeType"
              value={formData.employeeType || "Permanent"}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option>Permanent</option>
              <option>Contract</option>
              <option>Intern</option>
              <option>Consultant</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Shift</label>

            <input
              type="text"
              name="shift"
              value={formData.shift || ""}
              onChange={handleChange}
              placeholder="General Shift"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>
        </div>
      </div>
      {/* ================= Bank Details ================= */}

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Bank Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold">Bank Name</label>

            <input
              type="text"
              name="bankName"
              value={formData.bankName || ""}
              onChange={handleChange}
              placeholder="Enter Bank Name"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Account Holder Name</label>

            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName || ""}
              onChange={handleChange}
              placeholder="Account Holder"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Account Number</label>

            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber || ""}
              onChange={handleChange}
              placeholder="XXXXXXXXXXXX"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">IFSC Code</label>

            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode || ""}
              onChange={handleChange}
              placeholder="SBIN0001234"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>
        </div>
      </div>

      {/* ================= Government Details ================= */}

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Government Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold">PAN Number</label>

            <input
              type="text"
              name="panNumber"
              value={formData.panNumber || ""}
              onChange={handleChange}
              placeholder="ABCDE1234F"
              className="w-full border rounded-lg p-3 mt-1 uppercase"
            />
          </div>

          <div>
            <label className="font-semibold">Aadhaar Number</label>

            <input
              type="text"
              name="aadhaarNumber"
              value={formData.aadhaarNumber || ""}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">UAN Number</label>

            <input
              type="text"
              name="uanNumber"
              value={formData.uanNumber || ""}
              onChange={handleChange}
              placeholder="Universal Account Number"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">PF Number</label>

            <input
              type="text"
              name="pfNumber"
              value={formData.pfNumber || ""}
              onChange={handleChange}
              placeholder="Provident Fund Number"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">ESI Number</label>

            <input
              type="text"
              name="esiNumber"
              value={formData.esiNumber || ""}
              onChange={handleChange}
              placeholder="ESI Number"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>
        </div>
      </div>
      {/* ================= Emergency Contact ================= */}

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Emergency Contact
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold">Contact Name</label>

            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Relationship</label>

            <input
              type="text"
              name="relationship"
              value={formData.relationship || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Emergency Mobile</label>

            <input
              type="text"
              name="emergencyPhone"
              value={formData.emergencyPhone || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>
        </div>
      </div>

      {/* ================= Joining Checklist ================= */}

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Joining Checklist
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold">HR Approval</label>

            <select
              name="hrApproval"
              value={formData.hrApproval || "Pending"}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
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

          <div>
            <label className="font-semibold">Employee Accepted</label>

            <select
              name="employeeAccepted"
              value={formData.employeeAccepted || "No"}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Salary Accepted</label>

            <select
              name="salaryAccepted"
              value={formData.salaryAccepted || "No"}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= Remarks ================= */}

      <div>
        <label className="font-semibold">Remarks</label>

        <textarea
          rows={4}
          name="remarks"
          value={formData.remarks || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-1"
          placeholder="Additional Notes..."
        />
      </div>

      {/* ================= Status ================= */}

      <div>
        <label className="font-semibold">Status</label>

        <select
          name="status"
          value={formData.status || "Pending"}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-1"
        >
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* ================= Buttons ================= */}

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
          {loading ? "Saving..." : "Save Joining Form"}
        </button>
      </div>
    </form>
  );
}
