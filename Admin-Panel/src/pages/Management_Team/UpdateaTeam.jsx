import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function UpdateTeam() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        position: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const fetchTeamById = async () => {
        try {
            setFetching(true);

            const res = await axios.get(
                `http://localhost:5000/api/get_management_id/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.success) {
                const data = res.data.data;

                setFormData({
                    name: data.name || "",
                    position: data.position || "",
                    description: data.description || "",
                });

                if (data.image) {
                    setPreview(data.image);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch team member");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (id && token) fetchTeamById();
    }, [id, token]);

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

        if (!formData.name || !formData.position) {
            return toast.error("Name and Position are required");
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

            await axios.put(
                `http://localhost:5000/api/update_management/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Team member updated successfully");
            navigate("/admin/management-team");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update team member");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-6">
                    Update Management Member
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-10 border border-gray-300 rounded-lg px-3 mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Position</label>
                        <input
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full h-10 border border-gray-300 rounded-lg px-3 mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
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
                            {loading ? "Updating..." : "Update Member"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => navigate("/admin/management-team")}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateTeam;
