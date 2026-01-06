import { adminAuth } from "@/context/AdminContext";

function Dashboard() {
    const { admin } = adminAuth();

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Dashboard
                    </h1>
                    <p className="text-sm text-slate-500">
                        Welcome back, {admin?.name}
                    </p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-slate-800 to-slate-600 flex items-center justify-center text-white text-xl font-semibold shrink-0">
                        {admin?.name?.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xl font-semibold text-slate-900 truncate">
                            {admin?.name}
                        </p>

                        <p className="text-sm text-slate-500 truncate mt-1">
                            {admin?.email}
                        </p>

                        <span className="inline-flex mt-3 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200">
                            {admin?.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
