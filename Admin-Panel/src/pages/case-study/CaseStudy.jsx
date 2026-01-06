import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


function CaseStudy() {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageCaseStudy = ["superadmin", "admin", "content_manager"].includes(role);

    const fetchCaseStudies = async (pageNumber = 1) => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/admin/get_case_study",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: pageNumber,
                        limit: 5,
                    },
                }
            );

            setCaseStudies(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
            setPage(res.data.pagination?.page || 1);
        } catch (error) {
            console.error("Failed to fetch case studies", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            await axios.patch(
                `http://localhost:5000/api/admin/update_case_study_status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Status updated successfully");
            fetchCaseStudies(page);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteCaseStudy = async (id) => {
        if (!window.confirm("Are you sure you want to delete this case study?")) return;

        try {
            setUpdatingId(id);

            await axios.delete(
                `http://localhost:5000/api/admin/delete_case_study/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Case study deleted successfully");

            setCaseStudies((prev) => prev.filter((item) => item.id !== id));

            if (caseStudies.length === 1 && page > 1) {
                setPage((p) => p - 1);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete case study");
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => {
        fetchCaseStudies(page);
    }, [page]);

    return (
        <div className="max-w-7xl mx-auto px-2 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-2xl font-semibold">Case Studies</h2>

                {canManageCaseStudy && (
                    <Button
                        onClick={() => navigate("/admin/add-case-study")}
                        className="bg-black cursor-pointer text-white w-full sm:w-auto"
                    >
                        + Add New Case Study
                    </Button>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left">Id</th>
                                <th className="px-6 py-4 text-left">Thumbnail</th>
                                <th className="px-6 py-4 text-left">Title</th>
                                <th className="px-6 py-4 text-left">Sector</th>
                                <th className="px-6 py-4 text-left">Location</th>
                                <th className="px-6 py-4 text-left">Created</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!loading &&
                                caseStudies.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{item.id}</td>

                                        <td className="px-6 py-4">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-20 h-12 object-cover rounded"
                                            />
                                        </td>

                                        <td
                                            onClick={() => {
                                                if (canManageCaseStudy) {
                                                    navigate(`/admin/case-study/${item.slug}`);
                                                }
                                            }}
                                            className={`px-6 py-4 font-medium ${canManageCaseStudy
                                                ? "text-black hover:underline cursor-pointer"
                                                : "text-gray-700"
                                                }`}
                                        >
                                            {item.title}
                                        </td>

                                        <td className="px-6 py-4">{item.sector}</td>
                                        <td className="px-6 py-4">{item.location}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="relative inline-block">
                                                <select
                                                    value={item.status}
                                                    disabled={!canManageCaseStudy || updatingId === item.id}
                                                    onChange={(e) =>
                                                        updateStatus(item.id, e.target.value)
                                                    }
                                                    className={`appearance-none px-4 py-1.5 pr-8 text-xs font-medium rounded-full border transition-all focus:outline-none focus:ring-0
                                                                ${item.status === "active"
                                                            ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                                        }
                                                                ${!canManageCaseStudy || updatingId === item.id
                                                            ? "opacity-60 cursor-not-allowed"
                                                            : "cursor-pointer"
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

                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={!canManageCaseStudy || updatingId === item.id}
                                                    className="h-8 px-3 cursor-pointer rounded-xl border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition flex items-center gap-1.5"
                                                    onClick={() =>
                                                        navigate(`/admin/edit-case-study/${item.slug}`)
                                                    }
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={!canManageCaseStudy || updatingId === item.id}
                                                    onClick={() => deleteCaseStudy(item.id)}
                                                    className="h-8 px-3 cursor-pointer rounded-xl border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition flex items-center gap-1.5">
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            {!loading && caseStudies.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                                        No case studies found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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

export default CaseStudy;
