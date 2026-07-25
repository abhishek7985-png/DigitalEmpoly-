import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";

export default function DocumentForm({
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-lg p-8 space-y-8"
    >
      <h2 className="text-2xl font-bold text-blue-700">
        Employee Document Upload
      </h2>

      {/* Employee Details */}

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
          <label className="font-semibold">Document Type</label>

          <select
            name="documentType"
            value={formData.documentType || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="">Select Document</option>

            <option value="Aadhaar">Aadhaar Card</option>

            <option value="PAN">PAN Card</option>

            <option value="Passport">Passport</option>

            <option value="Driving License">Driving License</option>

            <option value="Resume">Resume</option>

            <option value="Offer Letter">Offer Letter</option>

            <option value="Experience Letter">Experience Letter</option>

            <option value="Salary Slip">Salary Slip</option>

            <option value="Degree">Degree Certificate</option>

            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Document Number</label>

          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Expiry Date</label>

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>
        <div>
          <label className="font-semibold">Upload Document</label>

          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />

          {formData.file && (
            <p className="text-sm text-green-600 mt-2">
              Selected File : {formData.file.name || formData.file}
            </p>
          )}
        </div>

        <div>
          <label className="font-semibold">Verification Status</label>

          <select
            name="status"
            value={formData.status || "Pending"}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option value="Pending">Pending</option>

            <option value="Verified">Verified</option>

            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Remarks</label>

          <textarea
            rows={4}
            name="remarks"
            value={formData.remarks || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Enter remarks..."
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
            placeholder="Internal HR Notes..."
          />
        </div>
      </div>

      {/* Action Buttons */}

      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() =>
            setFormData({
              employee: "",
              documentType: "",
              documentNumber: "",
              expiryDate: "",
              file: null,
              status: "Pending",
              remarks: "",
              hrNotes: "",
            })
          }
          className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg transition"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </div>
    </form>
  );
}
