import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function HomeLogin() {
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

        if (!success) return;

        toast.success("Login successful");
        navigate("/dashboard", { replace: true });
    };

    return (
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 gap-3 sm:gap-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm sm:max-w-md bg-gradient-to-br from-[#0b0f6d] to-[#7b6fb8] rounded-2xl p-5 sm:p-6 shadow-2xl text-white"
  >
    <div className="flex items-center gap-2 mb-4 sm:mb-5">
      <FiLock className="text-red-500 text-lg sm:text-xl" />
      <h2 className="text-lg sm:text-xl font-semibold">
        Login to your account
      </h2>
    </div>

    <div className="mb-3">
      <label className="text-xs sm:text-sm mb-1 block">Card number</label>
      <input
        type="text"
        name="card_number"
        value={form.card_number}
        onChange={handleChange}
        placeholder="Enter card number"
        className="w-full bg-white/20 border border-white/30 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 outline-none focus:border-white text-sm"
      />
    </div>

    <div className="mb-3">
      <label className="text-xs sm:text-sm mb-1 block">Login ID</label>
      <input
        type="text"
        name="login_id"
        value={form.login_id}
        onChange={handleChange}
        placeholder="Enter login ID"
        className="w-full bg-white/20 border border-white/30 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 outline-none focus:border-white text-sm"
      />
    </div>

    <div className="mb-4">
      <label className="text-xs sm:text-sm mb-1 block">Password</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="********"
        className="w-full bg-white/20 border border-white/30 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 outline-none focus:border-white text-sm"
      />
    </div>

    <div className="flex items-center justify-between text-xs sm:text-sm mb-4 sm:mb-5">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="remember"
          checked={form.remember}
          onChange={handleChange}
          className="accent-red-600"
        />
        Remember me
      </label>

      <span className="text-white/80 cursor-pointer hover:underline">
        Forgot Password
      </span>
    </div>

    <button
      type="submit"
      className="w-full bg-red-600 hover:bg-red-700 transition py-2 sm:py-2.5 rounded-md font-medium text-sm sm:text-base"
    >
      Log in
    </button>

    <p className="text-center text-xs sm:text-sm mt-4 sm:mt-5 text-white/80">
      Not enrolled?{" "}
      <span
        onClick={() => navigate("/my-account")}
        className="text-white font-medium cursor-pointer hover:underline"
      >
        Sign up now
      </span>
    </p>
  </form>

  <p className="text-xs sm:text-sm text-black text-center">
    $0 Annual fee. Terms apply
  </p>
</div>


    );
}

export default HomeLogin;
