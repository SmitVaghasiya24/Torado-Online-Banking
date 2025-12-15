    import { Link, useLocation } from "react-router-dom";

    export default function BreadcrumbHero({ title, image }) {
        const location = useLocation();
        const pathParts = location.pathname.split("/").filter((part) => part !== "");

        return (
            <div className="w-full h-[450px] relative mt-[-100px] overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-r from-[#dce7ff] to-[#eadaff] z-0"></div>

                <div className="absolute left-0 top-0 h-full w-[55%] flex items-center pl-6 md:pl-16 lg:pl-28 z-30">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>

                        <nav className="flex items-center gap-2 text-gray-700 text-lg">
                            <Link to="/" className="hover:text-blue-600">
                                Home
                            </Link>

                            {pathParts.map((part, index) => {
                                const path = "/" + pathParts.slice(0, index + 1).join("/");
                                const formatted =
                                    part.charAt(0).toUpperCase() + part.slice(1).replace("-", " ");

                                return (
                                    <span key={path} className="flex items-center gap-2">
                                        <span>|</span>
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

                <div className="absolute right-20 top-[100px] h-[350px] hidden md:block z-20">
                    <img
                        src={image}
                        alt="hero"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="absolute inset-0 bg-white/10 z-10"></div>


            </div>
        );
    }
