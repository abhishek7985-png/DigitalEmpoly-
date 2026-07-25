import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { FaIdCard, FaUser, FaPrint, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { createIDCard, updateIDCard } from "../../api/idCardApi";

const API = "http://localhost:5000/api/v1";

const IDCardForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const printRef = useRef();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [cardId, setCardId] = useState(null);

  // =========================
  // Departments
  // =========================

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/departments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDepartments(res.data.data || res.data.departments || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // Designations
  // =========================

  const fetchDesignations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/designations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDesignations(res.data.data || res.data.designations || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // Employees
  // =========================

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("EMPLOYEE RESPONSE", res.data);

      setEmployees(res.data.data || res.data.employees || []);
    } catch (error) {
      console.log(error);

      toast.error("Employee load failed");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchDesignations();
  }, []);

  // =========================
  // Employee Auto Fill FIXED
  // =========================

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;

    const employee = employees.find((emp) => emp._id === employeeId);

    if (employee) {
      console.log("SELECTED EMPLOYEE", employee);

      setValue("employee", employee._id);

      setValue(
        "employeeName",
        employee.name || employee.fullName || employee.employeeName || "",
      );

      setValue("employeeCode", employee.employeeCode || "");

      setValue(
        "department",
        employee.department?._id ||
          employee.department?.id ||
          employee.departmentId ||
          employee.department ||
          "",
      );

      setValue(
        "designation",
        employee.designation?._id ||
          employee.designation?.id ||
          employee.designationId ||
          employee.designation ||
          "",
      );

      setValue("bloodGroup", employee.bloodGroup || "");

      setValue("status", "Generated");

      // check values
      console.log("ID CARD VALUES", {
        employeeName:
          employee.name || employee.fullName || employee.employeeName,

        department:
          employee.department?._id ||
          employee.departmentId ||
          employee.department,

        designation:
          employee.designation?._id ||
          employee.designationId ||
          employee.designation,
      });
    }
  }; // =========================
  // Submit Handler
  // =========================

  const submitHandler = async (data) => {
    console.log("SUBMIT DATA", data);

    try {
      setLoading(true);

      const payload = {
        employee: data.employee,

        employeeName: data.employeeName,

        cardNumber: data.cardNumber,

        employeeCode: data.employeeCode,

        department: data.department,

        designation: data.designation,

        bloodGroup: data.bloodGroup,

        issueDate: data.issueDate,

        expiryDate: data.expiryDate,

        status: data.status,
      };

      console.log("FINAL PAYLOAD", payload);

      if (editMode) {
        await updateIDCard(cardId, payload);

        toast.success("ID Card Updated");
      } else {
        await createIDCard(payload);

        toast.success("ID Card Created");
      }

      reset();
    } catch (error) {
      console.log("ID CARD ERROR", error);

      toast.error(error.response?.data?.message || "ID Card Save Failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Print
  // =========================

  const printCard = () => {
    const content = printRef.current.innerHTML;

    const win = window.open("", "", "width=800,height=700");

    win.document.write(`

    <html>

    <head>

    <title>
    Employee ID Card
    </title>


    <style>

    body{

    display:flex;

    justify-content:center;

    font-family:Arial;

    }

    </style>


    </head>


    <body>

    ${content}

    </body>


    </html>

    `);

    win.document.close();

    win.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-4 border-b pb-5 mb-8">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            <FaIdCard size={30} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Create Employee ID Card
            </h1>

            <p className="text-gray-500">Digital Employee Identity Card</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Employee */}

          <div>
            <label className="font-semibold text-gray-700">Employee Name</label>

            <select
              className="w-full mt-2 border rounded-lg p-3"
              onChange={handleEmployeeChange}
              {...register("employee", {
                required: "Employee Required",
              })}
            >
              <input type="hidden" {...register("employeeName")} />
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {errors.employee && (
              <p className="text-red-500 text-sm">{errors.employee.message}</p>
            )}
          </div>

          {/* Card Number */}

          <div>
            <label className="font-semibold text-gray-700">Card Number</label>

            <input
              placeholder="CARD-001"
              className="w-full mt-2 border rounded-lg p-3"
              {...register("cardNumber", {
                required: "Card Number Required",
              })}
            />
          </div>

          {/* Employee Code */}

          <div>
            <label className="font-semibold text-gray-700">Employee Code</label>

            <input
              placeholder="EMP1001"
              className="w-full mt-2 border rounded-lg p-3"
              {...register("employeeCode", {
                required: "Employee Code Required",
              })}
            />
          </div>

          {/* Department */}

          <div>
            <label className="font-semibold text-gray-700">Department</label>

            <select
              className="w-full mt-2 border rounded-lg p-3"
              {...register("department", {
                required: "Department Required",
              })}
            >
              <option value="">Select Department</option>

              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}

          <div>
            <label className="font-semibold text-gray-700">Designation</label>

            <select
              className="w-full mt-2 border rounded-lg p-3"
              {...register("designation", {
                required: "Designation Required",
              })}
            >
              <option value="">Select Designation</option>

              {designations.map((des) => (
                <option key={des._id} value={des._id}>
                  {des.name}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Group */}

          <div>
            <label className="font-semibold text-gray-700">Blood Group</label>

            <select
              className="w-full mt-2 border rounded-lg p-3"
              {...register("bloodGroup", {
                required: "Blood Group Required",
              })}
            >
              <option value="">Select Blood Group</option>

              <option value="A+">A+</option>

              <option value="A-">A-</option>

              <option value="B+">B+</option>

              <option value="B-">B-</option>

              <option value="O+">O+</option>

              <option value="O-">O-</option>

              <option value="AB+">AB+</option>

              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Issue Date */}

          <div>
            <label className="font-semibold text-gray-700">Issue Date</label>

            <input
              type="date"
              className="w-full mt-2 border rounded-lg p-3"
              {...register("issueDate", {
                required: "Issue Date Required",
              })}
            />
          </div>

          {/* Expiry Date */}

          <div>
            <label className="font-semibold text-gray-700">Expiry Date</label>

            <input
              type="date"
              className="w-full mt-2 border rounded-lg p-3"
              {...register("expiryDate", {
                required: "Expiry Date Required",
              })}
            />
          </div>

          {/* Status */}

          <div>
            <label className="font-semibold text-gray-700">Status</label>

            <select
              className="w-full mt-2 border rounded-lg p-3"
              {...register("status", {
                required: "Status Required",
              })}
            >
              <option value="">Select Status</option>

              <option value="Pending">Pending</option>

              <option value="Generated">Generated</option>

              <option value="Printed">Printed</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end mt-5">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              <FaSave />

              {loading ? "Saving..." : "Save ID Card"}
            </button>
          </div>
        </form>

        {/* =========================
        ID CARD PREVIEW
========================= */}

        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
            <FaIdCard />
            ID Card Preview
          </h2>

          <div ref={printRef} className="flex justify-center">
            <div className="w-full max-w-[350px] min-h-[520px] bg-white rounded-2xl shadow-xl border overflow-hidden">
              {/* Header */}

              <div className="bg-blue-700 text-white text-center p-5">
                <h1 className="text-2xl font-bold">OLECTRA</h1>

                <p className="text-sm">Employee Identity Card</p>
              </div>

              {/* Profile */}

              <div className="flex justify-center mt-6">
                <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-blue-600 flex items-center justify-center text-gray-400">
                  <FaUser size={45} />
                </div>
              </div>

              {/* Name */}

              <div className="text-center mt-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {employees.find((emp) => emp._id === watch("employee"))
                    ?.name || "Employee Name"}
                </h2>

                <p className="text-blue-600 font-semibold">
                  {designations.find((des) => des._id === watch("designation"))
                    ?.name || "Designation"}
                </p>
              </div>

              <div className="px-6 mt-6 space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Employee Code</span>

                  <span className="font-semibold">
                    {watch("employeeCode") || "EMP001"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Department</span>

                  <span className="font-semibold">
                    {departments.find((dep) => dep._id === watch("department"))
                      ?.name || "Department"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Blood Group</span>

                  <span className="font-semibold">
                    {watch("bloodGroup") || "O+"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Valid Till</span>

                  <span className="font-semibold">
                    {watch("expiryDate") || "DD-MM-YYYY"}
                  </span>
                </div>
              </div>

              {/* QR */}

              <div className="flex justify-center mt-6">
                <QRCodeCanvas
                  value={JSON.stringify({
                    employee: watch("employee"),

                    employeeCode: watch("employeeCode"),

                    cardNumber: watch("cardNumber"),
                  })}
                  size={90}
                />
              </div>

              <div className="mt-5 bg-gray-100 text-center text-xs p-3 text-gray-500">
                If found please return to HR Department
              </div>
            </div>
          </div>

          {/* Print Button */}

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={printCard}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              <FaPrint />
              Print ID Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCardForm;
