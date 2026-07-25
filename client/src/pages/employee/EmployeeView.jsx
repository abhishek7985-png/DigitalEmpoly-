import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployeeById } from "../../services/employeeService";

const EmployeeView = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadEmployee = async () => {
    try {
      const data = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadEmployee();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading Employee Details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6 text-center text-red-600">Employee not found.</div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Profile</h1>

        <Link
          to="/employee"
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Back
        </Link>
      </div>

      {/* Basic Information */}

      <Section title="Basic Information">
        <Info label="Employee ID" value={employee.employeeId} />
        <Info label="Name" value={employee.name} />
        <Info label="Email" value={employee.email} />
        <Info label="Phone" value={employee.phone} />
        <Info label="Gender" value={employee.gender} />
        <Info
          label="Date Of Birth"
          value={
            employee.dob ? new Date(employee.dob).toLocaleDateString() : "-"
          }
        />
      </Section>

      {/* Employment */}

      <Section title="Employment Details">
        <Info
          label="Department"
          value={
            employee.department?.departmentName ||
            employee.department?.name ||
            "-"
          }
        />
        <Info label="Designation" value={employee.designation} />
        <Info
          label="Joining Date"
          value={
            employee.joiningDate
              ? new Date(employee.joiningDate).toLocaleDateString()
              : "-"
          }
        />
        <Info label="Employment Type" value={employee.employmentType} />
        <Info label="Reporting Manager" value={employee.reportingManager} />
        <Info label="Status" value={employee.status} />
      </Section>

      {/* Contact */}

      <Section title="Contact Details">
        <Info label="Personal Mobile" value={employee.personalMobile} />
        <Info label="Official Mobile" value={employee.officialMobile} />
        <Info label="Personal Email" value={employee.personalEmail} />
        <Info label="Official Email" value={employee.officialEmail} />
        <Info label="Present Address" value={employee.presentAddress} />
        <Info label="Permanent Address" value={employee.permanentAddress} />
        <Info
          label="Emergency Contact"
          value={`${employee.emergencyContactName || "-"} ${
            employee.emergencyContactNumber
              ? `(${employee.emergencyContactNumber})`
              : ""
          }`}
        />
      </Section>

      {/* Identity */}

      <Section title="Identity Details">
        <Info label="Aadhaar Number" value={employee.aadhaarNumber} />
        <Info label="PAN Number" value={employee.panNumber} />
        <Info label="Passport Number" value={employee.passportNumber} />
        <Info label="Driving License" value={employee.drivingLicenseNumber} />
        <Info label="UAN Number" value={employee.uanNumber} />
        <Info label="ESIC Number" value={employee.esicNumber} />
      </Section>

      {/* Bank */}

      <Section title="Bank Details">
        <Info label="Bank Name" value={employee.bankName} />
        <Info label="Account Number" value={employee.accountNumber} />
        <Info label="IFSC Code" value={employee.ifscCode} />
        <Info label="Branch Name" value={employee.branchName} />
      </Section>

      {/* Education */}

      <Section title="Education & Experience">
        <Info
          label="Highest Qualification"
          value={employee.highestQualification}
        />
        <Info label="Total Experience" value={employee.totalExperience} />
      </Section>

      {/* Assets */}

      <Section title="Company Assets">
        <Info
          label="Employee Card Number"
          value={employee.employeeCardNumber}
        />
        <Info
          label="Laptop Issued"
          value={employee.laptopIssued ? "Yes" : "No"}
        />
        <Info label="SIM Number" value={employee.simNumber} />
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-blue-700 mb-5">{title}</h2>

      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
};

const Info = ({ label, value }) => {
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="font-semibold">{value || "-"}</p>
    </div>
  );
};

export default EmployeeView;
