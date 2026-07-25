import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMonitor,
  FiUser,
  FiCpu,
  FiCalendar,
  FiHash,
  FiFileText,
} from "react-icons/fi";

import { getAssetById } from "../../api/itAssetApi";

export default function ViewITAsset() {
  const { id } = useParams();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAsset();
  }, []);

  const loadAsset = async () => {
    try {
      const res = await getAssetById(id);

      console.log("Asset Response:", res);

      setAsset(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl">
        Loading...
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl text-red-500">
        Asset Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-blue-700 text-white p-8">
          <h1 className="text-3xl font-bold">IT Asset Details</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <div className="flex gap-3">
              <FiUser className="text-blue-600 text-xl" />
              <div>
                <p className="text-gray-500">Employee</p>

                <h3 className="font-semibold">
                  {asset.employee
                    ? `${asset.employee.employeeCode || ""} ${asset.employee.firstName || ""} ${asset.employee.lastName || ""}`
                    : "-"}
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <FiMonitor className="text-blue-600 text-xl" />
              <div>
                <p className="text-gray-500">Asset Name</p>
                <h3 className="font-semibold">{asset.assetName || "-"}</h3>
              </div>
            </div>

            <div className="flex gap-3">
              <FiCpu className="text-blue-600 text-xl" />
              <div>
                <p className="text-gray-500">Asset Type</p>
                <h3 className="font-semibold">{asset.assetType || "-"}</h3>
              </div>
            </div>

            <div className="flex gap-3">
              <FiHash className="text-blue-600 text-xl" />
              <div>
                <p className="text-gray-500">Asset Code</p>
                <h3>{asset.assetCode || "-"}</h3>
              </div>
            </div>

            <div className="flex gap-3">
              <FiHash className="text-blue-600 text-xl" />
              <div>
                <p className="text-gray-500">Serial Number</p>
                <h3>{asset.serialNumber || "-"}</h3>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-gray-500">Brand</p>
              <h3 className="font-semibold">{asset.brand || "-"}</h3>
            </div>

            <div className="flex gap-3">
              <FiCalendar className="text-green-600 text-xl" />
              <div>
                <p className="text-gray-500">Issue Date</p>
                <h3>
                  {asset.issueDate
                    ? new Date(asset.issueDate).toLocaleDateString()
                    : "-"}
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <FiCalendar className="text-red-600 text-xl" />
              <div>
                <p className="text-gray-500">Return Date</p>
                <h3>
                  {asset.returnDate
                    ? new Date(asset.returnDate).toLocaleDateString()
                    : "-"}
                </h3>
              </div>
            </div>

            <div>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                {asset.status || "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="bg-slate-100 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-semibold mb-3">
              <FiFileText />
              Remarks
            </h3>

            <p>{asset.remarks || "No Remarks"}</p>
          </div>
        </div>

        <div className="border-t p-6 flex justify-end">
          <Link
            to="/itassets"
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
