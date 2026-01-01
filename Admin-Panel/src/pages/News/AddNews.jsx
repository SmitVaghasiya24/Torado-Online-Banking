import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function AddNews() {
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [preview, setPreview] = useState(null);


    const [categorySearch, setCategorySearch] = useState("");
    const [tagSearch, setTagSearch] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        short_description: "",
        content: "",
        published_date: "",
        category_id: "",
        author: "",
        status: "active",
        tags: [],
        thumbnail: null,
    });


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoryRes, tagRes] = await Promise.allSettled([
                    axios.get("http://localhost:5000/api/admin/get_category", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:5000/api/admin/get_tag", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (categoryRes.status === "fulfilled") {
                    setCategories(categoryRes.value.data.data || []);
                } else {
                    toast.error("Failed to load categories");
                }

                if (tagRes.status === "fulfilled") {
                    setTags(tagRes.value.data.data || []);
                } else {
                    toast.error("Failed to load tags");
                }

            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("Something went wrong");
            }
        };

        fetchInitialData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleTag = (id) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.includes(id)
                ? prev.tags.filter((t) => t !== id)
                : [...prev.tags, id],
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "tags") {
                    value.forEach((tag) => payload.append("tags[]", tag));
                } else {
                    payload.append(key, value);
                }
            });

            const res = await axios.post(
                "http://localhost:5000/api/admin/add_news",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                toast.success("News added successfully");
                navigate("/admin/news");
            }
        } catch {
            toast.error("Failed to add news");
        }
    };


    const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(categorySearch.toLowerCase())
    );

    const filteredTags = tags.filter((t) =>
        t.name.toLowerCase().includes(tagSearch.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px- py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-8">Add Service</h2>

                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input name="title" onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label>Short Description</Label>
                            <Textarea
                                name="short_description"
                                rows={3}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Content</Label>
                            <Textarea
                                name="content"
                                rows={6}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <Label>Published Date</Label>
                                <Input
                                    type="date"
                                    name="published_date"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Author</Label>
                                <Input name="author" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                >
                                    <option value="">Select category</option>

                                    {filteredCategories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <Input
                                placeholder="Search tags..."
                                onChange={(e) => setTagSearch(e.target.value)}
                            />

                            <div className="flex flex-wrap gap-4 mt-2">
                                {filteredTags.map((tag) => (
                                    <div key={tag.id} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={formData.tags.includes(tag.id)}
                                            onCheckedChange={() => toggleTag(tag.id)}
                                        />
                                        <span className="text-sm">{tag.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            status: e.target.value,
                                        }))
                                    }
                                    className={`h-9 rounded-md border px-3 text-xs focus:outline-none focus:ring-1 ${formData.status === "active"
                                        ? "border-green-300 bg-green-50 focus:ring-green-500"
                                        : "border-red-300 bg-red-50 focus:ring-red-500"
                                        }
                                        `}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Thumbnail</Label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        const imageUrl = URL.createObjectURL(file);
                                        setPreview(imageUrl);
                                        setFormData((prev) => ({
                                            ...prev,
                                            thumbnail: file,
                                        }));
                                    }}
                                    required
                                />

                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Thumbnail Preview"
                                        className="w-40 h-28 object-cover rounded-md border"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-start gap-5 pt-5">
                            <Button type="submit" 
                            className=" h-11 px-6 rounded-xl font-medium  bg-gray-900 text-white  hover:bg-gray-800 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-offset-0 disabled:opacity-60 disabled:cursor-not-allowed  transition-all ">
                                Add News
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNews;
