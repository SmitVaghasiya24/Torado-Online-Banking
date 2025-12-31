import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

function UpdateCasestudy() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [caseStudyId, setCaseStudyId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        client: "",
        sector: "",
        location: "",
        overview: "",
        status: "active",
        thumbnail: null,
        oldThumbnail: "",
    });

    const fetchCaseStudy = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/admin/get_case_study/slug/${slug}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = res.data.data;

            setCaseStudyId(data.id);
            setFormData({
                title: data.title || "",
                client: data.client || "",
                sector: data.sector || "",
                location: data.location || "",
                overview: data.overview || "",
                status: data.status || "active",
                thumbnail: null,
                oldThumbnail: data.thumbnail,
            });
        } catch {
            toast.error("Failed to load case study");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaseStudy();
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            thumbnail: file,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!caseStudyId) return;

        try {
            setSubmitting(true);

            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined && key !== "oldThumbnail") {
                    data.append(key, value);
                }
            });

            await axios.put(
                `http://localhost:5000/api/admin/update_case_study/${caseStudyId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Case study updated successfully");
            navigate("/admin/case-studies");
        } catch {
            toast.error("Update failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                Loading case study...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                    Update Case Study
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-gray-600">
                                Status
                            </Label>

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

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-gray-600">
                                Thumbnail
                            </Label>

                            {formData.thumbnail ? (
                                <img
                                    src={URL.createObjectURL(formData.thumbnail)}
                                    alt="New Thumbnail"
                                    className="w-40 h-28 object-cover rounded-md "
                                />
                            ) : formData.oldThumbnail ? (
                                <img
                                    src={formData.oldThumbnail}
                                    alt="Old Thumbnail"
                                    className="w-40 h-28 object-cover rounded-md"
                                />
                            ) : null}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-xs file:mr-3 file:py-1.5 file:px-3
        file:rounded-md file:border-0
        file:bg-gray-100 file:text-gray-700
        hover:file:bg-gray-200 cursor-pointer"
                            />
                        </div>

                    </div>


                    <div className="flex flex-col sm:flex-row justify-start gap-3 pt-4">
                        <Button className="cursor-pointer" type="submit" disabled={submitting}>
                            {submitting ? "Updating..." : "Update Case Study"}
                        </Button>
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

export default UpdateCasestudy;
