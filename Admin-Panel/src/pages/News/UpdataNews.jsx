import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function UpdateNews() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(null);
    const [oldThumbnail, setOldThumbnail] = useState(null);

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [categorySearch, setCategorySearch] = useState("");
    const [tagSearch, setTagSearch] = useState("");

    const [formData, setFormData] = useState({
        id: "",
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
        const fetchNewsBySlug = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/admin/get_news/slug/${slug}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.data.success) {
                    const data = res.data.data;

                    setFormData({
                        id: data.id,
                        title: data.title,
                        short_description: data.short_description,
                        content: data.content,
                        published_date: data.published_date,
                        category_id: data.category_id,
                        author: data.author,
                        status: data.status,
                        tags: data.tags?.map((t) => t.tag_id) || [],
                        thumbnail: null,
                    });

                    setOldThumbnail(data.thumbnail);
                }
            } catch (error) {
                toast.error("Failed to load news");
                console.log(error);

            } finally {
                setLoading(false);
            }
        };

        fetchNewsBySlug();
    }, [slug]);

    useEffect(() => {
        const fetchMetaData = async () => {
            try {
                const [catRes, tagRes] = await Promise.allSettled([
                    axios.get("http://localhost:5000/api/admin/get_news_category", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:5000/api/admin/get_news_tag", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (catRes.status === "fulfilled") {
                    setCategories(catRes.value.data.data || []);
                }

                if (tagRes.status === "fulfilled") {
                    setTags(tagRes.value.data.data || []);
                }
            } catch {
                toast.error("Failed to load categories or tags");
            }
        };

        fetchMetaData();
    }, []);

    const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(categorySearch.toLowerCase())
    );

    const filteredTags = tags.filter((t) =>
        t.name.toLowerCase().includes(tagSearch.toLowerCase())
    );

    const toggleTag = (id) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.includes(id)
                ? prev.tags.filter((t) => t !== id)
                : [...prev.tags, id],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);

        setFormData((prev) => ({
            ...prev,
            thumbnail: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key === "tags") {
                    value.forEach((tag) => payload.append("tags[]", tag));
                } else if (value !== null) {
                    payload.append(key, value);
                }
            });

            const res = await axios.put(
                `http://localhost:5000/api/admin/update_news/${formData.id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                toast.success("News updated successfully");
                navigate("/admin/news");
            }
        } catch {
            toast.error("Failed to update news");
        }
    };

    if (loading) {
        return <div className="p-6">Loading news...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-8 mt-0 sm:mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-6">Update News</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label>Short Description</Label>
                        <Textarea
                            name="short_description"
                            rows={3}
                            value={formData.short_description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Content</Label>
                        <Textarea
                            name="content"
                            rows={6}
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Author</Label>
                            <Input
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Published Date</Label>
                            <Input
                                type="date"
                                name="published_date"
                                value={formData.published_date}
                                onChange={handleChange}
                            />
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
                            value={tagSearch}
                            onChange={(e) => setTagSearch(e.target.value)}
                        />
                        <div className="flex flex-wrap gap-4 mt-2">
                            {filteredTags.map((tag) => (
                                <div key={tag.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.tags.includes(tag.id)}
                                        onChange={() => toggleTag(tag.id)}
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
                                className={`h-9 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 ${formData.status === "active"
                                    ? "border-green-300 bg-green-50 focus:ring-green-500"
                                    : "border-red-300 bg-red-50 focus:ring-red-500"
                                    }`}
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
                                onChange={handleThumbnailChange}
                            />

                            <div className="flex gap-4 mt-3">
                                {oldThumbnail && !preview && (
                                    <img
                                        src={oldThumbnail}
                                        alt="Current thumbnail"
                                        className="w-40 h-28 object-cover rounded-md border"
                                    />
                                )}

                                {preview && (
                                    <img
                                        src={preview}
                                        alt="New thumbnail"
                                        className="w-40 h-28 object-cover rounded-md border"
                                    />
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-start gap-4 pt-2">
                        <Button type="submit" className=" h-11 px-6 rounded-xl font-medium  bg-gray-900 text-white  hover:bg-gray-800 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-offset-0 disabled:opacity-60 disabled:cursor-not-allowed  transition-all ">Update News</Button>
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

export default UpdateNews;
