import { useEffect, useState } from "react";
import Navitems from "./Navitems";
import { FiUser } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/my-account");
        }
    };

    return (
        <header
            className={`w-full fixed top-0 left-0 z-50 transition-all ${isSticky ? "bg-white shadow-md py-3" : "bg-transparent py-5"
                }`}
        >
            <nav className="wrapper w-full gap-10 flex items-center justify-between">

                <div className="flex items-center cursor-pointer">
                    <img
                        src="/logo.webp"
                        alt="logo"
                        className="w-28"
                        onClick={() => navigate("/")}
                    />
                </div>
                <div className="flex items-center gap-5">


                    <Navitems />

                    <div className="relative hidden md:block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 absolute left-3 top-2.5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35m1.16-5.27a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-none py-1.5 pl-9 pr-3 text-sm w-30 transition-all"
                        />
                    </div>

                    <span className="hidden md:block text-gray-400">|</span>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleClick}
                            className="hidden cursor-pointer md:flex items-center gap-2"
                        >
                            <FiUser size={18} />
                            My account
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">
                            Open An Account
                        </button>
                        <button className="px-4 py-2 rounded flex items-center">
                            <FiHome size={18} />
                            ATM / Branch
                        </button>

                    </div>


                </div>

            </nav>
        </header>
    );
}

export default Navbar;
