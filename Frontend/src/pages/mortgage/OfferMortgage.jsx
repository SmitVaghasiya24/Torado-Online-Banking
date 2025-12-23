import React from 'react'
import BreadcrumbHero from "../../components/Breadcrumb";
import FolderCard from '../../components/FolderCard';
import { FiDollarSign, FiPercent, FiCalendar, FiRepeat, FiCreditCard, FiSlash, FiAlertTriangle, FiClock } from "react-icons/fi";
import Faqs from '../../components/Faq/Faqs';
import LatestNews from '../../components/LatestNews';
import { useNavigate } from 'react-router-dom';

const items = [
    {
        key: "A",
        title: "Loan amount",
        icon: <FiDollarSign />,
    },
    {
        key: "B",
        title: "Interest rate",
        icon: <FiPercent />,
    },
    {
        key: "C",
        title: "Loan term",
        icon: <FiCalendar />,
    },
    {
        key: "D",
        title: "Repayment structure",
        icon: <FiRepeat />,
    },
    {
        key: "E",
        title: "Fees & Costs",
        icon: <FiCreditCard />,
    },
    {
        key: "F",
        title: "Prepayment penalties",
        icon: <FiSlash />,
    },
    {
        key: "G",
        title: "Contingencies",
        icon: <FiAlertTriangle />,
    },
    {
        key: "H",
        title: "Expiration date",
        icon: <FiClock />,
    },
];

const steps = [
    {
        number: "01",
        title: "Apply for a mortgage",
    },
    {
        number: "02",
        title: "Get your mortgage funded",
    },
    {
        number: "03",
        title: "Make your payment from a Torado account",
    },
    {
        number: "04",
        title: "Enjoy your cash back",
    },
];

function OfferMortgage() {
    const navigate = useNavigate();
    return (
        <div>
            <BreadcrumbHero
                title="Mortgage Offers"
                image="/Breadcrumb/mortgage-offer.webp"
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <h2 className="text-4xl sm:text-5xl font-semibold">
                        Special mortgage offers
                    </h2>

                    <p className="text-gray-600 max-w-xl">
                        Mortgage offers refer to the specific terms and conditions presented by
                        lenders to borrowers for obtaining a mortgage loan. These offers outline
                        the key details of the loan, including the loan amount, interest rate,
                        loan term, and any associated fees or requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 ">
                    <FolderCard
                        bgColor="#d6c2ae"
                        borderColor="#d6c2ae"
                        headerHeight={50}
                        className="relative rounded-2xl px-4 py-5 sm:px-8 sm:pt-8 overflow-hidden"
                    >
                        <div className="absolute right-8 bottom-8 sm:right-10 sm:bottom-10 w-28 h-28 sm:w-40 sm:h-40 rotate-45 rounded-xl opacity-40 pointer-events-none z-0" style={{ backgroundColor: "#c8b39c" }}></div>

                        <div className="relative z-10">
                            <h3 className="text-xl sm:text-2xl font-semibold mt-10 sm:mt-0 mb-3 sm:mb-4">
                                Limited time offer
                            </h3>

                            <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                                Get up to $1,000 and 20,000 points, only with an Torado mortgage.
                            </p>

                            <p className="text-gray-700 max-w-md mb-8 sm:mb-10 text-sm sm:text-base">
                                Mortgage offers refer to the specific terms and conditions presented by
                                lenders to borrowers for obtaining a mortgage loan.
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <button
                                    onClick={() => navigate("/open-account")}
                                    className="relative flex items-center gap-2 text-red-600 font-medium transition-all hover:gap-3 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full">
                                    Get started →
                                </button>


                                <span className="text-sm font-medium">
                                    Offer available until December 31th, 2025
                                </span>
                            </div>
                        </div>
                    </FolderCard>

                    <FolderCard
                        bgColor="#bcc4ff"
                        borderColor="#bcc4ff"
                        headerHeight={50}
                        className="relative rounded-2xl px-6 py-6 sm:p-8 overflow-hidden"
                    >
                        <div className="absolute right-6 bottom-6 sm:right-10 sm:bottom-8 w-28 h-28 sm:w-40 sm:h-40 rotate-45 rounded-xl opacity-40 pointer-events-none z-0" style={{ backgroundColor: "#aab4ff" }}></div>

                        <div className="relative z-10">
                            <h3 className="text-xl sm:text-2xl font-semibold mt-10 sm:mt-0 mb-3 sm:mb-4">
                                Limited switch offer
                            </h3>

                            <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                                Get up to $1,500 and 50,000 points, only with an Torado mortgage.
                            </p>

                            <p className="text-gray-700 max-w-md mb-8 sm:mb-10 text-sm sm:text-base">
                                After submitting your application, the credit card issuer will review
                                your application and assess your creditworthiness.
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                 <button
                                    onClick={() => navigate("/open-account")}
                                    className="relative flex items-center gap-2 text-red-600 font-medium transition-all hover:gap-2 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full">
                                    Get started →
                                </button>

                                <span className="text-sm font-medium">
                                    Offer available until December 31th, 2025
                                </span>
                            </div>
                        </div>
                    </FolderCard>
                </div>

            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-12">
                    Here are some elements commonly found <br /> in mortgage offers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className="relative bg-gray-50 rounded-2xl p-6"
                        >
                            <span className="absolute top-6 right-6 text-red-600 text-2xl font-semibold">
                                {item.key}
                            </span>

                            <div className="w-12 h-12 rounded-full bg-white border flex items-center justify-center mb-4 text-xl">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-semibold mb-3">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-600 leading-relaxed">
                                The mortgage offer specifies the approved loan amount, which is the
                                maximum amount the lender is willing to lend to the borrower.
                                This is based on factors such as the borrower’s income.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-linear-to-br from-gray-50 to-indigo-50 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl sm:text-5xl font-semibold mb-14">
                        How to get your cash back
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="bg-white rounded-2xl p-8 border border-gray-200 flex gap-6"
                            >
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-full border border-red-500 text-red-600 flex items-center justify-center text-lg font-semibold">
                                        {step.number}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        <span className="text-blue-700">{step.title}:</span>{" "}
                                        <span className="font-normal text-gray-700">
                                            Mortgage payment calculators Enim sodales vulputate eu
                                            turpis et habitant.
                                        </span>
                                    </h3>

                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Non lectus feugiat sem nam eu lectus. Dui sit egestas urna
                                        morbi quis egestas scelerisque ullamcorper adipiscing.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Faqs showCategories={false} faqType="mortgageOffer" />

            <LatestNews />

        </div>
    )
}

export default OfferMortgage