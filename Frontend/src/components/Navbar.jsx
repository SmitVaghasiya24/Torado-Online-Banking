import { useEffect, useState } from "react";
import Navitems from "./Navitems";
import { FiUser, FiHome, FiMenu, FiX } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleClick = () => {
        navigate(isAuthenticated ? "/dashboard" : "/my-account");
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all ${isSticky ? "bg-white shadow-md py-3" : "bg-transparent py-5"
                }`}
        >
            <nav className="wrapper flex items-center justify-between gap-4">

                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src="/logo.webp" alt="logo" className="w-28" />
                </div>

                <div className="hidden md:flex items-center gap-5">
                    <Navitems />

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border py-1.5 pl-3 pr-3 text-sm w-32"
                        />
                    </div>

                    <span className="text-gray-400">|</span>

                    <button
                        onClick={handleClick}
                        className="flex items-center gap-2"
                    >
                        <FiUser size={18} />
                        My Account
                    </button>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Open An Account
                    </button>

                    <button
                        onClick={() => navigate("/atm-locator")}
                        className="flex cursor-pointer hover:text-red-500 items-center gap-2 px-4 py-2">
                        <FiHome size={18} className="text-red-500" />
                        ATM / Branch
                    </button>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <button onClick={handleClick}>
                        <FiUser size={22} />
                    </button>

                    <button onClick={() => navigate("/atm-locator")}>
                        <FiHome size={22} />
                    </button>

                    <button
                        className="text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

            </nav>

            <div
                className={`md:hidden bg-white shadow-lg transition-all duration-300 ${isOpen
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <div className="px-6 py-4">
                    <Navitems />
                </div>
            </div>
        </header>
    );
}

export default Navbar;
