import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmployeeForm from "./EmployeeForm";
import { createEmployee } from "../../api/employeeApi";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // ===========================
      // FormData Build
      // ===========================
      Object.keys(data).forEach((key) => {
        if (key === "photo" || key === "resume") {
          if (data[key] && data[key].length > 0) {
            formData.append(key, data[key][0]);
          }
        } else {
          if (
            data[key] !== undefined &&
            data[key] !== null &&
            data[key] !== ""
          ) {
            formData.append(key, data[key]);
          }
        }
      });

      // ===========================
      // Required Backend Mapping
      // ===========================

      // Employee Model me "email" required hai
      //formData.append("email", data.officialEmail || data.personalEmail || "");

      // Employee Model me "phone" field hai
      //   //formData.append(
      //     "phone",
      //     data.personalMobile || data.officialMobile || "",
      //  // );

      // Agar employeeId empty ho to auto generate
      if (!data.employeeId) {
        formData.append("employeeId", "EMP" + Date.now().toString().slice(-6));
      }

      console.log("Submitting Employee Data...");

      const response = await createEmployee(formData);

      console.log("Employee Created :", response.data);

      toast.success("Employee Added Successfully");

      navigate("/employees");
    } catch (err) {
      console.error("Employee Add Error:", err.response?.data || err);

      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((item) => {
          toast.error(item.msg);
        });
      } else {
        toast.error(err.response?.data?.message || "Failed to Add Employee");
      }
    } finally {
      setLoading(false);
    }
  };

  return <EmployeeForm onSubmit={onSubmit} loading={loading} />;
}
