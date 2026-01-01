import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function UpdateFaq() {
    const { id } = useParams();
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState("");

    const [formData, setFormData] = useState({
        category_id: "",
        question: "",
        answer: "",
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.allSettled([
                    axios.get(
                        `http://localhost:5000/api/admin/get_faq/${id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    ),
                    axios.get(
                        "http://localhost:5000/api/admin/get_faq_category",
                        { headers: { Authorization: `Bearer ${token}` } }
                    ),
                ]);

                const [faqResult, categoryResult] = results;

                if (faqResult.status === "fulfilled") {
                    const faq = faqResult.value.data?.data;
                    if (faq) {
                        setFormData({
                            category_id: faq.category_id,
                            question: faq.question,
                            answer: faq.answer,
                        });
                    }
                } else {
                    console.error("FAQ fetch failed:", faqResult.reason);
                    toast.error("Failed to load FAQ details");
                }

                if (categoryResult.status === "fulfilled") {
                    setCategories(categoryResult.value.data?.data || []);
                } else {
                    console.error("Category fetch failed:", categoryResult.reason);
                    toast.error("Failed to load FAQ categories");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           await axios.put(
                `http://localhost:5000/api/admin/update_faq/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            toast.success("FAQ updated successfully");
            navigate("/admin/faqs");

        } catch (error) {
            console.error(error);
            toast.error("Failed to update FAQ");
        }
    };



    if (loading) {
        return <div className="p-6">Loading FAQ...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-6">Update FAQ</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <Label>Category</Label>

                        <Input
                            placeholder="Search category..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                        />

                        <select
                            value={formData.category_id}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category_id: e.target.value,
                                }))
                            }
                            className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            required
                        >
                            <option value="">Select category</option>
                            {filteredCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Question</Label>
                        <Input
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea
                            name="answer"
                            rows={5}
                            value={formData.answer}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-start gap-2">
                        <Button type="submit" className="bg-black text-white">
                            Update FAQ
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/admin/faq")}
                        >
                            Cancel
                        </Button>


                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateFaq;
