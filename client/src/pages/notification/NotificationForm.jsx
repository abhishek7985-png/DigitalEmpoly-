import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function NotificationForm({
  onSubmit,
  defaultValues = {},
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  //   useEffect(() => {
  //     reset(defaultValues);
  //   }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Company Notification
        </h1>

        <p className="text-gray-500 mt-2">Send Notification To Employees</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Input
          label="Notification Title"
          name="title"
          register={register}
          rules={{
            required: "Title is required",
          }}
          error={errors.title}
        />

        <SelectField label="Notification Type" name="type" register={register}>
          <option value="">Select Type</option>

          <option value="General">General</option>

          <option value="Employee">Employee</option>

          <option value="Joining">Joining</option>

          <option value="Document">Document</option>

          <option value="Policy">Policy</option>
        </SelectField>

        <SelectField label="Status" name="status" register={register}>
          <option value="Active">Active</option>

          <option value="Inactive">Inactive</option>
        </SelectField>

        <div>
          <label className="block mb-2 font-medium">Read Status</label>

          <select
            {...register("isRead")}
            className="w-full border rounded-xl p-3"
          >
            <option value={false}>Unread</option>

            <option value={true}>Read</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Notification Message</label>

        <textarea
          rows={7}
          {...register("message", {
            required: "Message is required",
          })}
          className="w-full border rounded-xl p-3"
          placeholder="Write notification message..."
        />

        {errors.message && (
          <p className="text-red-500 mt-1 text-sm">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button type="reset" className="border px-6 py-3 rounded-xl">
          Reset
        </button>

        <button
          disabled={loading}
          className="bg-blue-700 text-white px-8 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Notification"}
        </button>
      </div>
    </form>
  );
}

function Input({ label, name, register, rules, error, type = "text" }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <input
        type={type}
        {...register(name, rules)}
        className="w-full border rounded-xl p-3"
      />

      {error && <p className="text-red-500 mt-1 text-sm">{error.message}</p>}
    </div>
  );
}

function SelectField({ label, name, register, children }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <select {...register(name)} className="w-full border rounded-xl p-3">
        {children}
      </select>
    </div>
  );
}
