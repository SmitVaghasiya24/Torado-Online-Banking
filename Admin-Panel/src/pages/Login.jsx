import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminAuth } from "@/context/AdminContext";
import toast from "react-hot-toast";
import axios from "axios";


const Login = () => {
    const navigate = useNavigate();
    const { login } = adminAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        const toastId = toast.loading("Logging in...");

        try {
            const res = await axios.post(
                "http://localhost:5000/api/admin/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = res.data;

            login({
                token: data.token,
                admin: data.admin,
            });

            toast.success("Login successful", { id: toastId });

            if (["superadmin", "admin"].includes(data.admin.role)) {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            const message =
                err.response?.data?.message || "Login failed";

            toast.error(message, { id: toastId });
            setError(message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Admin Login
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Sign in to your admin account
                    </p>
                </div>

                {error && (
                    <p className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

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
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-black text-white cursor-pointer text-base font-medium"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Login"}
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-slate-800 font-medium cursor-pointer hover:underline"
                    >
                        Create one
                    </span>
                </p>


                <p className="text-center text-xs text-slate-400 mt-6">
                    Authorized admin users only
                </p>

            </div>
        </div>
    );
};

export default Login;
