import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";

function CreditCardApply() {
    const { slug } = useParams();
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
                console.error("Fetch credit card error", error);
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
                title="Apply for credit card"
                image="/Breadcrumb/card-overview.webp"
            />

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <div>
                            <p className="text-sm font-medium mb-4">Cash back card</p>

                            <img
                                src={card.card_image}
                                alt={card.title}
                                className="w-full max-w-lg rounded-2xl shadow-lg mb-6"
                            />

                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400 text-lg">
                                    {"★★★★★".slice(0, Math.round(card.rating))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    ({card.rating}) {card.total_reviews} Reviews
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <h2 className="text-4xl lg:text-5xl font-semibold mb-6">
                                Card Details
                            </h2>

                            <p className="text-gray-600 leading-relaxed max-w-xl mb-8">
                                As you make purchases using your cash back credit card, the cash back
                                rewards accumulate based on the percentage offered. For example, if
                                you spend $100 on eligible purchases and the cash back rate is 1%,
                                you would earn $1 in cash back rewards.
                            </p>

                            <div className="mb-8">
                                <p className="text-sm text-gray-600 mb-1">
                                    Call our consultant
                                </p>
                                <a
                                    href="tel:+18787539922"
                                    className="text-lg font-semibold text-blue-700"
                                >
                                    +1 (878)-753-9922
                                </a>
                            </div>

                            <div className="absolute right-0 bottom-6 text-sm text-gray-700">
                                <span className="font-medium">Important Disclosures:</span>{" "}
                                <a
                                    href="/docs/important-disclosures.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 underline"
                                >
                                    Download/Print
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </>
    );
}

export default CreditCardApply;
