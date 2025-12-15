import { Link } from "react-router-dom";
import { creditCardMenu } from "../config/creditCardMenu";
import { bankingMenu } from "../config/bankingMenu";
import { mortgageMenu } from "../config/mortgageMenu";
import { personalLoanMenu } from "../config/personalLoanMenu";
import { pagesMenu } from "../config/pagesMenu";

export default function Navitems() {
    const current = window.location.pathname;

    return (
        <ul className="hidden md:flex items-center gap-6 text-[14px] font-medium">

            {/* home */}
            <li
                className={`
                    relative cursor-pointer
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-400 
                    after:w-0 after:transition-all after:duration-300
                    hover:after:w-full
                    ${current === "/" ? "after:w-full text-red-400" : ""}
                `}
            >
                <Link to="/">Home</Link>
            </li>

            {/* creadit cards */}
            <li className="relative group cursor-pointer">
                <div
                    className={`
                        flex items-center gap-1.5
                        relative
                        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-400
                        after:w-0 after:transition-all after:duration-300
                        group-hover:after:w-full
                        ${current.startsWith("/credit-cards") ? "after:w-full text-red-400" : ""}
                    `}
                >
                    Credit Cards+
                </div>

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
    "
                >

                    <ul className="flex flex-col gap-3">
                        {creditCardMenu.map((item) => (
                            <li
                                key={item.link}
                                className="border-b border-gray-200 pb-2 last:border-none last:pb-0"
                            >
                                <Link
                                    to={item.link}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>

            {/* banking */}
            <li className="relative group cursor-pointer">

                <div
                    className={`
            flex items-center gap-1
            relative cursor-pointer
            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 
            after:w-0 after:transition-all after:duration-300
            group-hover:after:w-full
            ${current.startsWith("/banking") ? "after:w-full text-red-500" : ""}
        `}
                >
                    Banking+
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
    "
                >

                    <ul className="flex flex-col gap-3">
                        {bankingMenu.map((item) => (
                            <li
                                key={item.link}
                                className="border-b border-gray-200 pb-2 last:border-none last:pb-0"
                            >
                                <Link
                                    to={item.link}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>


            {/* mortgage */}
            <li className="relative group cursor-pointer">

                <div
                    className={`
            flex items-center gap-1
            relative cursor-pointer
            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 
            after:w-0 after:transition-all after:duration-300
            group-hover:after:w-full
            ${current.startsWith("/mortgage") ? "after:w-full text-red-500" : ""}
        `}
                >
                    Mortgage+
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
        "
                >
                    <ul className="flex flex-col gap-3">
                        {mortgageMenu.map((item) => (
                            <li
                                key={item.link}
                                className="border-b border-gray-200 pb-2 last:border-none last:pb-0"
                            >
                                <Link
                                    to={item.link}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </li>


            {/* personal loan */}
            <li className="relative group cursor-pointer">

                <div
                    className={`
            flex items-center gap-1
            relative cursor-pointer
            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 
            after:w-0 after:transition-all after:duration-300
            group-hover:after:w-full
            ${current.startsWith("/personal-loan") ? "after:w-full text-red-500" : ""}
        `}
                >
                    Personal Loan+
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
        "
                >
                    <ul className="flex flex-col gap-3">
                        {personalLoanMenu.map((item) => (
                            <li
                                key={item.link}
                                className="border-b border-gray-200 pb-2 last:border-none last:pb-0"
                            >
                                <Link
                                    to={item.link}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </li>


            {/* pages */}
            <li className="relative group cursor-pointer">

                <div
                    className={`
            flex items-center gap-1
            relative cursor-pointer
            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 
            after:w-0 after:transition-all after:duration-300
            group-hover:after:w-full
            ${current.startsWith("/pages") || current === "/open-account" || current === "/my-account"
                            ? "after:w-full text-red-500"
                            : ""}
        `}
                >
                    Pages+
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
        "
                >
                    <ul className="flex flex-col gap-3">
                        {pagesMenu.map((item) => (
                            <li
                                key={item.link}
                                className="border-b border-gray-200 pb-2 last:border-none last:pb-0"
                            >
                                <Link
                                    to={item.link}
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </li>


            {/* contact */}
            <li
                className={`
                    relative cursor-pointer 
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 
                    after:w-0 after:transition-all after:duration-300
                    hover:after:w-full
                    ${current === "/contact" ? "after:w-full text-red-500" : ""}
                `}
            >
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
    );
}
