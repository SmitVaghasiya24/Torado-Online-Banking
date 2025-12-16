import { useState } from "react";
import axios from "axios";

export default function Subscribe() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubscribe = async () => {
        if (!email) return;

        const token = localStorage.getItem("token");

        try {
            setLoading(true);
            setMessage("");

            const res = await axios.post(
                "http://localhost:5000/api/subscribe",
                { email },
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                }
            );

            setMessage(res.data.message || "Subscribed successfully");
            setEmail("");

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (err) {
            setMessage(
                err.response?.data?.message || "Something went wrong"
            );

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=" relative bg-[#000080] flex items-center justify-center px-4">
            <img
                src="/page/card-1.webp"
                alt=""
                className="hidden sm:block absolute left-20 bottom-40 w-40 sm:w-56 pointer-events-none"
            />

            <img
                src="/page/card-14.webp"
                alt=""
                className="hidden sm:block absolute right-20 top-40 w-40 sm:w-56  pointer-events-none"
            />
            <div className="w-full max-w-5xl text-center text-white py-16">

                <p className="text-xs sm:text-sm uppercase tracking-wide opacity-80 mb-3">
                    We welcome you to join us
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10">
                    Start your journey
                </h1>
                <div className="mx-auto max-w-2xl p-6 sm:p-8">

                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 h-12 px-4 rounded-lg text-white border outline-none"
                        />
                        <button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="relative overflow-hidden h-12 min-w-[170px] rounded-lg font-medium text-white group disabled:opacity-70"
                        >
                            <span className="absolute inset-0 bg-red-600" />

                            <span className="absolute inset-0 bg-black  -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? "Please wait..." : "Subscribe Now →"}
                            </span>
                        </button>

                    </div>

                    {message && (
                        <p className="mt-4 text-sm text-white/80 text-center">
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
