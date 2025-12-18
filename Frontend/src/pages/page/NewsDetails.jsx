import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import Newsaside from "../../components/Newsaside";

function NewsDetails() {
    const { slug } = useParams();

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        fetchNewsDetails(controller.signal);

        return () => controller.abort();
    }, [slug]);

    const fetchNewsDetails = async (signal) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/api/admin/get_news/slug/${slug}`,
                { signal }
            );

            if (res.data.success) {
                setNews(res.data.data);
            }
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    if (loading) {
        return (
            <section className="container mx-auto py-20 text-center">
                Loading news details...
            </section>
        );
    }

    if (!news) {
        return (
            <section className="container mx-auto py-20 text-center">
                News not found.
            </section>
        );
    }

    return (
        <div>
            <BreadcrumbHero
                title="News details"
                image="/Breadcrumb/news.webp"
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    <aside className="lg:col-span-4">
                        <Newsaside />
                    </aside>

                    <div className="lg:col-span-8  border-gray-200 rounded-4xl ">

                        {news.thumbnail && (
                            <div className="relative mb-8">
                                <img
                                    src={news.thumbnail}
                                    alt={news.title}
                                    className="w-full rounded-2xl object-cover"
                                />
                                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded">
                                    {formatDate(news.published_date)}
                                </span>
                            </div>
                        )}

                        <div className="p-5 border">
                            <p className="text-sm text-gray-600 mb-4">
                                <span className="text-red-600 font-medium">
                                    By:
                                </span>{" "}
                                {news.author}
                                <span className="mx-2">|</span>
                                <span className="text-red-600">
                                    ({news.comments_count || 0})
                                </span>{" "}
                                Comment
                            </p>

                            <h1 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
                                {news.title}
                            </h1>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
}

export default NewsDetails;
