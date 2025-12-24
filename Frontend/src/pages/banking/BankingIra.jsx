import React from 'react'
import BreadcrumbHero from '../../components/Breadcrumb'
import { FiCheck } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Download from '../../components/Download';
import Faqs from '../../components/Faq/Faqs';
import LatestNews from '../../components/LatestNews';

function BankingIra() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(1000);
    const [months, setMonths] = useState(60);

    return (
        <div>

            <BreadcrumbHero
                title="Banking overview"
                image="/Breadcrumb/bank-overview.webp"
            />

            <section className="py-10 sm:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                        <div className="flex justify-center lg:justify-start h-full">
                            <img
                                src="/banking/banking-ira.webp"
                                alt="IRA information"
                                className="w-full max-w-md sm:max-w-lg h-full rounded-2xl object-cover"
                                loading="lazy"
                            />
                        </div>

                        <div className="flex flex-col justify-center h-full">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
                                What is an IRA?
                            </h2>

                            <p className="text-gray-600 leading-relaxed max-w-xl mb-6">
                                Banking IRAs (Individual Retirement Accounts) refer to retirement
                                savings accounts that are offered by banks. These accounts are
                                designed to help individuals save for their retirement while
                                benefiting from the security and convenience of a bank.
                            </p>

                            <p className="font-medium mb-4">
                                Here are some key points about Banking IRAs:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    "Retirement savings",
                                    "Traditional IRAs",
                                    "Roth IRAs",
                                    "FDIC insured",
                                    "Investment options",
                                    "Contribution limits",
                                    "Required minimum distributions",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <span className="text-red-600">
                                            <FiCheck size={18} />
                                        </span>
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="relative cursor-pointer overflow-hidden bg-red-600 text-white px-8 py-3 rounded-md font-medium group w-fit"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                <span className="relative z-10">Open An Account</span>
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-10 sm:py-16">
                <div className="container mx-auto px-4">

                    <h2 className="text-center text-3xl leading-tight sm:text-4xl lg:text-5xl font-semibold max-w-2xl mx-auto mb-14">
                        A beautiful solution to your
                        future leisure time
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 h-full">
                            <h3 className="text-[#E30012] text-3xl sm:text-5xl font-semibold mb-4">
                                Savings IRAs
                            </h3>

                            <p className="font-medium text-gray-800 mb-4">
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

                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 h-full">
                            <h3 className="text-[#E30012] text-3xl sm:text-5xl font-semibold mb-4">
                                Investment IRAs
                            </h3>

                            <p className="font-medium text-gray-800 mb-4">
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

            <section className="py-16 sm:py-20 bg-linear-to-br from-gray-50 via-indigo-50 to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">

                        <div className="flex flex-col justify-center h-full">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
                                Save for your tomorrow with ease
                            </h2>

                            <p className="text-gray-600 max-w-md mb-8">
                                Determine the type of account you need based on your banking
                                requirements.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-6">
                                    <span className="text-red-600 text-xl font-semibold shrink-0">01</span>
                                    <div className="w-full pb-8 border-b border-gray-200">
                                        <h4 className="font-semibold text-lg mb-2">Contributions</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            Laculis ultrices egestas purus eget facilisis justo dignissim.
                                            Eget morbi condimentum lobortis in vulputate consequat.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <span className="text-red-600 text-xl font-semibold shrink-0">02</span>
                                    <div className="w-full pb-8 border-b border-gray-200">
                                        <h4 className="font-semibold text-lg mb-2">Rollovers</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            Id euismod consectetur amet elit habitasse accumsan tristique.
                                            A non est adipiscing urna bibendum consequat viverra.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <span className="text-red-600 text-xl font-semibold shrink-0">03</span>
                                    <div className="w-full">
                                        <h4 className="font-semibold text-lg mb-2">Transfers</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            Laculis ultrices egestas purus eget facilisis justo dignissim.
                                            Eget morbi condimentum lobortis in vulputate consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex h-full justify-center lg:justify-end">
                            <img
                                src="/banking/banking-2.webp"
                                alt="Save for your future"
                                className="w-full max-w-md sm:max-w-lg h-full rounded-3xl object-cover"
                                loading="lazy"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4">

                    <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold mb-14">
                        Account interest rate
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">

                        <div className="lg:col-span-3">
                            <p className="text-center font-medium mb-10">
                                Total interest earned
                            </p>

                            <div className="relative h-[420px] sm:h-[460px] px-4 sm:px-8">

                                <div className="hidden md:flex absolute top-6 bottom-29 left-4 sm:left-8 right-4 sm:right-8 flex-col justify-between z-0"
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="border-t border-gray-200"></div>
                                    ))}
                                </div>

                                <div className="relative flex items-end justify-between gap- h-full z-10">
                                    {[
                                        { label: "1 yr", value: 40 },
                                        { label: "2 yrs", value: 80 },
                                        { label: "3 yrs", value: 120 },
                                        { label: "4 yrs", value: 160 },
                                        { label: "5 yrs", value: 200, highlight: true },
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col items-center">

                                            <span className="mb-2 text-xs sm:text-sm text-gray-500">
                                                ${item.value}
                                            </span>

                                            <div
                                                className={`w-12 sm:w-16 lg:w-20 ${item.highlight ? "bg-red-600" : "bg-gray-100"
                                                    }`}
                                                style={{ height: `${item.value * 2}px` }}
                                            ></div>

                                            <span className="mt-4 text-xs sm:text-sm text-gray-500">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className=" absolute  bottom-7.5 sm:bottom-8.5 left-4 sm:left-8 right-4 sm:right-8 border-t-2 border-gray-300  z-0"></div>
                            </div>
                        </div>




                        <div className="lg:col-span-2">
                            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold mb-6">
                                        Interest rate calculator
                                    </h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="text-sm text-gray-600 block mb-2">
                                                Start With
                                            </label>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 block mb-2">
                                                Save for
                                            </label>
                                            <select
                                                value={months}
                                                onChange={(e) => setMonths(e.target.value)}
                                                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none"
                                            >
                                                <option value={12}>12 months</option>
                                                <option value={36}>36 months</option>
                                                <option value={60}>60 months</option>
                                            </select>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mt-6">
                                        Total interest you’ll earn with our IRA savings account
                                    </p>

                                    <p className="text-red-600 text-4xl font-semibold mt-3">
                                        $200
                                    </p>

                                    <p className="font-medium mt-2">
                                        $1,200 Total savings
                                    </p>
                                </div>

                                <button className="mt-8 bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 transition">
                                    Open An Account
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Download />

            <Faqs showCategories={false} faqType="bankingiras" />

            <LatestNews />

        </div>
    )
}

export default BankingIra