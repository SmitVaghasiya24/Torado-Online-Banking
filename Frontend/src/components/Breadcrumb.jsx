import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbHero({ title, image }) {
    const location = useLocation();
    const pathParts = location.pathname.split("/").filter(Boolean);

    return (
        <div className=" w-full h-[260px] sm:h-80 md:h-[380px] lg:h-[440px] relative mt-[-100px] overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-r from-[#dce7ff] to-[#E1E5F9] z-0"></div>

            <div className=" absolute left-0 top-0 h-full w-full md:w-[60%] flex items-center px-4 sm:px-8 md:pl-14 lg:pl-28 z-30 ">
                <div>
                    <h1 className=" text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
                        {title}
                    </h1>

                    <nav className=" flex flex-wrap items-center gap-x-2 gap-y-1  text-gray-700 text-xs sm:text-sm md:text-base">
                        <Link
                            to="/"
                            className="relative z-40 hover:text-blue-600 cursor-pointer"
                        >
                            Home
                        </Link>


                        {pathParts.map((part, index) => {
                            const path = "/" + pathParts.slice(0, index + 1).join("/");
                            const formatted =
                                part.charAt(0).toUpperCase() +
                                part.slice(1).replace("-", " ");

                            return (
                                <span key={path} className="flex items-center gap-2">
                                    <span className="text-gray-400">|</span>
                                    <Link
                                        to={path}
                                        className={
                                            index === pathParts.length - 1
                                                ? "font-semibold text-blue-700"
                                                : "hover:text-blue-600"
                                        }
                                    >
                                        {formatted}
                                    </Link>
                                </span>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className=" absolute right-6 sm:right-10 lg:right-20 top-20 sm:top-[90px] md:top-[100px] h-[180px] sm:h-[220px] md:h-[280px] lg:h-[340px] hidden md:block z-2 ">
                <img
                    src={image}
                    alt="hero"
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="absolute inset-0 bg-white/10 z-10"></div>
        </div>
    );
}
