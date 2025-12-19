import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

function LatestNews() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/admin/get_news"
                );
                if (res.data?.data) {
                    setNews(res.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchNews();
    }, []);

    return (
        <section className="relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

                <div className=" bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
                    <div className="wrapper relative flex items-center px-6 sm:px-26 py-45">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <div className="w-96 h-96 bg-white rotate-45"></div>
                        </div>

                        <div className=" relative max-w-lg">
                            <h2 className="text-4xl font-semibold leading-tight mb-6">
                                Latest IRA <br /> banking news
                            </h2>

                            <p className="text-sm max-w-sm leading-relaxed text-gray-200 mb-8">
                                Pharetra at quis et consectetur in dignissim ornare et.
                                Ultrices faucibus aliquam at imperdiet gravida tincidunt
                                pulvinar pretium.
                            </p>

                        </div>
                    </div>
                </div>

                <div className=" px-6 sm:px-12 py-16 relative z-10 lg:-ml-52 rounded-2xl shadow-xl">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                        }}
                    >
                        {news.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    onClick={() =>
                                        navigate(`/pages/news/${item.slug}`)
                                    }
                                    className="cursor-pointer bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition"
                                >
                                    <div className="relative">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-64 object-cover"
                                            loading="lazy"
                                        />

                                        <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded">
                                            {new Date(
                                                item.published_date
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <div className="p-6">
                                        <p className="text-sm text-gray-500 mb-2">
                                            By: {item.author} | (
                                            {item.comments_count}) Comment
                                        </p>

                                        <h3 className="text-xl font-semibold mb-6 leading-snug">
                                            {item.title}
                                        </h3>

                                        <span className="inline-flex items-center gap-2 text-sm font-medium">
                                            Read More →
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default LatestNews;
