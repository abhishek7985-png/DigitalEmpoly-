import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAccommodationById,
  updateAccommodation,
} from "../../services/accommodationService";

export default function EditAccommodation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    accommodationType: "",
    accommodationName: "",
    city: "",
    address: "",
    roomNumber: "",
    contactPerson: "",
    contactNumber: "",
    checkInDate: "",
    checkOutDate: "",
    status: "Pending",
    remarks: "",
  });

  useEffect(() => {
    loadAccommodation();
  }, []);

  const loadAccommodation = async () => {
    try {
      const data = await getAccommodationById(id);

      setForm({
        employee: data.employee?._id || data.employee || "",
        accommodationType: data.accommodationType || "",
        accommodationName: data.accommodationName || "",
        city: data.city || "",
        address: data.address || "",
        roomNumber: data.roomNumber || "",
        contactPerson: data.contactPerson || "",
        contactNumber: data.contactNumber || "",
        checkInDate: data.checkInDate ? data.checkInDate.substring(0, 10) : "",
        checkOutDate: data.checkOutDate
          ? data.checkOutDate.substring(0, 10)
          : "",
        status: data.status || "Pending",
        remarks: data.remarks || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to load data");
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateAccommodation(id, form);

      toast.success("Accommodation Updated");

      navigate("/accommodation");
    } catch {
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Accommodation</h1>

      <form onSubmit={submitHandler} className="grid grid-cols-2 gap-6">
        <input
          className="border rounded-xl p-3"
          name="employee"
          value={form.employee}
          onChange={changeHandler}
          placeholder="Employee"
        />

        <input
          className="border rounded-xl p-3"
          name="accommodationName"
          value={form.accommodationName}
          onChange={changeHandler}
          placeholder="Hotel"
        />

        <input
          className="border rounded-xl p-3"
          name="city"
          value={form.city}
          onChange={changeHandler}
          placeholder="City"
        />

        <input
          className="border rounded-xl p-3"
          name="roomNumber"
          value={form.roomNumber}
          onChange={changeHandler}
          placeholder="Room"
        />

        <input
          type="date"
          className="border rounded-xl p-3"
          name="checkInDate"
          value={form.checkInDate?.substring(0, 10)}
          onChange={changeHandler}
        />

        <input
          type="date"
          className="border rounded-xl p-3"
          name="checkOutDate"
          value={form.checkOutDate?.substring(0, 10)}
          onChange={changeHandler}
        />

        <textarea
          className="border rounded-xl p-3 col-span-2"
          rows="3"
          name="address"
          value={form.address}
          onChange={changeHandler}
        />

        <textarea
          className="border rounded-xl p-3 col-span-2"
          rows="3"
          name="remarks"
          value={form.remarks}
          onChange={changeHandler}
        />

        <select
          className="border rounded-xl p-3"
          name="status"
          value={form.status}
          onChange={changeHandler}
        >
          <option>Allocated</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <div className="flex gap-4 items-end">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl">
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/accommodation")}
            className="border px-8 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
