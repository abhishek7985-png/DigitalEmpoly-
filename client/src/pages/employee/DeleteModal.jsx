import Swal from "sweetalert2";

export const confirmDelete = async () => {
  const result = await Swal.fire({
    title: "Delete Employee?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};
