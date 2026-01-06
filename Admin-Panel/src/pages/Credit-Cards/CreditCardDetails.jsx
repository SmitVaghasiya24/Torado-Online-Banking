import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, CreditCard, Star } from "lucide-react";

function CreditCardDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

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
                console.error("Fetch credit card error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [slug]);

    if (loading) {
        return <div className="p-6 text-gray-500">Loading credit card...</div>;
    }

    if (!card) {
        return (
            <div className="p-6">
                <p className="text-gray-600">Credit card not found</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-blue-600 underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 cursor-pointer text-sm bg-black text-white px-4 py-2 rounded"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        {card.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Slug: {card.slug}
                    </p>
                </div>

                <span
                    className={`self-start px-4 py-1.5 rounded-full text-sm font-medium ${card.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {card.status}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">
                {card.card_image && (
                    <div className="inline-flex border border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
                        <img
                            src={card.card_image}
                            alt={card.title}
                            className="h-48 object-contain"
                        />
                    </div>
                )}

                <div className="flex-1 flex justify-center">
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard
                            label="Category"
                            value={card.category_name}
                            icon={<CreditCard size={16} />}
                        />
                        <InfoCard
                            label="Rating"
                            value={`${card.rating} (${card.total_reviews} reviews)`}
                            icon={<Star size={16} />}
                        />
                        <InfoCard
                            label="Max Cashback"
                            value={`${card.max_cashback_percent}%`}
                        />
                        <InfoCard
                            label="Annual Fee"
                            value={`$${card.annual_fee}`}
                        />
                    </div>
                </div>
            </div>



            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
                <h2 className="text-lg font-semibold">Card Highlights</h2>
                <p className="text-gray-700">{card.subtitle}</p>
                <p className="text-sm text-gray-600">
                    Intro Bonus: ${card.intro_bonus_amount}
                </p>
                <p className="text-sm text-gray-600">
                    Selected Category Cashback: {card.selected_category_cashback}%
                </p>
                <p className="text-sm text-gray-600">
                    Other Purchases Cashback: {card.other_purchase_cashback}%
                </p>
                <p className="text-sm text-gray-600">
                    Intro APR: {card.intro_apr_percent}% for {card.intro_apr_months} months
                </p>
                <p className="text-sm text-gray-600">
                    Annual Fee Note: {card.annual_fee_note}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DateCard label="Created At" date={card.created_at} />
                <UserCard label="Created By" value={`Admin #${card.created_by}`} />
                <DateCard label="Updated At" date={card.updated_at} />
                <UserCard label="Updated By" value={`Admin #${card.updated_by}`} />
            </div>
        </div>
    );
}

function InfoCard({ label, value, icon }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                {icon}
                <span>{label}</span>
            </div>
            <p className="font-medium text-gray-900">{value || "-"}</p>
        </div>
    );
}

function DateCard({ label, date }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar size={16} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-900">
                    {new Date(date).toLocaleString()}
                </p>
            </div>
        </div>
    );
}

function UserCard({ label, value }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="font-medium text-gray-900">
                {value || "-"}
            </p>
        </div>
    );
}

export default CreditCardDetails;
