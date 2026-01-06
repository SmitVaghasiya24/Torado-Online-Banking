import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function MortgageRates() {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageMortgage = ["superadmin", "admin", "content_manager"].includes(role);

    const fetchMortgageRates = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/get_mortgage_rate"
            );

            if (res.data?.success) {
                setRates(res.data.data || []);
            } else {
                setRates([]);
                toast.error("Failed to fetch mortgage rates");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while fetching mortgage rates");
            setRates([]);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            await axios.patch(
                `http://localhost:5000/api/admin/update_mortgage_rate_status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRates((prev) =>
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
        fetchMortgageRates();
    }, []);


    const deleteMortgageRate = async (id) => {
        if (!window.confirm("Are you sure you want to delete this mortgage rate?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete_mortgage_rate/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Mortgage rate deleted successfully");

            setRates((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete mortgage rate");
        }
    };


    return (
        <div className="max-w-7xl mx-auto rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-3xl font-semibold mb-8">
                    Mortgage Rates
                </h2>

                {canManageMortgage && (
                    <Button
                        onClick={() => navigate("/admin/add-mortgage-rate")}
                        className="bg-black cursor-pointer text-white w-full sm:w-auto"
                    >
                        + Add New Mortgage Rate
                    </Button>
                )}
            </div>

            {loading ? (
                <p className="text-gray-500 text-lg">
                    Loading mortgage rates...
                </p>
            ) : rates.length === 0 ? (
                <p className="text-gray-500 text-lg">
                    No mortgage rates found
                </p>
            ) : (
                <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Mortgage Type
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Rate (%)
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    APR (%)
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Points
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Monthly Payment
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Created At
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {rates.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-5 font-medium">
                                        {item.id}
                                    </td>

                                    <td className="px-6 py-5 font-medium">
                                        {/(year|fixed)/i.test(item.mortgage_type)
                                            ? item.mortgage_type
                                            : `${item.mortgage_type}-Year Fixed`}
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        {item.rate}
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        {item.apr}
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        {item.point}
                                    </td>

                                    <td className="px-6 py-5 text-center font-medium">
                                        ₹{item.monthly_payment}
                                    </td>

                                    <td className="px-6 py-5 text-center">
                                        {canManageMortgage ? (
                                            <div className="relative inline-block">
                                                <select
                                                    value={item.status}
                                                    disabled={updatingId === item.id}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`appearance-none px-4 py-1.5 pr-8 text-xs font-medium rounded-full border cursor-pointer outline-none
                                                        ${item.status === "approved"
                                                            ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                            : item.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
                                                                : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                                                        }
                                                        ${updatingId === item.id
                                                            ? "opacity-60 cursor-not-allowed"
                                                            : ""
                                                        }
                                                    `}
                                                >
                                                    <option value="approved">
                                                        Approved
                                                    </option>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="rejected">
                                                        Rejected
                                                    </option>
                                                </select>

                                                <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs text-gray-400">
                                                    ▼
                                                </span>
                                            </div>
                                        ) : (
                                            <span
                                                className={`px-4 py-1.5 text-xs rounded-full font-medium
                                                    ${item.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }
                                                `}
                                            >
                                                {item.status}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-5 text-center text-sm text-gray-600">
                                        {new Date(
                                            item.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={!canManageMortgage || updatingId === item.id}
                                                className="h-8 px-3 cursor-pointer rounded-xl border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition flex items-center gap-1.5"
                                                onClick={() =>
                                                    navigate(`/admin/edit-mortgage-rate/${item.id}`)
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={!canManageMortgage || updatingId === item.id}
                                                onClick={() => deleteMortgageRate(item.id)}
                                                className="h-8 px-3 cursor-pointer rounded-xl border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition flex items-center gap-1.5">
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MortgageRates;
