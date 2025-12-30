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

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleClick = () => {
        navigate(isAuthenticated ? "/dashboard" : "/my-account");
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all
            ${isSticky ? "bg-white shadow-md py-3" : "bg-transparent py-4 lg:py-5"}`}
        >
            <nav className="wrapper px-4 lg:px-2 flex items-center justify-between gap-4">

                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src="/logo.webp" alt="logo" className="w-28" />
                </div>

                <div className="hidden lg:flex items-center gap-5">
                    <Navitems />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="
        py-1.5 px-3 text-sm w-32
        border-0 outline-none
        focus:border-0 focus:outline-none focus:ring-0
    "
                    />


                    <span className="text-gray-400">|</span>

                    <button
                        onClick={handleClick}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <FiUser size={18} />
                        My Account
                    </button>

                    <button
                        onClick={() => navigate("/open-account")}
                        className="relative cursor-pointer overflow-hidden bg-[#171717] text-white px-4 py-2 rounded group"
                    >
                        <span className="absolute inset-0 bg-[#E30012] -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative z-10">Open An Account</span>
                    </button>

                    <button
                        onClick={() => navigate("/atm-locator")}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-red-500"
                    >
                        <FiHome size={18} className="text-red-500" />
                        ATM / Branch
                    </button>
                </div>

                <div className="flex items-center gap-4 lg:hidden">
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
                className={`lg:hidden fixed top-[58px] left-0 w-full
    h-[calc(100vh-64px)] bg-white shadow-lg z-40
    transition-all duration-300 ease-in-out
    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >

                <div className="h-full overflow-y-auto px-6 py-6">
                    <Navitems />
                </div>
            </div>
        </header>
    );
}

export default Navbar;
