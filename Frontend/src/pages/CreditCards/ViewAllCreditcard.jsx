import BreadcrumbHero from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import Download from "../../components/Download";

function ViewAllCreditcard() {
    const { categorySlug } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, cardRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/get_category"),
                    axios.get("http://localhost:5000/api/get_credit_card"),
                ]);

                if (catRes.data.success) setCategories(catRes.data.data);
                if (cardRes.data.success) setCards(cardRes.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (categorySlug) {
            setActiveCategory(categorySlug);
        } else {
            setActiveCategory("all");
        }

        setVisibleCount(3);
    }, [categorySlug]);

    const filteredCards =
        activeCategory === "all"
            ? cards
            : cards.filter((c) => c.category_slug === activeCategory);

    return (
        <div>
            <BreadcrumbHero title="Credit cards" image="/Breadcrumb/all-card.webp" />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10 text-center">
                        Featured credit cards
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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

            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-8 text-center">
                        Browse our card categories
                    </h2>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
                        <button
                            onClick={() => navigate("/credit-cards-all")}
                            className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium transition
                                ${activeCategory === "all"
                                    ? "bg-red-600 text-white"
                                    : "border border-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-300 ease-out"
                                }`}
                        >
                            All Credit Cards
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => navigate(`/credit-cards/${cat.slug}`)} // 🔑 URL update
                                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium transition
                                    ${activeCategory === cat.slug
                                        ? "bg-red-600 text-white"
                                        : "border border-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-300 ease-out"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {filteredCards.slice(0, visibleCount).map((card) => (
                            <div
                                key={card.id}
                                className="border border-gray-300 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                            >
                                <div className="lg:col-span-3 flex flex-col items-center lg:items-start justify-center p-6 lg:p-8">
                                    <img
                                        src={card.card_image}
                                        alt={card.title}
                                        className="w-full max-w-xs rounded-xl mb-4"
                                    />

                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="flex text-yellow-400">
                                            {"★★★★★".slice(0, Math.round(card.rating))}
                                        </div>
                                        <span className="text-gray-600">
                                            ({card.rating}) {card.total_reviews} Reviews
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:col-span-6 space-y-4 p-6 lg:p-8">
                                    <h3 className="text-xl font-semibold">{card.title}</h3>

                                    <div>
                                        <p className="font-semibold mb-1">Rewards</p>
                                        <p className="text-sm text-gray-700">
                                            ${card.intro_bonus_amount} online cash rewards bonus offer &{" "}
                                            <strong>{card.selected_category_cashback}% cash back</strong> on your
                                            selected categories
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            {card.other_purchase_cashback}% cash back on all other eligible purchases
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold mb-1">Annual Fee</p>
                                        <p className="text-sm text-gray-700">{card.annual_fee_note}</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold mb-1">APR</p>
                                        <p className="text-sm text-gray-700">
                                            {card.intro_apr_percent}% Intro APR on purchases and balance transfers
                                            within the first {card.intro_apr_months} month
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:col-span-3 flex flex-col gap-4 lg:border-l border-gray-300 lg:pl-8 p-6 lg:p-8 justify-center">
                                    <button
                                        onClick={() => navigate(`/credit-card-apply/${card.slug}`)}
                                        className="relative cursor-pointer w-full overflow-hidden border border-red-600 text-red-600 py-3 rounded-md font-medium group"
                                    >
                                        <span className="absolute inset-0 bg-[#E30012] transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0"></span>
                                        <span className="relative z-10 flex items-center justify-center gap-1 group-hover:text-white transition-colors duration-300">
                                            Apply Now <FiArrowRight />
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => navigate(`/credit-card-details/${card.slug}`)}
                                        className="relative cursor-pointer w-full overflow-hidden border border-[#000080] text-[#000080] py-3 rounded-md font-medium group"
                                    >
                                        <span className="absolute inset-0 bg-[#000080] transform -translate-y-full transition-all duration-500 ease-out group-hover:translate-y-0 z-0"></span>
                                        <span className="relative z-10 flex items-center justify-center gap-1 group-hover:text-white transition-colors duration-300">
                                            Learn More <FiArrowRight />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {visibleCount < filteredCards.length && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={() => setVisibleCount((prev) => prev + 5)}
                                    className="relative cursor-pointer overflow-hidden border border-red-600 text-red-600 px-10 py-3 rounded-md font-medium group"
                                >
                                    <span className="absolute inset-0 bg-red-600 transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0"></span>
                                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                                        Load More <FiLoader />
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            <Download />
        </div>
    );
}

export default ViewAllCreditcard;
