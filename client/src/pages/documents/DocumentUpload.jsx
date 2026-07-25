import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiUploadCloud, FiArrowLeft, FiFileText } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getEmployees } from "../../api/employeeApi";

import { createDocument } from "../../api/documentApi";

export default function DocumentUpload() {
  const navigate = useNavigate();

  // ===============================
  // States
  // ===============================

  const [employees, setEmployees] = useState([]);

  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  // ===============================
  // React Hook Form
  // ===============================

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employee: "",
      documentType: "",
      documentNumber: "",
      expiryDate: "",
      status: "Pending",
    },
  });

  // ===============================
  // Load Employees
  // ===============================

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoadingEmployees(true);

      const res = await getEmployees();

      setEmployees(res.data?.data || []);
    } catch (error) {
      console.log(error);

      toast.error("Employee load failed");
    } finally {
      setLoadingEmployees(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!selectedFile) {
        toast.error("Please select document file");

        return;
      }

      // ===============================
      // File Validation
      // ===============================

      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Only JPG, PNG and PDF allowed");

        return;
      }

      const maxSize = 5 * 1024 * 1024;

      if (selectedFile.size > maxSize) {
        toast.error("File size must be less than 5MB");

        return;
      }

      setSubmitting(true);

      const formData = new FormData();

      formData.append("employee", data.employee);

      formData.append("documentType", data.documentType);

      formData.append("documentNumber", data.documentNumber);

      formData.append("expiryDate", data.expiryDate);

      formData.append("status", data.status);

      formData.append("file", selectedFile);

      // Fake progress UI

      setUploadProgress(30);

      const response = await createDocument(formData);

      setUploadProgress(100);

      if (response.data.success) {
        toast.success("Document uploaded successfully");

        reset();

        setSelectedFile(null);

        setPreview(null);

        setTimeout(() => {
          navigate("/documents");
        }, 1000);
      } else {
        toast.error("Document upload failed");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);

      setTimeout(() => {
        setUploadProgress(0);
      }, 1500);
    }
  };
  // ===============================
  // File Handler
  // ===============================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image")) {
      const url = URL.createObjectURL(file);

      setPreview(url);
    } else if (file.type === "application/pdf") {
      setPreview("pdf");
    } else {
      setPreview(null);
    }
  };

  // ===============================
  // Drag Drop
  // ===============================

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image")) {
        setPreview(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setPreview("pdf");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // ===============================
  // Document Types
  // ===============================

  const documentTypes = [
    "Aadhar Card",
    "PAN Card",
    "Passport",
    "Driving License",
    "Resume",
    "Education Certificate",
    "Experience Letter",
    "Bank Document",
    "Other",
  ];

  // ===============================
  // Status Options
  // ===============================

  const statusOptions = ["Pending", "Verified", "Rejected"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}

      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate("/documents")}
          className="
          flex items-center gap-2
          text-gray-600
          hover:text-blue-600
          mb-4
          "
        >
          <FiArrowLeft />
          Back To Documents
        </button>

        <div
          className="
        bg-white
        rounded-xl
        shadow
        p-6
        flex
        items-center
        gap-4
        "
        >
          <div
            className="
          bg-blue-100
          p-4
          rounded-full
          "
          >
            <FiFileText className="text-blue-600 text-3xl" />
          </div>

          <div>
            <h1
              className="
            text-2xl
            font-bold
            text-gray-800
            "
            >
              Upload Employee Document
            </h1>

            <p
              className="
            text-gray-500
            mt-1
            "
            >
              Add employee documents securely
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
max-w-5xl
mx-auto
bg-white
rounded-xl
shadow
p-8
space-y-6
"
      >
        {/* Employee */}

        <div>
          <label
            className="
          block
          text-sm
          font-semibold
          text-gray-700
          mb-2
          "
          >
            Select Employee *
          </label>

          <select
            {...register(
              "employee",

              {
                required: "Employee is required",
              },
            )}
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "
          >
            <option value="">
              {loadingEmployees ? "Loading Employees..." : "Select Employee"}
            </option>

            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName}
                {" - "}
                {emp.employeeCode}
              </option>
            ))}
          </select>

          {errors.employee && (
            <p
              className="
            text-red-500
            text-sm
            mt-1
            "
            >
              {errors.employee.message}
            </p>
          )}
        </div>

        {/* Document Type + Number */}

        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
        >
          <div>
            <label
              className="
            block
            text-sm
            font-semibold
            mb-2
            "
            >
              Document Type *
            </label>

            <select
              {...register(
                "documentType",

                {
                  required: "Document type required",
                },
              )}
              className="
              w-full
              border
              rounded-lg
              px-4
              py-3
              "
            >
              <option value="">Select Type</option>

              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.documentType && (
              <p
                className="
              text-red-500
              text-sm
              mt-1
              "
              >
                {errors.documentType.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="
            block
            text-sm
            font-semibold
            mb-2
            "
            >
              Document Number *
            </label>

            <input
              type="text"
              {...register(
                "documentNumber",

                {
                  required: "Document number required",
                },
              )}
              placeholder="
              Enter document number
              "
              className="
              w-full
              border
              rounded-lg
              px-4
              py-3
              "
            />

            {errors.documentNumber && (
              <p
                className="
              text-red-500
              text-sm
              mt-1
              "
              >
                {errors.documentNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Expiry Date + Status */}

        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
        >
          <div>
            <label
              className="
            block
            text-sm
            font-semibold
            mb-2
            "
            >
              Expiry Date
            </label>

            <input
              type="date"
              {...register("expiryDate")}
              className="
              w-full
              border
              rounded-lg
              px-4
              py-3
              "
            />
          </div>

          <div>
            <label
              className="
            block
            text-sm
            font-semibold
            mb-2
            "
            >
              Status
            </label>

            <select
              {...register("status")}
              className="
              w-full
              border
              rounded-lg
              px-4
              py-3
              "
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* ===============================
            File Upload Section
        =============================== */}

        <div>
          <label
            className="
          block
          text-sm
          font-semibold
          text-gray-700
          mb-3
          "
          >
            Upload Document *
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="
            border-2
            border-dashed
            border-blue-300
            rounded-xl
            p-8
            text-center
            bg-blue-50
            hover:bg-blue-100
            transition
            "
          >
            <FiUploadCloud
              className="
              mx-auto
              text-blue-600
              text-5xl
              mb-4
              "
            />

            <p
              className="
            text-gray-700
            font-medium
            "
            >
              Drag & Drop your file here
            </p>

            <p
              className="
            text-sm
            text-gray-500
            my-2
            "
            >
              OR
            </p>

            <label
              className="
              inline-block
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-lg
              cursor-pointer
              hover:bg-blue-700
              "
            >
              Browse File
              <input
                type="file"
                hidden
                accept="
                image/*,
                application/pdf
                "
                onChange={handleFileChange}
              />
            </label>

            <p
              className="
            text-xs
            text-gray-500
            mt-3
            "
            >
              Supported: JPG, PNG, PDF (Max 5MB)
            </p>
          </div>
        </div>

        {/* ===============================
            Selected File Details
        =============================== */}

        {selectedFile && (
          <div
            className="
            bg-gray-50
            rounded-xl
            p-5
            border
            "
          >
            <div
              className="
              flex
              justify-between
              items-center
              "
            >
              <div>
                <h3
                  className="
                  font-semibold
                  text-gray-800
                  "
                >
                  Selected File
                </h3>

                <p
                  className="
                  text-sm
                  text-gray-600
                  mt-1
                  "
                >
                  {selectedFile.name}
                </p>

                <p
                  className="
                  text-xs
                  text-gray-500
                  "
                >
                  {(selectedFile.size / 1024 / 1024).toFixed(2)}
                  MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);

                  setPreview(null);
                }}
                className="
                  text-red-600
                  hover:text-red-800
                  font-semibold
                  "
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* ===============================
            Preview Section
        =============================== */}

        {preview && (
          <div
            className="
            border
            rounded-xl
            p-5
            "
          >
            <h3
              className="
              font-semibold
              text-gray-700
              mb-4
              "
            >
              File Preview
            </h3>

            {preview === "pdf" ? (
              <div
                className="
                  bg-red-50
                  rounded-lg
                  p-6
                  text-center
                  "
              >
                <FiFileText
                  className="
                      mx-auto
                      text-red-600
                      text-5xl
                      "
                />

                <p
                  className="
                    mt-3
                    font-medium
                    text-red-700
                    "
                >
                  PDF Document
                </p>
              </div>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="
                    max-h-72
                    mx-auto
                    rounded-lg
                    shadow
                    "
              />
            )}
          </div>
        )}

        {/* ===============================
            Upload Progress
        =============================== */}

        {uploadProgress > 0 && (
          <div>
            <div
              className="
              flex
              justify-between
              text-sm
              mb-2
              "
            >
              <span>Uploading...</span>

              <span>{uploadProgress}%</span>
            </div>

            <div
              className="
              w-full
              bg-gray-200
              rounded-full
              h-3
              "
            >
              <div
                style={{
                  width: `${uploadProgress}%`,
                }}
                className="
                  bg-blue-600
                  h-3
                  rounded-full
                  transition-all
                  "
              />
            </div>
          </div>
        )}
        {/* ===============================
            Submit Buttons
        =============================== */}

        <div
          className="
        flex
        justify-end
        gap-4
        pt-6
        border-t
        "
        >
          <button
            type="button"
            onClick={() => navigate("/documents")}
            className="
            px-6
            py-3
            rounded-lg
            border
            text-gray-700
            hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="
            px-8
            py-3
            rounded-lg
            bg-blue-600
            text-white
            font-semibold
            hover:bg-blue-700
            disabled:opacity-50
            "
          >
            {submitting ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </div>
  );
}

// =================================================
// Submit Function
// =================================================
