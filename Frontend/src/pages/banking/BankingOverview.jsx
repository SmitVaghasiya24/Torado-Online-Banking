import React from 'react'
import BreadcrumbHero from '../../components/Breadcrumb'
import { FiMonitor, FiPocket, FiFileText, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import Download from '../../components/Download';
import Banking from '../../components/Banking';

const activities = [
    {
        title: "Checking Account",
        icon: FiMonitor,
    },
    {
        title: "Saving Account",
        icon: FiPocket,
    },
    {
        title: "Certificate Of Deposits",
        icon: FiFileText,
    },
    {
        title: "Banking IRAs",
        icon: FiDollarSign,
    },
];

const item = [
    {
        title: "Fixed-rate mortgage",
        desc:
            "Enim sodales vulputate eu turpis et habitant. Non lectus feugiat sem nam eu lectus. Dui sit egestas urna morbi quis egestas scelerisque ullamcorper adipiscing.",
        img: "/Mortgage/card-img-1.webp",
    },
    {
        title: "Variable rate mortgage",
        desc:
            "Enim sodales vulputate eu turpis et habitant. Non lectus feugiat sem nam eu lectus. Dui sit egestas urna morbi quis egestas scelerisque ullamcorper adipiscing.",
        img: "/Mortgage/card-img-4.webp",
    },
    {
        title: "Home power plan",
        desc:
            "Enim sodales vulputate eu turpis et habitant. Non lectus feugiat sem nam eu lectus. Dui sit egestas urna morbi quis egestas scelerisque ullamcorper adipiscing.",
        img: "/Mortgage/card-img-5.webp",
    },
];

const cards = [
  {
    title: "1% cash back",
    desc:
      "checking accounts for day-to-day transactions and savings accounts for storing funds and earning interest.",
    link: "Checking account",
    path: "/banking-checking",
  },
  {
    title: "4.0% APY",
    desc:
      "checking accounts for day-to-day transactions and savings accounts for storing funds and earning interest.",
    link: "Saving account",
    path: "/banking-saving",
  },
  {
    title: "4.0% APY",
    subtitle: "1-Year Fixed Rate",
    desc:
      "checking accounts for day-to-day transactions and savings accounts for storing funds and earning interest.",
    link: "Certificate of deposits",
    path: "/banking-certificate",
  },
];


function BankingOverview() {
    const navigate = useNavigate();
    return (
        <div>
            <BreadcrumbHero
                title="Banking overview"
                image="/Breadcrumb/bank-overview.webp"
            />

            <section className="container mx-auto px-4 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
                    <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">
                        Learn about banking activities
                    </h2>

                    <p className="text-gray-600 leading-relaxed max-w-xl">
                        Banking is a crucial component of the global financial system,
                        providing a wide range of financial services to individuals,
                        businesses, and governments. It involves various activities related
                        to managing money, facilitating transactions, and offering financial
                        products and services.
                    </p>
                </div>

                <div className="bg-[#F5F7FA] rounded-2xl border border-gray-200 py-12 px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                        {activities.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 text-blue-700">
                                        <Icon size={28} />
                                    </div>

                                    <p className="font-medium text-gray-800">
                                        {item.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-14">
                <h2 className="text-3xl max-w-2xl mx-auto sm:text-4xl md:text-5xl font- text-center mb-14">
                    Online banking is very easy with Torado
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {item.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 sm:py-6 flex flex-col h-full border border-gray-200"
                        >
                            <img
                                src={item.img}
                                alt=""
                                className="rounded-xl w-full h-48 object-cover"
                            />

                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>

                    ))}
                </div>

                <p className="text-center text-sm sm:text-base mt-8 text-gray-800">
                    Open online banking account very easily.{" "}
                    <span
                        onClick={() => navigate("/open-account")}
                        className="cursor-pointer text-[#6a6ae4] hover:text-red-400 transition underline font-medium "
                    >
                        Open an Account
                    </span>
                </p>

            </section>

           
            <Banking/>

            <section className="container mx-auto px-4 py-14">
                <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-14">
                    It has all important banking facilities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl p-8 bg-white"
                        >
                            <div className="mb-4">
                                <span className="text-red-600 text-4xl font-semibold">
                                    {card.title}
                                </span>
                                {card.subtitle && (
                                    <span className="ml-2 text-sm text-gray-700">
                                        {card.subtitle}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-10">
                                {card.desc}
                            </p>

                            <button
                            onClick={() => navigate(card.path)}
                                className="relative flex items-center gap-2 font-medium transition-colors hover:text-red-600 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {card.link} <FiArrowRight />
                            </button>

                        </div>
                    ))}
                </div>
                <p className="text-center text-sm sm:text-base mt-8 text-gray-800">
                    Open online banking account very easily.{" "}
                    <span
                        onClick={() => navigate("/open-account")}
                        className="cursor-pointer text-[#6a6ae4] hover:text-red-400 transition underline font-medium "
                    >
                        Open an Account
                    </span>
                </p>
            </section>

            <Download/>

        </div>
    )
}

export default BankingOverview