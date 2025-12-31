import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";


function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [updatingId, setUpdatingId] = useState(null);

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canUpdateStatus = ["superadmin", "admin", "content_manager"].includes(role);

    const fetchServices = async (pageNumber = 1) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/api/admin/get_service?page=${pageNumber}&limit=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setServices(res.data.data || []);
            setPage(res.data.page);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch services", error);
            toast.error("Failed to load services");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            setUpdatingId(id);

            await axios.patch(
                `http://localhost:5000/api/admin/update_service_status/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Status updated successfully");
            fetchServices(page);
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Status update failed");
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => {
        fetchServices(page);
    }, [page]);

    return (
        <div className="max-w-7xl mx-auto px-2 py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-2xl text-center font-semibold">Services</h2>


                <Button
                    onClick={() => navigate("/admin/add-service")}
                    className="flex bg-black text-white items-center gap-2 w-full sm:w-auto"
                >
                    + Add New Service
                </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full text-sm min-w-225">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-left text-gray-600">
                            <th className="px-6 py-4">Thumbnail</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                               <th className="px-6 py-4">Created</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading &&
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="border-b">
                                    <td className="px-6 py-4">
                                        <div className="w-20 h-12 bg-gray-100 rounded animate-pulse" />
                                    </td>
                                    <td colSpan="4" className="px-6 py-4">
                                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                                    </td>
                                </tr>
                            ))}

                        {!loading &&
                            services.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-20 h-12 rounded object-cover"
                                        />
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {item.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.category_name}
                                    </td>

                                     <td className="px-6 py-4 text-gray-500">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </td>


                                    <td className="px-6 py-4">
                                        <div className="relative inline-block">
                                            <select
                                                value={item.status}
                                                disabled={!canUpdateStatus || updatingId === item.id}
                                                onChange={(e) =>
                                                    updateStatus(item.id, e.target.value)
                                                }
                                                className={`appearance-none px-4 py-1.5 pr-8 text-xs font-medium rounded-full border transition-all cursor-pointer focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${item.status === "active"
                                                    ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                                    }
                                                        ${updatingId === item.id
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


                                   
                                    <td className="px-6 py-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/admin/edit-service/${item.slug}`)}
                                            className="h-8 cursor-pointer px-3 rounded-xl border-gray-200 text-gray-700 bg-white/60 backdrop-blur hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-all duration-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-offset-0 flex items-center gap-1.5"
                                        >
                                            <Pencil className="size-3.5 opacity-70" />
                                            <span className="font-medium">Edit</span>
                                        </Button>


                                    </td>
                                </tr>
                            ))}

                        {!loading && services.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No services found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-2 text-sm border rounded disabled:opacity-40"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-9 h-9 rounded border text-sm
                ${page === i + 1
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "hover:bg-gray-100"
                                }
              `}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-2 text-sm border rounded disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Services;
