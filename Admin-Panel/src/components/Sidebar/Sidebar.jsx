import { useState } from "react"
import { adminAuth } from "../../context/AdminContext"
import { useNavigate, NavLink } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"

const Sidebar = () => {
    const { admin, logout } = adminAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <>
            <div className="lg:hidden h-14 flex items-center justify-between px-4 border-b bg-slate-900 text-white fixed top-0 left-0 right-0 z-50">
                <h1 className="text-lg font-semibold">Admin Panel</h1>
                <button onClick={() => setOpen(true)}>
                    <FiMenu size={22} />
                </button>
            </div>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-100
                    flex flex-col z-50 transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                    <h1 className="text-xl font-semibold">Admin Panel</h1>
                    <button className="lg:hidden" onClick={() => setOpen(false)}>
                        <FiX size={22} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {["superadmin", "admin"].includes(admin?.role) && (
                        <>
                            <SidebarItem label="Admin Dashboard" to="/admin-dashboard" onClick={() => setOpen(false)} />
                            <SidebarItem label="Admin Approvals" to="/admin/approvals" onClick={() => setOpen(false)} />
                        </>
                    )}

                    <SidebarItem label="Dashboard" to="/dashboard" onClick={() => setOpen(false)} />
                    <SidebarItem label="Home" to="/home" onClick={() => setOpen(false)} />
                    <SidebarItem label="News" to="/admin/news" onClick={() => setOpen(false)} />
                    <SidebarItem label="Services" to="/admin/services" onClick={() => setOpen(false)} />
                    <SidebarItem label="Case Study" to="/admin/case-studies" onClick={() => setOpen(false)} />
                    <SidebarItem label="Faqs" to="/admin/faqs" onClick={() => setOpen(false)} />
                    <SidebarItem label="Settings" to="/admin/settings" onClick={() => setOpen(false)} />
                </nav>

                <div className="border-t border-slate-800 p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-sm font-semibold text-white ring-2 ring-slate-800">
                                {admin?.name?.charAt(0)}
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-slate-900"></span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center mb-2 gap-2">
                                <p className="text-md font-semibold text-white truncate">
                                    {admin?.name}
                                </p>
                                <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 ring-1 ring-slate-700">
                                    {admin?.role}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 truncate">
                                {admin?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex cursor-pointer justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl bg-slate-800/80 text-slate-200 hover:bg-red-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                    >
                        Logout
                    </button>
                </div>
            </aside>
        </>
    )
}

const SidebarItem = ({ label, to, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition
            ${isActive
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
        }
    >
        {label}
    </NavLink>
)

export default Sidebar
