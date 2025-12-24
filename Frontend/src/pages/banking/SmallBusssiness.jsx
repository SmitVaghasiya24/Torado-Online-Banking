import React from 'react'
import BreadcrumbHero from '../../components/Breadcrumb';
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import FolderCard from '../../components/FolderCard';
import Download from '../../components/Download';

const steps = [
    {
        no: "01",
        title: "Gather required documentation",
        text:
            "Laculis ultrices egestas purus eget facilisis justo dignissim. Eget morbi condimentum lobortis in vulputate consequat. Id euismod consectetur amet elit habitasse accumsan tristique.",
    },
    {
        no: "02",
        title: "Visit the bank or apply online",
        text:
            "Eget morbi condimentum lobortis in vulputate consequat. Id euismod consectetur amet elit habitasse accumsan tristique. A non est adipiscing urna bibendum consequat viverra.",
    },
    {
        no: "03",
        title: "Receive account details and access",
        text:
            "Laculis ultrices egestas purus eget facilisis justo dignissim. Eget morbi condimentum lobortis in vulputate consequat. Id euismod consectetur amet elit habitasse accumsan tristique.",
    },
];

const cards = [
    {
        title: "Banking service evolved",
        text:
            "Small business banking offers a range of services and support to help businesses manage.",
    },
    {
        title: "Funding for your business",
        text:
            "Small business banking offers a range of services and support to help businesses manage.",
    },
    {
        title: "Business card rewards",
        text:
            "Small business banking offers a range of services and support to help businesses manage.",
    },
    {
        title: "Payments taken ease",
        text:
            "Small business banking offers a range of services and support to help businesses manage.",
    },
];

const services = [
    {
        no: "01",
        title: "Business credit and financing",
        desc:
            "Eget morbi condimentum lobortis in vulputate consequat. Id euismod consectetur amet elit habitasse accumsan tristique. A non est adipiscing urna bibendum consequat viverra.",
    },
    {
        no: "02",
        title: "Mobile banking",
        desc:
            "Eget morbi condimentum lobortis in vulputate consequat. Id euismod consectetur amet elit habitasse accumsan tristique. A non est adipiscing urna bibendum consequat viverra.",
    },
    {
        no: "03",
        title: "Online Banking",
        desc:
            "Eget morbi condimentum lobortis in vulputate consequat. Id euismod consectetur amet elit habitasse accumsan tristique. A non est adipiscing urna bibendum consequat viverra.",
    },
    {
        no: "04",
        title: "Cash management solutions",
        desc:
            "Eget morbi condimentum lobortis in vulputate consequat. Id euismod consectetur amet elit habitasse accumsan tristique. A non est adipiscing urna bibendum consequat viverra.",
    },
];

const item = [
    {
        title: "Check your customers credit",
        desc:
            "Enim sodales vulputate eu turpis et habitant. Non lectus feugiat sem nam eu lectus. Dui sit egestas urna morbi quis egestas scelerisque ullamcorper adipiscing.",
        img: "/Mortgage/card-img-1.webp",
    },
    {
        title: "Debt collection for small business",
        desc:
            "Enim sodales vulputate eu turpis et habitant. Non lectus feugiat sem nam eu lectus. Dui sit egestas urna morbi quis egestas scelerisque ullamcorper adipiscing.",
        img: "/Mortgage/card-img-4.webp",
    },
    {
        title: "Manage your business credit",
        desc:
            "Enim sodales vulputate eu turpis et habitant. Non lectus feugiat sem nam eu lectus. Dui sit egestas urna morbi quis egestas scelerisque ullamcorper adipiscing.",
        img: "/Mortgage/card-img-5.webp",
    },
];

function SmallBusssiness() {
    const navigate = useNavigate();
    return (
        <div>
            <BreadcrumbHero
                title="Saving  Account"
                image="/Breadcrumb/small-bussiness.webp"
            />


            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                                Smart advice for your <br /> small business banking
                            </h2>

                            <p className="text-gray-600 leading-relaxed max-w-xl mb-10">
                                Small business banking refers to financial services and products
                                specifically designed for small businesses. It caters to the
                                unique banking needs of entrepreneurs, startups, and small-scale
                                enterprises. Small business banking offers a range of services and
                                support to help businesses manage their finances, access credit,
                                and streamline their banking operations.
                            </p>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="group cursor-pointer relative mt-8 px-6 overflow-hidden rounded-md bg-red-600 py-3 text-sm sm:text-base font-medium text-white transition"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative z-10">Open An Account</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col justify-between"
                                >
                                    <div>
                                        <h4 className="text-xl font-semibold mb-4">
                                            {card.title}
                                        </h4>

                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            {card.text}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => navigate("/open-account")}
                                        className="relative inline-flex font-medium text-gray-900 group"
                                    >
                                        <span
                                            className="relative inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-red-600 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-red-600 after:transition-all after:duration-300 group-hover:after:w-full"
                                        >
                                            Get Started
                                            <FiArrowRight />
                                        </span>
                                    </button>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-strech">

                        <div className="flex justify-center lg:justify-start">
                            <img
                                src="/banking/banking-3.webp"
                                alt="Open a small business account"
                                className="w-full max-w-md sm:max-w-lg rounded-3xl object-cover"
                                loading="lazy"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
                                How to open a small business account
                            </h2>

                            <p className="text-red-600 font-medium mb-6">
                                To open a small business account, you can follow these general steps
                            </p>

                            <div className="space-y-6">
                                {steps.map((step, i) => (
                                    <div key={i} className="relative flex gap-6">

                                        <span className="text-red-600 text-xl font-semibold shrink-0">
                                            {step.no}
                                        </span>

                                        <div className="relative w-full pb-6">
                                            <h4 className="text-lg font-semibold mb-2">
                                                {step.title}
                                            </h4>

                                            <p className="text-gray-600 leading-relaxed">
                                                {step.text}
                                            </p>

                                            {i !== steps.length - 1 && (
                                                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-gray-300"></span>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20 bg-linear-to-br from-gray-50 via-indigo-50 to-gray-50">
                <div className="container mx-auto px-4">

                    <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold mb-">
                        Small business checking accounts
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">

                        <FolderCard
                            bgColor="white"
                            borderColor="#e5e7eb"
                            headerHeight={50}
                            className="pt-20 sm:pt-14 px-5 sm:px-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                                    Basic Business Checking
                                </h3>

                                <p className="font-medium mb-4 text-sm sm:text-base">
                                    A et auctor id scelerisque semper. Suspendisse ullamcorper
                                    quis sapien elementum dui mattis pellentesque laoreet.
                                </p>

                                <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                                    Laculis ultrices egestas purus eget facilisis justo dignissim.
                                    Eget morbi condimentum lobortis in vulputate consequat. Id
                                    euismod consectetur amet elit habitasse accumsan tristique.
                                    A non est adipiscing urna bibendum consequat viverra.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="group relative w-fit cursor-pointer overflow-hidden rounded-md bg-red-600 px-6 py-3 text-sm sm:text-base font-medium text-white transition"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative z-10">Open An Account</span>
                            </button>
                        </FolderCard>


                        <FolderCard
                            bgColor="white"
                            borderColor="#e5e7eb"
                            headerHeight={50}
                            className="pt-20 sm:pt-14 px-5 sm:px-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                                    Business Interest Checking
                                </h3>

                                <p className="font-medium mb-4 text-sm sm:text-base">
                                    A et auctor id scelerisque semper. Suspendisse ullamcorper
                                    quis sapien elementum dui mattis pellentesque laoreet.
                                </p>

                                <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                                    Laculis ultrices egestas purus eget facilisis justo dignissim.
                                    Eget morbi condimentum lobortis in vulputate consequat. Id
                                    euismod consectetur amet elit habitasse accumsan tristique.
                                    A non est adipiscing urna bibendum consequat viverra.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/open-account")}
                                className="group relative w-fit cursor-pointer overflow-hidden rounded-md bg-red-600 px-6 py-3 text-sm sm:text-base font-medium text-white transition"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                                <span className="relative z-10">Open An Account</span>
                            </button>
                        </FolderCard>

                    </div>

                </div>
            </section>

            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">

                        <div className="h-full flex flex-col">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-10">
                                Additional small business <br /> banking services
                            </h2>

                            <div className="space-y-4">
                                {services.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-6 px-6 py-3 border border-gray-200 rounded-xl bg-white"
                                    >
                                        <span className="shrink-0 w-10 h-10 rounded-full border border-red-600 text-red-600 flex items-center justify-center font-semibold">
                                            {item.no}
                                        </span>

                                        <div>
                                            <h4 className="inline font-semibold text-lg text-blue-900">
                                                {item.title}
                                            </h4>
                                            <span className="text-gray-600 leading-relaxed">
                                                {" "}
                                                {item.desc}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-full flex justify-center lg:justify-end">
                            <img
                                src="/Mortgage/mortgage-cal.jpg"
                                alt="Small business banking services"
                                className="w-full h-full max-w-md sm:max-w-lg rounded-3xl object-cover"
                                loading="lazy"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-14">
                <h2 className="text-3xl mx-auto sm:text-4xl md:text-5xl text-center mb-14">
                    Experience helps your small business grow
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {item.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 sm:py-6 flex flex-col h-full border border-gray-200
                   transition-all duration-300 ease-out
                   hover:-translate-y-1 "
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
            </section>


            <Download />

        </div>
    )
}

export default SmallBusssiness