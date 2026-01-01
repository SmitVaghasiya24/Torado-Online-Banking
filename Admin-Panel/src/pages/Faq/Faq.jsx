import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Faq() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageFaq = ["superadmin", "admin", "content_manager"].includes(role);

    const fetchFaqs = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/admin/get_all_faq",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFaqs(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch FAQs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const updateFaqStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            await axios.patch(
                `http://localhost:5000/api/admin/update_faq_status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("FAQ status updated successfully");

            setFaqs((prev) =>
                prev.map((faq) =>
                    faq.id === id ? { ...faq, status } : faq
                )
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to update FAQ status");
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteFaq = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this FAQ?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete_faq/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("FAQ deleted successfully");

            setFaqs((prev) => prev.filter((faq) => faq.id !== id));
        } catch (error) {
            console.error("Delete FAQ error:", error);
            toast.error("Failed to delete FAQ");
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-2 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h2 className="text-2xl text-center sm:text-left font-semibold">
                    FAQs
                </h2>

                {canManageFaq && (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button
                            onClick={() => navigate("/admin/add-faq")}
                            className="bg-black cursor-pointer text-white w-full sm:w-auto"
                        >
                            + Add New FAQ
                        </Button>

                        <Button
                          onClick={() => navigate("/admin/category")}
                            variant="outline"
                            className="w-full cursor-pointer sm:w-auto"
                        >
                            Category
                        </Button>
                    </div>
                )}
            </div>


            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left">Id</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Question</th>
                                <th className="px-6 py-4 text-left">Answer</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Created</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading &&
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="border-b">
                                        <td colSpan="6" className="px-6 py-4">
                                            <div className="h-4 bg-gray-100 rounded animate-pulse" />
                                        </td>
                                    </tr>
                                ))}

                            {!loading &&
                                faqs.map((faq) => (
                                    <tr
                                        key={faq.id}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {faq.id}
                                        </td>

                                        <td className="px-6 py-4">
                                            {faq.category_name}
                                        </td>

                                        <td className="px-6 py-4 max-w-sm">
                                            <p className="line-clamp-2 font-medium">
                                                {faq.question}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 max-w-md text-gray-600">
                                            <p className="line-clamp-2">
                                                {faq.answer}
                                            </p>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="relative inline-block">
                                                <select
                                                    value={faq.status}
                                                    disabled={!canManageFaq || updatingId === faq.id}
                                                    onChange={(e) =>
                                                        updateFaqStatus(faq.id, e.target.value)
                                                    }
                                                    className={`appearance-none px-4 py-1.5 pr-8 text-xs font-medium rounded-full  border transition-all cursor-pointer focus:outline-none focus:ring-0 ${faq.status === "active"
                                                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                                        } ${!canManageFaq || updatingId === faq.id
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

                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(faq.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    disabled={!canManageFaq || updatingId === faq.id}
                                                    size="sm"
                                                    onClick={() => navigate(`/admin/edit-faq/${faq.id}`)}
                                                    className="h-8 px-3 cursor-pointer rounded-xl border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition flex items-center gap-1.5"
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    disabled={!canManageFaq || updatingId === faq.id}
                                                    size="sm"
                                                    onClick={() => deleteFaq(faq.id)}
                                                    className="h-8 px-3 cursor-pointer rounded-xl border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition flex items-center gap-1.5"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            {!loading && faqs.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        No FAQs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Faq;
