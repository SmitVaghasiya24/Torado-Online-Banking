import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AddTeam() {
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.position || !image) {
            return toast.error("Name, Position and Image are required");
        }

        try {
            setLoading(true);

            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    data.append(key, value);
                }
            });

            if (image) {
                data.append("image", image);
            }


            await axios.post(
                "http://localhost:5000/api/add_management",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Team member added successfully");
            navigate("/admin/management-team");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add team member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 xl:mt- ">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-6">
                    Add Management Member
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-10 border border-gray-300 rounded-lg px-3 mt-1"
                            placeholder="Enter name"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Position</label>
                        <input
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full h-10 border border-gray-300 rounded-lg px-3 mt-1"
                            placeholder="CEO, Manager, Director..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                            rows="4"
                            placeholder="Short description (optional)"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Profile Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full mt-2"
                        />

                        {preview && (
                            <div className="mt-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-32 h-32 rounded-xl object-cover border border-gray-200"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-black cursor-pointer text-white"
                        >
                            {loading ? "Saving..." : "Add Member"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => navigate("/admin/team")}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTeam;
