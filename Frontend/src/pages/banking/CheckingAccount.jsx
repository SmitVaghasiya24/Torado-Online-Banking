import React from 'react'
import BreadcrumbHero from '../../components/Breadcrumb';
import FolderCard from '../../components/FolderCard';
import { MdCheck } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import Faqs from '../../components/Faq/Faqs';
import Download from '../../components/Download';
import { FiArrowRight } from "react-icons/fi";

const features = [
    "Bank securely",
    "ATM Access",
    "Online banking",
    "Move money easily",
    "Get paid early",
    "Get help in person",
];

const steps = [
    {
        no: "01",
        title: "24/7 custom support",
        desc:
            "Start by researching and comparing different credit card options available to find the one that suits your needs.",
    },
    {
        no: "02",
        title: "Digital security",
        desc:
            "Once you have identified the credit card that aligns with your preferences, you can proceed to the application process.",
    },
    {
        no: "03",
        title: "No fees",
        desc:
            "After submitting your application, the credit card issuer will review your application and assess your creditworthiness.",
    },
];

function CheckingAccount() {
    const navigate = useNavigate();
    return (
        <div>
            <BreadcrumbHero
                title="Checking Account"
                image="/Breadcrumb/service.webp"
            />

            <section className="py-12 sm:pt-16 lg:pt-20">
                <div className="container mx-auto px-4">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 ">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                            Everyday convenience <br className="hidden sm:block" /> with checking account
                        </h2>

                        <p className="text-gray-600 text-md sm:text-base max-w-xl">
                            A checking account, also known as transactional account or a current
                            account, is a type of bank account that is designed for everyday
                            financial transactions. It provides a convenient and secure way to
                            manage your money, make payments, and access funds as needed.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">

                        <FolderCard
                            bgColor="white"
                            borderColor="#e5e7eb"
                            headerHeight={43}
                            className="rounded-2xl h-full px-5 sm:px-6 pt-16 sm:pt-8 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-10 mb-2">
                                    Essential checking account
                                </h3>

                                <p className="text-gray-600 text-sm sm:text-md mb-6">
                                    Ultrices nisi arcu ornare suspendisse non risus faucibus pretium
                                    nulla. Tristique sagittis pretium tellus vivamus dolor.
                                </p>

                                <ul className="space-y-4 text-sm sm:text-md text-gray-700">
                                    {[
                                        "Elementum eget sed egestas pharetra condimentum venenatis.",
                                        "Malesuada non semper mauris sollicitudin egestas.",
                                        "Iaculis elementum eget amet facilisis blandit accumsan fermentum.",
                                        "Sapien faucibus egestas ut eu felis cursus convallis.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-900 text-white shrink-0">
                                                <MdCheck size={14} />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="group relative mt-8 w-full overflow-hidden rounded-md bg-red-600 py-3 text-sm sm:text-base font-medium text-white transition"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative z-10">Open An Account</span>
                            </button>
                        </FolderCard>

                        <FolderCard
                            bgColor="white"
                            borderColor="#e5e7eb"
                            headerHeight={43}
                            className="rounded-2xl h-full px-5 sm:px-6 pt-16 sm:pt-8 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-10 mb-2">
                                    Essential checking account
                                </h3>

                                <p className="text-gray-600 text-sm sm:text-md mb-6">
                                    Ultrices nisi arcu ornare suspendisse non risus faucibus pretium
                                    nulla. Tristique sagittis pretium tellus vivamus dolor.
                                </p>

                                <ul className="space-y-4 text-sm sm:text-md text-gray-700">
                                    {[
                                        "Elementum eget sed egestas pharetra condimentum venenatis.",
                                        "Malesuada non semper mauris sollicitudin egestas.",
                                        "Iaculis elementum eget amet facilisis blandit accumsan fermentum.",
                                        "Sapien faucibus egestas ut eu felis cursus convallis.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-900 text-white shrink-0">
                                                <MdCheck size={14} />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="group relative mt-8 w-full overflow-hidden rounded-md bg-red-600 py-3 text-sm sm:text-base font-medium text-white transition"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative z-10">Open An Account</span>
                            </button>
                        </FolderCard>

                        <FolderCard
                            bgColor="white"
                            borderColor="#e5e7eb"
                            headerHeight={43}
                            className="rounded-2xl h-full px-5 sm:px-6 pt-16 sm:pt-8 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-10 mb-2">
                                    Essential checking account
                                </h3>

                                <p className="text-gray-600 text-sm sm:text-md mb-6">
                                    Ultrices nisi arcu ornare suspendisse non risus faucibus pretium
                                    nulla. Tristique sagittis pretium tellus vivamus dolor.
                                </p>

                                <ul className="space-y-4 text-sm sm:text-md text-gray-700">
                                    {[
                                        "Elementum eget sed egestas pharetra condimentum venenatis.",
                                        "Malesuada non semper mauris sollicitudin egestas.",
                                        "Iaculis elementum eget amet facilisis blandit accumsan fermentum.",
                                        "Sapien faucibus egestas ut eu felis cursus convallis.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-900 text-white shrink-0">
                                                <MdCheck size={14} />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="group relative mt-8 w-full overflow-hidden rounded-md bg-red-600 py-3 text-sm sm:text-base font-medium text-white transition"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative z-10">Open An Account</span>
                            </button>
                        </FolderCard>

                    </div>
                </div>
            </section>

            <section className="py-12 sm:pb-16 lg:pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

                        <div className="h-full">
                            <img
                                src="/PersonalLoan/loan-img.webp"
                                alt="bank consultant"
                                className="w-full h-full object-cover rounded-l-2xl"
                            />
                        </div>

                        <div

                            className="relative h-full overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-indigo-900 to-purple-900"></div>

                            <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-14 flex flex-col justify-center h-full max-w-xl">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
                                    A bank you can trust
                                </h2>

                                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
                                    Welcome to “Torado” secure and user-friendly online banking platform,
                                    designed to provide convenient access to your financial accounts,
                                    including Credit Cards, Banking, Mortgage, and Personal loans.
                                </p>

                                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-10">
                                    Manage your finances with ease and enjoy a seamless banking
                                    experience from the comfort of your home or on the go. Enim sodales
                                    vulputate eu turpis et habitant. Non lectus feugiat sem nam eu lectus.
                                </p>

                                <div>
                                    <p className="text-white text-sm mb-1">
                                        Call our consultant
                                    </p>
                                    <a
                                        href="tel:+18787539922"
                                        className="text-red-500 text-lg font-semibold hover:underline"
                                    >
                                        +1 (878)-753-9922
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <section className="bg-linear-to-br from-gray-50 to-indigo-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-semibold max-w-lg leading-tight mb-6">
                                Banking account opening system
                            </h2>

                            <p className="text-gray-600 max-w-xl leading-relaxed">
                                The process for opening a bank account may vary slightly depending
                                on the bank and the country you are in. However, the general steps
                                involved in opening a bank account
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg px-6 py-4 flex items-center gap-3 shadow-sm"
                                >
                                    <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                                        <FiCheck size={14} />
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl border border-gray-200 p-10">
                            <h3 className="text-3xl font-semibold mb-4">
                                High interest checking
                            </h3>

                            <p className="font-medium mb-6">
                                A et auctor id scelerisque semper. Suspendisse ullamcorper quis
                                sapien elementum dui mattis pellentesque laoreet.
                            </p>

                            <p className="text-gray-600 leading-relaxed">
                                Laculis ultrices egestas purus eget facilisis justo dignissim.
                                Eget morbi condimentum lobortis in vulputate consequat. Id euismod
                                consectetur amet elit habitasse accumsan tristique. A non est
                                adipiscing urna bibendum consequat viverra.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-10">
                            <h3 className="text-3xl font-semibold mb-4">
                                Cash rewards checking
                            </h3>

                            <p className="font-medium mb-6">
                                A et auctor id scelerisque semper. Suspendisse ullamcorper quis
                                sapien elementum dui mattis pellentesque laoreet.
                            </p>

                            <p className="text-gray-600 leading-relaxed">
                                Laculis ultrices egestas purus eget facilisis justo dignissim.
                                Eget morbi condimentum lobortis in vulputate consequat. Id euismod
                                consectetur amet elit habitasse accumsan tristique. A non est
                                adipiscing urna bibendum consequat viverra.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:pb-16 lg:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl sm:text-5xl font-semibold leading-tight mb-6">
                            Why you choose the Torado accounts
                        </h2>

                        <p className="text-gray-600 max-w-xl mb-10">
                            Getting a credit card typically involves a straightforward process
                            that can be summarized in three simple steps:
                        </p>

                        <div className="space-y-8">
                            {steps.map((item, index) => (
                                <div key={index}>
                                    <div className="flex gap-6">
                                        <span className="text-red-600 text-4xl font-semibold shrink-0">
                                            {item.no}
                                        </span>

                                        <div className="w-full">
                                            <h4 className="font-semibold text-lg mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {index !== steps.length - 1 && (
                                        <div className="ml-18 mt-8">
                                            <hr className="border-gray-200" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>


                        <button
                            onClick={() => navigate("/open-account")}
                            className="group relative mt-10 inline-flex items-center gap-2 w-fit overflow-hidden rounded-md bg-red-600 px-6 py-3 font-medium text-white transition"
                        >
                            <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>

                            <span className="relative z-10 inline-flex items-center gap-2">
                                Get Started <FiArrowRight />
                            </span>
                        </button>

                    </div>

                    <div className="relative flex items-center justify-center">
                        <img
                            src="/banking/process-img-3.webp"
                            alt="Why choose Torado"
                            className="rounded-2xl max-w-full"
                        />

                        <div className="absolute top-26 left-2 w-44 h-44 flex items-center justify-center rotate-circle">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <defs>
                                    <path
                                        id="circlePath"
                                        d="M 50,50
                                           m -40,0
                                           a 40,40 0 1,1 80,0
                                           a 40,40 0 1,1 -80,0"
                                    />
                                </defs>

                                <text fill="#1e3a8a" fontSize="7.5" fontWeight="600" letterSpacing="1">
                                    <textPath href="#circlePath">
                                        UP TO $5000 CASH PER YEAR • UP TO $5000 CASH PER YEAR •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <Faqs showCategories={false} faqType="checkingaccount" />

            <Download />
        </div>
    )
}

export default CheckingAccount