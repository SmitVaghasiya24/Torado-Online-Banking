import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contact from "./Contact";

function Newsaside() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        fetchCategories(controller.signal);

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
                                navigate(`/news?category=${cat.slug}`)
                            }
                            className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
                        >
                            <span className="w-2 h-2 bg-[#000080] rounded-full"></span>
                            {cat.name}
                        </li>
                    ))}
                </ul>
            </div>

            <Contact />
        </div>
    );
}

export default Newsaside;
