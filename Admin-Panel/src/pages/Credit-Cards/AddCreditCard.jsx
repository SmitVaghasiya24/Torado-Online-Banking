import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

function AddCreditCard() {
    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

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
        is_featured: false,
        card_image: null,
    });

    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_category",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data?.success) {
                setCategories(res.data.data || []);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const cleanValue =
            name.includes("percent")
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
                } else if (value === "") {
                    payload.append(key, 0);
                } else {
                    payload.append(key, value);
                }
            });



            await axios.post(
                "http://localhost:5000/api/admin/add_credit_card",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Credit card added successfully");
            setFormData({
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
                is_featured: false,
                card_image: null,
            });
            navigate('/admin/credit-cards')
        } catch (error) {
            console.error(error);
            toast.error("Failed to add credit card");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-8">
                <h2 className="text-2xl font-semibold">
                    Add Credit Card
                </h2>

                <div className="space-y-2 max-w-md">
                    <Label>Category</Label>

                    <select
                        value={formData.category_id}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                category_id: e.target.value,
                            }))
                        }
                        className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="">Select category</option>

                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div>
                    <h3 className="text-lg font-medium mb-4">
                        Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Subtitle</Label>
                            <Input
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Rating</Label>
                            <Input
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Total Reviews</Label>
                            <Input
                                name="total_reviews"
                                value={formData.total_reviews}
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>
                    </div>
                </div>


                <div>
                    <h3 className="text-lg font-medium mb-4">
                        Cashback Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Max Cashback %</Label>
                            <Input
                                name="max_cashback_percent"
                                placeholder="e.g. 5%"
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Category Cashback %</Label>
                            <Input
                                name="selected_category_cashback"
                                placeholder="e.g. 3%"
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Other Purchase Cashback %</Label>
                            <Input
                                name="other_purchase_cashback"
                                placeholder="e.g. 1%"
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">
                        Fees & APR
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Annual Fee</Label>
                            <Input
                                name="annual_fee"
                                placeholder="e.g. ₹0"
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Intro APR %</Label>
                            <Input
                                type="number"
                                step="0.01"
                                name="intro_apr_percent"
                                placeholder="e.g. 2"
                                onChange={handleChange}
                                className="h-11"
                            />

                        </div>
                        <div className="space-y-2">
                            <Label>Intro_bonus_amount</Label>
                            <Input
                                type="number"
                                name="intro_bonus_amount"
                                placeholder="e.g. 500"
                                onChange={handleChange}
                                className="h-11"
                            />

                        </div>

                        <div className="space-y-2">
                            <Label>APR Months</Label>
                            <Input
                                name="intro_apr_months"
                                placeholder="e.g. 12"
                                onChange={handleChange}
                                className="h-11"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mt-5">
                        <Label>Annual Fee Note</Label>
                        <Textarea
                            name="annual_fee_note"
                            placeholder="Explain annual fee details..."
                            onChange={handleChange}
                            className="min-h-25"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>Card Image</Label>

                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="h-11 cursor-pointer"
                    />

                    {formData.card_image && (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(formData.card_image)}
                                alt="Card Preview"
                                className="w-48 h-32 object-contain rounded-md bg-white"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={formData.is_featured === 1}
                        onCheckedChange={(val) => {
                            setFormData((prev) => ({
                                ...prev,
                                is_featured: val === true ? 1 : 0,
                            }));
                        }}
                    />
                    <Label className="cursor-pointer">
                        Featured Card
                    </Label>
                </div>

                <div className="flex flex-col sm:flex-row justify-start gap-3">
                    <Button onClick={handleSubmit} disabled={loading} className="cursor-pointer bg-black text-white">
                        {loading ? "Saving..." : "Add Credit Card"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                </div>

            </div>




        </div>

    );
}

export default AddCreditCard;
