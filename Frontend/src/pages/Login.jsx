import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        card_number: "",
        login_id: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.card_number || !form.login_id || !form.password) {
            toast.error("All fields are required");
            return;
        }

        const success = await login({
            card_number: form.card_number,
            login_id: form.login_id,
            password: form.password,
        });

        if (!success) {
            return;
        }

        toast.success("Login successful");
        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-100 rounded-xl shadow-lg p-10">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    🔒 Login to your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Card number*</label>
                        <input
                            type="text"
                            name="card_number"
                            value={form.card_number}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Login ID*</label>
                        <input
                            type="text"
                            name="login_id"
                            value={form.login_id}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Password*</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                                className="accent-blue-600"
                            />
                            Remember Me
                        </label>

                        <span
                            onClick={() => navigate("/forgot-password")}
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            Forgot Password?
                        </span>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md font-medium transition"
                    >
                        Log in
                    </button>
                </form>

                <p className="text-sm text-center mt-6 text-gray-600">
                    Don’t have an Account?{" "}
                    <span
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Create One
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Login;
