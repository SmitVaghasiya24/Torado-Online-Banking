import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function AddCasestudy() {
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        client: "",
        sector: "",
        location: "",
        overview: "",
        status: "active",
        thumbnail: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            thumbnail: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Please login again");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    data.append(key, value);
                }
            });

            await axios.post(
                "http://localhost:5000/api/admin/add_case_study",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Case study added successfully");
            navigate("/admin/case-studies");
        } catch (error) {
            toast.error("Failed to add case study");
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                    Add Case Study
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Client</Label>
                            <Input
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Sector</Label>
                            <Input
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Overview</Label>
                        <Textarea
                            name="overview"
                            rows={5}
                            value={formData.overview}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
                                className={` h-9 rounded-md border px-3 text-xs focus:outline-none focus:ring-1
                                    ${formData.status === "active"
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
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="
    h-11 px-6 rounded-xl font-medium
    bg-gray-900 text-white
    hover:bg-gray-800
    focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-offset-0
    disabled:opacity-60 disabled:cursor-not-allowed
    transition-all
  "
                        >
                            {loading ? "Saving..." : "Add Case Study"}
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCasestudy;
