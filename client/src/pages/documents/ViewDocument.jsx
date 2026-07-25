import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiDownload,
  FiCheck,
  FiX,
  FiFileText,
} from "react-icons/fi";

import { toast } from "react-toastify";

import {
  getDocumentById,
  verifyDocument,
  rejectDocument,
} from "../../api/documentApi";

export default function ViewDocument() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [document, setDocument] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Load Document
  // ===============================

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    try {
      setLoading(true);

      const res = await getDocumentById(id);

      setDocument(res.data?.data);
    } catch (error) {
      console.log(error);

      toast.error("Document load failed");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Verify
  // ===============================

  const handleVerify = async () => {
    try {
      await verifyDocument(id);

      toast.success("Document Verified");

      fetchDocument();
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  // ===============================
  // Reject
  // ===============================

  const handleReject = async () => {
    try {
      await rejectDocument(id);

      toast.success("Document Rejected");

      fetchDocument();
    } catch (error) {
      toast.error("Reject failed");
    }
  };

  if (loading) {
    return (
      <div
        className="
      min-h-screen
      flex
      items-center
      justify-center
      text-gray-500
      "
      >
        Loading Document...
      </div>
    );
  }

  if (!document) {
    return (
      <div
        className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      "
      >
        <h2
          className="
        text-xl
        font-semibold
        text-gray-700
        "
        >
          Document Not Found
        </h2>

        <button
          onClick={() => navigate("/documents")}
          className="
          mt-4
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
          "
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="
    min-h-screen
    bg-gray-100
    p-6
    "
    >
      <div
        className="
      max-w-5xl
      mx-auto
      "
      >
        {/* Back Button */}

        <button
          onClick={() => navigate("/documents")}
          className="
          flex
          items-center
          gap-2
          text-gray-600
          hover:text-blue-600
          mb-5
          "
        >
          <FiArrowLeft />
          Back To Documents
        </button>

        {/* Header */}

        <div
          className="
        bg-white
        rounded-xl
        shadow
        p-6
        mb-6
        flex
        justify-between
        items-center
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
              Document Details
            </h1>

            <p
              className="
            text-gray-500
            mt-1
            "
            >
              View employee uploaded document
            </p>
          </div>

          <div>
            {document.status === "Verified" ? (
              <span
                className="
            bg-green-100
            text-green-700
            px-4
            py-2
            rounded-full
            font-semibold
            "
              >
                Verified
              </span>
            ) : document.status === "Rejected" ? (
              <span
                className="
            bg-red-100
            text-red-700
            px-4
            py-2
            rounded-full
            font-semibold
            "
              >
                Rejected
              </span>
            ) : (
              <span
                className="
            bg-yellow-100
            text-yellow-700
            px-4
            py-2
            rounded-full
            font-semibold
            "
              >
                Pending
              </span>
            )}
          </div>
        </div>

        {/* Employee Information */}

        <div
          className="
        bg-white
        rounded-xl
        shadow
        p-6
        mb-6
        "
        >
          <h2
            className="
          text-lg
          font-bold
          text-gray-800
          mb-5
          "
          >
            Employee Information
          </h2>

          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          "
          >
            <Info
              label="Name"
              value={`${document.employee?.firstName || ""}

                ${document.employee?.lastName || ""}`}
            />

            <Info
              label="Employee Code"
              value={document.employee?.employeeCode}
            />

            <Info
              label="Department"
              value={document.employee?.department?.name || "-"}
            />
          </div>
        </div>

        {/* Document Information */}

        <div
          className="
        bg-white
        rounded-xl
        shadow
        p-6
        "
        >
          <h2
            className="
          text-lg
          font-bold
          text-gray-800
          mb-5
          "
          >
            Document Information
          </h2>

          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          "
          >
            <Info label="Document Type" value={document.documentType} />

            <Info
              label="Document Number"
              value={document.documentNumber || "-"}
            />

            <Info
              label="Expiry Date"
              value={
                document.expiryDate
                  ? new Date(document.expiryDate).toLocaleDateString()
                  : "-"
              }
            />
          </div>
        </div>

        {/* ===============================
            Document Preview
        =============================== */}

        <div
          className="
        bg-white
        rounded-xl
        shadow
        p-6
        mt-6
        "
        >
          <h2
            className="
          text-lg
          font-bold
          text-gray-800
          mb-5
          "
          >
            Document Preview
          </h2>

          {document.fileUrl ? (
            document.fileType === "application/pdf" ? (
              <div
                className="
                bg-red-50
                rounded-xl
                p-8
                text-center
                "
              >
                <FiFileText
                  className="
                    mx-auto
                    text-red-600
                    text-6xl
                    "
                />

                <p
                  className="
                  mt-3
                  font-semibold
                  text-red-700
                  "
                >
                  PDF Document
                </p>
              </div>
            ) : (
              <img
                src={document.fileUrl}
                alt="document"
                className="
                  max-h-96
                  mx-auto
                  rounded-xl
                  shadow
                  "
              />
            )
          ) : (
            <div
              className="
              text-center
              text-gray-500
              py-10
              "
            >
              File Not Available
            </div>
          )}
        </div>

        {/* ===============================
            Actions
        =============================== */}

        <div
          className="
        bg-white
        rounded-xl
        shadow
        p-6
        mt-6
        flex
        flex-wrap
        gap-4
        "
        >
          {/* Download */}

          <button
            onClick={() => {
              console.log(document.filePath);
              if (!document?.filePath) {
                toast.error("File not available");
                return;
              }

              const fileUrl = `http://localhost:5000/${document.filePath.replace(/\\/g, "/")}`;

              window.open(fileUrl, "_blank");
            }}
            className="
            flex
            items-center
            gap-2
            bg-purple-600
            text-white
            px-5
            py-3
            rounded-lg
            hover:bg-purple-700
            "
          >
            <FiDownload />
            Download
          </button>

          {/* Verify */}

          <button
            onClick={handleVerify}
            disabled={document.status === "Verified"}
            className="
            flex
            items-center
            gap-2
            bg-green-600
            text-white
            px-5
            py-3
            rounded-lg
            disabled:opacity-50
            "
          >
            <FiCheck />
            Verify
          </button>

          {/* Reject */}

          <button
            onClick={handleReject}
            disabled={document.status === "Rejected"}
            className="
            flex
            items-center
            gap-2
            bg-red-600
            text-white
            px-5
            py-3
            rounded-lg
            disabled:opacity-50
            "
          >
            <FiX />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

// ===============================
// Reusable Info Component
// ===============================

const Info = ({ label, value }) => {
  return (
    <div>
      <p
        className="
      text-sm
      text-gray-500
      "
      >
        {label}
      </p>

      <p
        className="
      font-semibold
      text-gray-800
      break-words
      "
      >
        {value || "-"}
      </p>
    </div>
  );
};
