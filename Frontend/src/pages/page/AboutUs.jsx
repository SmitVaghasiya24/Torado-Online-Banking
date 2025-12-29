import BreadcrumbHero from "../../components/Breadcrumb";
import Subscribe from "../../components/Subscriber";
import { useEffect, useState } from "react";
import axios from "axios";
import Download from "../../components/Download";
import LatestNews from "../../components/LatestNews";
import "swiper/css";
import "swiper/css/pagination";
import OurCustomers from "../../components/OurCustomers";


const steps = [
    {
        no: "01",
        title: "User-friendly interface",
        desc:
            "Start by getting pre-approved for a mortgage, which involves providing the necessary financial information to a lender.",
    },
    {
        no: "02",
        title: "Account management",
        desc:
            "Once you find a suitable lender, you'll complete a mortgage application and provide documents such as proof of income.",
    },
    {
        no: "03",
        title: "Mobile banking Apps",
        desc:
            "The lender will review your application, verify the provided information, and assess your creditworthiness and the property’s value.",
    },
    {
        no: "04",
        title: "Enhanced security features",
        desc:
            "If approved, the lender will provide a mortgage offer outlining the terms, interest rate, loan amount, and any conditions.",
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

            <section className="relative bg-linear-to-br from-gray-50 to-indigo-50 py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight">
                                Easy online banking
                            </h2>

                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                                Easy online banking refers to the convenience and user-friendly nature of
                                banking services accessible through online platforms.
                            </p>


                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-6 pb-6 border-b last:border-b-0 border-gray-200"
                                    >
                                        <span className="text-red-600 text-lg font-semibold">
                                            {step.no}
                                        </span>

                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">
                                                {step.title}
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end mb-16 md:mb-0">
                            <div className="relative w-full max-w-sm sm:max-w-md">

                                <img
                                    src="/page/img-1.webp"
                                    alt=""
                                    className="rounded-2xl shadow-lg w-full"
                                />

                                <img
                                    src="/page/img-2.webp"
                                    alt=""
                                    className="
        rounded-2xl 
        shadow-xl 
        w-4/5 sm:w-5/6
        absolute
        -bottom-20 sm:-bottom-28 md:-bottom-40 lg:-bottom-56
        left-1/2 sm:left-1/6
        -translate-x-1/2
        bg-white 
        border-8 
        border-white
      "
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Subscribe />

            <OurCustomers/>

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

            <LatestNews/>

        </div>
    );
}

export default AboutUs;
