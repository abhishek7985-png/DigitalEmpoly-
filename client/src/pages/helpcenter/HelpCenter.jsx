import { useState } from "react";
import { toast } from "react-toastify";
import { createTicket } from "../../api/helpCenterApi";
import { FiHelpCircle, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

export default function HelpCenter() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    category: "",
    priority: "Medium",
    description: "",
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

      await createTicket(form);

      toast.success("Ticket Submitted");

      setForm({
        subject: "",
        category: "",
        priority: "Medium",
        description: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Help Center</h1>

        <p className="text-gray-500">Raise a support ticket</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <FiMail className="text-blue-600 text-4xl mb-3" />

          <h3 className="font-bold">Email Support</h3>

          <p className="text-gray-500 mt-2">hr@company.com</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <FiPhone className="text-green-600 text-4xl mb-3" />

          <h3 className="font-bold">Phone Support</h3>

          <p className="text-gray-500 mt-2">+91 9876543210</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <FiMessageSquare className="text-purple-600 text-4xl mb-3" />

          <h3 className="font-bold">Live Chat</h3>

          <p className="text-gray-500 mt-2">Monday - Friday</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FiHelpCircle />
          Submit Support Ticket
        </h2>

        <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-6">
          <input
            className="border rounded-xl p-3"
            placeholder="Subject"
            name="subject"
            value={form.subject}
            onChange={changeHandler}
          />

          <select
            className="border rounded-xl p-3"
            name="category"
            value={form.category}
            onChange={changeHandler}
          >
            <option value="">Select Category</option>
            <option>Technical</option>
            <option>HR</option>
            <option>Payroll</option>
            <option>IT Support</option>
          </select>

          <select
            className="border rounded-xl p-3"
            name="priority"
            value={form.priority}
            onChange={changeHandler}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <textarea
            rows="6"
            className="border rounded-xl p-3 md:col-span-2"
            placeholder="Describe your issue..."
            name="description"
            value={form.description}
            onChange={changeHandler}
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}
