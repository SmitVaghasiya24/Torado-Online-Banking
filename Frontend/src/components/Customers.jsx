import FolderCard from "./FolderCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        name: "Lisa Hannigan",
        role: "William Kimbrough",
        image: "/page/about/client-1.webp",
        text:
            "Auctor duis ipsum non nibh aenean dui. Pharetra at quis et consectetur in dignissim ornare et.",
    },
    {
        name: "Tresa Petway",
        role: "Happy Client",
        image: "/page/about/client-2.webp",
        text:
            "Auctor duis ipsum non nibh aenean dui. Pharetra at quis et consectetur in dignissim ornare et.",
    },
    {
        name: "Leslie Curny",
        role: "Happy Client",
        image: "/page/about/client-3.webp",
        text:
            "Ultrices faucibus aliquam at imperdiet gravida tincidunt pulvinar pretium.",
    },
    {
        name: "Emma Watson",
        role: "Happy Client",
        image: "/page/about/client-4.webp",
        text:
            "Ultrices faucibus aliquam at imperdiet gravida tincidunt pulvinar pretium.",
    },
    {
        name: "Tom Hanks",
        role: "Happy Client",
        image: "/page/about/client-5.webp",
        text:
            "Ultrices faucibus aliquam at imperdiet gravida tincidunt pulvinar pretium.",
    },
];
function Customers() {
    return (
        <div> <div className="container lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-semibold max-w-xl leading-tight px-4">
                    What our customers say about Personal loan
                </h2>

                <div className="testimonial-pagination px-4 md:px-0"></div>
            </div>

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                loop
                speed={700}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    el: ".testimonial-pagination",
                    clickable: true,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.pagination.el = ".testimonial-pagination";
                }}
                breakpoints={{ 768: { slidesPerView: 3 } }}
            >
                {testimonials.map((t, i) => (
                    <SwiperSlide key={i}>
                        <FolderCard
                            bgColor="white"
                            borderColor="#e5e7eb"
                            className="rounded-2xl p-6 h-80 sm:h-[265px]"
                        >
                            <div className="flex flex-col h-full">
                                <div>
                                    <div className="flex items-center gap-4 mt-4 md:mt-0 mb-4">
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">{t.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {t.role}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed line-clamp-4">
                                        “{t.text}”
                                    </p>
                                </div>

                                <div className="text-yellow-400 mt-auto">
                                    ★★★★★
                                </div>
                            </div>
                        </FolderCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div></div>
    )
}

export default Customers