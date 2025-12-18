import { useEffect, useState } from "react";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";

function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        fetchServices(page, controller.signal);

        return () => {
            controller.abort();
        };
    }, [page]);

    const fetchServices = async (pageNumber = 1, signal) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/api/admin/get_service?page=${pageNumber}&limit=6`,
                { signal }
            );

            if (res.data.success) {
                setServices(res.data.data);
                setTotalPages(res.data.totalPages);
            }
        } catch (error) {
            if (error.name === "CanceledError") return;
            console.error(error);
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }

    };


    if (loading) {
        return (
            <section className="container mx-auto px-4 py-20 text-center">
                Loading services...
            </section>
        );
    }

    return (
        <div>
            <BreadcrumbHero
                title="Services"
                image="/Breadcrumb/service.webp"
            />

            <section className="container mx-auto px-4 py-20">
                <div className="max-w-5xl mb-14">
                    <h2 className="text-xl text-[#86AA42] sm:text-2xl font-semibold mb-4">
                        Services
                    </h2>

                    <p className="text-4xl">
                        <span className="text-black">
                            Sustainable and Green Finance providers offer
                        </span>{" "}
                        <span className="text-gray-600">
                            a range of services designed to align financial activities with
                            environmental sustainability goals.
                        </span>
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="
                    bg-gray-50 rounded-2xl p-5
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-none
                "
                        >
                            <img
                                src={service.thumbnail}
                                alt={service.title}
                                className="w-full h-48 object-cover rounded-xl mb-5"
                                loading="lazy"
                            />

                            <h4 className="text-lg font-semibold hover:text-[#86AA42] cursor-pointer mb-2">
                                {service.title}
                            </h4>

                            <button
                                onClick={() => navigate(`/pages/services/${service.slug}`)}
                                className="
                        relative text-md font-medium flex items-center gap-1
                        text-black hover:text-red-600
                        after:absolute after:left-0 after:bottom-0
                        after:h-0.5 after:w-full after:bg-red-600
                        after:scale-x-0 after:origin-right
                        after:transition-transform after:duration-300
                        hover:after:scale-x-100 hover:after:origin-left
                    "
                            >
                                Learn More →
                            </button>
                        </div>
                    ))}
                </div>

                {totalPages >= 1 && (
                    <div className="flex justify-center items-center gap-2 mt-16">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="w-8 h-8 border rounded flex items-center justify-center disabled:opacity-40"
                        >
                            ‹
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`w-8 h-8 rounded ${page === i + 1
                                    ? "bg-red-600 text-white"
                                    : "border"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="w-8 h-8 border rounded flex items-center justify-center disabled:opacity-40"
                        >
                            ›
                        </button>
                    </div>
                )}
            </section>

        </div>
    );
}

export default Services;
