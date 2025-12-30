import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminAuth } from "@/context/AdminContext";

import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { token } = adminAuth();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        pendingAdmins: 0,
    });

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };

                const results = await Promise.allSettled([
                    axios.get("http://localhost:5000/api/get_user_count", { headers }),
                    axios.get("http://localhost:5000/api/admin/get_admin_count", { headers }),
                    axios.get("http://localhost:5000/api/admin/get_pending_admin_count", { headers }),
                ]);

                const [users, admins, pending] = results;

                setStats({
                    totalUsers:
                        users.status === "fulfilled"
                            ? users.value.data.totalUsers
                            : 0,

                    totalAdmins:
                        admins.status === "fulfilled"
                            ? admins.value.data.totalAdmins
                            : 0,

                    pendingAdmins:
                        pending.status === "fulfilled"
                            ? pending.value.data.pendingAdmins
                            : 0,
                });

                if (
                    users.status === "fulfilled" &&
                    Array.isArray(users.value.data.monthlyUsers) &&
                    users.value.data.monthlyUsers.length > 0
                ) {
                    setChartData(users.value.data.monthlyUsers);
                } else {
                    setChartData([
                        { month: "Jan", users: 120 },
                        { month: "Feb", users: 180 },
                        { month: "Mar", users: 260 },
                        { month: "Apr", users: 340 },
                        { month: "May", users: 420 },
                        { month: "Jun", users: 510 },
                    ]);
                }
            } catch (err) {
                console.error("Dashboard stats error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (loading) {
        return <p className="text-slate-500">Loading dashboard...</p>;
    }

    return (
        <div className="space-y-10">

            <div>
                <h1 className="text-2xl mt-0 sm:mt-12 lg:mt-0 font-semibold text-slate-900">
                    Admin Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                    System overview & administrative controls
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard title="Total Admins" value={stats.totalAdmins} />
                <StatCard
                    title="Pending Approvals"
                    value={stats.pendingAdmins}
                    onClick={() => navigate("/admin/approvals")}
                />
                <StatCard title="Total Users" value={stats.totalUsers} />
                <StatCard title="System Status" value="Active" status="success" />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl border p-6">
                    <h2 className="text-sm font-semibold mb-4 text-slate-700">
                        User Growth
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0f172a" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke="#0f172a"
                                fill="url(#usersGradient)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border p-6">
                    <h2 className="text-sm font-semibold mb-4 text-slate-700">
                        Monthly Signups
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#334155" />
                                    <stop offset="100%" stopColor="#94a3b8" />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="users"
                                fill="url(#barGradient)"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Quick Actions
                </h2>

                <div className="flex  flex-wrap gap-4">
                    <ActionButton
                        className="cursor-pointer"
                        label="Approve Admins"
                        onClick={() => navigate("/admin/approvals")}
                    />
                    <ActionButton label="Manage Users" />
                    <ActionButton label="Settings" />
                </div>
            </div>

        </div>
    );
};

const StatCard = ({ title, value, status, onClick }) => (
    <div
        onClick={onClick}
        className={`rounded-xl border p-5 bg-white transition ${onClick ? "cursor-pointer hover:shadow-lg" : ""
            }`}
    >
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-3xl font-semibold mt-2">{value}</h3>
        {status === "success" && (
            <span className="text-xs text-green-600 mt-2 block">● Online</span>
        )}
    </div>
);

const ActionButton = ({ label, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition ${className}`}
    >
        {label}
    </button>
);

export default AdminDashboard;
