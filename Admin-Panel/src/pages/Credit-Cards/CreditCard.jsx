import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function CreditCard() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageCreditCards = ["superadmin", "admin"].includes(role);

    const fetchCreditCards = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_credit_card"
            );

            if (res.data?.success) {
                setCards(res.data.data || []);
            } else {
                setCards([]);
            }
        } catch (error) {
            console.error("Fetch credit cards error:", error);
            setCards([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCreditCards();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            await axios.patch(
                `http://localhost:5000/api/admin/update_credit_card_status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Status updated");
            fetchCreditCards();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };


    const deleteCreditCard = async (id) => {
        if (!window.confirm("Are you sure you want to delete this credit card?")) return;

        try {
            setUpdatingId(id);

            await axios.delete(
                `http://localhost:5000/api/admin/delete_credit_card/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Credit card deleted successfully");

            setCards((prev) => prev.filter((item) => item.id !== id));

        } catch (error) {
            console.error(error);
            toast.error("Failed to delete credit card");
        } finally {
            setUpdatingId(null);
        }
    };


    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-2xl font-semibold">Credit Cards</h2>

                {canManageCreditCards && (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button
                            onClick={() => navigate("/admin/add-credit-card")
                            }
                            className="bg-black cursor-pointer text-white w-full sm:w-auto"
                        >
                            + Add New Credit Card
                        </Button>

                        <Button
                            onClick={() => navigate("/admin/credit-cards/category")}
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
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Card</th>
                                <th className="px-6 py-4 text-left">Title</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Cashback</th>
                                <th className="px-6 py-4 text-left">Annual Fee</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Created</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="9" className="px-6 py-6 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            )}

                            {!loading && cards.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="px-6 py-6 text-center text-gray-500"
                                    >
                                        No credit cards found
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                cards.map((card) => (
                                    <tr
                                        key={card.id}
                                        className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {card.id}
                                        </td>

                                        <td className="px-6 py-4">
                                            <img
                                                src={card.card_image}
                                                alt={card.title}
                                                className="w-14 h-10 object-contain rounded"
                                            />
                                        </td>

                                        <td
                                            onClick={() => {
                                                if (canManageCreditCards) {
                                                    navigate(`/admin/credit-card/${card.slug}`);
                                                }
                                            }}
                                            className={`px-6 py-4 font-medium ${canManageCreditCards
                                                    ? "text-black hover:underline cursor-pointer"
                                                    : "text-gray-700"
                                                }`}
                                        >
                                            {card.title}
                                        </td>


                                        <td className="px-6 py-4">
                                            {card.category_name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {card.max_cashback_percent}%
                                        </td>

                                        <td className="px-6 py-4">
                                            ₹{card.annual_fee}
                                        </td>

                                        <td className="px-4 py-3">
                                            {canManageCreditCards ? (
                                                <div className="relative inline-block">
                                                    <select
                                                        value={card.status}
                                                        disabled={updatingId === card.id}
                                                        onChange={(e) =>
                                                            updateStatus(card.id, e.target.value)
                                                        }
                                                        className={`appearance-none px-4 py-1.5 pr-8 text-xs font-medium rounded-full border transition-all cursor-pointer outline-none
                                                                    ${card.status === "active"
                                                                ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                                : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                                            }
                                                                    ${updatingId === card.id
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
                                            ) : (
                                                <span
                                                    className={`px-4 py-1.5 text-xs font-medium rounded-full border
                                                            ${card.status === "active"
                                                            ? "bg-green-100 text-green-700 border-green-200"
                                                            : "bg-red-50 text-red-700 border-red-200"
                                                        }
                                                `}
                                                >
                                                    {card.status}
                                                </span>
                                            )}
                                        </td>



                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(
                                                card.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={!canManageCreditCards || updatingId === card.id}
                                                    className="h-8 px-3 cursor-pointer rounded-xl border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition flex items-center gap-1.5"
                                                    onClick={() =>
                                                        navigate(`/admin/edit-credit-card/${card.slug}`)
                                                    }
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={!canManageCreditCards || updatingId === card.id}
                                                    onClick={() => deleteCreditCard(card.id)}
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
            </div>
        </div>
    );
}

export default CreditCard;
