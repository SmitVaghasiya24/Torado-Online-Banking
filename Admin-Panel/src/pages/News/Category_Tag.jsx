import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

function Category_Tag() {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const [categoryName, setCategoryName] = useState("");
    const [tagName, setTagName] = useState("");
    const [addingCategory, setAddingCategory] = useState(false);
    const [addingTag, setAddingTag] = useState(false);

    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingTagId, setEditingTagId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [editTagName, setEditTagName] = useState("");

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;
    const role = authData?.admin?.role;

    const canManageCategory = ["superadmin", "admin", "content_manager"].includes(role);

    const fetchData = async () => {
        try {
            setLoading(true);

            const results = await Promise.allSettled([
                axios.get("http://localhost:5000/api/admin/get_news_category", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:5000/api/admin/get_news_tag", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const [catRes, tagRes] = results;

            setCategories(catRes.status === "fulfilled" ? catRes.value.data.data || [] : []);
            setTags(tagRes.status === "fulfilled" ? tagRes.value.data.data || [] : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchData();
    }, [token]);


    const updateCategoryStatus = async (id, status) => {
        try {
            setUpdatingId(id);
            await axios.patch(
                `http://localhost:5000/api/admin/update_category_status/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Status Updated");
            fetchData();
        } catch {
            toast.error("Failed to update category status");
        } finally {
            setUpdatingId(null);
        }
    };

    const addNewsCategory = async () => {
        if (!categoryName.trim()) return toast.error("Category name is required");

        try {
            setAddingCategory(true);
            await axios.post(
                "http://localhost:5000/api/admin/add_news_category",
                { name: categoryName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Category added");
            setCategoryName("");
            fetchData();
        } catch {
            toast.error("Failed to add category");
        } finally {
            setAddingCategory(false);
        }
    };

    const updateNewsCategory = async (id) => {
        if (!editCategoryName.trim()) return toast.error("Category name is required");

        try {
            setUpdatingId(id);
            await axios.put(
                `http://localhost:5000/api/admin/update_news_category/${id}`,
                { name: editCategoryName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Category updated");
            setEditingCategoryId(null);
            fetchData();
        } catch {
            toast.error("Failed to update category");
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete_news_category/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Category deleted");
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch {
            toast.error("Failed to delete category");
        }
    };


    const updateTagStatus = async (id, status) => {
        try {
            setUpdatingId(id);
            await axios.patch(
                `http://localhost:5000/api/admin/update_tag_status/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Status Updated");
            fetchData();
        } catch {
            toast.error("Failed to update tag status");
        } finally {
            setUpdatingId(null);
        }
    };

    const addNewsTag = async () => {
        if (!tagName.trim()) return toast.error("Tag name is required");

        try {
            setAddingTag(true);
            await axios.post(
                "http://localhost:5000/api/admin/add_news_tag",
                { name: tagName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Tag added");
            setTagName("");
            fetchData();
        } catch {
            toast.error("Failed to add tag");
        } finally {
            setAddingTag(false);
        }
    };

    const updateNewsTag = async (id) => {
        if (!editTagName.trim()) return toast.error("Tag name is required");

        try {
            setUpdatingId(id);
            await axios.put(
                `http://localhost:5000/api/admin/update_news_tag/${id}`,
                { name: editTagName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Tag updated");
            setEditingTagId(null);
            fetchData();
        } catch {
            toast.error("Failed to update tag");
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteTag = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tag?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/delete_news_tag/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Tag deleted");
            setTags(prev => prev.filter(t => t.id !== id));
        } catch {
            toast.error("Failed to delete tag");
        }
    };


    return (
        <div className="p-6 space-y-10">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        News Categories
                    </h3>

                    {canManageCategory && (
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:max-w-md">
                            <input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Enter category name"
                                className="w-full sm:flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            <Button
                                onClick={addNewsCategory}
                                disabled={addingCategory}
                                className="h-10 cursor-pointer w-full sm:w-auto px-4 bg-black text-white"
                            >
                                {addingCategory ? "Adding..." : "+ Add Category"}
                            </Button>
                        </div>
                    )}

                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium">Id</th>
                                <th className="px-6 py-4 text-left font-medium">Name</th>
                                <th className="px-6 py-4 text-left font-medium">Status</th>
                                <th className="px-6 py-4 text-left font-medium">Created_At</th>
                                <th className="px-6 py-4 text-left font-medium">Updated_At</th>
                                <th className="px-6 py-4 text-left font-medium">Updated_By</th>
                                <th className="px-6 py-4 text-left font-medium">Action</th>

                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {categories.map((cat) => (
                                <tr
                                    key={cat.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium">{cat.id}</td>

                                    <td className="px-6 py-4">
                                        {editingCategoryId === cat.id ? (
                                            <input
                                                value={editCategoryName}
                                                onChange={(e) => setEditCategoryName(e.target.value)}
                                                className="w-full h-9 rounded-md border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-800">
                                                {cat.name}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="relative inline-block">
                                            <select
                                                value={cat.status}
                                                disabled={!canManageCategory}
                                                onChange={(e) =>
                                                    updateCategoryStatus(cat.id, e.target.value)
                                                }
                                                className={`appearance-none h-8 rounded-full pl-3 pr-7 text-xs font-medium border
                                                            ${cat.status === "active"
                                                        ? "bg-green-100 text-green-700 border-green-200"
                                                        : "bg-red-100 text-red-700 border-red-200"
                                                    }
                                                            ${!canManageCategory
                                                        ? "opacity-60 cursor-not-allowed"
                                                        : "cursor-pointer"
                                                    }
                                                `}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>

                                            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] text-gray-400">
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
                                    <td className="px-6 py-4 text-gray-500">
                                        {cat.updated_by}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {editingCategoryId === cat.id ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateNewsCategory(cat.id)}
                                                        className="h-8 px-3 cursor-pointer bg-green-600 text-white"
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setEditingCategoryId(null)}
                                                        className="h-8 cursor-pointer px-3"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setEditingCategoryId(cat.id);
                                                            setEditCategoryName(cat.name);
                                                        }}
                                                        className="h-8 px-3 cursor-pointer border-blue-200 text-blue-600 hover:bg-blue-50"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => deleteCategory(cat.id)}
                                                        className="h-8 px-3 cursor-pointer border-red-200 text-red-600 hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {categories.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No categories found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        News Tags
                    </h3>

                    {canManageCategory && (
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:max-w-md">
                            <input
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                                placeholder="Enter tag name"
                                className="w-full sm:flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            <Button
                                onClick={addNewsTag}
                                disabled={addingTag}
                                className="h-10 cursor-pointer w-full sm:w-auto px-4 bg-black text-white"
                            >
                                {addingTag ? "Adding..." : "+ Add Tag"}
                            </Button>
                        </div>
                    )}

                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium">Id</th>
                                <th className="px-6 py-4 text-left font-medium">Name</th>
                                <th className="px-6 py-4 text-left font-medium">Status</th>
                                <th className="px-6 py-4 text-left font-medium">Created_At</th>
                                <th className="px-6 py-4 text-left font-medium">Updated_At</th>
                                <th className="px-6 py-4 text-left font-medium">Updated_By</th>
                                <th className="px-6 py-4 text-left font-medium">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {tags.map((tag) => (
                                <tr
                                    key={tag.id}
                                    className="hover:bg-gray-50 transition"
                                >

                                    <td className="px-6 py-4 font-medium">{tag.id}</td>

                                    <td className="px-6 py-4">
                                        {editingTagId === tag.id ? (
                                            <input
                                                value={editTagName}
                                                onChange={(e) => setEditTagName(e.target.value)}
                                                className="w-full h-9 rounded-md border border-gray-300 px-2 text-sm
                                    focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-800">
                                                {tag.name}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="relative inline-block">
                                            <select
                                                value={tag.status}
                                                disabled={!canManageCategory}
                                                onChange={(e) =>
                                                    updateTagStatus(tag.id, e.target.value)
                                                }
                                                className={`appearance-none h-8 rounded-full pl-3 pr-7 text-xs font-medium border
                                                            ${tag.status === "active"
                                                        ? "bg-green-100 text-green-700 border-green-200"
                                                        : "bg-red-100 text-red-700 border-red-200"
                                                    }
                                                        ${!canManageCategory
                                                        ? "opacity-60 cursor-not-allowed"
                                                        : "cursor-pointer"
                                                    }
                                                `}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>

                                            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] text-gray-400">
                                                ▼
                                            </span>
                                        </div>
                                    </td>


                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(tag.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(tag.updated_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {tag.updated_by}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {editingTagId === tag.id ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateNewsTag(tag.id)}
                                                        className="h-8 px-3 cursor-pointer bg-green-600 text-white"
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setEditingTagId(null)}
                                                        className="h-8 px-3 cursor-pointer"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setEditingTagId(tag.id);
                                                            setEditTagName(tag.name);
                                                        }}
                                                        className="h-8 px-3 cursor-pointer border-blue-200 text-blue-600 hover:bg-blue-50"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => deleteTag(tag.id)}
                                                        className="h-8 px-3 cursor-pointer border-red-200 text-red-600 hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {tags.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No tags found
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

export default Category_Tag;
