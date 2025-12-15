import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        account_number: "",
        ssn: "",
        dob: "",
        login_id: "",
        password: "",
        confirm_password: "",
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        const success = await register({
            account_number: form.account_number,
            ssn: form.ssn,
            dob: form.dob,
            login_id: form.login_id,
            password: form.password,
            confirm_password: form.confirm_password,
        });

        if (success) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-100 rounded-xl shadow-lg p-10">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    🔒 Enroll online banking
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm text-gray-600">
                            Card or account number (Last 6 digits)
                        </label>
                        <input
                            type="text"
                            name="account_number"
                            value={form.account_number}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">
                            Social security number
                        </label>
                        <input
                            type="text"
                            name="ssn"
                            value={form.ssn}
                            onChange={handleChange}
                            placeholder="###-##-####"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Date of birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Desired Login ID</label>
                        <input
                            type="text"
                            name="login_id"
                            value={form.login_id}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={form.confirm_password}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                            className="accent-blue-600"
                        />
                        I agree with the{" "}
                        <span className="text-blue-600 cursor-pointer hover:underline">
                            Terms & Conditions
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 hover:bg-blue-950 text-white py-2.5 rounded-md font-medium transition"
                    >
                        Enroll Now
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

export default Signup;
