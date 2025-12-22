import React, { useEffect, useState } from "react";
import BreadcrumbHero from "../../components/Breadcrumb";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Customers from "../../components/Customers";
import Faqs from "../../components/Faq/Faqs";


function RateMortgage() {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const features = [
        "$0 lender fee",
        "24/7 superior customer service",
        "Low mortgage interest rate",
        "upto 5% cash back",
        "Low down payment",
    ];


    useEffect(() => {
        fetchMortgageRates();
    }, []);

    const fetchMortgageRates = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/get_mortgage_rate"
            );
            const data = await res.json();

            if (data.success) {
                setRates(data.data);
            }
        } catch (error) {
            console.error("Error fetching mortgage rates:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <BreadcrumbHero
                title="Mortgage rate"
                image="/Breadcrumb/rate-mortgage.webp"
            />

            <section className="container mx-auto px-4 py-14 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
                            Mortgage rates
                        </h1>

                        <p className="text-gray-600 leading-relaxed max-w-xl mb-8">
                            A mortgage rate is the interest rate charged by a
                            lender on a mortgage loan. It represents the cost of
                            borrowing money to finance a home purchase or
                            refinance an existing mortgage.
                        </p>

                        <p className="text-gray-700">
                            Call our consultant <br />
                            <a
                                href="tel:+18787539922"
                                className="text-red-600 font-medium"
                            >
                                +1 (878)-753-9922
                            </a>
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-sm">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-center">
                            Check today rates
                        </h2>

                        <p className="text-gray-600 text-center mb-8">
                            Select purchase or refinance rates to get started
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="relative overflow-hidden bg-red-600 text-white px-8 py-4 rounded-md font-medium group">
                                <span className="absolute inset-0 bg-blue-900 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                <span className="relative z-10">
                                    Purchase Rates
                                </span>
                            </button>

                            <button className="relative overflow-hidden bg-blue-900 text-white px-8 py-4 rounded-md font-medium group">
                                <span className="absolute inset-0 bg-red-600 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                <span className="relative z-10">
                                    Refinance Rates
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    {loading ? (
                        <p className="text-center text-gray-500">
                            Loading rates...
                        </p>
                    ) : rates.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No mortgage rates available
                        </p>
                    ) : (
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-200 text-left">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">
                                            Mortgage Type
                                        </th>
                                        <th className="px-6 py-4 font-medium">
                                            Rate
                                        </th>
                                        <th className="px-6 py-4 font-medium">
                                            APR
                                        </th>
                                        <th className="px-6 py-4 font-medium">
                                            Point
                                        </th>
                                        <th className="px-6 py-4 font-medium">
                                            Monthly payment
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {rates.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-gray-200 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4">
                                                {item.mortgage_type}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.rate}%
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.apr}%
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.point}
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                ${item.monthly_payment}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                    <div className="bg-[#EBF1F6] flex items-center">
                        <div className="wrapper mx-auto px-4 py-12 sm:py-14">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
                                Enjoy a mortgage rewards
                            </h2>

                            <p className="text-gray-600 leading-relaxed max-w-xl mb-8">
                                A savings account is a type of bank account that is designed to
                                help individuals save money while earning interest on their
                                deposits.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {features.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3 text-gray-700"
                                    >
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900 text-white">
                                            <FiCheck size={14} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="relative overflow-hidden bg-red-600 text-white px-8 py-4 rounded-md font-medium group"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>

                                <span className="relative z-10">
                                    Open An Account
                                </span>
                            </button>

                        </div>
                    </div>

                    <div className="relative h-[420px] sm:h-[550px] w-full">
                        <img
                            src="/Mortgage/bank.jpg"
                            alt="Mortgage rewards"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            <Customers />

            <Faqs showCategories={false} faqType="mortgage" />


        </div>
    );
}

export default RateMortgage;
