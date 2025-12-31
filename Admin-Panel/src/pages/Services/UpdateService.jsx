import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function UpdateService() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [serviceId, setServiceId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentThumbnail, setCurrentThumbnail] = useState("");

    const [formData, setFormData] = useState({
        category_id: "",
        title: "",
        short_description: "",
        status: "active",
        thumbnail: null,
    });

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.allSettled([
                    axios.get(
                        `http://localhost:5000/api/admin/get_service/slug/${slug}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    ),
                    axios.get(
                        "http://localhost:5000/api/admin/get_service_category",
                        { headers: { Authorization: `Bearer ${token}` } }
                    ),
                ]);

                const serviceResult = results[0];
                const categoryResult = results[1];

                if (serviceResult.status === "fulfilled") {
                    const service = serviceResult.value.data.data;

                    setServiceId(service.id);
                    setCurrentThumbnail(service.thumbnail);

                    setFormData({
                        category_id: service.category_id,
                        title: service.title,
                        short_description: service.short_description,
                        status: service.status,
                        thumbnail: null,
                    });
                } else {
                    toast.error("Failed to load service");
                }

                if (categoryResult.status === "fulfilled") {
                    setCategories(categoryResult.value.data.data);
                } else {
                    toast.error("Failed to load categories");
                }

            } catch (err) {
                console.error(err);
                toast.error("Something went wrong");
            }
        };

        fetchData();
    }, [slug, token]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                payload.append(key, value);
            }
        });

        try {
            await axios.put(
                `http://localhost:5000/api/admin/update_service/${serviceId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Service updated successfully");
            navigate("/admin/services");
        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-8">Update Service</h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <select
                            value={formData.category_id}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category_id: e.target.value,
                                }))
                            }
                            className="h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-0.5 focus:ring-black"
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
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
                            required
                        />
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
                            className={`h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-2
                            ${formData.status === "active"
                                    ? "border-green-300 bg-green-50 focus:ring-green-500"
                                    : "border-red-300 bg-red-50 focus:ring-red-500"
                                }`}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className=" space-y-3">
                        <Label>Thumbnail</Label>

                        {currentThumbnail && !formData.thumbnail && (
                            <img
                                src={currentThumbnail}
                                alt="Current thumbnail"
                                className="w-40 h-28 object-cover rounded-md border"
                            />
                        )}

                        {formData.thumbnail && (
                            <img
                                src={URL.createObjectURL(formData.thumbnail)}
                                alt="New thumbnail preview"
                                className="w-40 h-28 object-cover rounded-md border"
                            />
                        )}

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

                    <div className="md:col-span-2 flex gap-3">
                        <Button className="cursor-pointer" type="submit">Update Service</Button>
                        <Button
                        className="cursor-pointer"
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
    );
}

export default UpdateService;
