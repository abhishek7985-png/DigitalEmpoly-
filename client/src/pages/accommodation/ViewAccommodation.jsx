import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiHome,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiHash,
  FiFileText,
} from "react-icons/fi";

import { getAccommodationById } from "../../services/accommodationService";

export default function ViewAccommodation() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccommodation();
  }, []);

  const loadAccommodation = async () => {
    try {
      setLoading(true);

      const accommodation = await getAccommodationById(id);

      setData(accommodation);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load accommodation");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Accommodation Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-8">
          <h1 className="text-3xl font-bold">Accommodation Details</h1>

          <p className="text-blue-100 mt-2">Employee Stay Information</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FiUser className="text-blue-600" />

              <div>
                <p className="text-gray-500">Employee</p>

                <h3 className="font-semibold">{data.employee?.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiHome className="text-blue-600" />

              <div>
                <p className="text-gray-500">Hotel</p>

                <h3 className="font-semibold">{data.accommodationName}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiMapPin className="text-blue-600" />

              <div>
                <p className="text-gray-500">City</p>

                <h3 className="font-semibold">{data.city}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiHash className="text-blue-600" />

              <div>
                <p className="text-gray-500">Room Number</p>

                <h3 className="font-semibold">{data.roomNumber}</h3>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FiCalendar className="text-green-600" />

              <div>
                <p className="text-gray-500">Check In</p>

                <h3 className="font-semibold">
                  {data.checkOutDate
                    ? new Date(data.checkOutDate).toLocaleDateString()
                    : "-"}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar className="text-red-600" />

              <div>
                <p className="text-gray-500">Check Out</p>

                <h3 className="font-semibold">
                  {new Date(data.checkOutDate).toLocaleDateString()}
                </h3>
              </div>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Status</p>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                {data.status}
              </span>
            </div>
          </div>
        </div>

        <div className="px-8">
          <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <FiMapPin />
              Address
            </h3>

            <p>{data.address}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <FiFileText />
              Remarks
            </h3>

            <p>{data.remarks || "No Remarks"}</p>
          </div>
        </div>

        <div className="border-t p-6 flex justify-end">
          <Link
            to="/accommodation"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <FiArrowLeft />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
