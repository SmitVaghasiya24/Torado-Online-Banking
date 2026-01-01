import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function AddFaq() {
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const [categories, setCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState("");

    const [formData, setFormData] = useState({
        category_id: "",
        question: "",
        answer: "",
    });


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/admin/get_faq_category",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCategories(res.data.data || []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load categories");
            }
        };

        fetchCategories();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category_id) {
            toast.error("Please select a category");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/admin/add_faq",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            toast.success("FAQ added successfully");
            navigate("/admin/faqs");

        } catch (error) {
            console.error(error);
            toast.error("Failed to add FAQ");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-6">Add FAQ</h2>

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
                            placeholder="Enter FAQ question"
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
                            placeholder="Enter FAQ answer"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-black text-white">
                            Add FAQ
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddFaq;
