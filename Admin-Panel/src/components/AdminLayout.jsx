import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100">

            <Sidebar />

            <main
                className="bg-slate-100 min-h-screen p-4 sm:p-6 pt-20 lg:pt-6 lg:ml-64 transition-al"
            >
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout
