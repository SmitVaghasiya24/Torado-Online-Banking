import React from "react";
import BreadcrumbHero from "../../components/Breadcrumb";
import FolderCard from "../../components/FolderCard";
import { FiCalendar, FiHome, FiPercent, FiPlusCircle, FiRefreshCw, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import MonthMortgageCalculator from '../../components/MonthlyMortgageCalculator'
import { useNavigate } from "react-router-dom";
import Faqs from "../../components/Faq/Faqs";
import Subscribe from "../../components/Subscriber";

function CalculatorMortgage() {
    const navigate = useNavigate();

    const calculators = [
        {
            id: "01",
            title: "Monthly payment calculator",
            icon: <FiCalendar size={60} />,
        },
        {
            id: "02",
            title: "Home affordability calculator",
            icon: <FiHome size={60} />,
        },
        {
            id: "03",
            title: "Loan amount calculator",
            icon: <FiPercent size={60} />,
        },
        {
            id: "04",
            title: "Additional payment calculator",
            icon: <FiPlusCircle size={60} />,
        },
        {
            id: "05",
            title: "Refinance calculator",
            icon: <FiRefreshCw size={60} />,
        },
        {
            id: "06",
            title: "Amortization calculator",
            icon: <FiTrendingUp size={60} />,
        },
    ];

    return (
        <div>
            <BreadcrumbHero
                title="Mortgage payment calculator"
                image="/Breadcrumb/calculator-mortgage.webp"
            />

            <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10 lg:mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                        Mortgage payment calculator
                    </h2>

                    <p className="text-gray-600 leading-relaxed max-w-xl text-sm sm:text-base">
                        Mortgage payment calculators take into account factors such as loan
                        amount, interest rate, loan term, and other variables to provide an
                        approximation of the monthly payment amount.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {calculators.map((item) => (
                        <FolderCard
                            key={item.id}
                            bgColor="white"
                            borderColor="#e5e7eb"
                            headerHeight={50}
                            className="bg-white rounded-2xl p-6 sm:p-8 min-h-[150px] flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="text-blue-900 text-3xl sm:text-[40px]">
                                    {item.icon}
                                </div>

                                <span className="text-base sm:text-lg font-semibold text-gray-800">
                                    {item.id}
                                </span>
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold mb-6 leading-snug">
                                {item.title}
                            </h3>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="group mt-auto inline-flex items-center gap-2 text-sm sm:text-base font-medium relative w-fit"
                            >
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>

                                <span className="transition-colors duration-300 group-hover:text-red-600">
                                    Get Started
                                </span>

                                <FiArrowRight className="transition-colors duration-300 group-hover:text-red-600" />
                            </button>
                        </FolderCard>
                    ))}
                </div>
            </section>

            <MonthMortgageCalculator />


            <section className="bg-linear-to-r from-gray-50 to-indigo-50 py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-stretch">

                        <div className="flex justify-center lg:justify-start h-full">
                            <img
                                src="/Mortgage/mortgage-cal.jpg"
                                alt="Mortgage calculator benefits"
                                className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-full rounded-2xl object-cover"
                            />

                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10">
                                Benefit of mortgage payment calculators
                            </h2>

                            <div className="space-y-5 sm:space-y-6">

                                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex gap-4 sm:gap-5">
                                    <span className="flex items-center justify-center w-12 h-12 min-w-12 rounded-full border border-red-500 text-red-600 font-semibold shrink-0">
                                        01
                                    </span>

                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                        <span className="font-semibold text-blue-900">
                                            Affordability Assessment:
                                        </span>{" "}
                                        Mortgage payment calculators allow borrowers to assess their financial capability and determine the affordability of a specific loan. By adjusting the loan amount borrowers can see how different variables affect their monthly payments.
                                    </p>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex gap-4 sm:gap-5">
                                    <span className="flex items-center justify-center w-12 h-12 min-w-12 rounded-full border border-red-500 text-red-600 font-semibold shrink-0">
                                        02
                                    </span>

                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                        <span className="font-semibold text-blue-900">
                                            Comparison Tool:
                                        </span>{" "}
                                        These calculators enable borrowers to compare different loan scenarios. By inputting different interest rates or terms, borrowers can evaluate the impact on their monthly payments and make informed decisions about loan options.
                                    </p>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex gap-4 sm:gap-5">
                                    <span className="flex items-center justify-center w-12 h-12 min-w-12 rounded-full border border-red-500 text-red-600 font-semibold shrink-0">
                                        03
                                    </span>

                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                        <span className="font-semibold text-blue-900">
                                            Budget Planning:
                                        </span>{" "}
                                        Mortgage payment calculators assist borrowers in budgeting for homeownership expenses. By providing an estimate of the monthly payment, borrowers can better plan their overall housing expenses and assess if they can comfortably afford the mortgage.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Faqs showCategories={false} faqType="mortgageCalculator" />

            <Subscribe />


        </div>
    );
}

export default CalculatorMortgage;
