import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [adding, setAdding] = useState(false);

    const [showEditForm, setShowEditForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [newCategory, setNewCategory] = useState({
        name: "",
        icon: null,
    });

    const [editCategory, setEditCategory] = useState({
        name: "",
        icon: null,
        oldIcon: "",
    });

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageCategory = ["superadmin", "admin"].includes(role);

    const fetchCategories = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/admin/get_category",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data?.success) {
                setCategories(res.data.data || []);
            } else {
                setCategories([]);
                toast.error("Failed to fetch categories");
            }
        } catch (error) {
            toast.error("Something went wrong while fetching categories");
            console.log(error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoryById = async (id) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/admin/get_category_id/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data?.success) {
                const cat = res.data.data;

                setEditingId(cat.id);
                setEditCategory({
                    name: cat.name,
                    icon: null,
                    oldIcon: cat.icon,
                });

                setShowEditForm(true);
                setShowAddForm(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch category");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            await axios.patch(
                `http://localhost:5000/api/admin/update_category_status/${id}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === id ? { ...cat, status } : cat
                )
            );

            toast.success("Status updated successfully");
        } catch (error) {
            toast.error("Failed to update status");
            console.log(error);
        } finally {
            setUpdatingId(null);
        }
    };

    const addCategory = async () => {
        if (!newCategory.name || !newCategory.icon) {
            toast.error("Name & icon are required");
            return;
        }

        try {
            setAdding(true);

            const payload = new FormData();
            payload.append("name", newCategory.name);
            payload.append("icon", newCategory.icon);

            await axios.post(
                "http://localhost:5000/api/admin/add_category",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Category added successfully");
            setNewCategory({ name: "", icon: null });
            setShowAddForm(false);
            fetchCategories();
        } catch (error) {
            toast.error("Failed to add category");
            console.log(error);
        } finally {
            setAdding(false);
        }
    };

    const updateCategory = async () => {
        if (!editCategory.name) {
            toast.error("Category name is required");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("name", editCategory.name);

            if (editCategory.icon) {
                payload.append("icon", editCategory.icon);
            }

            await axios.put(
                `http://localhost:5000/api/admin/update_category/${editingId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Category updated successfully");
            setShowEditForm(false);
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            toast.error("Failed to update category");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete_category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Category deleted successfully");

            setCategories((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            toast.error("Failed to delete category");
            console.log(error);
        }
    };


    return (
        <div className="max-w-6xl mx-auto rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                    Credit Card Categories
                </h2>

                {canManageCategory && (
                    <button
                        onClick={() => {
                            setShowAddForm((p) => !p);
                            setShowEditForm(false);
                        }}
                        className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg"
                    >
                        {showAddForm ? "Close" : "+ Add Category"}
                    </button>
                )}
            </div>

            {showAddForm && canManageCategory && (
                <div className="bg-white border rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Add New Category
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={(e) =>
                                setNewCategory((p) => ({
                                    ...p,
                                    name: e.target.value,
                                }))
                            }
                            className="h-11 border rounded-lg px-3"
                        />

                        <input
                            type="file"
                            onChange={(e) =>
                                setNewCategory((p) => ({
                                    ...p,
                                    icon: e.target.files[0],
                                }))
                            }
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="px-5 py-2 cursor-pointer border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={addCategory}
                            disabled={adding}
                            className="px-5 py-2 cursor-pointer bg-black text-white rounded-lg"
                        >
                            {adding ? "Saving..." : "Save Category"}
                        </button>
                    </div>
                </div>
            )}

            {showEditForm && canManageCategory && (
                <div className="bg-white border rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Update Category
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            value={editCategory.name}
                            onChange={(e) =>
                                setEditCategory((p) => ({
                                    ...p,
                                    name: e.target.value,
                                }))
                            }
                            className="h-11 border rounded-lg px-3"
                        />

                        <div className="space-y-2">
                            {editCategory.oldIcon && !editCategory.icon && (
                                <img
                                    src={editCategory.oldIcon}
                                    className="w-14 h-14 object-contain border rounded"
                                />
                            )}

                            <input
                                type="file"
                                onChange={(e) =>
                                    setEditCategory((p) => ({
                                        ...p,
                                        icon: e.target.files[0],
                                    }))
                                }
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setShowEditForm(false)}
                            className="px-5 py-2 cursor-pointer border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={updateCategory}
                            className="px-5 py-2 cursor-pointer bg-black text-white rounded-lg"
                        >
                            Update Category
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                ID
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Icon
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Slug
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((cat) => (
                            <tr
                                key={cat.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3 text-sm font-medium">
                                    {cat.id}
                                </td>

                                <td className="px-4 py-3">
                                    <img
                                        src={cat.icon}
                                        alt={cat.name}
                                        className="w-10 h-10 object-contain"
                                    />
                                </td>

                                <td className="px-4 py-3 font-medium">
                                    {cat.name}
                                </td>

                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {cat.slug}
                                </td>

                                <td className="px-4 py-3 text-center">
                                    {canManageCategory ? (
                                        <div className="relative inline-block">
                                            <select
                                                value={cat.status}
                                                disabled={updatingId === cat.id}
                                                onChange={(e) =>
                                                    updateStatus(cat.id, e.target.value)
                                                }
                                                className={`appearance-none px-3 py-1 pr-6 text-xs rounded-full font-medium cursor-pointer outline-none
                                        ${cat.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }
                                        ${updatingId === cat.id
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
                                            className={`px-3 py-1 text-xs rounded-full font-medium
                                    ${cat.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }
                                `}
                                        >
                                            {cat.status}
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => fetchCategoryById(cat.id)}
                                            className="h-8 px-3 cursor-pointer rounded-xl border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-300 transition text-sm"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteCategory(cat.id)}
                                            className="h-8 px-3 cursor-pointer rounded-xl border border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 transition text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Category;
