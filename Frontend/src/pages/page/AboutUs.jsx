import BreadcrumbHero from "../../components/Breadcrumb";
import Subscribe from "../../components/Subscriber";
import FolderCard from "../../components/FolderCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        name: "Lisa Hannigan",
        role: "Happy Client",
        image: "/page/about/client-1.webp",
        text:
            "Auctor duis ipsum non nibh aenean dui. Pharetra at quis et consectetur in dignissim ornare et.",
    },
    {
        name: "Tom Hanks",
        role: "Happy Client",
        image: "/page/about/client-2.webp",
        text:
            "Auctor duis ipsum non nibh aenean dui. Pharetra at quis et consectetur in dignissim ornare et.",
    },
    {
        name: "Emma Watson",
        role: "Happy Client",
        image: "/page/about/client-3.webp",
        text:
            "Ultrices faucibus aliquam at imperdiet gravida tincidunt pulvinar pretium.",
    },
];

const stats = [
    { bg: "bg-indigo-200", value: "800K+", label: "Happy Customers" },
    { bg: "bg-[#d8c2ad]", value: "25+", label: "Years in banking" },
    { bg: "bg-teal-200", value: "150+", label: "Branches" },
];


function AboutUs() {
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
                            <div className="flex items-center gap-4">
                                <img
                                    src="/ceo.webp"
                                    alt="CEO"
                                    className="w-14 h-14 rounded-full border-2 border-white object-cover"
                                />
                                <div>
                                    <p className="font-semibold">Christopher Propst</p>
                                    <p className="text-sm text-gray-300">
                                        Chief Executive Officer
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-300">Call our consultant</p>
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

            <section className="container mx-auto px-4 py-20 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
                            Easy online banking
                        </h2>

                        <p className="text-gray-600 mb-10 max-w-xl">
                            Easy online banking refers to the convenience and user-friendly
                            nature of banking services.
                        </p>

                        {[
                            "User-friendly interface",
                            "Account management",
                            "Mobile banking apps",
                            "Enhanced security features",
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex gap-6 mb-6">
                                    <span className="text-red-500 font-semibold text-lg">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-1">{item}</h4>
                                        <p className="text-gray-600">
                                            Start by getting pre-approved and managing your finances
                                            easily.
                                        </p>
                                    </div>
                                </div>
                                {i !== 3 && <hr className="border-gray-200 mb-6" />}
                            </div>
                        ))}
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <img
                            src="/page/img-1.webp"
                            alt=""
                            className="w-[90%] lg:w-[78%] rounded-3xl shadow-lg"
                        />
                        <img
                            src="/page/img-2.webp"
                            alt=""
                            className="absolute bottom-[-80px] lg:bottom-[-100px] left-1/2 lg:left-auto lg:right-36 -translate-x-1/2 lg:translate-x-0 w-[75%] lg:w-[60%] rounded-3xl shadow-xl border-4 border-white"
                        />
                    </div>
                </div>
            </section>

            <Subscribe />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-10">
                            What our customers <br /> say about us
                        </h2>

                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            breakpoints={{ 768: { slidesPerView: 2 } }}
                        >
                            {testimonials.map((t, i) => (
                                <SwiperSlide key={i}>
                                    <FolderCard className="bg-white rounded-2xl p-6  h-[280px]">
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={t.image}
                                                alt={t.name}
                                                className="w-14 h-14 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">{t.name}</p>
                                                <p className="text-sm text-gray-500">{t.role}</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-6">“{t.text}”</p>
                                        <div className="text-yellow-400">★★★★★</div>
                                    </FolderCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="space-y-6">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className={`${s.bg} rounded-2xl p-6 text-center`}
                            >
                                <p className="text-3xl font-semibold">{s.value}</p>
                                <p className="text-gray-700">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
