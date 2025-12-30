import { Link } from "react-router-dom";
import { useState } from "react";
import { creditCardMenu } from "../config/creditCardMenu";
import { bankingMenu } from "../config/bankingMenu";
import { mortgageMenu } from "../config/mortgageMenu";
import { personalLoanMenu } from "../config/personalLoanMenu";
import { pagesMenu } from "../config/pagesMenu";
import { FiPlus, FiMinus } from "react-icons/fi";
import { NavLink } from "react-router-dom";

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
        lg:flex lg:flex-row lg:items-center lg:gap-6
        text-[14px] font-medium
        max-h-[70vh] overflow-y-auto lg:overflow-visible
    "
        >

            {/* home */}
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

            {/* credit cards */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("credit")}
                    className={`
            flex items-center gap-2
            w-full
            relative

            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-400
            after:w-0 after:transition-all
            lg:group-hover:after:w-full

            ${current.startsWith("/credit-cards")
                            ? "text-red-600 lg:after:w-full"
                            : "text-gray-900"}
        `}
                >
                    <span className="font-medium">Credit Cards+</span>

                    <span className="ml-auto lg:hidden text-lg text-gray-600">
                        {open === "credit" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
            absolute left-0 top-full mt-2
            bg-white shadow-xl pt-5 pr-5 pb-5 pl-0 w-72
            z-50
            transform transition-all duration-300
            translate-y-4 opacity-0
            pointer-events-none
            group-hover:pointer-events-auto
            group-hover:translate-y-0 group-hover:opacity-100
            hidden lg:block
        "
                >
                    <ul className="flex flex-col">
                        {creditCardMenu.map((item, index) => (
                            <li
                                key={item.link}
                                className={`relative py-3 ${index !== creditCardMenu.length - 1
                                    ? "after:absolute after:left-6 after:right-0 after:bottom-0 after:border-b after:border-dotted after:border-gray-300"
                                    : ""
                                    }`}
                            >
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `block pl-6 relative
                            ${isActive
                                            ? "text-blue-600 font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-600"
                                            : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "credit" && (
                    <ul className="lg:hidden ml-4 mt-3 flex flex-col gap-3 border-l border-gray-200 pl-4">
                        {creditCardMenu.map(item => (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    className="block py-1 text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>


            {/* banking */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("banking")}
                    className={`
            flex items-center gap-2
            w-full
            relative

            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
            after:w-0 after:transition-all
            lg:group-hover:after:w-full

            ${current.startsWith("/banking")
                            ? "text-red-500 lg:after:w-full"
                            : "text-gray-900"}
        `}
                >
                    <span className="font-medium">Banking+</span>

                    <span className="ml-auto lg:hidden text-lg text-gray-600">
                        {open === "banking" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
            absolute left-0 top-full mt-2
            bg-white shadow-xl pt-5 pr-5 pb-5 pl-0 w-72
            z-50
            transform transition-all duration-300
            translate-y-4 opacity-0
            pointer-events-none
            group-hover:pointer-events-auto
            group-hover:translate-y-0 group-hover:opacity-100
            hidden lg:block
        "
                >
                    <ul className="flex flex-col">
                        {bankingMenu.map((item, index) => (
                            <li
                                key={item.link}
                                className={`relative py-3 ${index !== bankingMenu.length - 1
                                    ? "after:absolute after:left-6 after:right-0 after:bottom-0 after:border-b after:border-dotted after:border-gray-300"
                                    : ""
                                    }`}
                            >
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `block pl-6 relative
                            ${isActive
                                            ? "text-blue-600 font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-600"
                                            : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "banking" && (
                    <ul className="lg:hidden ml-4 mt-3 flex flex-col gap-3 border-l border-gray-200 pl-4">
                        {bankingMenu.map(item => (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    className="block py-1 text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>


            {/* mortgage */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("mortgage")}
                    className={`
            flex items-center gap-2
            w-full
            relative

            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
            after:w-0 after:transition-all
            lg:group-hover:after:w-full

            ${current.startsWith("/mortgage")
                            ? "text-red-500 lg:after:w-full"
                            : "text-gray-900"}
        `}
                >
                    <span className="font-medium">Mortgage+</span>

                    <span className="ml-auto lg:hidden text-lg text-gray-600">
                        {open === "mortgage" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
            absolute left-0 top-full mt-2
            bg-white shadow-xl pt-5 pr-5 pb-5 pl-0 w-80
            z-50
            transform transition-all duration-300
            translate-y-4 opacity-0
            pointer-events-none
            group-hover:pointer-events-auto
            group-hover:translate-y-0 group-hover:opacity-100
            hidden lg:block
        "
                >
                    <ul className="flex flex-col">
                        {mortgageMenu.map((item, index) => (
                            <li
                                key={item.link}
                                className={`relative py-3 ${index !== mortgageMenu.length - 1
                                    ? "after:absolute after:left-6 after:right-0 after:bottom-0 after:border-b after:border-dotted after:border-gray-300"
                                    : ""
                                    }`}
                            >
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `block pl-6 relative
                            ${isActive
                                            ? "text-blue-600 font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-600"
                                            : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "mortgage" && (
                    <ul className="lg:hidden ml-4 mt-3 flex flex-col gap-3 border-l border-gray-200 pl-4">
                        {mortgageMenu.map(item => (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    className="block py-1 text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>


            {/* personal loan */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("loan")}
                    className={`
            flex items-center gap-2
            w-full
            relative

            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
            after:w-0 after:transition-all
            lg:group-hover:after:w-full

            ${current.startsWith("/personal-loan")
                            ? "text-red-500 lg:after:w-full"
                            : "text-gray-900"}
        `}
                >
                    <span className="font-medium">Personal Loan+</span>

                    <span className="ml-auto lg:hidden text-lg text-gray-600">
                        {open === "loan" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
            absolute left-0 top-full mt-2
            bg-white shadow-xl pt-5 pr-5 pb-5 pl-0 w-64
            z-50
            transform transition-all duration-300
            translate-y-4 opacity-0
            pointer-events-none
            group-hover:pointer-events-auto
            group-hover:translate-y-0 group-hover:opacity-100
            hidden lg:block
        "
                >
                    <ul className="flex flex-col">
                        {personalLoanMenu.map((item, index) => (
                            <li
                                key={item.link}
                                className={`relative py-3 ${index !== personalLoanMenu.length - 1
                                        ? "after:absolute after:left-6 after:right-0 after:bottom-0 after:border-b after:border-dotted after:border-gray-300"
                                        : ""
                                    }`}
                            >
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `block pl-6 relative
                            ${isActive
                                            ? "text-blue-600 font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-600"
                                            : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "loan" && (
                    <ul className="lg:hidden ml-4 mt-3 flex flex-col gap-3 border-l border-gray-200 pl-4">
                        {personalLoanMenu.map(item => (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    className="block py-1 text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>


            {/* pages */}
            <li className="relative group cursor-pointer">
                <div
                    onClick={() => toggle("pages")}
                    className={`
            flex items-center gap-2
            w-full
            relative

            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500
            after:w-0 after:transition-all
            lg:group-hover:after:w-full

            ${current.startsWith("/pages") ||
                            current === "/open-account" ||
                            current === "/my-account"
                            ? "text-red-500 lg:after:w-full"
                            : "text-gray-900"
                        }
        `}
                >
                    <span className="font-medium">Pages+</span>

                    <span className="ml-auto lg:hidden text-lg text-gray-600">
                        {open === "pages" ? <FiMinus /> : <FiPlus />}
                    </span>
                </div>

                <div
                    className="
            absolute left-0 top-full mt-2
            bg-white shadow-xl pt-5 pr-5 pb-5 pl-0 w-64
            z-50
            transform transition-all duration-300
            translate-y-4 opacity-0
            pointer-events-none
            group-hover:pointer-events-auto
            group-hover:translate-y-0 group-hover:opacity-100
            hidden lg:block
        "
                >
                    <ul className="flex flex-col">
                        {pagesMenu.map((item, index) => (
                            <li
                                key={item.link}
                                className={`relative py-3 ${index !== pagesMenu.length - 1
                                        ? "after:absolute after:left-6 after:right-0 after:bottom-0 after:border-b after:border-dotted after:border-gray-300"
                                        : ""
                                    }`}
                            >
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `block pl-6 relative
                            ${isActive
                                            ? "text-blue-600 font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-600"
                                            : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {open === "pages" && (
                    <ul className="lg:hidden ml-4 mt-3 flex flex-col gap-3 border-l border-gray-200 pl-4">
                        {pagesMenu.map(item => (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    className="block py-1 text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>


            {/* contact */}
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
