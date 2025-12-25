import { useEffect, useState } from "react";
import axios from "axios";
import FaqItem from "./FaqItem";

export default function Faqs({
    showCategories = true,
    faqType = null
}) {
    const [categories, setCategories] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        if (showCategories) {
            fetchCategories();
        }
        fetchAllFaqs();
    }, [faqType]);

    useEffect(() => {
        if (faqs.length > 0) {
            setOpenId(faqs[0].id);
        }
    }, [faqs]);

    const fetchCategories = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/admin/get_faq_category"
        );
        setCategories(res.data.data);
    };

    const fetchAllFaqs = async () => {
        setLoading(true);

        const res = await axios.get(
            "http://localhost:5000/api/admin/all_faq"
        );

        let data = res.data.data;

        if (faqType && showCategories) {
            data = data.filter((faq) => faq.type === faqType);
        }

        setFaqs(data);
        setLoading(false);
    };

    const fetchCategoryFaq = async (id) => {
        setLoading(true);
        setActiveCategory(id);

        const url =
            id === "all"
                ? "http://localhost:5000/api/admin/all_faq"
                : `http://localhost:5000/api/admin/category_faq/${id}`;

        const res = await axios.get(url);

        let data = res.data.data;

        if (faqType && showCategories) {
            data = data.filter((faq) => faq.type === faqType);
        }

        setFaqs(data);
        setLoading(false);
    };

    const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
    const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

    const faqTitles = {
        personal: "Personal Loan FAQs",
        mortgage: "Mortgage FAQs",
        mortgageOffer: "Mortgage Offers FAQs",
        mortgageCalculator: "Mortgage Calculator FAQs",
        checkingaccount: "Checking account FAQs",
        savingaccount: "Saving account FAQs",
        bankingiras: "Banking IRA FAQs",
        topcreditcardquestions: "Top credit card questions",
    };

    const headingText = showCategories
        ? "Frequently asked questions"
        : faqTitles[faqType] || "FAQs";


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

            <h1 className="text-center text-2xl sm:text-3xl md:text-5xl font-semibold mb-8 sm:mb-12">
                {headingText}
            </h1>


            {showCategories && (
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
                    <button
                        onClick={() => fetchCategoryFaq("all")}
                        className={`px-4 cursor-pointer sm:px-5 py-2 rounded-lg border transition text-sm sm:text-base
                            ${activeCategory === "all"
                                ? "bg-red-600 text-white"
                                : "bg-white text-gray-700"
                            }`}
                    >
                        All Questions
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => fetchCategoryFaq(cat.id)}
                            className={`px-4 cursor-pointer sm:px-5 py-2 rounded-lg border transition text-sm sm:text-base
                                ${activeCategory === cat.id
                                    ? "bg-red-600 text-white"
                                    : "bg-white text-gray-700"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            {loading ? (
                <p className="text-center text-sm sm:text-base">
                    Loading...
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

                    <div className="space-y-4 sm:space-y-6">
                        {leftFaqs.map((faq) => (
                            <FaqItem
                                key={faq.id}
                                faq={faq}
                                isOpen={openId === faq.id}
                                onToggle={() =>
                                    setOpenId(openId === faq.id ? null : faq.id)
                                }
                            />
                        ))}
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {rightFaqs.map((faq) => (
                            <FaqItem
                                key={faq.id}
                                faq={faq}
                                isOpen={openId === faq.id}
                                onToggle={() =>
                                    setOpenId(openId === faq.id ? null : faq.id)
                                }
                            />
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}
