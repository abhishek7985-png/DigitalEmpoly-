import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { FiArrowLeft, FiUploadCloud, FiFileText } from "react-icons/fi";

import { getDocumentById, updateDocument } from "../../api/documentApi";

import { getEmployees } from "../../api/employeeApi";

export default function EditDocument() {
  const { id } = useParams();

  const navigate = useNavigate();

  // ===============================
  // States
  // ===============================

  const [employees, setEmployees] = useState([]);

  const [document, setDocument] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [updating, setUpdating] = useState(false);

  // ===============================
  // React Hook Form
  // ===============================

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm();

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const docResponse = await getDocumentById(id);

      const empResponse = await getEmployees();

      const doc = docResponse.data?.data;

      setDocument(doc);

      setEmployees(empResponse.data?.data || []);

      reset({
        employee: doc.employee?._id || "",

        documentType: doc.documentType || "",

        documentNumber: doc.documentNumber || "",

        expiryDate: doc.expiryDate ? doc.expiryDate.substring(0, 10) : "",

        status: doc.status || "Pending",
      });

      if (doc.fileUrl) {
        setPreview(doc.fileUrl);
      }
    } catch (error) {
      console.log(error);

      toast.error("Data loading failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("employee", data.employee);

      formData.append("documentType", data.documentType);

      formData.append("documentNumber", data.documentNumber);

      formData.append("expiryDate", data.expiryDate);

      formData.append("status", data.status);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await updateDocument(id, formData);

      if (res.data.success) {
        toast.success("Document updated successfully");

        setTimeout(() => {
          navigate("/documents");
        }, 1000);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };
  // ===============================
  // File Change Handler
  // ===============================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image")) {
      setPreview(URL.createObjectURL(file));
    } else if (file.type === "application/pdf") {
      setPreview("pdf");
    }
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

  const statusList = ["Pending", "Verified", "Rejected"];

  if (loading) {
    return (
      <div
        className="
      min-h-screen
      flex
      items-center
      justify-center
      "
      >
        Loading...
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
        {/* Back */}

        <button
          onClick={() => navigate("/documents")}
          className="
          flex
          items-center
          gap-2
          text-gray-600
          mb-5
          "
        >
          <FiArrowLeft />
          Back
        </button>

        {/* Form Card */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
          bg-white
          rounded-xl
          shadow
          p-8
          space-y-6
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
              Edit Document
            </h1>

            <p
              className="
            text-gray-500
            mt-1
            "
            >
              Update employee document details
            </p>
          </div>

          {/* Employee */}

          <div>
            <label
              className="
            block
            font-semibold
            mb-2
            "
            >
              Employee
            </label>

            <select
              {...register("employee", {
                required: "Employee required",
              })}
              className="
              w-full
              border
              rounded-lg
              px-4
              py-3
              "
            >
              <option value="">Select Employee</option>

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
              "
              >
                {errors.employee.message}
              </p>
            )}
          </div>

          {/* Type + Number */}

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
              font-semibold
              mb-2
              "
              >
                Document Type
              </label>

              <select
                {...register("documentType", {
                  required: "Type required",
                })}
                className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                "
              >
                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="
              block
              font-semibold
              mb-2
              "
              >
                Document Number
              </label>

              <input
                {...register("documentNumber", {
                  required: "Number required",
                })}
                className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                "
              />
            </div>
          </div>

          {/* Expiry + Status */}

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
                {statusList.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ===============================
              Replace File Upload
          =============================== */}

          <div>
            <label
              className="
            block
            font-semibold
            mb-3
            "
            >
              Replace Document File
            </label>

            <div
              className="
              border-2
              border-dashed
              border-blue-300
              rounded-xl
              bg-blue-50
              p-8
              text-center
              "
            >
              <FiUploadCloud
                className="
                mx-auto
                text-blue-600
                text-5xl
                mb-3
                "
              />

              <p
                className="
              text-gray-700
              mb-3
              "
              >
                Upload new file (optional)
              </p>

              <label
                className="
                bg-blue-600
                text-white
                px-5
                py-2
                rounded-lg
                cursor-pointer
                "
              >
                Choose File
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
            </div>
          </div>

          {/* ===============================
              Preview
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
              mb-4
              "
              >
                Current Preview
              </h3>

              {preview === "pdf" ? (
                <div
                  className="
                bg-red-50
                rounded-lg
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
                  text-red-700
                  font-semibold
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
                  max-h-80
                  mx-auto
                  rounded-lg
                  shadow
                  "
                />
              )}
            </div>
          )}

          {/* ===============================
              Buttons
          =============================== */}

          <div
            className="
          flex
          justify-end
          gap-4
          border-t
          pt-6
          "
          >
            <button
              type="button"
              onClick={() => navigate("/documents")}
              className="
              px-6
              py-3
              border
              rounded-lg
              hover:bg-gray-100
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="
              bg-blue-600
              text-white
              px-8
              py-3
              rounded-lg
              hover:bg-blue-700
              disabled:opacity-50
              "
            >
              {updating ? "Updating..." : "Update Document"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =====================================
// Submit Function
// =====================================
//export default EditDocument;
