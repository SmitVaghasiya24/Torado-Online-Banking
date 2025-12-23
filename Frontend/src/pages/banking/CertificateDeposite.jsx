import { useNavigate } from "react-router-dom";
import BreadcrumbHero from "../../components/Breadcrumb";
import { FiTrendingUp, FiShield, FiSlash, FiCheck, FiArrowRight } from "react-icons/fi";

const cards = [
    {
        title: "Fixed-term investment",
        desc:
            "After submitting your application, the credit card issuer will review your application and assess your creditworthiness.",
        icon: FiTrendingUp,
        bg: "bg-teal-200",
    },
    {
        title: "Guaranteed returns",
        desc:
            "After submitting your application, the credit card issuer will review your application and assess your creditworthiness.",
        icon: FiShield,
        bg: "bg-[#d7c3b0]",
    },
    {
        title: "Penalties for withdrawal",
        desc:
            "After submitting your application, the credit card issuer will review your application and assess your creditworthiness.",
        icon: FiSlash,
        bg: "bg-indigo-300",
    },
];

const steps = [
    {
        no: "01",
        title: "Fixed Term",
        desc:
            "CDs have a fixed term or maturity period, which is predetermined at the time of purchase.",
    },
    {
        no: "02",
        title: "Interest Rate",
        desc:
            "CDs offer a fixed interest rate, meaning the rate is set at the time of purchase and remains constant throughout the term of the CD.",
    },
    {
        no: "03",
        title: "Guaranteed return",
        desc:
            "One of the main features of CDs is the guarantee of both the principal amount and the accrued interest at maturity.",
    },
    {
        no: "04",
        title: "Penalties for early withdrawal",
        desc:
            "If you need to withdraw funds from a CD before its maturity date, you will typically incur penalties.",
    },
];

function CertificateDeposite() {
    const navigate = useNavigate();
    const features = [
        "Earn up to 0.10% APY",
        "Free interest transfers",
        "No setup or maintenance fees",
        "CDs offer a fixed interest rate",
        "$100 minimum balance to open an account",
    ];

    const plans = [
        { months: "6 Months", rate: "5.00%" },
        { months: "24 Months", rate: "4.60%" },
        { months: "36 Months", rate: "4.30%" },
        { months: "60 Months", rate: "4.00%" },
    ];
    return (
        <div>
            <BreadcrumbHero
                title="Certificate of deposit"
                image="/Breadcrumb/bank-overview.webp"
            />

            <section className="container mx-auto px-4 pt-20 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">
                        What is a certificate <br /> of deposit
                    </h2>

                    <p className="text-gray-600 max-w-xl">
                        A Certificate of Deposit (CD) is a financial product offered by banks
                        and credit unions that allows individuals to deposit a fixed amount
                        of money for a specific period of time, known as the term or maturity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={index}
                                className={`relative rounded-2xl p-8 overflow-hidden ${card.bg}`}
                            >
                                <div className="absolute right-10 top-10 w-48 h-48 bg-white/20 rotate-45 translate-x-16 -translate-y-16 shadow-lg" />

                                <div className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
                                    <Icon size={30} className="text-gray-800" />
                                </div>

                                <h3 className="relative z-10 text-xl font-semibold mb-4">
                                    {card.title}
                                </h3>

                                <p className="relative z-10 text-gray-700 leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-center text-4xl sm:text-5xl font-normal max-w-2xl mx-auto mb-16">
                    Choose a featured certificate of deposite
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Features</h3>

                        <p className="text-gray-600 max-w-md mb-8">
                            A savings account is a type of bank account that is designed to help
                            individuals save money while earning interest on their deposits.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {features.map((item, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center">
                                        <FiCheck size={14} />
                                    </span>
                                    <span className="text-gray-800">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => navigate("/open-account")}
                            className="group cursor-pointer relative mt-8 px-6 overflow-hidden rounded-md bg-red-600 py-3 text-sm sm:text-base font-medium text-white transition"
                        >
                            <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                            <span className="relative z-10">Open An Account</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-3 text-center"
                            >
                                <p className="text-lg font-semibold ">
                                    {plan.months}
                                </p>

                                <div className="mb-2">
                                    <span className="text-red-600 text-5xl font-semibold">
                                        {plan.rate}
                                    </span>
                                    <span className="ml-2 text-lg font-medium">APY</span>
                                </div>

                                <p className="text-gray-600 mb-3">
                                    View rates and balance ranges
                                </p>

                                <button
                                    className="relative cursor-pointer inline-flex items-center gap-2 font-medium text-gray-900 transition-colors duration-300 hover:text-red-600 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"

                                >
                                    Get Started <FiArrowRight />
                                </button>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative bg-linear-to-br from-gray-50 to-indigo-50 py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl max-w-md font-normal mb-4 leading-tight">
                                Ready to get started certificate of deposit
                            </h2>

                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                                Determine the type of account you need based on your banking requirements.
                            </p>


                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-6 pb-6 border-b last:border-b-0 border-gray-200"
                                    >
                                        <span className="text-red-600 text-lg font-semibold">
                                            {step.no}
                                        </span>

                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">
                                                {step.title}
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end mb-16 md:mb-0">
                            <div className="relative w-full max-w-sm sm:max-w-md">

                                <img
                                    src="/banking/cod-1.webp"
                                    alt=""
                                    className="rounded-2xl shadow-lg w-full"
                                />

                                <img
                                        src="/banking/cod-2.webp"
                                        alt=""
                                        className=" rounded-2xl  shadow-xl  w-4/5 sm:w-5/6 lg:h-11/12 absolute -bottom-20 sm:-bottom-28 md:-bottom-40 lg:-bottom-56 left-1/2 sm:left-1/6 -translate-x-1/2  bg-white  border-8   border-white "
                                    />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default CertificateDeposite