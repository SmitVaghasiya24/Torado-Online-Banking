import { adminAuth } from "@/context/AdminContext";

function Dashboard() {
    const { admin } = adminAuth();

    const toggleTheme = () => {
        const html = document.documentElement;
        const isDark = html.classList.contains("dark");

        if (isDark) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    return (
        <div className="space-y-10  ">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl mt-0 sm:mt-12 lg:mt-0 font-semibold text-slate-900 dark:text-slate-700">
                        Dashboard
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Welcome back, {admin?.name}
                    </p>
                </div>

                <button
                    onClick={toggleTheme}
                    className="self-start mt-0 sm:mt-12 lg:mt-0 sm:self-auto px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 hover:opacity-90 transition"

                >
                    Toggle Theme
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm max-w-xl">


                <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-slate-800 to-slate-600 dark:from-slate-700 dark:to-slate-500 flex items-center justify-center text-white text-xl font-semibold shrink-0">

                        {admin?.name?.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xl font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {admin?.name}
                        </p>

                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
                            {admin?.email}
                        </p>

                        <span className="inline-flex mt-3 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700">

                            {admin?.role}
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
