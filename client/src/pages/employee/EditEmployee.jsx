import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import EmployeeForm from "./EmployeeForm";
import { getEmployee, updateEmployee } from "../../api/employeeApi";

export default function EditEmployee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const res = await getEmployee(id);

      setEmployee(res.data.data);
    } catch (err) {
      toast.error("Employee Not Found");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "photo" || key === "resume") {
          if (data[key]?.length > 0) {
            formData.append(key, data[key][0]);
          }
        } else {
          if (data[key] !== "") {
            formData.append(key, data[key]);
          }
        }
      });

      await updateEmployee(id, formData);

      toast.success("Employee Updated Successfully");

      navigate("/employees");
    } catch (err) {
      console.log("Employee Update Error:", err.response?.data || err);

      toast.error(err.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  }

  return (
    <EmployeeForm
      defaultValues={employee}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}
