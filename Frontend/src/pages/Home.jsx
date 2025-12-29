import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import HomeLogin from "./HomeLogin";
import FolderCard from "../components/FolderCard";
import { FiCreditCard } from "react-icons/fi";
import { FaUniversity, FaHome, FaHandHoldingUsd } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";
import CreditcardProcess from "../components/CreditcardProcess";
import { FiLock } from "react-icons/fi";
import { HiOutlineAdjustments } from "react-icons/hi";
import { HiCheckCircle } from "react-icons/hi";
import Subscribe from "../components/Subscriber";
import OurCustomers from "../components/OurCustomers";
import Download from "../components/Download";
import LatestNews from "../components/LatestNews";


function Home() {
    const navigate = useNavigate();
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


    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: {
            y: 60,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const sectionVariant = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const cardContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariant = {
        hidden: { opacity: 0, scale: 0.9, y: 40 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };



    return (
        <div>
            <section className="relative overflow-hidden bg-linear-to-br from-[#B5D9FF] via-[#D1C6F0] to-[#FFD8D7] mt-[-100px] pt-28 sm:pt-36 lg:pt-32">
                <div className="container mx-auto px-4 sm:px-8 lg:px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="pb-6 sm:pb-8"
                    >
                        <p className="text-red-500 font-medium mb-4">Online Banking</p>

                        <motion.h1
                            initial={{ y: 120, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl max-w-xl font-bold leading-snug lg:leading-tight mb-6"
                        >
                            Choose the credit{" "}
                            <span className="inline-flex items-center mx-2">
                                <img
                                    src="/home/credit-card.svg"
                                    alt="Credit Card Icon"
                                    className="w-10 h-10 sm:w-14 sm:h-14"
                                />
                            </span>
                            card that makes sense for you
                        </motion.h1>

                        <motion.p
                            initial={{ y: 120, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            className="text-gray-600 max-w-lg mb-8"
                        >
                            Welcome to Torado secure and user-friendly online banking platform,
                            designed to provide convenient access to your financial accounts.
                        </motion.p>

                        <motion.div
                            initial={{ y: 120, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                        >
                            <button
                                onClick={() => navigate("/open-account")}
                                className="relative overflow-hidden inline-flex items-center gap-2 px-9  py-4 rounded-md font-medium text-white bg-red-600 group"
                            >
                                <span className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started <FiArrowRight />
                                </span>
                            </button>

                            <div className="flex items-center gap-6 bg-white h-17 px-6 rounded-full shadow w-fit">
                                <span className="text-2xl font-semibold">4.98</span>

                                <div className="flex flex-col leading-tight sm:leading-snug">
                                    <span className="text-yellow-400 text-base sm:text-lg lg:text-xl">
                                        ★★★★★
                                    </span>
                                    <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-500">
                                        10,000+ Client reviews
                                    </span>
                                </div>

                            </div>

                        </motion.div>

                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-10">
                            {[
                                { img: "home/card-1.webp", title: "Business" },
                                { img: "home/card-2.webp", title: "Travel" },
                                { img: "home/card-3.webp", title: "Cash Back" },
                                { img: "home/card-4.webp", title: "Customized" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 60, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ amount: 0.15, margin: "-100px 0px" }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    className="flex flex-col items-center text-center"
                                >

                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-24 sm:w-28 md:w-32 h-auto mb-3"
                                    />
                                    <h2 className="font-medium text-lg">{item.title}</h2>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 120, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <img
                            src="/home/hero-img.webp"
                            alt="Credit Cards"
                            className="w-full max-w-sm sm:max-w-md lg:max-w-xl mt-8 lg:mt-0 drop-shadow-2xl"
                        />

                        <div
                            className="absolute z-20 w-[320px] sm:w-[460px] max-w-[90vw] left-1/2 -translate-x-1/2 bottom-[20px] lg:left-auto lg:right-12 lg:translate-x-0 lg:bottom-16"
                        >
                            <HomeLogin />
                        </div>
                    </motion.div>

                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl sm:text-5xl font-normal">
                        Choose what’s right for you
                    </h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.25 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {/* card 1 */}
                        <motion.div variants={cardVariants}>
                            <FolderCard
                                bgColor="white"
                                borderColor="#e5e7eb"
                                headerHeight={45}
                                className="relative overflow-hidden pt-6 px-2">

                                <FiCreditCard className="relative z-10 text-4xl mb-6" />

                                <h3 className="relative z-10 text-xl font-semibold mb-3">
                                    Credit Cards
                                </h3>

                                <p className="relative z-10 text-gray-600 text-sm leading-relaxed">
                                    A credit card is a payment card that allows cardholder to borrow funds from a financial institution.
                                </p>

                                <button
                                    onClick={() => navigate("credit-cards-all")}
                                    className="relative cursor-pointer z-10 mt-6 inline-flex items-center gap-2 font-medium group"
                                >
                                    Get Started <FiArrowRight />

                                    <span
                                        className=" absolute left-0 -bottom-0.5 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
                                    ></span>
                                </button>

                            </FolderCard>
                        </motion.div>


                        {/* card 2 */}
                        <motion.div variants={cardVariants}>
                            <FolderCard
                                bgColor="white"
                                borderColor="#e5e7eb"
                                headerHeight={45}
                                className="relative overflow-hidden pt-6 ">
                                <FaUniversity className="text-4xl mb-6" />
                                <h3 className="text-xl font-semibold mb-3">Banking</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Banks play a crucial role in the economy by facilitating financial transactions method.
                                </p>
                                <button
                                    onClick={() => navigate("banking-overview")}
                                    className="relative cursor-pointer z-10 mt-6 inline-flex items-center gap-2 font-medium group"
                                >
                                    Get Started <FiArrowRight />

                                    <span
                                        className=" absolute left-0 -bottom-0.5 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
                                    ></span>
                                </button>

                            </FolderCard>
                        </motion.div>


                        {/* card 3 */}
                        <motion.div variants={cardVariants}>
                            <FolderCard
                                bgColor="white"
                                borderColor="#e5e7eb"
                                headerHeight={45}
                                className="relative overflow-hidden pt-6 ">
                                <FaHome className="text-4xl mb-6" />
                                <h3 className="text-xl font-semibold mb-3">Mortgage</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    A mortgage is a type of loan specifically used for purchasing refinance real estate properties.
                                </p>
                                <button
                                    onClick={() => navigate("mortgage-explore")}
                                    className="relative cursor-pointer z-10 mt-6 inline-flex items-center gap-2 font-medium group"
                                >
                                    Get Started <FiArrowRight />

                                    <span
                                        className=" absolute left-0 -bottom-0.5 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
                                    ></span>
                                </button>
                            </FolderCard>
                        </motion.div>


                        {/* card 4 */}
                        <motion.div variants={cardVariants}>
                            <FolderCard
                                bgColor="white"
                                borderColor="#e5e7eb"
                                headerHeight={45}
                                className="relative overflow-hidden pt-6 ">
                                <FaHandHoldingUsd className="text-4xl mb-6" />
                                <h3 className="text-xl font-semibold mb-3">Personal loan</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    A Personal loan is a type of loan provided by financial institutions, such as banks for personal use.
                                </p>
                                <button
                                    onClick={() => navigate("personal-loan")}
                                    className="relative cursor-pointer z-10 mt-6 inline-flex items-center gap-2 font-medium group"
                                >
                                    Get Started <FiArrowRight />

                                    <span
                                        className=" absolute left-0 -bottom-0.5 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
                                    ></span>
                                </button>
                            </FolderCard>
                        </motion.div>


                    </motion.div>
                </div>
            </section>

            <section className="relative z-10 -mb-56">
                <div className="container mx-auto px-4 pt-10 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-lg">
                        <img
                            src="/Mortgage/bank.jpg"
                            alt="Who we are"
                            className="w-full h-full object-cover"
                        />

                        <div className="bg-gradient-to-br from-[#02006b] via-[#1a056e] to-[#3b0a75] text-white px-8 sm:px-12 lg:px-16 py-12 lg:py-16 flex flex-col justify-center">
                            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                                Who We Are
                            </h2>

                            <p className="text-gray-200 leading-relaxed mb-10 max-w-xl">
                                Welcome to “Torado” secure and user-friendly online banking platform, designed to provide convenient access to your financial accounts, including Credit Cards, Banking, Mortgage, and Personal loans. Manage your finances with ease and enjoy a seamless banking experience from the comfort of your home or on the go.
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
                </div>
            </section>

            <section className="relative bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-24 pt-60">
                <div className="container mx-auto px-4">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-24">

                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl max-w-full sm:max-w-sm font-semibold mb-4 sm:mb-6">
                                    Banking account opening system
                                </h2>

                                <p className="text-sm sm:text-base text-gray-600 max-w-full sm:max-w-lg leading-relaxed">
                                    The process for opening a bank account may vary slightly depending
                                    on the bank and the country you are in. However, the general steps
                                    involved in opening a bank account
                                </p>
                            </div>
                        </motion.div>



                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            className="h-full grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                            {[
                                "Research and choose a bank",
                                "Choose the account type",
                                "Gather required documents",
                                "Sign the agreement",
                                "Complete account opening forms",
                                "Activate and access your account",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-white px-4 py-4 rounded-md shadow-sm"
                                >
                                    <FiCheckCircle className="text-red-600 text-xl shrink-0" />
                                    <span className="text-sm text-gray-700">{item}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        className="flex flex-col lg:flex-row justify-between items-start mb- gap-6">
                        <h2 className="text-5xl">
                            Start banking with ease
                        </h2>

                        <p className="text-gray-600 max-w-md">
                            Start by researching and comparing different credit card options
                            available to find the one that suits your needs.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >

                        {[
                            {
                                img: "/home/card-img-9.webp",
                                title: "Invite friends",
                                desc: "Invite felis vitae egestas nunc enim magna nascetur tellus.",
                            },
                            {
                                img: "/home/card-img-10.webp",
                                title: "Automate bills",
                                desc: "Automate bills felis vitae egestas id sodales nunc enim.",
                            },
                            {
                                img: "/home/card-img-11.webp",
                                title: "Send money to Friends",
                                desc: "Send money enim magna nascetur tellus faucibus.",
                            },
                            {
                                img: "/home/card-img-12.webp",
                                title: "Card management",
                                desc: "Card management enim magna nascetur tellus faucibus.",
                            },
                        ].map((card, index) => (
                            <motion.div key={index} variants={cardVariants}>
                                <FolderCard
                                    bgColor="white"
                                    borderColor="#e5e7eb"
                                    headerHeight={42}
                                    key={index}
                                    className="relative"
                                >

                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className="rounded-xl mt-9 sm:mt-8 md:mt-8 lg:mt-14 xl:mt-6 h-44 sm:h-48 lg:h-52 w-full object-cover"
                                    />

                                    <div className="px-2 pt-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {card.desc}
                                        </p>
                                    </div>
                                </FolderCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            <motion.div
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <CreditcardProcess />
            </motion.div>

            <section className="py-16">
                <div className="container mx-auto px-4">

                    <motion.div
                        variants={cardContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6"
                    >
                        <motion.div variants={cardVariant} className="lg:col-span-1">
                            <h2 className="text-4xl sm:text-5xl font-semibold mb-6">
                                How to choose the right bank
                            </h2>

                            <p className="text-gray-600 max-w-md leading-relaxed">
                                Choosing the right bank account is an important decision that can
                                impact your financial management and banking experience.
                            </p>
                        </motion.div>

                        <motion.div variants={cardVariant} className="bg-[#d6c2af] rounded-2xl p-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-40 h-40 bg-white/30 rotate-45 translate-x-10 -translate-y-10"></div>

                            <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center mb-6">
                                <HiOutlineAdjustments size={32} />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">Flexible terms</h3>

                            <p className="text-gray-700 leading-relaxed">
                                After submitting your application, the credit card issuer will
                                review your application and assess your creditworthiness.
                            </p>
                        </motion.div>

                        <motion.div variants={cardVariant} className="bg-[#c3c9ff] rounded-2xl p-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-40 h-40 bg-white/30 rotate-45 translate-x-10 -translate-y-10"></div>

                            <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center mb-6">
                                <FiLock size={32} />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                                Get 24/7 identity protection
                            </h3>

                            <p className="text-gray-700 leading-relaxed">
                                After submitting your application, the credit card issuer will
                                review your application and assess your creditworthiness.
                            </p>
                        </motion.div>
                    </motion.div>


                    <motion.div
                        variants={sectionVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        className="bg-[#A0E1E1] rounded-3xl p-10 sm:p-14 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center"
                    >
                        <h3 className="text-3xl sm:text-4xl font-semibold lg:col-span-1">
                            2023 World’s best Award winning bank
                        </h3>

                        <div className="flex flex-col items-center">
                            <img src="home/award-1.svg" alt="Innovation Awards" loading="lazy" />
                            <p className="text-xl font-medium mt-4">Retail banking</p>
                            <p className="text-xl font-medium">innovation Awards</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <img src="home/award-2.svg" alt="Banking Awards" loading="lazy" />
                            <p className="text-lg font-medium mt-4">World finance</p>
                            <p className="text-lg font-medium">banking Awards</p>
                        </div>
                    </motion.div>


                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                <div className="relative">
                    <img
                        src="/home/rawImage.jpg"
                        alt="Credit card balance transfer"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="bg-linear-to-br from-blue-50 to-indigo-50 flex items-center">
                    <div className="px-6 sm:px-12 lg:px-16 max-w-2xl">

                        <h2 className="text-4xl sm:text-5xl font-semibold mt-4 mb-6">
                            How credit card balance transfers are processed
                        </h2>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Credit card balance transfer allows you to move an existing balance from
                            one credit card to another, typically with the aim of taking advantage
                            of lower interest rates or promotional offers.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {[
                                "Find a suitable credit card",
                                "Apply for the new credit card",
                                "Request the balance transfer",
                                "Verification and processing",
                                "Pay attention to timing",
                                "Confirmation and monitoring",
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <span className="text-red-600">
                                        <HiCheckCircle className="text-red-600 text-xl" />
                                    </span>
                                    <span className="text-gray-800 text-sm sm:text-base">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/open-account")}
                            className="relative overflow-hidden inline-flex items-center gap-2 px-9  py-4 rounded-md font-medium text-white bg-red-600 group"
                        >
                            <span className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started <FiArrowRight />
                            </span>
                        </button>

                    </div>
                </div>
            </section>

            <Subscribe />

            <OurCustomers />

            <Download />

            <LatestNews />

        </div >
    );
}

export default Home;