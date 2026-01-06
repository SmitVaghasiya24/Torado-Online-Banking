import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const [name, setName] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");


    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageCategory = ["superadmin", "admin", "content_manager"].includes(role);


    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_faq_category",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCategories(res.data.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const addCategory = async () => {
        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {
            setAdding(true);
            await axios.post(
                "http://localhost:5000/api/admin/add_faq_category",
                { name },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Category added");
            setName("");
            fetchCategories();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add category");
        } finally {
            setAdding(false);
        }
    };


    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);
            await axios.patch(
                `http://localhost:5000/api/admin/update_faq_category_status/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Status updated");
            fetchCategories();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };


    const startEdit = (cat) => {
        setEditingId(cat.id);
        setEditName(cat.name);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName("");
    };

    const updateCategory = async (id) => {
        if (!editName.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {
            setUpdatingId(id);
            await axios.put(
                `http://localhost:5000/api/admin/update_faq_category/${id}`,
                { name: editName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Category updated");
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        } finally {
            setUpdatingId(null);
        }
    };


    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete_faq_category/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Category deleted");
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };


    return (
        <div className="max-w-6xl mx-auto px-2 py-6 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <h2 className="text-2xl font-semibold">FAQ Categories</h2>

                <div className="bg-white w-full lg:max-w-xl border border-gray-200 rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                        <div className="w-full space-y-2">
                            <Input
                                placeholder="Enter category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={addCategory}
                            disabled={adding}
                            className="bg-black text-white w-full sm:w-auto"
                        >
                            {adding ? "Adding..." : "+ Add Category"}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Category Name</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Created</th>
                                <th className="px-6 py-4 text-left">Updated</th>
                                <th className="pl-6 pr-3 py-4 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading &&
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan="6" className="px-6 py-4">
                                            <div className="h-4 bg-gray-100 rounded animate-pulse" />
                                        </td>
                                    </tr>
                                ))}

                            {!loading &&
                                categories.map((cat) => (
                                    <tr
                                        key={cat.id}
                                        className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium">{cat.id}</td>

                                        <td className="px-6 py-4">
                                            {editingId === cat.id ? (
                                                <Input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" && updatingId !== cat.id) {
                                                            updateCategory(cat.id);
                                                        }
                                                    }}
                                                    className="h-8 max-w-xs"
                                                />

                                            ) : (
                                                cat.name
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="relative inline-block">
                                                <select
                                                    value={cat.status}
                                                    disabled={!canManageCategory || updatingId === cat.id}
                                                    onChange={(e) =>
                                                        updateStatus(cat.id, e.target.value)
                                                    }
                                                    className={`appearance-none px-4 py-1.5 pr-8 text-xs font-medium rounded-full  border transition-all cursor-pointer focus:outline-none focus:ring-0 ${cat.status === "active"
                                                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                                        } ${!canManageCategory || updatingId === cat.id
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
                                            {new Date(cat.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(cat.updated_at).toLocaleDateString()}
                                        </td>

                                        <td className="pl-6 pr-3 py-4">
                                            <div className="flex items-center gap-2">
                                                {editingId === cat.id ? (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            disabled={updatingId === cat.id}
                                                            onClick={() => updateCategory(cat.id)}
                                                            className="h-8 cursor-pointer px-3 bg-green-600 text-white"
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={cancelEdit}
                                                            className="h-8 cursor-pointer px-3"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={!canManageCategory}
                                                            onClick={() => startEdit(cat)}
                                                            className="h-8 px-3 cursor-pointer border-blue-200 text-blue-600"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={!canManageCategory}
                                                            onClick={() => deleteCategory(cat.id)}
                                                            className="h-8 px-3 cursor-pointer border-red-200 text-red-600"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            {!loading && categories.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                        No categories found
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

export default Category;
