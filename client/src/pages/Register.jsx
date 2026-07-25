import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "HR",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SENDING DATA:", formData);

    try {
      setLoading(true);

      const res = await registerUser(formData);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full border p-3 rounded mb-3"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="w-full border p-3 rounded mb-3"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            className="w-full border p-3 rounded mb-3"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="w-full border p-3 rounded mb-3"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            className="w-full border p-3 rounded mb-3"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            className="w-full border p-3 rounded mb-5"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="HR">HR</option>

            <option value="Admin">Admin</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
