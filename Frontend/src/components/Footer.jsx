import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="bg-[#1f1f1f] text-gray-300">
            <div className="container py-16 grid gap-10 md:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div
                            className="flex items-center cursor-pointer"
                        >
                            <img src="/logo-white.webp" alt="logo" className="w-28" />
                        </div>
                    </div>

                    <p className="text-sm mb-2">Need Help</p>
                    <p className="text-white text-lg font-medium mb-4">
                        +1 (878)-753-9922
                    </p>

                    <div className="flex gap-3">
                        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                            (Icon, i) => (
                                <span
                                    key={i}
                                    className="w-9 h-9 rounded-full bg-[#2b2b2b] flex items-center justify-center hover:bg-red-500 transition"
                                >
                                    <Icon size={14} />
                                </span>
                            )
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>

                    <ul className="space-y-2 text-gray-400 text-sm">
                        {[
                            { label: "About us", path: "/pages/about-us" },
                            { label: "News", path: "/pages/news" },
                            { label: "Contact us", path: "/contact" },
                            { label: "FAQs", path: "/pages/faq" },
                        ].map((item, index) => (
                            <li
                                key={index}
                                onClick={() => navigate(item.path)}
                                className="flex w-fit items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-gray-400 group-hover:text-white">››</span>

                                <span
                                    className=" inline-block transition-all duration-300 ease-out  group-hover:text-white group-hover:translate-x-2 "
                                >
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Services</h4>

                    <ul className="space-y-2 text-gray-400 text-sm">
                        {[
                            { label: "Credit card", path: "/credit-cards-all" },
                            { label: "Banking", path: "/banking-overview    " },
                            { label: "Mortgage", path: "/mortgage-explore" },
                            { label: "Personal loan", path: "/personal-loan" },
                        ].map((item, index) => (
                            <li
                                key={index}
                                onClick={() => navigate(item.path)}
                                className="flex w-fit items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-gray-400 group-hover:text-white">››</span>

                                <span
                                    className=" inline-block transition-all duration-300 ease-out  group-hover:text-white group-hover:translate-x-2 "
                                >
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Help Center</h4>

                    <ul className="space-y-2 text-gray-400 text-sm">
                        {[
                            { label: "ATM Locator", path: "/atm-locator" },
                            { label: "Terms & conditions", path: "/pages/terms-and-conditions" },
                            { label: "Privacy policy", path: "/pages/privacy-policy" },
                            { label: "Cookie Policy", path: "/pages/privacy-policy" },
                        ].map((item, index) => (
                            <li
                                key={index}
                                onClick={() => navigate(item.path)}
                                className="flex w-fit items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-gray-400 group-hover:text-white">››</span>

                                <span
                                    className=" inline-block transition-all duration-300 ease-out  group-hover:text-white group-hover:translate-x-2 "
                                >
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

              
            </div>

            <div className="container border-t border-white/10">
                <div className=" py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p>
                        © Torado is proudly owned by{" "}
                        <span className="text-white">EnvyTheme</span>
                    </p>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <span>United States</span>
                        <span className="text-xs">⌄</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
