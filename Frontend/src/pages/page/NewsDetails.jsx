import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import Newsaside from "../../components/Newsaside";

function NewsDetails() {
    const { slug } = useParams();

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState({
        type: "",
        text: ""
    });


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        website: "",
        comment: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setFormMessage({ type: "", text: "" });

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/add_comment",
                {
                    news_id: news.id,
                    ...formData
                },
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ""
                    }
                }
            );

            if (res.data.success) {
                setFormMessage({
                    type: "success",
                    text: "Your comment has been submitted."
                });

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    website: "",
                    comment: ""
                });

                fetchComments(news.id);

                setTimeout(() => {
                    setFormMessage({ type: "", text: "" });
                }, 5000);
            }
        } catch (error) {
            console.error("Submit comment error:", error);

            setFormMessage({
                type: "error",
                text: "Failed to submit comment. Please try again."
            });

            setTimeout(() => {
                setFormMessage({ type: "", text: "" });
            }, 5000);
        } finally {
            setSubmitting(false);
        }
    };



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

    const fetchComments = async (newsId, signal) => {
        try {
            setCommentsLoading(true);

            const res = await axios.get(
                `http://localhost:5000/api/comments/${newsId}`,
                { signal }
            );

            if (res.data.success) {
                setComments(res.data.data);
            }
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error("Fetch comments error:", err);
            }
        } finally {
            setCommentsLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        fetchNewsDetails(controller.signal);

        return () => controller.abort();
    }, [slug]);

    useEffect(() => {
        if (!news?.id) return;

        const controller = new AbortController();
        fetchComments(news.id, controller.signal);

        return () => controller.abort();
    }, [news?.id]);



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
                        <Newsaside
                            currentId={news?.id}
                            newsList={[]}
                        />

                    </aside>

                    <div className="lg:col-span-8">

                        <div className="border border-gray-200 rounded-4xl overflow-hidden">

                            {news.thumbnail && (
                                <div className="relative">
                                    <img
                                        src={news.thumbnail}
                                        alt={news.title}
                                        className="w-full object-cover"
                                    />
                                    <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded">
                                        {formatDate(news.published_date)}
                                    </span>
                                </div>
                            )}

                            <div className="p-6 sm:p-8">
                                <p className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-2">
                                    <span className="text-red-600 font-medium">By:</span>
                                    <span>{news.author}</span>
                                </p>

                                <h1 className="text-3xl sm:text-4xl font-semibold mb-8 leading-tight text-gray-900">
                                    {news.title}
                                </h1>

                                <div className="space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">

                                    <p>
                                        In today's digital age, online banking has become an essential part
                                        of managing our financial lives. With the convenience and
                                        accessibility it offers, online banking is particularly valuable
                                        for credit card and banking activities.
                                    </p>

                                    <p>
                                        Whether you're a beginner or looking to enhance your online banking
                                        experience, this guide will provide valuable insights and tips to
                                        help you navigate the world of digital finance.
                                    </p>

                                    <h2 className="text-2xl font-semibold text-gray-900 mt-10">
                                        Understanding online banking
                                    </h2>

                                    <p>
                                        Consectetur quis accumsan in sit volutpat sollicitudin facilisis.
                                        Vitae lectus at pharetra eu congue. Suscipit at sit mi neque
                                        malesuada blandit nunc ultrices quam.
                                    </p>

                                    <p>
                                        Tristique orci velit consectetur est. Etiam nullam facilisis placerat massa sed a. Faucibus amet morbi adipiscing cursus etiam sed. In vel tortor sit fusce viverra aliquam. Lectus dignissim mauris libero risus nam lacus lectus. Tellus egestas bibendum dolor turpis id sagittis odio risus. Ornare sed convallis morbi in. Pellentesque congue consectetur massa bibendum varius magna at. Semper erat non amet elit pulvinar.
                                    </p>

                                    <h2 className="text-2xl font-semibold text-gray-900 mt-10">
                                        Traditional banking services online
                                    </h2>

                                    <p>Consectetur quis accumsan in sit volutpat sollicitudin facilisis. Vitae lectus at pharetra eu congue. Suscipit at sit mi neque malesuada blandit nunc ultrices quam. Tristique orci velit consectetur est. Etiam nullam facilisis placerat massa sed a. Faucibus amet morbi adipiscing cursus etiam sed. In vel tortor sit fusce viverra aliquam. Lectus dignissim mauris libero risus nam lacus lectus. Tellus egestas bibendum dolor turpis id sagittis odio risus. Ornare sed convallis morbi in. Pellentesque congue consectetur massa bibendum varius magna at. Semper erat non amet elit pulvinar.</p>


                                    <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border-l-4 border-red-600">
                                        <p className="text-lg sm:text-xl text-gray-900 leading-relaxed font-medium">
                                            “Words which don’t look even slightly believable. If you are going to
                                            use a passage of Lorem Ipsum, you need to be sure there isn’t anything
                                            embarrassing hidden in the middle”
                                        </p>
                                    </div>

                                    <h2 className="text-2xl font-semibold text-gray-900 mt-10">
                                        Online security and fraud prevention
                                    </h2>

                                    <p>Consectetur quis accumsan in sit volutpat sollicitudin facilisis. Vitae lectus at pharetra eu congue. Suscipit at sit mi neque malesuada blandit nunc ultrices quam. Tristique orci velit consectetur est. Etiam nullam facilisis placerat massa sed a. Faucibus amet morbi adipiscing cursus etiam sed.</p>

                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>In vel tortor sit fusce viverra aliquam.</li>
                                        <li>Lectus dignissim mauris libero risus nam lacus lectus.</li>
                                        <li>Tellus egestas bibendum dolor turpis id sagittis odio risus.</li>
                                        <li>Pellentesque congue consectetur massa bibendum varius magna at.</li>
                                        <li>Semper erat non amet elit pulvinar.</li>
                                    </ul>

                                    <h2 className="text-2xl font-semibold text-gray-900 mt-10">Conclusion</h2>

                                    <p>Online banking has revolutionized how we manage our credit cards and traditional banking services. By leveraging the power of digital technology, we can conveniently and securely handle our financial transactions from anywhere at any time. By following the insights and tips provided in this guide, you'll be well-equipped to make the most of online banking for credit cards and banking services, ensuring a seamless and efficient financial management experience in the digital realm.</p>


                                    <div className="flex flex-col border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between gap-6">

                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-semibold text-gray-900">
                                                Tags :
                                            </span>

                                            {news.tags && news.tags.length > 0 ? (
                                                news.tags.map((tag) => (
                                                    <span
                                                        key={tag.tag_id}
                                                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition"
                                                    >
                                                        {tag.tag_name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-sm text-gray-500">
                                                    No tags
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-gray-900">
                                                Share :
                                            </span>

                                            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                                                f
                                            </button>
                                            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                                                t
                                            </button>
                                            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                                                in
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-16">
                            <h3 className="text-2xl font-semibold mb-6">
                                {comments.length} Comments
                            </h3>

                            {commentsLoading ? (
                                <p className="text-gray-500">Loading comments...</p>
                            ) : comments.length === 0 ? (
                                <p className="text-gray-500">No comments yet.</p>
                            ) : (
                                <div className="space-y-6">
                                    {comments.map((c) => (
                                        <div
                                            key={c.id}
                                            className="border border-gray-200 rounded-xl p-5"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-semibold text-gray-900">
                                                    {c.name}
                                                </p>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(c.created_at)}
                                                </span>
                                            </div>

                                            <p className="text-gray-700 leading-relaxed">
                                                {c.comment}
                                            </p>

                                            {c.website && (
                                                <a
                                                    href={c.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-red-600 mt-2 inline-block"
                                                >
                                                    Visit website
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-20">
                            <h3 className="text-3xl font-semibold mb-2">Leave A Comment</h3>
                            <p className="text-gray-500 mb-8">
                                Your email address will not be published. Required fields are marked.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-red-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-red-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-red-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Website</label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-red-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Your Comment *
                                    </label>
                                    <textarea
                                        name="comment"
                                        rows="6"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-red-600"
                                    />
                                </div>

                                {formMessage.text && (
                                    <div
                                        className={` text-sm rounded-md py-1
                                                ${formMessage.type === "success"
                                                ? " text-green-700 "
                                                : " text-red-700 "
                                            }
                                                `}
                                    >
                                        {formMessage.text}
                                    </div>
                                )}


                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="relative overflow-hidden px-8 py-3 rounded-md text-white bg-red-600 disabled:opacity-60 group"
                                >
                                    <span className="absolute inset-0 bg-[#000080] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>

                                    <span className="relative z-10">
                                        {submitting ? "Posting..." : "Post A Comment"}
                                    </span>
                                </button>

                            </form>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}

export default NewsDetails;