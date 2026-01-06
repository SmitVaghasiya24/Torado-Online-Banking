import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import BreadcrumbHero from "../../components/Breadcrumb";
import { FiRefreshCw, FiHome, FiAlertTriangle, FiTrendingDown } from "react-icons/fi";
import FolderCard from "../../components/FolderCard";
import Subscribe from "../../components/Subscriber";
import { FiShield, FiZap, FiSmartphone, FiCreditCard } from "react-icons/fi";


const benefits = [
    {
        icon: <FiRefreshCw size={40} />,
        title: "More cash back",
        text:
            "Potenti dui auctor volutpat sodales molestie ac vel. Lacus commodo vestibulum tellus blandit enim lectus viverra. Augue turpis lacus in molestie.",
    },
    {
        icon: <FiHome size={40} />,
        title: "Pay over time",
        text:
            "Est congue lectus pellentesque sagittis penatibus egestas arcu amet. Blandit ut quisque odio libero facilisi mattis vestibulum. Cursus ultricies quisque.",
    },
    {
        icon: <FiAlertTriangle size={40} />,
        title: "Automatic alerts",
        text:
            "Potenti dui auctor volutpat sodales molestie ac vel. Lacus commodo vestibulum tellus blandit enim lectus viverra. Augue turpis lacus in molestie.",
    },
    {
        icon: <FiTrendingDown size={40} />,
        title: "Low APR offer",
        text:
            "Potenti dui auctor volutpat sodales molestie ac vel. Lacus commodo vestibulum tellus blandit enim lectus viverra. Augue turpis lacus in molestie.",
    },
];


function CardDetails() {
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/get_credit_card/${slug}`
                );

                if (res.data.success) {
                    setCard(res.data.data);
                }
            } catch (error) {
                console.error("Fetch card error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [slug]);

    if (loading) {
        return <div className="py-20 text-center">Loading...</div>;
    }

    if (!card) {
        return <div className="py-20 text-center">Card not found</div>;
    }

    return (
        <>
            <BreadcrumbHero
                title={card.title}
                image="/Breadcrumb/card-details.webp"
            />

            <section className="py-10 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-700 mb-3">
                                {card.category_name} card
                            </p>

                            <div className="rounded-2xl overflow-hidden shadow-xl w-full max-w-md">
                                <img
                                    src={card.card_image}
                                    alt={card.title}
                                    className="w-full"
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex items-center gap-2 mt-6">
                                <div className="flex text-yellow-400 text-lg">
                                    {"★★★★★".slice(0, Math.round(card.rating))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    ({card.rating}) {card.total_reviews} Reviews
                                </span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl sm:text-5xl font-semibold mb-6">
                                Earn up to {card.max_cashback_percent}% cash back
                            </h2>

                            <p className="text-gray-600 leading-relaxed max-w-xl mb-8">
                                {card.subtitle}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mb-10">

                                <button className="relative cursor-pointer overflow-hidden bg-red-600 text-white px-8 py-4 rounded-md font-medium inline-flex items-center gap-2 group">
                                    <span className="absolute inset-0 bg-[#000080] transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0"></span>

                                    <span
                                        onClick={() => navigate(`/credit-card-apply/${card.slug}`)}
                                        className="relative z-10 flex items-center gap-2">
                                        Apply Now <FiArrowRight />
                                    </span>
                                </button>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Call our consultant
                                    </p>
                                    <a
                                        href="tel:+18787539922"
                                        className="text-lg font-semibold text-blue-700"
                                    >
                                        +1 (878)-753-9922
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-10 text-sm">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-900">Annual Fee:</p>
                                    <p className="text-gray-600">
                                        ${card.annual_fee}
                                    </p>
                                </div>


                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-900">Purchase Rate:</p>
                                    <p className="text-gray-600">
                                        {card.intro_apr_percent}% APR
                                    </p>
                                </div>


                                <div>
                                    <p className="font-normal text-gray-900">
                                        Get a decision in as little as 60 seconds.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <section className="py-10 lg:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold mb-6">
                        Additional Benefits
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((item, index) => (
                            <FolderCard
                                key={index}
                                bgColor="white"
                                borderColor="#e5e7eb"
                                headerHeight={45}
                                className=" px-3 pt-6"
                            >
                                <div className="text-gray-700 mt-3 mb-5">
                                    {item.icon}
                                </div>

                                <h4 className="text-xl font-semibold mb-3">
                                    {item.title}
                                </h4>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.text}
                                </p>
                            </FolderCard>
                        ))}
                    </div>

                </div>
            </section>

            <section className="py-10 lg:py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <div className="flex justify-center h-full">
                                <h2 className="text-3xl lg:text-5xl -mt-2 lg:-mt-26 xl:-mt-16 font-semibold">
                                    Cash back rewards
                                </h2>
                            </div>


                            <div className="relative flex items-center justify-center mt-10">

                                <img
                                    src="/credit-card/process-shape.webp"
                                    alt=""
                                    className="absolute inset-0 w-full max-w-xl opacity-80"
                                />

                                <img
                                    src="/credit-card/process-img-2.webp"
                                    alt="Cash back cards"
                                    className="relative z-10 w-full max-w-xl"
                                />

                                <div className="absolute top-8 right-2 w-44 h-44 flex items-center justify-center rotate-circle">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <defs>
                                            <path
                                                id="circlePath"
                                                d="M 50,50
                                           m -40,0
                                           a 40,40 0 1,1 80,0
                                           a 40,40 0 1,1 -80,0"
                                            />
                                        </defs>

                                        <text fill="#1e3a8a" fontSize="7.5" fontWeight="700" letterSpacing="1.5">
                                            <textPath href="#circlePath">
                                                UP TO $5000 CASH PER YEAR • UP TO $5000 CASH PER YEAR •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-600 max-w-xl mb-12 leading-relaxed">
                                With a cash back credit card, a percentage of your eligible purchases
                                is returned to you in the form of cash rewards. The cash back amount is
                                typically a percentage of the purchase price, such as 1%, 2%, or more,
                                depending on the card&apos;s terms.
                            </p>

                            <div className="space-y-12">

                                <div className="flex gap-6">
                                    <span className="text-4xl font-semibold text-red-600">01</span>
                                    <div className="border-b border-gray-200 pb-8">
                                        <h4 className="text-lg font-semibold mb-2">
                                            Earn Points
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                                            Cash back credit cards can be a great way to earn rewards on
                                            your everyday purchases and potentially save money. However,
                                            responsible credit card usage is essential to avoid debt.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <span className="text-4xl font-semibold text-red-600 leading-none">
                                        02
                                    </span>

                                    <div className="border-b border-gray-200 pb-8 w-full">
                                        <h4 className="text-lg font-semibold mb-3">
                                            Redeem Rewards
                                        </h4>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-lg">
                                            Make sure to review the terms and conditions of the cash back credit card,
                                            and use the card responsibly by paying your balance in full and on time.
                                        </p>

                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex gap-2">
                                                <span className="text-blue-600 mt-1">•</span>
                                                <span>Est congue lectus pellentesque sagittis penatibus.</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-blue-600 mt-1">•</span>
                                                <span>Blandit ut quisque odio libero facilisi.</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-blue-600 mt-1">•</span>
                                                <span>Cursus ultricies quisque at rhoncus.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                                <div className="flex gap-6">
                                    <span className="text-4xl font-semibold text-red-600">03</span>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-2">
                                            Avion Rewards
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                                            After submitting your application, the credit card issuer will
                                            review your application and assess your creditworthiness.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-16">
                        Security & Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="border border-gray-200 rounded-xl p-8 flex gap-6">
                            <FiShield className="text-4xl text-gray-800 shrink-0" />
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Stay protected</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Potenti dui auctor volutpat sodales molestie ac vel. Lacus
                                    commodo vestibulum tellus blandit enim lectus viverra. Augue
                                    turpis lacus in molestie.
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-8 flex gap-6">
                            <FiZap className="text-4xl text-gray-800 shrink-0" />
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Spend Instantly</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Potenti dui auctor volutpat sodales molestie ac vel. Lacus
                                    commodo vestibulum tellus blandit enim lectus viverra. Augue
                                    turpis lacus in molestie.
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-8 flex gap-6">
                            <FiSmartphone className="text-4xl text-gray-800 shrink-0" />
                            <div>
                                <h4 className="text-xl font-semibold mb-2">
                                    Online mobile banking
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Potenti dui auctor volutpat sodales molestie ac vel. Lacus
                                    commodo vestibulum tellus blandit enim lectus viverra. Augue
                                    turpis lacus in molestie.
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-8 flex gap-6">
                            <FiCreditCard className="text-4xl text-gray-800 shrink-0" />
                            <div>
                                <h4 className="text-xl font-semibold mb-2">
                                    Digital wallet technology
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Potenti dui auctor volutpat sodales molestie ac vel. Lacus
                                    commodo vestibulum tellus blandit enim lectus viverra. Augue
                                    turpis lacus in molestie.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                })
                            }
                            className="relative cursor-pointer overflow-hidden bg-red-600 text-white px-10 py-4 rounded-md font-medium inline-flex items-center gap-2 group"
                        >
                            <span className="absolute inset-0 bg-[#000080] transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0"></span>

                            <span className="relative z-10 flex items-center gap-2">
                                Apply Now <FiArrowRight />
                            </span>
                        </button>

                    </div>

                </div>
            </section>


            <Subscribe />
        </>
    );
}

export default CardDetails;
