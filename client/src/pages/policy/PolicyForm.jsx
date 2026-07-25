import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PolicyForm({
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
      className="bg-white rounded-2xl shadow p-8 space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Company Policy</h1>

        <p className="text-gray-500">Create or Update Company Policy</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Input
          label="Policy Number"
          name="policyNumber"
          register={register}
          rules={{
            required: "Policy Number Required",
          }}
          error={errors.policyNumber}
        />

        <Input
          label="Policy Title"
          name="title"
          register={register}
          rules={{
            required: "Title Required",
          }}
          error={errors.title}
        />

        <SelectField label="Category" name="category" register={register}>
          <option value="">Select Category</option>

          <option>HR</option>
          <option>IT</option>
          <option>Security</option>
          <option>Attendance</option>
          <option>Leave</option>
          <option>Payroll</option>
          <option>Travel</option>
          <option>Health & Safety</option>
          <option>General</option>
        </SelectField>

        <Input label="Version" name="version" register={register} />

        <Input
          label="Effective Date"
          name="effectiveDate"
          type="date"
          register={register}
        />

        <Input
          label="Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
        />

        <SelectField label="Status" name="status" register={register}>
          <option>Draft</option>
          <option>Published</option>
          <option>Archived</option>
        </SelectField>

        <SelectField label="Mandatory" name="isMandatory" register={register}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </SelectField>
      </div>

      <div>
        <label className="font-medium block mb-2">Description</label>

        <textarea
          rows={6}
          {...register("description", {
            required: "Description Required",
          })}
          className="w-full border rounded-xl p-3"
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium block mb-2">Upload Policy PDF</label>

        <input
          type="file"
          accept=".pdf"
          {...register("attachment")}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button type="reset" className="px-6 py-3 border rounded-xl">
          Reset
        </button>

        <button
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-blue-700 text-white"
        >
          {loading ? "Saving..." : "Save Policy"}
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

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
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
