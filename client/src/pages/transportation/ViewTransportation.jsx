import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getTransportationById } from "../../api/transportationApi";

export default function ViewTransportation() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getTransportationById(id);

      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">Transportation Details</h1>

      <div className="space-y-4">
        <p>
          <b>Employee:</b> {data.employee?.firstName} {data.employee?.lastName}
        </p>

        <p>
          <b>Type:</b> {data.transportType}
        </p>

        <p>
          <b>From:</b> {data.fromLocation}
        </p>

        <p>
          <b>To:</b> {data.toLocation}
        </p>

        <p>
          <b>Date:</b> {data.travelDate}
        </p>

        <p>
          <b>Status:</b> {data.status}
        </p>

        <p>
          <b>Remarks:</b> {data.remarks || "-"}
        </p>
      </div>

      <Link
        to="/transportation"
        className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Back
      </Link>
    </div>
  );
}
