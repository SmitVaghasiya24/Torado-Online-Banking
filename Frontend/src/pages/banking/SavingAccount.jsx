import BreadcrumbHero from "../../components/Breadcrumb";
import SavingCalculator from "../../components/SavingsCalculator.jsx";
import Banking from "../../components/Banking.jsx";
import Faqs from "../../components/Faq/Faqs.jsx";
import Download from "../../components/Download.jsx";
import { FiTarget, FiDollarSign, FiHome, FiMonitor, } from "react-icons/fi";

const items = [
    {
        title: "Reach your goals",
        icon: FiTarget,
    },
    {
        title: "Automate your savings",
        icon: FiDollarSign,
    },
    {
        title: "Bank your way",
        icon: FiHome,
    },
    {
        title: "Get digital access",
        icon: FiMonitor,
    },
];

const steps = [
    {
        no: "01",
        text:
            "Explore different banks that offer online savings accounts. Consider factors such as interest rates, fees, customer reviews, account features, and the bank’s reputation.",
    },
    {
        no: "02",
        text:
            "Once you have chosen a bank, visit their official website. Look for section or page dedicated to opening a new account. Most banks prominently display a “Open an Account” or “Apply Now” button on their website.",
    },
    {
        no: "03",
        text:
            "Fill out the online application form with your personal information. This may include your full name, address, date of birth, Social Security number or tax identification number, employment information, contact details.",
    },
    {
        no: "04",
        text:
            "After submitting your application, you will typically receive a confirmation that your application has been received. The bank will then review and process your application.",
    },
];

function SavingAccount() {
    return (    
        <div>
            <BreadcrumbHero
                title="Saving  Account"
                image="/Breadcrumb/saving-acc.webp"
            />

            <section className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white py-12">

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-3xl">
                        Grow your savings, earn interest
                        and invest in tomorrow.
                    </h2>

                    <div className="bg-gray-100 rounded-2xl px-20 py-6">
                        <span className="text-3xl sm:text-4xl font-semibold text-red-600">
                            4.00% APY
                        </span>
                    </div>

                </div>
            </section>

            <SavingCalculator />

            <Banking />

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-14">
                    Why should open a saving accounts
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="relative bg-gray-100 rounded-2xl p-8 flex flex-col items-center text-center"
                            >
                                <div className="absolute top-6 right-6 text-blue-800">
                                    <Icon size={32} />
                                </div>

                                <div className="w-28 h-28 rounded-full bg-gray-50 border mb-6" />

                                <p className="text-gray-800 font-medium">
                                    {item.title}
                                </p>

                                {index !== items.length - 1 && (
                                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 hidden lg:block">
                                        <svg
                                            width="80"
                                            height="40"
                                            viewBox="0 0 80 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0 20
                                                    C15 5, 25 5, 40 20
                                                    C55 35, 65 35, 80 20"
                                                stroke="#E5E7EB"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>


            <section className="bg-linear-to-br from-gray-50 to-indigo-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-30 items-stretch">

                        <div className="flex flex-col justify-center h-full">
                            <h2 className="text-4xl sm:text-4xl font-semibold mb-6">
                                Some simple steps to open an online savings account
                            </h2>

                            <div className="space-y-4">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6"
                                    >
                                        <div className="shrink-0">
                                            <span className="w-12 h-12 rounded-full border border-red-600 text-red-600 flex items-center justify-center text-lg font-semibold">
                                                {step.no}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 leading-relaxed">
                                            {step.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify- w-full h-full">
                            <img
                                src="/Mortgage/mortgage-cal.jpg"
                                alt="Online savings account"
                                className="w-full max-w-sm sm:max-w-md lg:max-w-xl h-full rounded-2xl object-cover"
                            />
                        </div>

                    </div>
                </div>
            </section>


            <Faqs showCategories={false} faqType="savingaccount" />

            <Download />

        </div>
    )
}

export default SavingAccount