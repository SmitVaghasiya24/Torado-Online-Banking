import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

function AddService() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category_id: "",
        title: "",
        short_description: "",
        status: "active",
        thumbnail: null,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/admin/get_service_category"
                );
                setCategories(res.data.data);
                setFilteredCategories(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const result = categories.filter((cat) =>
            cat.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCategories(result);
    }, [search, categories]);

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.thumbnail) {
            toast.error("Thumbnail is required");
            return;
        }

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
                payload.append(key, value);
            }
        });


        try {
            await axios.post(
                "http://localhost:5000/api/admin/add_service",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Service added successfully");
            navigate("/admin/services");


            setFormData({
                category_id: "",
                title: "",
                short_description: "",
                status: "active",
                thumbnail: null,
            });
            setSearch("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add service");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-8">Add Service</h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="space-y-2">
                        <Label>Search Category</Label>
                        <Input
                            placeholder="Search category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Select Category</Label>
                        <select
                            value={formData.category_id}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category_id: e.target.value,
                                }))
                            }
                            className="h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-0.5 focus:ring-gray-200"
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
                        <Label>Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            placeholder="Service title"
                            required
                        />
                    </div>

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
                            className={`h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2
                            ${formData.status === "active"
                                    ? "border-green-300 bg-green-50 focus:ring-green-500"
                                    : "border-red-300 bg-red-50 focus:ring-red-500"
                                }`}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <Label>Short Description</Label>
                        <Textarea
                            rows={3}
                            value={formData.short_description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    short_description: e.target.value,
                                }))
                            }
                            placeholder="Short description"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <Label>Thumbnail</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    thumbnail: e.target.files[0],
                                }))
                            }
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Button type="submit" className="w-full sm:w-auto px-10">
                            Add Service
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddService;
