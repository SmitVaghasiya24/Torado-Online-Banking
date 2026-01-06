import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const toastId = toast.loading("Creating account...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        "Signup successful. Please wait for admin approval.",
        { id: toastId }
      );

      navigate("/login");

    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed";

      toast.error(message, { id: toastId });
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-800">
            Admin Signup
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Create a new admin account
          </p>
        </div>

        {error && (
          <p className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@email.com"
              value={formData.email}
              onChange={handleChange}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="h-11"
              required
            />
            <p className="text-xs text-slate-400">
              Minimum 6 characters recommended
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="
            w-full h-11 rounded-md border border-slate-200 bg-white px-4 text-sm
            focus:outline-none focus:ring-1 focus:ring-slate-500
          "
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="support_staff">Support Staff</option>
              <option value="content_manager">Content Manager</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-black text-white  cursor-pointer text-base font-medium"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-slate-800 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

        <p className="text-center text-xs text-slate-400 mt-6">
          Only authorized users should create admin accounts
        </p>

      </div>
    </div>

  );
};

export default Signup;