import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Team() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const navigate = useNavigate();

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageTeam = ["superadmin", "admin"].includes(role);


    const fetchTeam = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:5000/api/get_management",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.success) {
                setMembers(res.data.members || []);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch team members");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchTeam();
    }, [token]);

    const deleteMember = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/delete_management/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMembers((prev) => prev.filter((m) => m.id !== id));
            toast.success("Team member deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete team member");
        }
    };


    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            await axios.patch(
                `http://localhost:5000/api/update_management_status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMembers((prev) =>
                prev.map((member) =>
                    member.id === id ? { ...member, status } : member
                )
            );

            toast.success("Status updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="p-6">


            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-2xl font-semibold mb-6">
                    Management Team
                </h2>

                {canManageTeam && (
                    <Button
                        onClick={() => navigate("/admin/add-management-team")}
                        className="bg-black cursor-pointer text-white w-full sm:w-auto"
                    >
                        + Add Management Team
                    </Button>
                )}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
                    <table className="min-w-full text-sm border border-gray-200">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left ">Id</th>
                                <th className="px-6 py-4 text-left">Image</th>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-left ">Position</th>
                                <th className="px-6 py-4 text-left ">Status</th>
                                <th className="px-6 py-4 text-left">Created</th>
                                <th className="px-6 py-4 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">
                                        {member.id}
                                    </td>

                                    <td className="px-6 py-4">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-14 h-14 rounded-full object-cover bord"
                                        />
                                    </td>

                                    <td className="px-6 py-4 font-medium ">
                                        {member.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {member.position}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="relative inline-block">
                                            <select
                                                value={member.status}
                                                disabled={updatingId === member.id}
                                                onChange={(e) =>
                                                    updateStatus(member.id, e.target.value)
                                                }
                                                className={`h-8 appearance-none rounded-full pl-3 pr-8 text-xs font-medium border border-gray-200
                                                             ${member.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }
                                                            ${updatingId === member.id
                                                        ? "opacity-60 cursor-not-allowed"
                                                        : "cursor-pointer"
                                                    }
                                                            focus:outline-none
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
                                        {new Date(
                                            member.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={!canManageTeam || updatingId === member.id}
                                                className="h-8 px-3 cursor-pointer rounded-xl border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition flex items-center gap-1.5"
                                                onClick={() =>
                                                    navigate(`/admin/edit-management-team/${member.id}`)
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={!canManageTeam || updatingId === member.id}
                                                onClick={() => deleteMember(member.id)}
                                                className="h-8 px-3 cursor-pointer rounded-xl border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition flex items-center gap-1.5">
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {members.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No team members found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Team;
