import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BreadcrumbHero from "../../components/Breadcrumb";
import Contact from "../../components/Contact";
import Newsaside from "../../components/Newsaside";

function News() {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        fetchNews(page, controller.signal);

        return () => controller.abort();
    }, [page]);

    const fetchNews = async (pageNumber, signal) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:5000/api/admin/get_news?page=${pageNumber}&limit=6`,
                { signal }
            );

            if (res.data.success) {
                setNews(res.data.data);
                setTotalPages(res.data.totalPages);
            }
        } catch (err) {
            if (err.name !== "CanceledError") console.error(err);
        } finally {
            setLoading(false);
        }
    };



    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div>
            <BreadcrumbHero title="News" image="/Breadcrumb/news.webp" />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* <aside className="lg:col-span-4">

                        <Newsaside />
                    </aside> */}

                    <div className="lg:col-span-12">
                        {loading ? (
                            <p className="text-center">Loading news...</p>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    {news.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border rounded-2xl overflow-hidden bg-white
                                            transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-full h-56 object-cover"
                                                    loading="lazy"
                                                />
                                                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded">
                                                    {formatDate(item.published_date)}
                                                </span>
                                            </div>

                                            <div className="p-6">
                                                <p className="text-sm mb-3">
                                                    <span className="text-red-600">
                                                        By:
                                                    </span>{" "}
                                                    {item.author}{" "}
                                                    <span className="mx-1">|</span>
                                                    <span className="text-red-600">
                                                        ({item.comments_count})
                                                    </span>{" "}
                                                    Comment
                                                </p>

                                                <h3 className="text-xl font-semibold mb-4 leading-snug">
                                                    {item.title}
                                                </h3>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/pages/news/${item.slug}`)
                                                    }
                                                    className="flex items-center gap-1 font-medium hover:text-red-600
                                                    relative after:absolute after:left-0 after:bottom-0
                                                    after:h-0.5 after:w-full after:bg-red-600
                                                    after:scale-x-0 after:origin-right
                                                    after:transition-transform after:duration-300
                                                    hover:after:scale-x-100 hover:after:origin-left"
                                                >
                                                    Read More →
                                                </button>
                                            </div>
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
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default News;
