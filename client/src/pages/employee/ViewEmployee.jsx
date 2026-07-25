import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployee } from "../../services/employeeService";

const EmployeeView = () => {
  const { id } = useParams();

  const [emp, setEmp] = useState(null);

  useEffect(() => {
    getEmployee(id).then((data) => setEmp(data));
  }, []);

  if (!emp) return <h2>Loading...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Employee Details</h1>

      <p>
        <b>Name:</b>
        {emp.firstName} {emp.lastName}
      </p>

      <p>
        <b>Email:</b>
        {emp.email}
      </p>

      <p>
        <b>Phone:</b>
        {emp.phone}
      </p>

      <p>
        <b>Gender:</b>
        {emp.gender}
      </p>

      <p>
        <b>Joining Date:</b>
        {new Date(emp.joiningDate).toLocaleDateString()}
      </p>

      <p>
        <b>Status:</b>
        {emp.status}
      </p>

      <h2 className="text-xl mt-5">Address</h2>

      <p>
        {emp.address?.city},{emp.address?.state}
      </p>
    </div>
  );
};

export default EmployeeView;
