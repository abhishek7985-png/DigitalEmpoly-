import React, { useEffect, useState } from "react";
import { getAllEmployees, removeEmployee } from "../services/employeeService";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    try {
      const data = await getAllEmployees();

      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete Employee?")) {
      await removeEmployee(id);

      loadEmployees();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Employee Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Code</th>

              <th className="border p-2">Name</th>

              <th className="border p-2">Email</th>

              <th className="border p-2">Phone</th>

              <th className="border p-2">Gender</th>

              <th className="border p-2">Joining Date</th>

              <th className="border p-2">Status</th>

              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td className="border p-2">{emp.employeeCode}</td>

                <td className="border p-2">
                  {emp.firstName} {emp.lastName}
                </td>

                <td className="border p-2">{emp.email}</td>

                <td className="border p-2">{emp.phone}</td>

                <td className="border p-2">{emp.gender}</td>

                <td className="border p-2">
                  {new Date(emp.joiningDate).toLocaleDateString()}
                </td>

                <td className="border p-2">{emp.status}</td>

                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
