import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import CreditcardApply from "../../components/CreditcardApply";
import Subscribe from "../../components/Subscriber";
function CreditCardApply() {
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pdfUrl, setPdfUrl] = useState("");

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

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/get_document"
                );

                if (res.data.success && res.data.data.length > 0) {
                    setPdfUrl(res.data.data[0].file_url);
                }
            } catch (error) {
                console.error("Fetch document error", error);
            }
        };

        fetchDocument();
    }, []);

    if (!pdfUrl) return null;

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

            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        <div className="text-center lg:text-left">
                            <p className="text-md font-medium mb-4">{card.title}</p>

                            <div className="rounded-2xl mb-3 overflow-hidden w-full max-w-md mx-auto lg:mx-0">
                                <img
                                    src={card.card_image}
                                    alt={card.title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <div className="flex text-yellow-400 text-base sm:text-lg">
                                    {"★★★★★".slice(0, Math.round(card.rating))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    ({card.rating}) {card.total_reviews} Reviews
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
                                Card Details
                            </h2>

                            <p className="text-gray-600 leading-relaxed max-w-xl mb-8 text-sm sm:text-base">
                                As you make purchases using your cash back credit card, the cash back
                                rewards accumulate based on the percentage offered. For example, if
                                you spend $100 on eligible purchases and the cash back rate is 1%,
                                you would earn $1 in cash back rewards.
                            </p>

                            <div className="mb-10">
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
                            <div className="static lg:absolute lg:right-0 lg:bottom-6 text-sm text-gray-700">
                                <span className="font-medium">Important Disclosures:</span>{" "}
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 underline"
                                >
                                    Download / Print
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <CreditcardApply />

            <Subscribe />

        </>
    );
}

export default CreditCardApply;
