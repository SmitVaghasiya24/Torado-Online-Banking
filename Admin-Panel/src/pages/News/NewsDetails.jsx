import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

function NewsDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/admin/get_news/slug/${slug}`
                );

                if (res.data.success) {
                    setNews(res.data.data);
                }
            } catch (error) {
                console.error("Fetch news error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [slug]);

    if (loading) {
        return <div className="p-6 text-gray-500">Loading news...</div>;
    }

    if (!news) {
        return (
            <div className="p-6">
                <p className="text-gray-600">News not found</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-blue-600 cursor-pointer underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm cursor-pointer bg-black text-white px-4 py-2 rounded"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        {news.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Slug: {news.slug}
                    </p>
                </div>

                <span
                    className={`self-start px-4 py-1.5 rounded-full text-sm font-medium ${news.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {news.status}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">
                {news.thumbnail && (
                    <div className="inline-flex border border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
                        <img
                            src={news.thumbnail}
                            alt={news.title}
                            className="h-40 sm:56 object-contain"
                        />
                    </div>
                )}

                <div className="flex-1 w-full flex justify-center">
                    <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                        <InfoCard
                            label="Author"
                            value={news.author}
                            icon={<User size={16} />}
                        />
                        <InfoCard
                            label="Published Date"
                            value={news.published_date}
                            icon={<Calendar size={16} />}
                        />
                    </div>
                </div>

            </div>


            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Short Description</h2>
                <p className="text-gray-700">{news.short_description}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Content</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {news.content}
                </p>
            </div>

            {Array.isArray(news.tags) && news.tags.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-3">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {news.tags.map(tag => (
                            <span
                                key={tag.tag_id}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                            >
                                <Tag size={14} />
                                {tag.tag_name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DateCard label="Created At" date={news.created_at} />
                <UserCard label="Created By" value={`Admin #${news.created_by}`} />
                <DateCard label="Updated At" date={news.updated_at} />
                <UserCard label="Updated By" value={`Admin #${news.updated_by}`} />
            </div>
        </div>
    );
}

function InfoCard({ label, value, icon }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                {icon}
                <span>{label}</span>
            </div>
            <p className="font-medium text-gray-900">{value || "-"}</p>
        </div>
    );
}

function DateCard({ label, date }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar size={16} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-900">
                    {new Date(date).toLocaleString()}
                </p>
            </div>
        </div>
    );
}

function UserCard({ label, value }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="font-medium text-gray-900">{value || "-"}</p>
        </div>
    );
}

export default NewsDetails;
