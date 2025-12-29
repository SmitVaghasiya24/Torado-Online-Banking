import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FolderCard from "../../components/FolderCard";
import Download from "../../components/Download";
import Faqs from "../../components/Faq/Faqs";
import { useNavigate } from "react-router-dom";
import CreditcardProcess from "../../components/CreditcardProcess";


const slides = [
    {
        title: "Everyday purchases",
        desc: "Use your credit card for everyday expenses like groceries, gas, or utility bills. It offers a convenient and secure payment method, and if paid in full each month, you can avoid interest charges.",
        image: "/credit-card/card-img-2.webp"
    },
    {
        title: "Rewards & cashback",
        desc: "Many credit cards offer rewards programs or cashback on eligible purchases. Take advantage of these benefits by using your credit card strategically for expenses you make.",
        image: "/credit-card/card-img-3.webp"
    },
    {
        title: "Online shopping",
        desc: "Credit cards are commonly used for online purchases. They provide an added layer of security through fraud services. Ensure you shop from websites and use secure payment gateways.",
        image: "/credit-card/card-img-6.webp"
    },
    {
        title: "Online shopping",
        desc: "Credit cards are commonly used for online purchases. They provide an added layer of security through fraud services. Ensure you shop from websites and use secure payment gateways.",
        image: "/credit-card/card-img-7.webp"
    },
    {
        title: "Online shopping",
        desc: "Credit cards are commonly used for online purchases. They provide an added layer of security through fraud services. Ensure you shop from websites and use secure payment gateways.",
        image: "/credit-card/card-img-8.webp"
    }
];


function CreditcardOverview() {
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_category");
                if (res.data.success) {
                    setCategories(res.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();

        const fetchCards = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/get_credit_card"
                );
                if (res.data?.data) {
                    setCards(res.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCards();
    }, []);

    const sliderRef = useRef(null);


    const totalAllCards = categories.reduce(
        (sum, cat) => sum + Number(cat.total_cards || 0),
        0
    );

    return (
        <div>
            <BreadcrumbHero
                title="Card overview"
                image="/Breadcrumb/card-overview.webp"
            />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl sm:text-4xl font-semibold mb-12">
                        Credit card categories
                    </h2>

                    <div className="relative">
                        <button
                            onClick={() =>
                                sliderRef.current.scrollBy({
                                    left: -300,
                                    behavior: "smooth"
                                })
                            }
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full border border-gray-200
                   flex items-center justify-center bg-white shadow"
                        >
                            <FiChevronLeft />
                        </button>

                        <div
                            ref={sliderRef}
                            className="flex gap-10 overflow-x-auto scrollbar-hide px-12 scroll-smooth"
                        >
                            <div className="min-w-40 text-center cursor-pointer">
                                <div className="w-28 h-28 mx-auto rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-red-600 transition">
                                    <img
                                        src="/credit-card/all-cat.svg"
                                        alt="All Credit Cards"
                                        className="w-12 h-12"
                                    />
                                </div>

                                <p className="mt-4 font-medium text-gray-900">
                                    All credit cards ({totalAllCards})
                                </p>
                            </div>

                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="min-w-40 text-center cursor-pointer"
                                >
                                    <div className="w-28 h-28 mx-auto rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-red-600 transition">
                                        <img
                                            src={cat.icon}
                                            alt={cat.name}
                                            className="w-12 h-12"
                                        />
                                    </div>

                                    <p className="mt-4 font-medium text-gray-900">
                                        {cat.name} cards ({cat.total_cards})
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() =>
                                sliderRef.current.scrollBy({
                                    left: 300,
                                    behavior: "smooth"
                                })
                            }
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full border border-gray-200
                   flex items-center justify-center bg-white shadow"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold">
                            Popular credit cards
                        </h2>

                        <div className="mt-4 lg:mt-0 relative w-56">
                            <select
                                className=" w-full appearance-none border border-gray-300 bg-white px-4 py-3 pr-10 rounded-md  text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition cursor-pointe "
                            >
                                <option>Featured</option>
                                <option>Cash back</option>
                                <option>Travel</option>
                                <option>Business</option>
                            </select>

                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                ▼
                            </span>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cards.slice(0, cards.length - 1).slice(0, 3).map((card) => (
                            <div
                                key={card.id}
                                className="border border-gray-200 rounded-2xl p-6 flex flex-col"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-center">
                                    {card.title}
                                </h3>

                                <div className="flex justify-center mb-5">
                                    <img
                                        src={card.card_image}
                                        alt={card.title}
                                        className="w-72 rounded-xl"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <div className="flex text-yellow-400">
                                        {"★★★★★".slice(0, Math.round(card.rating))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        ({card.rating}) {card.total_reviews} Reviews
                                    </span>
                                </div>

                                <div className="space-y-4 text-sm text-gray-700">
                                    <p className="text-base font-semibold">
                                        Earn up to {card.max_cashback_percent}% cash back
                                    </p>

                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">Rewards</p>
                                        <p>
                                            ${card.intro_bonus_amount} online cash rewards bonus offer &
                                            {` ${card.selected_category_cashback}%`} cash back on your
                                            selected categories
                                        </p>
                                        <p>
                                            {card.other_purchase_cashback}% cash back on all other
                                            eligible purchases
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">
                                            Annual Fee
                                        </p>
                                        <p>{card.annual_fee_note}</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">APR</p>
                                        <p>
                                            {card.intro_apr_percent}% Intro APR on purchases and any
                                            balance transfers within the first{" "}
                                            {card.intro_apr_months} month of your account opening
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto flex gap-4 pt-6">
                                    <button
                                        onClick={() => navigate(`/credit-card-apply/${card.slug}`)}
                                        className="relative cursor-pointer flex-1 overflow-hidden border border-red-600 text-red-600 py-3 rounded-md font-medium group"
                                    >
                                        <span
                                            className="absolute inset-0 bg-[#E30012] transform -translate-y-full transition-transform duration-600 ease-out group-hover:translate-y-0 z-0"
                                        ></span>

                                        <span
                                            className="relative z-10 flex items-center justify-center gap-1 transition-colors duration-300 delay-100 group-hover:text-white"
                                        >
                                            Apply Now <FiArrowRight />
                                        </span>
                                    </button>


                                    <button
                                        onClick={() => navigate(`/credit-card-details/${card.slug}`)}
                                        className="relative cursor-pointer flex-1 overflow-hidden border border-[#000080] text-[#000080] py-3 rounded-md font-medium transition-colors duration-300 group"
                                    >
                                        <span className="absolute inset-0 bg-[#000080] transform -translate-y-full transition-all duration-500 ease-out group-hover:translate-y-0 opacity-95 z-0"></span>

                                        <span className="relative z-10 flex items-center justify-center gap-1 group-hover:text-white transition-colors duration-300">
                                            Learn More <FiArrowRight />
                                        </span>
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-gray-50 to-indigo-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-10">
                        More ways to use your credit card
                    </h2>

                    <div className="relative overflow-visible">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                                el: ".credit-card-pagination"
                            }}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 1.2 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="credit-card-swiper"
                        >
                            {slides.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <FolderCard
                                        bgColor="white"
                                        borderColor="#e5e7eb"
                                        headerHeight={42}
                                        className="rounded-2xl p-4 sm:p-6 h-full"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="rounded-xl mb-4 sm:mb-6 mt-9 sm:mt-8 md:mt-8 lg:mt-14 xl:mt-8 h-44 sm:h-48 lg:h-52 w-full object-cover"
                                        />

                                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                            {item.desc}
                                        </p>
                                    </FolderCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="credit-card-pagination mt-8 flex justify-center"></div>
                    </div>


                </div>
            </section>

            <CreditcardProcess />

            <Download />


            <Faqs showCategories={false} faqType="topcreditcardquestions" />


        </div>
    );
}

export default CreditcardOverview;
