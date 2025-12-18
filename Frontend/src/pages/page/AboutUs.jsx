import BreadcrumbHero from "../../components/Breadcrumb";
import Subscribe from "../../components/Subscriber";
import { useEffect, useState } from "react";
import axios from "axios";
import FolderCard from "../../components/FolderCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Download from "../../components/Download";

import "swiper/css";
import "swiper/css/pagination";
import StatsCounter from "../../components/Customer";

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

function AboutUs() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/get_management"
            );

            if (res.data.success) {
                setMembers(res.data.members);
            }
        } catch (error) {
            console.error("Error fetching management team:", error);
        } finally {
            setLoading(false);
        }
    };

    const ceo = members.find((member) => member.id === 1);

    if (loading) {
        return (
            <section className="container mx-auto px-4 py-20 text-center">
                Loading...
            </section>
        );
    }

    return (
        <div>
            <BreadcrumbHero title="About us" image="/Breadcrumb/about.webp" />

            <section className="container mx-auto px-4 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src="/page/img-1.webp"
                        alt="Who we are"
                        className="w-full h-full object-cover"
                    />

                    <div className="bg-gradient-to-br from-[#02006b] via-[#1a056e] to-[#3b0a75] text-white px-8 sm:px-12 lg:px-16 py-12 lg:py-16 flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                            Who We Are
                        </h2>

                        <p className="text-gray-200 leading-relaxed mb-10 max-w-xl">
                            Welcome to <span className="font-medium">Torado</span>, a secure and
                            user-friendly online banking platform designed to manage your
                            finances with ease.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
                            {ceo && (
                                <div className="flex items-center gap-4">
                                    <img
                                        src={ceo.image}
                                        alt={ceo.name}
                                        className="w-14 h-14 rounded-full border-2 border-white object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {ceo.name.trim()}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            {ceo.position}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-gray-300">
                                    Call our consultant
                                </p>
                                <a
                                    href="tel:+18787539922"
                                    className="text-lg font-semibold text-red-400 hover:underline"
                                >
                                    +1 (878)-753-9922
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {["Our mission", "Our vision"].map((title, i) => (
                        <div key={i} className="bg-gray-50 rounded-3xl p-8 sm:p-10">
                            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                                {title}
                            </h2>
                            <p className="font-medium text-gray-900 mb-6">
                                A et auctor id scelerisque semper. Suspendisse ullamcorper quis
                                sapien elementum dui mattis pellentesque laoreet.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Laculis ultrices egestas purus eget facilisis justo dignissim.
                                Eget morbi condimentum lobortis in vulputate consequat.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center mb-8">
                            <h2 className="text-3xl sm:text-4xl font-semibold max-w-xl leading-tight">
                                What our customers <br /> say about us
                            </h2>

                            <div className="testimonial-pagination"></div>
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
                            breakpoints={{ 768: { slidesPerView: 2 } }}
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
                    </div>

                    <div className="lg:sticky lg:top-24">
                        <StatsCounter />
                    </div>
                </div>
            </section>

            <Subscribe />

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-14">
                    Management team
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members
                        .filter((member) => member.id !== 1)
                        .map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-2xl p-5"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-56 object-cover rounded-xl mb-5"
                                />

                                <h4 className="text-lg font-semibold">
                                    {member.name.trim()}
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                    {member.position}
                                </p>
                            </div>
                        ))}
                </div>
            </section>

            <Download />
        </div>
    );
}

export default AboutUs;
