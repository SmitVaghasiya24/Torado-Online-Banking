import BreadcrumbHero from "../components/Breadcrumb";
import { FiTrendingUp, FiEyeOff, FiZap } from "react-icons/fi";
import {
    FiHome, FiCreditCard, FiTruck, FiMapPin, FiBookOpen, FiHeart, FiActivity, FiSun, FiCheck
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Subscribe from "../components/Subscriber";
import Faqs from "../components/Faq/Faqs";
import Customers from "../components/Customers";

function PersonalLoan() {
    const navigate = useNavigate();

    const LoanUseCard = ({ icon, title, letter }) => (
        <div className="bg-white rounded-2xl p-6 shadow-sm relative">
            <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-red-600">
                    {icon}
                </div>

                <span className="text-3xl font-semibold text-gray-200">
                    {letter}
                </span>
            </div>

            <h4 className="font-semibold text-lg mb-2">
                {title}
            </h4>

            <p className="text-gray-600 text-sm leading-relaxed">
                A Personal loan is a type of loan provided by financial institutions,
                such as banks or credit unions, to individuals for personal use.
            </p>
        </div>
    );

    return (
        <div>
            <BreadcrumbHero
                title="Personal loan"
                image="/Breadcrumb/loan.webp"
            />

            <section className="container mx-auto px-4 py-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">
                        Why choose Torado <br /> Personal loan?
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        A Personal loan is a type of loan provided by financial
                        institutions, such as banks or credit unions, to individuals
                        for personal use. Personal loans are generally unsecured,
                        meaning they do not require collateral.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="relative rounded-2xl p-8 bg-[#bfe9e7] overflow-hidden">
                        <div className="absolute right-0 top-0 w-40 h-40 bg-white/30 rotate-45 translate-x-10 -translate-y-10"></div>

                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                            <FiTrendingUp className="text-2xl text-gray-800" />
                        </div>

                        <h4 className="text-xl font-semibold mb-3">
                            Fixed-term investment
                        </h4>

                        <p className="text-gray-700 leading-relaxed">
                            After submitting your application, the credit card
                            issuer will review your application and assess your
                            creditworthiness.
                        </p>
                    </div>

                    <div className="relative rounded-2xl p-8 bg-[#d6c2ae] overflow-hidden">
                        <div className="absolute right-0 top-0 w-40 h-40 bg-white/30 rotate-45 translate-x-10 -translate-y-10"></div>

                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                            <FiEyeOff className="text-2xl text-gray-800" />
                        </div>

                        <h4 className="text-xl font-semibold mb-3">
                            No hidden fees
                        </h4>

                        <p className="text-gray-700 leading-relaxed">
                            After submitting your application, the credit card
                            issuer will review your application and assess your
                            creditworthiness.
                        </p>
                    </div>

                    <div className="relative rounded-2xl p-8 bg-[#bfc5f7] overflow-hidden">
                        <div className="absolute right-0 top-0 w-40 h-40 bg-white/30 rotate-45 translate-x-10 -translate-y-10"></div>

                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                            <FiZap className="text-2xl text-gray-800" />
                        </div>

                        <h4 className="text-xl font-semibold mb-3">
                            Quick and easy application
                        </h4>

                        <p className="text-gray-700 leading-relaxed">
                            After submitting your application, the credit card
                            issuer will review your application and assess your
                            creditworthiness.
                        </p>
                    </div>

                </div>

            </section>

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <div>
                        <img
                            src="/PersonalLoan/banking.webp"
                            alt="Personal loan features"
                            className="w-full rounded-3xl object-cover"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-semibold max-w-md leading-tight mb-6">
                            Personal loans have several key features
                        </h2>

                        <p className="text-red-600 text-lg mb-6">
                            Personal loans typically have several key features that make them
                            attractive to borrowers.
                        </p>

                        <div className="flex gap-6 mb-8">
                            <span className="text-red-600 text-2xl font-semibold shrink-0">
                                01
                            </span>

                            <div className="w-full pb-8 border-b border-gray-200">
                                <h4 className="text-xl font-semibold mb-2">
                                    Flexible terms
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                    Laculis ultrices egestas purus eget facilisis justo dignissim.
                                    Eget morbi condimentum lobortis in vulputate consequat. Id euismod
                                    consectetur amet elit habitasse accumsan tristique.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 mb-8">
                            <span className="text-red-600 text-2xl font-semibold shrink-0">
                                02
                            </span>

                            <div className="w-full pb-8 border-b border-gray-200">
                                <h4 className="text-xl font-semibold mb-2">
                                    No early payment penalties
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                    Eget morbi condimentum lobortis in vulputate consequat.
                                    Id euismod consectetur amet elit habitasse accumsan tristique.
                                    A non est adipiscing urna bibendum consequat viverra.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <span className="text-red-600 text-2xl font-semibold shrink-0">
                                03
                            </span>

                            <div className="w-full">
                                <h4 className="text-xl font-semibold mb-2">
                                    Easy payment options
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                    Laculis ultrices egestas purus eget facilisis justo dignissim.
                                    Eget morbi condimentum lobortis in vulputate consequat. Id euismod
                                    consectetur amet elit habitasse accumsan tristique.
                                </p>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <section className="bg-[#e3e3e3] py-20 px-4">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <LoanUseCard
                        icon={<FiHome className="text-2xl" />}
                        title="Home improvement"
                        letter="A"
                    />

                    <LoanUseCard
                        icon={<FiCreditCard className="text-2xl" />}
                        title="Debt consolidation"
                        letter="B"
                    />

                    <LoanUseCard
                        icon={<FiTruck className="text-2xl" />}
                        title="Car"
                        letter="C"
                    />

                    <LoanUseCard
                        icon={<FiMapPin className="text-2xl" />}
                        title="Travel"
                        letter="D"
                    />

                    <LoanUseCard
                        icon={<FiBookOpen className="text-2xl" />}
                        title="Education"
                        letter="E"
                    />

                    <LoanUseCard
                        icon={<FiHeart className="text-2xl" />}
                        title="Wedding"
                        letter="F"
                    />

                    <LoanUseCard
                        icon={<FiActivity className="text-2xl" />}
                        title="Medical"
                        letter="G"
                    />

                    <LoanUseCard
                        icon={<FiSun className="text-2xl" />}
                        title="Take a vacation"
                        letter="H"
                    />

                </div>

            </section>

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <div>
                        <h2 className="text-4xl sm:text-5xl font-semibold leading-tight mb-12">
                            Apply for a Personal loan in <br /> easy way
                        </h2>

                        <div className="flex gap-6 mb-8">
                            <span className="text-red-600 text-2xl font-semibold shrink-0">
                                01
                            </span>
                            <div className="w-full pb-8 border-b border-gray-200">
                                <h4 className="text-xl font-semibold mb-2">
                                    Decide how much you need
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Start by getting pre-approved for a mortgage, which involves
                                    providing the necessary financial information to a lender.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 mb-8">
                            <span className="text-red-600 text-2xl font-semibold shrink-0">
                                02
                            </span>
                            <div className="w-full pb-8 border-b border-gray-200">
                                <h4 className="text-xl font-semibold mb-2">
                                    Prequalify and compare offers
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Once you find a suitable lender, you’ll complete a mortgage
                                    application and provide documents such as proof of income.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 mb-8">
                            <span className="text-red-600 text-2xl font-semibold shrink-0">
                                03
                            </span>
                            <div className="w-full pb-8 border-b border-gray-200">
                                <h4 className="text-xl font-semibold mb-2">
                                    Gather documents and submit the application
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    The lender will review your application, verify the provided
                                    information, and assess your creditworthiness.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <span className="text-red-600 text-2xl font-semibold shrink-0">
                                04
                            </span>
                            <div className="w-full">
                                <h4 className="text-xl font-semibold mb-2">
                                    Wait for approval and funding
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    If approved, the lender will provide a mortgage offer outlining
                                    the terms, interest rate, loan amount, and conditions.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="relative">
                        <img
                            src="/page/img-1.webp"
                            alt=""
                            className="w-3/4 rounded-3xl object-cover"
                        />

                        <img
                            src="/page/img-2.webp"
                            alt=""
                            className="w-4/6 rounded-3xl border-8 border-white object-cover absolute -bottom-14 md:-bottom-40 right-2 shadow-xl"
                        />

                        <button
                            onClick={() => navigate('/personal-loan-apply')}
                            className=" left-1/3 md:left-22 cursor-pointer -translate-x-1/2 -bottom-7 lg:-bottom-[90px]
                                        relative overflow-hidden  bg-red-600 text-white px-10 py-3 rounded-md transition group "
                        >
                            <span
                                className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            </span>

                            <span className="relative z-10">
                                Apply Now
                            </span>
                        </button>

                    </div>

                </div>
            </section>

            <section className="wrapper mx-auto px- py-20">
                <div className="bg-[#b7e1e1] rounded-3xl p-10 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <div>
                            <img
                                src="/PersonalLoan/loan-img.webp"
                                alt="Eligibility"
                                className="rounded-2xl w-[500px] object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl lg:text-4xl font-semibold mb-8 text-black">
                                Check are you eligible to apply?
                            </h2>

                            <h4 className="text-lg font-semibold mb-6">
                                Requirements
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                                {[
                                    "Must be at least 18 years of age",
                                    "Must meet Torado criteria",
                                    "Meet minimum income requirements",
                                    "Be employed or have regular income",
                                    "Have a good credit rating",
                                    "Be an USA citizen",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="w-5 h-5 mt-1 flex items-center justify-center rounded-full bg-red-600 text-white">
                                            <FiCheck size={12} />
                                        </span>

                                        <p className="text-gray-800 leading-relaxed">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 pb-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-semibold leading-snug">
                        Get Torado Personal loan in <br /> three simple steps
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="border border-gray-200 rounded-2xl p-8">
                        <h3 className="text-xl font-semibold mb-6">
                            Online application
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    Visit the Torado website or use their mobile app to
                                    access the online loan application.
                                </p>
                            </li>

                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    Provide the required personal and financial information
                                    as prompted.
                                </p>
                            </li>

                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    Carefully review the terms and conditions of the loan &
                                    submit the online application form.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-8">
                        <h3 className="text-xl font-semibold mb-6">
                            Loan approval & documentation
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    After submitting your application, Torado will review
                                    your information and eligibility.
                                </p>
                            </li>

                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    If approved, you will receive an offer detailing the
                                    approved loan amount.
                                </p>
                            </li>

                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    Review the loan offer carefully, ensuring you understand
                                    the terms and conditions.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-8">
                        <h3 className="text-xl font-semibold mb-6">
                            Loan disbursement and repay
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="w-2 h-2 shrink-0 mt-2.5 rounded-full bg-red-600 " />
                                <p className="text-gray-700 leading-relaxed">
                                    Once all required documentation is submitted and verified,
                                    Torado will process your loan.
                                </p>
                            </li>


                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    Upon approval, the loan amount will be disbursed to your
                                    designated bank account.
                                </p>
                            </li>

                            <li className="flex gap-3">
                                <span className="w-2 h-2 shrink-0 mt-2 rounded-full bg-red-600" />
                                <p className="text-gray-700 leading-relaxed">
                                    Monitor your loan balance and track your repayment
                                    progress using the Torado app.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-14 text-gray-700">
                    Open online banking account very easily.{" "}
                    <a href="#" className="text-blue-700 underline font-medium">
                        Open An Account
                    </a>
                </div>
            </section>

            <Subscribe />

            <Faqs showCategories={false} faqType="personal" />

            <div className="mb-16">
                <Customers />
            </div>


        </div>
    );
}

export default PersonalLoan;
