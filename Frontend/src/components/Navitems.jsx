import { Link } from "react-router-dom";
import { useState } from "react";
import { creditCardMenu } from "../config/creditCardMenu";
import { bankingMenu } from "../config/bankingMenu";
import { mortgageMenu } from "../config/mortgageMenu";
import { personalLoanMenu } from "../config/personalLoanMenu";
import { pagesMenu } from "../config/pagesMenu";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Navitems() {
    const current = window.location.pathname;
    const [open, setOpen] = useState(null);

    const toggle = (key) => {
        setOpen(open === key ? null : key);
    };

    return (
        <ul
            className="
                flex flex-col gap-4
                md:flex md:flex-row md:items-center md:gap-6
                text-[14px] font-medium
                max-h-[70vh] overflow-y-auto md:overflow-visible
            "
        >
            {/* HOME */}
            <li
                className={`
                    relative cursor-pointer
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-400
                    after:w-0 after:transition-all hover:after:w-full
                    ${current === "/" ? "after:w-full text-red-400" : ""}
                `}
            >
                <Link to="/">Home</Link>
            </li>

            {/* CREDIT CARDS */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("credit")}
                    className={`
                        flex items-center gap-1.5
                        relative
                        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-400
                        after:w-0 after:transition-all
                        group-hover:after:w-full
                        ${current.startsWith("/credit-cards") ? "after:w-full text-red-400" : ""}
                    `}
                >
                    Credit Cards+
                    <span className="md:hidden ml-auto">
                        {open === "credit" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                {/* DESKTOP DROPDOWN */}
                <div
                    className="
                        absolute left-0 top-full mt-1
                        bg-white shadow-xl rounded-xl p-5 w-72
                        z-50
                        transform transition-all duration-300
                        translate-y-4 opacity-0
                        pointer-events-none
                        group-hover:pointer-events-auto
                        group-hover:translate-y-0 group-hover:opacity-100
                        hidden md:block
                    "
                >
                    <ul className="flex flex-col gap-3">
                        {creditCardMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link} className="text-gray-700 hover:text-blue-600">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* MOBILE LIST */}
                {open === "credit" && (
                    <ul className="md:hidden ml-4 mt-2 flex flex-col gap-2">
                        {creditCardMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {/* BANKING */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("banking")}
                    className={`
                        flex items-center gap-1
                        relative
                        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
                        after:w-0 after:transition-all
                        group-hover:after:w-full
                        ${current.startsWith("/banking") ? "after:w-full text-red-500" : ""}
                    `}
                >
                    Banking+
                    <span className="md:hidden ml-auto">
                        {open === "banking" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
                        absolute left-0 top-full mt-1.5
                        bg-white shadow-xl rounded-xl p-5 w-72
                        z-50
                        transform transition-all duration-300
                        translate-y-4 opacity-0
                        pointer-events-none
                        group-hover:pointer-events-auto
                        group-hover:translate-y-0 group-hover:opacity-100
                        hidden md:block
                    "
                >
                    <ul className="flex flex-col gap-3">
                        {bankingMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link} className="text-gray-700 hover:text-blue-600">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "banking" && (
                    <ul className="md:hidden ml-4 mt-2 flex flex-col gap-2">
                        {bankingMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {/* MORTGAGE */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("mortgage")}
                    className={`
                        flex items-center gap-1
                        relative
                        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
                        after:w-0 after:transition-all
                        group-hover:after:w-full
                        ${current.startsWith("/mortgage") ? "after:w-full text-red-500" : ""}
                    `}
                >
                    Mortgage+
                    <span className="md:hidden ml-auto">
                        {open === "mortgage" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
                        absolute left-0 top-full mt-1.5
                        bg-white shadow-xl rounded-xl p-5 w-80
                        z-50
                        transform transition-all duration-300
                        translate-y-4 opacity-0
                        pointer-events-none
                        group-hover:pointer-events-auto
                        group-hover:translate-y-0 group-hover:opacity-100
                        hidden md:block
                    "
                >
                    <ul className="flex flex-col gap-3">
                        {mortgageMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link} className="text-gray-700 hover:text-blue-600">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "mortgage" && (
                    <ul className="md:hidden ml-4 mt-2 flex flex-col gap-2">
                        {mortgageMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {/* PERSONAL LOAN */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("loan")}
                    className={`
                        flex items-center gap-1
                        relative
                        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
                        after:w-0 after:transition-all
                        group-hover:after:w-full
                        ${current.startsWith("/personal-loan") ? "after:w-full text-red-500" : ""}
                    `}
                >
                    Personal Loan+
                    <span className="md:hidden ml-auto">
                        {open === "loan" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
                        absolute left-0 top-full mt-1.5
                        bg-white shadow-xl rounded-xl p-5 w-64
                        z-50
                        transform transition-all duration-300
                        translate-y-4 opacity-0
                        pointer-events-none
                        group-hover:pointer-events-auto
                        group-hover:translate-y-0 group-hover:opacity-100
                        hidden md:block
                    "
                >
                    <ul className="flex flex-col gap-3">
                        {personalLoanMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link} className="text-gray-700 hover:text-blue-600">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "loan" && (
                    <ul className="md:hidden ml-4 mt-2 flex flex-col gap-2">
                        {personalLoanMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {/* PAGES */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("pages")}
                    className={`
                        flex items-center gap-1
                        relative
                        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
                        after:w-0 after:transition-all
                        group-hover:after:w-full
                        ${
                            current.startsWith("/pages") ||
                            current === "/open-account" ||
                            current === "/my-account"
                                ? "after:w-full text-red-500"
                                : ""
                        }
                    `}
                >
                    Pages+
                    <span className="md:hidden ml-auto">
                        {open === "pages" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
                        absolute left-0 top-full mt-1.5
                        bg-white shadow-xl rounded-xl p-5 w-64
                        z-50
                        transform transition-all duration-300
                        translate-y-4 opacity-0
                        pointer-events-none
                        group-hover:pointer-events-auto
                        group-hover:translate-y-0 group-hover:opacity-100
                        hidden md:block
                    "
                >
                    <ul className="flex flex-col gap-3">
                        {pagesMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link} className="text-gray-700 hover:text-blue-600">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "pages" && (
                    <ul className="md:hidden ml-4 mt-2 flex flex-col gap-2">
                        {pagesMenu.map(item => (
                            <li key={item.link}>
                                <Link to={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {/* CONTACT */}
            <li
                className={`
                    relative cursor-pointer
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
                    after:w-0 after:transition-all hover:after:w-full
                    ${current === "/contact" ? "after:w-full text-red-500" : ""}
                `}
            >
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
    );
}
