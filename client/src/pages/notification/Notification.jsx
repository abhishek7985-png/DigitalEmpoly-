import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createNotification } from "../../api/notificationApi";

export default function Notification() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "General",
    status: "Active",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createNotification(form);

      toast.success("Notification Created Successfully");

      navigate("/notification");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Notification Create Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
bg-gray-100

p-3
sm:p-5
lg:p-6
"
    >
      <div
        className="
max-w-5xl
mx-auto

bg-white

rounded-2xl
sm:rounded-3xl

shadow-xl

p-4
sm:p-6
lg:p-8
"
      >
        {/* Header */}

        <div className="mb-6 sm:mb-8">
          <h1
            className="
text-2xl
sm:text-3xl

font-bold

text-slate-800
"
          >
            Create Notification
          </h1>

          <p
            className="
text-gray-500
mt-2
text-sm
sm:text-base
"
          >
            Send notification to employees
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="
space-y-5
sm:space-y-6
"
        >
          {/* Title */}

          <div>
            <label
              className="
block
font-medium
mb-2
text-sm
sm:text-base
"
            >
              Notification Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={changeHandler}
              placeholder="Enter notification title"
              className="
w-full

border

rounded-xl

p-3

text-sm
sm:text-base

outline-none

focus:ring-2

focus:ring-blue-500
"
              required
            />
          </div>

          {/* Type */}

          <div>
            <label
              className="
block
font-medium
mb-2
text-sm
sm:text-base
"
            >
              Notification Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={changeHandler}
              className="
w-full

border

rounded-xl

p-3

text-sm
sm:text-base

outline-none

focus:ring-2

focus:ring-blue-500
"
            >
              <option value="General">General</option>

              <option value="Employee">Employee</option>

              <option value="Joining">Joining</option>

              <option value="Document">Document</option>

              <option value="Policy">Policy</option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label
              className="
block
font-medium
mb-2
text-sm
sm:text-base
"
            >
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={changeHandler}
              className="
w-full

border

rounded-xl

p-3

text-sm
sm:text-base

outline-none

focus:ring-2

focus:ring-blue-500
"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Message */}

          <div>
            <label
              className="
block
font-medium
mb-2
text-sm
sm:text-base
"
            >
              Message
            </label>

            <textarea
              rows="5"
              name="message"
              value={form.message}
              onChange={changeHandler}
              placeholder="Write notification message"
              className="
w-full

border

rounded-xl

p-3

text-sm
sm:text-base

resize-none

outline-none

focus:ring-2

focus:ring-blue-500
"
              required
            />
          </div>

          {/* Buttons */}

          <div
            className="
flex

flex-col
sm:flex-row

gap-3

justify-end

"
          >
            <button
              type="button"
              onClick={() => navigate("/notification")}
              className="
w-full
sm:w-auto

px-6

py-3

border

rounded-xl

hover:bg-gray-100

"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="
w-full
sm:w-auto

px-6
sm:px-8

py-3

bg-blue-600

text-white

rounded-xl

hover:bg-blue-700

disabled:opacity-50

"
            >
              {loading ? "Creating..." : "Create Notification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
