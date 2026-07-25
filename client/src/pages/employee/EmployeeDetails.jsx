import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  User,
  BadgeCheck,
  Pencil,
} from "lucide-react";
import API from "../../api/axios";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    try {
      const res = await API.get(`/employee/${id}`);
      setEmployee(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-600">Employee Not Found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={() => navigate(`/employees/edit/${employee._id}`)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit Employee
        </button>
      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={employee.photo || "https://i.pravatar.cc/200"}
            alt="employee"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
          />

          <div>
            <h1 className="text-4xl font-bold">{employee.name}</h1>

            <p className="text-slate-500 mt-2">{employee.designation}</p>

            <div className="mt-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  employee.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {employee.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>

          <div className="space-y-5">
            <Info
              icon={<User size={18} />}
              label="Employee Name"
              value={employee.name}
            />

            <Info
              icon={<Mail size={18} />}
              label="Email"
              value={employee.email}
            />

            <Info
              icon={<Phone size={18} />}
              label="Phone"
              value={employee.phone}
            />

            <Info
              icon={<Calendar size={18} />}
              label="Joining Date"
              value={employee.joiningDate}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Company Information</h2>

          <div className="space-y-5">
            <Info
              icon={<Building2 size={18} />}
              label="Department"
              value={employee.department}
            />

            <Info
              icon={<Briefcase size={18} />}
              label="Designation"
              value={employee.designation}
            />

            <Info
              icon={<BadgeCheck size={18} />}
              label="Status"
              value={employee.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 border-b pb-4">
      <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>

        <h3 className="font-semibold">{value || "-"}</h3>
      </div>
    </div>
  );
}
