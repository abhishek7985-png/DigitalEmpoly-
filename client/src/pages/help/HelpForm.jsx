import { useForm } from "react-hook-form";
import { createHelp } from "../../api/helpApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HelpForm() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    try {
      await createHelp(data);

      toast.success("Help Topic Created");

      navigate("/help");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-8">Create Help Topic</h1>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <input
          placeholder="Title"
          className="w-full border rounded-lg p-3"
          {...register("title")}
        />

        <select
          className="w-full border rounded-lg p-3"
          {...register("category")}
        >
          <option>General</option>

          <option>HR</option>

          <option>IT</option>

          <option>Joining</option>

          <option>Payroll</option>

          <option>Documents</option>
        </select>

        <textarea
          rows={7}
          placeholder="Description..."
          className="w-full border rounded-lg p-3"
          {...register("description")}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Save Help Topic
        </button>
      </form>
    </div>
  );
}
