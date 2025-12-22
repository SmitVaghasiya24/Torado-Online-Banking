import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { RiExchangeDollarLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";

import BreadcrumbHero from "../../components/Breadcrumb";
import FolderCard from "../../components/FolderCard";
import { useNavigate } from "react-router-dom";
import Faqs from "../../components/Faq/Faqs";
import Subscribe from "../../components/Subscriber";


const steps = [
    {
        no: "01",
        title: "Pre-approval",
        desc:
            "Start by getting pre-approved for a mortgage, which involves providing the necessary financial information to a lender.",
    },
    {
        no: "02",
        title: "Mortgage application",
        desc:
            "Once you find a suitable lender, you'll complete a mortgage application and provide documents such as proof of income.",
    },
    {
        no: "03",
        title: "Mortgage underwriting",
        desc:
            "The lender will review your application, verify the provided information, and assess your creditworthiness and the property’s value.",
    },
    {
        no: "04",
        title: "Mortgage offer and acceptance",
        desc:
            "If approved, the lender will provide a mortgage offer outlining the terms, interest rate, loan amount, and any conditions.",
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

function ExploreMortgage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const items = [
        {
            label: "A",
            title: "Fixed-rate mortgage",
            desc:
                "With a fixed-rate mortgage, the interest rate remains constant throughout the loan term. This provides stability in monthly mortgage payments, making it easier to budget.",
            Icon: HiHome,
        },
        {
            label: "B",
            title: "Adjustable-rate mortgage",
            desc:
                "With a fixed-rate mortgage, the interest rate remains constant throughout the loan term. This provides stability in monthly payment.",
            Icon: RiExchangeDollarLine,
        },
        {
            label: "C",
            title: "Government-backed mortgages",
            desc:
                "With a fixed-rate mortgage, the interest rate remains constant throughout the loan term. This provides stability in monthly payment.",
            Icon: BsFileEarmarkText,
        },
    ];



    return (
        <div>
            <BreadcrumbHero
                title="Explore Mortgage"
                image="/Breadcrumb/exp-mortgage.webp"
            />

            <section className="container mx-auto px-4 py-14 sm:py-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-1 sm:mb-2">
                    Types of mortgages
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {items.map((item, index) => {
                        const Icon = item.Icon;

                        return (
                            <FolderCard
                                key={index}
                                bgColor="white"
                                borderColor="#e5e7eb"
                                headerHeight={45}
                                className="bg-white rounded-2xl py-6 sm:py-8 px-4 lg:px-4 flex flex-col min-h-[360px] lg:h-[430px]"

                            >
                                <div className="flex items-start justify-between mt-6 sm:mt-8 mb-4">
                                    <Icon className="text-3xl sm:text-4xl text-blue-900" />
                                    <span className="text-base sm:text-lg font-medium">
                                        {item.label}
                                    </span>
                                </div>

                                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-10">
                                    {item.desc}
                                </p>

                                <button
                                    onClick={() => navigate("/open-account")}
                                    className="group mt-auto inline-flex items-center gap-2 text-sm sm:text-base font-medium relative"
                                >
                                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>

                                    <span className="transition-colors duration-300 group-hover:text-red-600">
                                        Get Started
                                    </span>

                                    <FiArrowRight className="transition-colors duration-300 group-hover:text-red-600" />
                                </button>
                            </FolderCard>
                        );
                    })}
                </div>
            </section>


            <section className="relative bg-linear-to-br from-gray-50 to-indigo-50 py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-12 leading-tight">
                                How the mortgage process <br className="hidden sm:block" />
                                is handled
                            </h2>

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
                                    src="/page/img-1.webp"
                                    alt=""
                                    className="rounded-2xl shadow-lg w-full"
                                />

                                <img
                                    src="/page/img-2.webp"
                                    alt=""
                                    className="rounded-2xl shadow-xl w-4/5 sm:w-5/12 md:w-4/6 lg:w-5/6 absolute -bottom-20 sm:-bottom-28 md:-bottom-10 lg:-bottom-56 left-1/2 md:left-1/6 -translate-x-1/2 bg-white border-8 border-white"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-[#E30012] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 lg:py-24 mb-14">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-4 sm:mb-6 leading-tight">
                    Take your first step towards a new home
                </h1>

                <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center">
                    Start your application
                </h3>
            </section>

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-14">
                    What kind of mortgage is right for you
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
            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-14">
                    Mortgage process overview
                </h2>

                <div
                    className="relative container mx-auto cursor-pointer group"
                    onClick={() => setOpen(true)}
                >
                    <img
                        src="/page/img-1.webp"
                        alt="Mortgage process overview"
                        className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">

                            <span className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/40 animate-ping [animation-duration:2.5s]"></span>

                            <span className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/20 animate-pulse [animation-duration:3s]"></span>

                            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                                <span className="ml-1 text-red-600 text-3xl sm:text-5xl">
                                    ▸
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {open && (
                    <div className="fixed inset-0 bg-black/70 z-9999 flex items-center justify-center px-4">
                        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">

                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/70 text-white text-2xl flex items-center justify-center hover:bg-black"

                                aria-label="Close video"
                            >
                                ×
                            </button>

                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/3FjT7etqxt8?autoplay=1"
                                title="Mortgage process overview"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

            </section>

            <Faqs showCategories={false} faqType="mortgage" />

            <Subscribe />

        </div>
    );
}

export default ExploreMortgage;
