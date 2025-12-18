import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BreadcrumbHero from "../../components/Breadcrumb";

function CaseStudy() {
    const [caseStudies, setCaseStudies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        fetchCaseStudies(page, controller.signal);

        return () => controller.abort();
    }, [page]);

    const fetchCaseStudies = async (pageNo, signal) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/api/admin/get_case_study?page=${pageNo}&limit=8`,
                { signal }
            );

            if (res.data.success) {
                setCaseStudies(res.data.data);
                setTotalPages(res.data.pagination.totalPages);
            }
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error("Case study fetch error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <BreadcrumbHero
                title="Case Studies"
                image="/Breadcrumb/service.webp"
            />

            <section className="container mx-auto px-4 py-20">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold max-w-xl">
                        Some case studies of our amazing projects with our clients
                    </h2>

                    <div className="flex items-center gap-4 bg-green-700 text-white px-6 py-5 rounded-xl w-fit">
                        <img
                            src="/page/about/park.svg"
                            alt=""
                            className="w-12 h-12 sm:w-14 sm:h-14"
                        />

                        <div className="flex flex-col leading-tight">
                            <span className="text-2xl font-semibold">800k+</span>
                            <span className="text-sm">Happy customers</span>
                        </div>
                    </div>
                </div>


                {loading ? (
                    <p className="text-center text-gray-500">
                        Loading case studies...
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {caseStudies.map((item) => (
                            <div
                                key={item.id}
                                onClick={() =>
                                    navigate(`/pages/case-study/${item.slug}`)
                                }
                                className="bg-[#e8efd8] rounded-2xl p-4 cursor-pointer hover:shadow-md transition"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-44 object-cover rounded-xl mb-4"
                                />

                                <h4 className="font-semibold text-2xl text-gray-900 mb-3">
                                    {item.title}
                                </h4>

                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span className="text-2xl">↗</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {totalPages >= 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            ←
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 border rounded
                    ${page === i + 1
                                        ? "bg-red-600 text-white border-red-600"
                                        : ""
                                    }
                `}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            →
                        </button>
                    </div>
                )}

            </section>
        </div>
    );
}

export default CaseStudy;
