import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import EmployeeForm from "./EmployeeForm";

import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

const EmployeeEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(false);

  const loadEmployee = async () => {
    try {
      const employee = await getEmployeeById(id);

      setEmployee(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);

      await updateEmployee(id, data);

      alert("Employee Updated Successfully");

      navigate("/employees");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!employee) {
    return <div className="p-6">Loading Employee...</div>;
  }

  return (
    <div className="p-6">
      <EmployeeForm
        onSubmit={handleUpdate}
        defaultValues={employee}
        loading={loading}
      />
    </div>
  );
};

export default EmployeeEdit;
