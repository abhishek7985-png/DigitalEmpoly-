import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJoiningFormById } from "../../services/joiningFormService";

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>

    <p className="font-semibold">{value || "-"}</p>
  </div>
);

export default function ViewJoiningForm() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getJoiningFormById(id);
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-8">Joining Form Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Info label="Employee Code" value={data.employeeCode} />
        <Info label="Name" value={`${data.firstName} ${data.lastName}`} />
        <Info label="Email" value={data.email} />
        <Info label="Phone" value={data.phone} />
        <Info label="Gender" value={data.gender} />
        <Info label="Joining Date" value={data.joiningDate?.substring(0, 10)} />
        <Info label="Status" value={data.status} />
      </div>
    </div>
  );
}
