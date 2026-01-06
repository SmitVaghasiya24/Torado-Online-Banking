import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function UpdateCreditCard() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [cardId, setCardId] = useState(null);

    const [formData, setFormData] = useState({
        category_id: "",
        title: "",
        subtitle: "",
        rating: "",
        total_reviews: "",
        max_cashback_percent: "",
        intro_bonus_amount: "",
        selected_category_cashback: "",
        other_purchase_cashback: "",
        annual_fee: "",
        annual_fee_note: "",
        intro_apr_percent: "",
        intro_apr_months: "",
        is_featured: 0,
        status: "active",
        card_image: null,
    });

    const fetchCreditCard = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/get_credit_card/${slug}`
            );

            if (res.data?.success) {
                const card = res.data.data;

                setCardId(card.id);

                setFormData({
                    category_id: card.category_id,
                    title: card.title,
                    subtitle: card.subtitle,
                    rating: card.rating,
                    total_reviews: card.total_reviews,
                    max_cashback_percent: card.max_cashback_percent,
                    intro_bonus_amount: card.intro_bonus_amount,
                    selected_category_cashback: card.selected_category_cashback,
                    other_purchase_cashback: card.other_purchase_cashback,
                    annual_fee: card.annual_fee,
                    annual_fee_note: card.annual_fee_note,
                    intro_apr_percent: card.intro_apr_percent,
                    intro_apr_months: card.intro_apr_months,
                    is_featured: card.is_featured,
                    status: card.status,
                    card_image: null,
                });

                setCurrentImage(card.card_image);
            }
        } catch (error) {
            toast.error("Failed to fetch credit card");
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/get_category");

            if (res.data?.success) {
                setCategories(res.data.data || []);
            } else {
                setCategories([]);
                toast.error("Failed to load categories");
            }
        } catch (error) {
            console.error("Fetch categories error:", error);
            toast.error("Something went wrong while fetching categories");
            setCategories([]);
        }
    };

    useEffect(() => {
        fetchCreditCard();
        fetchCategories();
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const cleanValue =
            name.includes("percent") ||
                name.includes("amount") ||
                name.includes("fee")
                ? value.replace(/[^0-9.]/g, "")
                : value;

        setFormData((prev) => ({
            ...prev,
            [name]: cleanValue,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            card_image: e.target.files[0],
        }));
    };

    const handleSubmit = async () => {
        if (!formData.category_id || !formData.title) {
            toast.error("Category & Title are required");
            return;
        }

        try {
            setLoading(true);

            const payload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key === "is_featured") {
                    payload.append(key, value ? 1 : 0);
                } else if (value !== null && value !== "") {
                    payload.append(key, value);
                }
            });

            await axios.put(
                `http://localhost:5000/api/admin/update_credit_card/${cardId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Credit card updated successfully");
            navigate("/admin/credit-cards");
        } catch (error) {
            toast.error("Failed to update credit card");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border shadow-sm">
            <div className="px-8 py-6">
                <h2 className="text-2xl font-semibold">Update Credit Card</h2>
            </div>

            <div className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3 focus:outline-none focus:ring-1 focus:ring-black"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3 focus:outline-none focus:ring-1 focus:ring-black"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3 focus:ring-1 focus:ring-black outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subtitle</label>
                        <input
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3 focus:ring-1 focus:ring-black outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <input
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Total Reviews</label>
                        <input
                            name="total_reviews"
                            value={formData.total_reviews}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>

                    <div className="flex items-end gap-3 col-span-2">
                        <input
                            type="checkbox"
                            checked={formData.is_featured === 1}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    is_featured: e.target.checked ? 1 : 0,
                                }))
                            }
                        />
                        <label className="text-sm font-medium">
                            Mark as Featured Card
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Max Cashback %</label>
                        <input
                            name="max_cashback_percent"
                            value={formData.max_cashback_percent}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Selected Category Cashback %
                        </label>
                        <input
                            name="selected_category_cashback"
                            value={formData.selected_category_cashback}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Other Purchase Cashback %
                        </label>
                        <input
                            name="other_purchase_cashback"
                            value={formData.other_purchase_cashback}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Annual Fee</label>
                        <input
                            name="annual_fee"
                            value={formData.annual_fee}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Intro Bonus Amount
                        </label>
                        <input
                            name="intro_bonus_amount"
                            value={formData.intro_bonus_amount}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">APR Months</label>
                        <input
                            name="intro_apr_months"
                            value={formData.intro_apr_months}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border px-3"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Annual Fee Note</label>
                    <textarea
                        name="annual_fee_note"
                        value={formData.annual_fee_note}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 min-h-[120px]"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">Card Image</label>
                    {currentImage && !formData.card_image && (
                        <img
                            src={currentImage}
                            className="w-48 h-32 object-cover rounded-lg border"
                        />
                    )}
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-10 py-2.5 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-black cursor-pointer text-white px-10 py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update Credit Card"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default UpdateCreditCard;