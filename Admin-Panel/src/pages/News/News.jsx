import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 5;

    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageNews = ["superadmin", "admin", "content_manager"].includes(role);


    const fetchNews = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/admin/get_news",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: page,
                        limit: limit,
                    },
                }
            );

            if (res.data.success) {
                setNews(res.data.data);
                setTotalPages(res.data.totalPages || 1);
            }
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            setLoading(false);
        }
    };


    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            const res = await axios.patch(
                `http://localhost:5000/api/admin/update_news_status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.data?.success) {
                throw new Error("Update failed");
            }

            setNews((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, status } : item
                )
            );

            toast.success("Status updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };


    useEffect(() => {
        fetchNews();
    }, [page]);


    const deleteNews = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this news?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete_news/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("News deleted successfully");

            setNews((prev) => prev.filter((item) => item.id !== id));

            if (news.length === 1 && page > 1) {
                setPage((p) => p - 1);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete news");
        }
    };


    if (loading) {
        return <div className="p-6">Loading news...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-2 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-2xl text-center font-semibold">News</h2>

                {canManageNews && (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button
                            onClick={() => navigate("/admin/add-news")}
                            className="flex items-center cursor-pointer justify-center gap-2 bg-black text-white w-full sm:w-auto"
                        >
                            + Add New News
                        </Button>
                        <Button
                            onClick={() => navigate("/admin/news/category&tag")}
                            className="w-full border cursor-pointer sm:w-auto"                    >
                            Category & Tag
                        </Button>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="px-4 py-4 text-left">Id</th>
                            <th className="px-4 py-4 text-left">Image</th>
                            <th className="px-4 py-4 text-left">Title</th>
                            <th className="px-4 py-4 text-left">Author</th>
                            <th className="px-4 py-4 text-left">Category id</th>
                            <th className="px-4 py-4 text-left">Status</th>
                            <th className="px-4 py-4 text-left">Published</th>
                            <th className="px-4 py-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {news.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500">
                                    No news found
                                </td>
                            </tr>
                        ) : (
                            news.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">{item.id}</td>

                                    <td className="px-4 py-3">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-16 h-12 object-cover rounded-md"
                                        />
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {item.title}
                                    </td>

                                    <td className="px-4 py-3">
                                        {item.author}
                                    </td>

                                    <td className="px-4 py-3">
                                        {item.category_id}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="relative inline-block">
                                            <select
                                                value={item.status}
                                                disabled={!canManageNews || updatingId === item.id}
                                                onChange={(e) =>
                                                    updateStatus(item.id, e.target.value)
                                                }
                                                className={`appearance-none px-4 py-1.5 pr-8 text-xs font-medium rounded-full 
                          border transition-all cursor-pointer focus:outline-none focus:ring-0
                          ${item.status === "active"
                                                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                                    }
                          ${!canManageNews || updatingId === item.id
                                                        ? "opacity-60 cursor-not-allowed"
                                                        : ""
                                                    }
                        `}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>

                                            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs text-gray-400">
                                                ▼
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        {new Date(item.published_date).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                disabled={!canManageNews || updatingId === item.id}
                                                size="sm"
                                                onClick={() => navigate(`/admin/edit-news/${item.slug}`)}
                                                className="h-8 px-3 cursor-pointer rounded-xl border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition flex items-center gap-1.5"
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="outline"
                                                disabled={!canManageNews || updatingId === item.id}
                                                size="sm"
                                                onClick={() => deleteNews(item.id)}
                                                className="h-8 px-3 cursor-pointer rounded-xl border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition flex items-center gap-1.5"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-2 cursor-pointer text-sm border rounded disabled:opacity-40"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-9 h-9 cursor-pointer rounded border text-sm ${page === i + 1
                                ? "bg-gray-900 text-white border-gray-900"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-2 cursor-pointer text-sm border rounded disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default News;