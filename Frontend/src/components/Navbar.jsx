import { useEffect, useState } from "react";

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`w-full fixed top-0 left-0 z-50 transition-all ${isSticky ? "bg-white shadow-md py-3" : "bg-transparent py-5"
                }`}
        >
            <nav className=" w-full flex items-center justify-between px-6">

                <div className="flex items-center">
                    <img
                        src="/logo.webp"
                        alt="logo"
                        className="w-24"
                    />
                </div>

                <ul className="hidden md:flex items-center gap-8 font-medium">
                    <li>Home</li>
                    <li> Credit Cards +</li>
                    <li>Banking +</li>
                    <li>Mortgage +</li>
                    <li>Personal Loan +</li>
                    <li>Pages +</li>
                    <li>Contact</li>
                </ul>
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

                <div className="flex items-center gap-4">
                    <button className="hidden md:block">My account</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Open An Account
                    </button>
                    <button className="px-4 py-2 rounded">
                        ATM / Branch
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
