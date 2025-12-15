import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    card_number: "",
    login_id: "",
    ssn: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.card_number ||
      !form.login_id ||
      !form.ssn ||
      !form.new_password ||
      !form.confirm_password
    ) {
      toast.error("All fields are required");
      return;
    }

    if (form.new_password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/forgot_password",
        {
          card_number: form.card_number,
          login_id: form.login_id,
          ssn: form.ssn,
          new_password: form.new_password,
          confirm_password: form.confirm_password,
        }
      );

      toast.success(res.data.message || "Password updated successfully");
      navigate("/my-account");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6 text-center">
          🔐 Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="text-sm text-gray-600">Card Number</label>
            <input
              type="text"
              name="card_number"
              value={form.card_number}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Login ID */}
          <div>
            <label className="text-sm text-gray-600">Login ID</label>
            <input
              type="text"
              name="login_id"
              value={form.login_id}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* SSN */}
          <div>
            <label className="text-sm text-gray-600">SSN</label>
            <input
              type="text"
              name="ssn"
              value={form.ssn}
              onChange={handleChange}
              placeholder="123456789"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <input
              type="password"
              name="new_password"
              value={form.new_password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-950 text-white py-2.5 rounded-md font-medium"
          >
            Reset Password
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/my-account")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
