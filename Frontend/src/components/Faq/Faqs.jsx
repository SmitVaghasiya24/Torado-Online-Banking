import { useEffect, useState } from "react";
import axios from "axios";
import FaqItem from "./FaqItem";

export default function Faqs() {
    const [categories, setCategories] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchAllFaqs();
    }, []);

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
        setFaqs(res.data.data);
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
        setFaqs(res.data.data);
        setLoading(false);
    };

    const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
    const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-center text-4xl md:text-5xl font-semibold mb-12">
                Frequently asked questions
            </h1>

            <div className="flex flex-wrap justify-center gap-3 mb-14">
                <button
                    onClick={() => fetchCategoryFaq("all")}
                    className={`px-5 py-2 rounded-lg border transition
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
                        className={`px-5 py-2 rounded-lg border transition
                            ${activeCategory === cat.id
                                ? "bg-red-600 text-white"
                                : "bg-white text-gray-700"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="space-y-6">
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

                    <div className="space-y-6">
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
