import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contact from "./Contact";

function Newsaside({ currentId }) {
    const [categories, setCategories] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);


    useEffect(() => {
        const controller = new AbortController();
        fetchCategories(controller.signal);
        fetchNews(controller.signal);
        fetchTags(controller.signal);

        return () => controller.abort();
    }, []);


    const fetchCategories = async (signal) => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_category",
                { signal }
            );

            if (res.data.success) {
                setCategories(res.data.data);
            }
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error(err);
            }
        }
    };

    const fetchTags = async (signal) => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_tag",
                { signal }
            );

            if (res.data.success) {
                setTags(res.data.data);
            }
        } catch (err) {
            console.error("Fetch tags error:", err);
        }
    };


    const fetchNews = async (signal) => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_news?limit=5",
                { signal }
            );

            if (res.data.success) {
                setNewsList(res.data.data);
            }
        } catch (err) {
            console.error("Fetch news error:", err);
        }
    };

    const filteredNews = currentId
        ? newsList.filter(item => item.id !== currentId)
        : newsList;

    return (
        <div className="space-y-8">

            <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold mb-4">
                    Post Categories
                </h4>

                <ul className="space-y-3">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            onClick={() =>
                                navigate(`/pages/news`)
                            }
                            className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
                        >
                            <span className="w-2 h-2 bg-[#000080] rounded-full"></span>
                            {cat.name}
                        </li>
                    ))}
                </ul>
            </div>

            {filteredNews.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold mb-6">
                        Related news
                    </h4>

                    <div className="space-y-6">
                        {filteredNews.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/pages/news/${item.slug}`)}
                                className="flex gap-4 cursor-pointer group pb-6 border-b last:border-b-0"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                                />

                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-1">
                                        <span className="text-red-600 font-medium">
                                            By:
                                        </span>{" "}
                                        Admin
                                        <span className="mx-2">|</span>
                                        {new Date(item.published_date).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>

                                    <h5 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-red-600 transition">
                                        {item.title}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {tags.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold mb-4">
                        Tags
                    </h4>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => navigate(`/pages/news`)}
                                className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-red-600 hover:text-white transition"
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <Contact />
        </div>
    );
}

export default Newsaside;
