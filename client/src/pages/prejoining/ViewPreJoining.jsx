import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getPreJoiningById } from "../../services/preJoiningService";

const ViewPreJoining = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await getPreJoiningById(id);

      setData(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-2xl font-bold text-blue-600">Loading...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center text-red-600">Record Not Found</div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pre Joining Details</h1>

        <Link
          to="/prejoining"
          className="bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Back
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-5 border-b pb-3">
          Employee Information
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info label="Employee" value={data.employee?.name} />

          <Info label="Email" value={data.employee?.email} />

          <Info label="Phone" value={data.employee?.phone} />

          <Info label="Department" value={data.department?.departmentName} />

          <Info label="Designation" value={data.designation?.designationName} />

          <Info label="Reporting Manager" value={data.reportingManager?.name} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-5 border-b pb-3">
          Joining Details
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info
            label="Joining Date"
            value={
              data.joiningDate
                ? new Date(data.joiningDate).toLocaleDateString()
                : "-"
            }
          />

          <Info label="Joining Time" value={data.joiningTime} />

          <Info
            label="Reporting Date"
            value={
              data.reportingDate
                ? new Date(data.reportingDate).toLocaleDateString()
                : "-"
            }
          />

          <Info label="Reporting Time" value={data.reportingTime} />

          <Info label="Reporting Location" value={data.reportingLocation} />

          <Info label="Office Address" value={data.officeAddress} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold border-b pb-3 mb-5">
          Welcome & Communication
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info
            label="Welcome Email"
            value={data.welcomeEmailSent ? "Sent" : "Pending"}
          />

          <Info
            label="WhatsApp"
            value={data.welcomeWhatsappSent ? "Sent" : "Pending"}
          />

          <Info label="SMS" value={data.welcomeSmsSent ? "Sent" : "Pending"} />

          <Info
            label="Offer Accepted"
            value={data.offerAccepted ? "Yes" : "No"}
          />

          <Info label="Dress Code" value={data.dressCode} />

          <Info label="Induction Schedule" value={data.inductionSchedule} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold border-b pb-3 mb-5">Accommodation</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info
            label="Accommodation Required"
            value={data.accommodationRequired ? "Yes" : "No"}
          />

          <Info label="Hotel Name" value={data.hotelName} />

          <Info label="Hotel Address" value={data.hotelAddress} />

          <Info
            label="Check In"
            value={
              data.checkInDate
                ? new Date(data.checkInDate).toLocaleDateString()
                : "-"
            }
          />

          <Info
            label="Check Out"
            value={
              data.checkOutDate
                ? new Date(data.checkOutDate).toLocaleDateString()
                : "-"
            }
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold border-b pb-3 mb-5">Transportation</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info
            label="Transportation"
            value={data.transportationRequired ? "Yes" : "No"}
          />

          <Info label="Transport Type" value={data.transportType} />

          <Info label="Pickup Location" value={data.pickupLocation} />

          <Info label="Pickup Time" value={data.pickupTime} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold border-b pb-3 mb-5">IT Preparation</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info label="Laptop" value={data.laptopRequired ? "Ready" : "No"} />

          <Info
            label="Email"
            value={data.emailCreated ? "Created" : "Pending"}
          />

          <Info
            label="ID Card"
            value={data.idCardReady ? "Ready" : "Pending"}
          />

          <Info
            label="SIM Card"
            value={data.simCardReady ? "Ready" : "Pending"}
          />

          <Info
            label="Software"
            value={data.softwareInstalled ? "Installed" : "Pending"}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold border-b pb-3 mb-5">IT Preparation</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info label="Laptop" value={data.laptopRequired ? "Ready" : "No"} />

          <Info
            label="Email"
            value={data.emailCreated ? "Created" : "Pending"}
          />

          <Info
            label="ID Card"
            value={data.idCardReady ? "Ready" : "Pending"}
          />

          <Info
            label="SIM Card"
            value={data.simCardReady ? "Ready" : "Pending"}
          />

          <Info
            label="Software"
            value={data.softwareInstalled ? "Installed" : "Pending"}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold border-b pb-3 mb-5">
          Documents Required
        </h2>

        <div className="flex flex-wrap gap-2">
          {data.documentsRequired?.length ? (
            data.documentsRequired.map((doc, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
              >
                {doc}
              </span>
            ))
          ) : (
            <span>No Documents</span>
          )}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold border-b pb-3 mb-5">Remarks</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <Info label="HR Remarks" value={data.hrRemarks} />

          <Info label="Employee Remarks" value={data.employeeRemarks} />
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-3">Current Status</h3>

          <span
            className={`px-5 py-2 rounded-full text-white font-semibold
      ${
        data.status === "Completed"
          ? "bg-green-600"
          : data.status === "In Progress"
            ? "bg-yellow-500"
            : "bg-red-500"
      }`}
          >
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="font-semibold text-gray-800 break-words">{value || "-"}</p>
    </div>
  );
};

// 👇 SABSE LAST LINE

export default ViewPreJoining;
