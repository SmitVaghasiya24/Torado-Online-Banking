import { useEffect, useState } from "react"
import axios from "axios"
import { adminAuth } from "../context/AdminContext"
import toast from "react-hot-toast"

const AdminApprovals = () => {
    const { token } = adminAuth()
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(true)

    const api = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const fetchPendingAdmins = async () => {
        try {
            const res = await api.get("/admin/pending_admin")
            setAdmins(res.data.admins || [])
        } catch (err) {
            toast.error("Failed to load pending admins")
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPendingAdmins()
    }, [])

    const approveAdmin = async (id) => {
        try {
            await api.patch(`/admin/approve/${id}`)
            setAdmins(prev => prev.filter(a => a.admin_id !== id))
            toast.success("Admin approved successfully")
        } catch (err) {
            toast.error("Failed to approve admin")
            console.log(err)
        }
    }

    const rejectAdmin = async (id) => {
        try {
            await api.patch(`/admin/reject/${id}`)
            setAdmins(prev => prev.filter(a => a.admin_id !== id))
            toast.error("Admin request rejected")
        } catch (err) {
            toast.error("Failed to reject admin")
            console.log(err)
        }
    }

    if (loading) {
        return <p className="text-slate-500">Loading approvals...</p>
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">
                Admin Approval Requests
            </h1>

            {admins.length === 0 ? (
                <p className="text-slate-500">No pending admin requests</p>
            ) : (
                <>
                    <div className="hidden md:block bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 text-slate-600">
                                <tr>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-left">Role</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map(admin => (
                                    <tr
                                        key={admin.admin_id}
                                        className="border-t border-gray-200 hover:bg-slate-50"
                                    >
                                        <td className="p-4">{admin.name}</td>
                                        <td className="p-4">{admin.email}</td>
                                        <td className="p-4 capitalize">{admin.role}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => approveAdmin(admin.admin_id)}
                                                className="px-3 py-1.5 rounded-md text-white bg-green-600 hover:bg-green-700"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => rejectAdmin(admin.admin_id)}
                                                className="px-3 py-1.5 rounded-md text-white bg-red-600 hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-4">
                        {admins.map(admin => (
                            <div
                                key={admin.admin_id}
                                className="bg-white border-gray-200 border rounded-xl p-4 shadow-sm"
                            >
                                <div className="mb-2">
                                    <p className="text-sm text-slate-500">Name</p>
                                    <p className="font-medium">{admin.name}</p>
                                </div>

                                <div className="mb-2">
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="text-sm break-all">{admin.email}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-slate-500">Role</p>
                                    <p className="capitalize">{admin.role}</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => approveAdmin(admin.admin_id)}
                                        className="flex-1 px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => rejectAdmin(admin.admin_id)}
                                        className="flex-1 px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminApprovals
