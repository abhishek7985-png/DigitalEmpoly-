import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiCheck,
  FiX,
} from "react-icons/fi";

import { toast } from "react-toastify";

import {
  getAllDocuments,
  deleteDocument,
  verifyDocument,
  rejectDocument,
} from "../../api/documentApi";

export default function Documents() {
  const navigate = useNavigate();

  // ==========================
  // States
  // ==========================

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [employee, setEmployee] = useState("");

  const [refresh, setRefresh] = useState(false);

  // ==========================
  // Load Documents
  // ==========================

  useEffect(() => {
    fetchDocuments();
  }, [refresh]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const res = await getAllDocuments();

      setDocuments(res.data?.data || []);
    } catch (error) {
      console.log(error);

      toast.error("Documents load failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Delete Document
  // ==========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this document?");

    if (!confirmDelete) return;

    try {
      await deleteDocument(id);

      toast.success("Document deleted");

      setRefresh(!refresh);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ==========================
  // Verify Document
  // ==========================

  const handleVerify = async (id) => {
    try {
      await verifyDocument(id);

      toast.success("Document Verified");

      setRefresh(!refresh);
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  // ==========================
  // Reject Document
  // ==========================

  const handleReject = async (id) => {
    try {
      await rejectDocument(id);

      toast.success("Document Rejected");

      setRefresh(!refresh);
    } catch (error) {
      toast.error("Reject failed");
    }
  };
  // ==========================
  // Filter Documents
  // ==========================

  const filteredDocuments = documents.filter((doc) => {
    const searchText = search.toLowerCase();

    const employeeName = `${doc.employee?.firstName || ""} 
    ${doc.employee?.lastName || ""}`.toLowerCase();

    const matchesSearch =
      employeeName.includes(searchText) ||
      doc.documentType?.toLowerCase().includes(searchText) ||
      doc.documentNumber?.toLowerCase().includes(searchText);

    const matchesStatus = status === "" || doc.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="
    min-h-screen
    bg-gray-100
    p-6
    "
    >
      {/* Page Header */}

      <div
        className="
      max-w-7xl
      mx-auto
      "
      >
        <div
          className="
        bg-white
        rounded-xl
        shadow
        p-6
        flex
        flex-col
        md:flex-row
        justify-between
        gap-4
        "
        >
          <div>
            <h1
              className="
            text-2xl
            font-bold
            text-gray-800
            "
            >
              Employee Documents
            </h1>

            <p
              className="
            text-gray-500
            mt-1
            "
            >
              Manage uploaded employee documents
            </p>
          </div>

          <Link
            to="/documents/upload"
            className="
            flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            text-white
            px-5
            py-3
            rounded-lg
            hover:bg-blue-700
            "
          >
            <FiPlus />
            Upload Document
          </Link>
        </div>

        {/* Filters */}

        <div
          className="
        mt-6
        bg-white
        rounded-xl
        shadow
        p-5
        "
        >
          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-4
          "
          >
            {/* Search */}

            <div
              className="
            relative
            "
            >
              <FiSearch
                className="
                absolute
                left-3
                top-3.5
                text-gray-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="
                Search document...
                "
                className="
                w-full
                border
                rounded-lg
                pl-10
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                "
              />
            </div>

            {/* Status Filter */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
              border
              rounded-lg
              px-4
              py-3
              "
            >
              <option value="">All Status</option>

              <option value="Pending">Pending</option>

              <option value="Verified">Verified</option>

              <option value="Rejected">Rejected</option>
            </select>

            {/* Employee Filter Placeholder */}

            <input
              type="text"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              placeholder="
              Employee name
              "
              className="
              border
              rounded-lg
              px-4
              py-3
              "
            />

            {/* Refresh */}

            <button
              onClick={() => {
                setSearch("");

                setStatus("");

                setEmployee("");

                setRefresh(!refresh);
              }}
              className="
              flex
              items-center
              justify-center
              gap-2
              border
              rounded-lg
              hover:bg-gray-100
              "
            >
              <FiRefreshCw />
              Reset
            </button>
          </div>
        </div>

        {/* ==========================
            Documents Table
        ========================== */}

        <div
          className="
        mt-6
        bg-white
        rounded-xl
        shadow
        overflow-hidden
        "
        >
          {loading ? (
            <div
              className="
              p-10
              text-center
              text-gray-500
              "
            >
              Loading Documents...
            </div>
          ) : (
            <div
              className="
            overflow-x-auto
            "
            >
              <table
                className="
              w-full
              text-left
              "
              >
                <thead
                  className="
                bg-gray-100
                text-gray-700
                "
                >
                  <tr>
                    <th
                      className="
                    px-6
                    py-4
                    "
                    >
                      #
                    </th>

                    <th
                      className="
                    px-6
                    py-4
                    "
                    >
                      Employee
                    </th>

                    <th
                      className="
                    px-6
                    py-4
                    "
                    >
                      Document Type
                    </th>

                    <th
                      className="
                    px-6
                    py-4
                    "
                    >
                      Document No.
                    </th>

                    <th
                      className="
                    px-6
                    py-4
                    "
                    >
                      Upload Date
                    </th>

                    <th
                      className="
                    px-6
                    py-4
                    "
                    >
                      Status
                    </th>

                    <th
                      className="
                    px-6
                    py-4
                    text-center
                    "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="
                    text-center
                    py-10
                    text-gray-500
                    "
                      >
                        No Documents Found
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((doc, index) => (
                      <tr
                        key={doc._id}
                        className="
                    border-t
                    hover:bg-gray-50
                    "
                      >
                        {/* Index */}

                        <td
                          className="
                    px-6
                    py-4
                    "
                        >
                          {index + 1}
                        </td>

                        {/* Employee */}

                        <td
                          className="
                    px-6
                    py-4
                    font-medium
                    "
                        >
                          {doc.employee?.firstName} {doc.employee?.lastName}
                          <p
                            className="
                      text-xs
                      text-gray-500
                      "
                          >
                            {doc.employee?.employeeCode}
                          </p>
                        </td>

                        {/* Document Type */}

                        <td
                          className="
                    px-6
                    py-4
                    "
                        >
                          {doc.documentType}
                        </td>

                        {/* Number */}

                        <td
                          className="
                    px-6
                    py-4
                    "
                        >
                          {doc.documentNumber || "-"}
                        </td>

                        {/* Date */}

                        <td
                          className="
                    px-6
                    py-4
                    "
                        >
                          {doc.createdAt
                            ? new Date(doc.createdAt).toLocaleDateString()
                            : "-"}
                        </td>

                        {/* Status */}

                        <td
                          className="
                    px-6
                    py-4
                    "
                        >
                          {doc.status === "Verified" ? (
                            <span
                              className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      "
                            >
                              Verified
                            </span>
                          ) : doc.status === "Rejected" ? (
                            <span
                              className="
                      bg-red-100
                      text-red-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      "
                            >
                              Rejected
                            </span>
                          ) : (
                            <span
                              className="
                      bg-yellow-100
                      text-yellow-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      "
                            >
                              Pending
                            </span>
                          )}
                        </td>

                        {/* Actions */}

                        <td
                          className="
                    px-6
                    py-4
                    "
                        >
                          <div
                            className="
                      flex
                      justify-center
                      gap-2
                      "
                          >
                            {/* View */}

                            <button
                              onClick={() =>
                                navigate(`/documents/view/${doc._id}`)
                              }
                              className="
                          p-2
                          rounded-lg
                          bg-blue-100
                          text-blue-600
                          hover:bg-blue-200
                          "
                            >
                              <FiEye />
                            </button>

                            {/* Edit */}

                            <button
                              onClick={() =>
                                navigate(`/documents/edit/${doc._id}`)
                              }
                              className="
                          p-2
                          rounded-lg
                          bg-green-100
                          text-green-600
                          hover:bg-green-200
                          "
                            >
                              <FiEdit />
                            </button>

                            {/* Delete */}

                            <button
                              onClick={() => handleDelete(doc._id)}
                              className="
                          p-2
                          rounded-lg
                          bg-red-100
                          text-red-600
                          hover:bg-red-200
                          "
                            >
                              <FiTrash2 />
                            </button>

                            {/* Download */}

                            <button
                              onClick={() => {
                                if (!doc.filePath) {
                                  toast.error("File not available");
                                  return;
                                }

                                const fileUrl = `http://localhost:5000/${doc.filePath.replace(/\\/g, "/")}`;

                                window.open(fileUrl, "_blank");
                              }}
                              className="
                          p-2
                          rounded-lg
                          bg-purple-100
                          text-purple-600
                          hover:bg-purple-200
                          "
                            >
                              <FiDownload />
                            </button>

                            {/* Verify */}

                            {doc.status !== "Verified" && (
                              <button
                                onClick={() => handleVerify(doc._id)}
                                className="
                            p-2
                            rounded-lg
                            bg-green-100
                            text-green-700
                            hover:bg-green-200
                            "
                              >
                                <FiCheck />
                              </button>
                            )}

                            {/* Reject */}

                            {doc.status !== "Rejected" && (
                              <button
                                onClick={() => handleReject(doc._id)}
                                className="
                            p-2
                            rounded-lg
                            bg-red-100
                            text-red-700
                            hover:bg-red-200
                            "
                              >
                                <FiX />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
