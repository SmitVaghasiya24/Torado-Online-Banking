import React from 'react'
import BreadcrumbHero from '../components/Breadcrumb'
import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import FolderCard from "../components/FolderCard";

export default function ContactDetails() {
    const [contact, setContact] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        agreed_terms: false,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agreed_terms) {
            setError("You must agree to the terms.");
            setTimeout(() => setError(""), 5000);
            return;
        }

        const token = localStorage.getItem("token"); // 👈 token fetch

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const res = await axios.post(
                "http://localhost:5000/api/admin/add_message",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 👈 token send
                    },
                }
            );

            setSuccess("Message sent successfully!");
            setTimeout(() => setSuccess(""), 5000);

            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
                agreed_terms: false,
            });

        } catch (err) {
            setError("Something went wrong. Try again.");
            console.log(err);
            setTimeout(() => setError(""), 5000);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/get_contact");
                setContact(res.data.data);
            } catch (error) {
                console.log("Error fetching contact:", error);
            }
        };

        fetchContact();
    }, []);


    if (!contact) return <p className="text-center py-10">Loading...</p>;

    return (
        <>
            <BreadcrumbHero title="Contact us" image="/Breadcrumb/contact.webp" />

            <div className="container py-20">
                <h1 className="text-center text-4xl md:text-5xl font-semibold mb-16">
                    Contact Us
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 p-4 lg:p-0">

                    <div className="flex items-start gap-4">
                        <HiOutlineLocationMarker size={40} className="text-red-500" />
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Address</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {contact.address}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <FiPhone size={40} className="text-red-500" />
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Phone</h3>
                            {contact.phone.map((num, i) => (
                                <p key={i} className="text-gray-600">
                                    {num}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <FiMail size={40} className="text-red-500" />
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Email</h3>
                            {contact.email.map((item, i) => (
                                <p key={i} className="text-gray-600">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <FiClock size={40} className="text-red-500" />
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Customer service hours</h3>

                            {contact.service_hours.split(",").map((line, i) => (
                                <p key={i} className="text-gray-600">
                                    {line.trim()}
                                </p>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="py-6 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-">

                       <FolderCard className="min-h-[150px]">
                            <h3 className="text-2xl font-semibold">Banking</h3>

                            <div className="flex text-2xl items-center gap-4 text-gray-700 font-medium mt-3">
                                <FiPhone className="text-red-500" size={22} />
                                <span>Phone</span>
                            </div>

                            <p className="text-gray-700 text-xl mt-1 font-medium pl-9">
                                +1 (878)-753-9933
                            </p>
                        </FolderCard>

                        <FolderCard>
                            <h3 className="text-2xl font-semibold">Mortgages</h3>

                            <div className="flex  text-2xl  items-center gap-4 text-gray-700 font-medium mt-3">
                                <FiPhone className="text-red-500" size={22} />
                                <span>Phone</span>
                            </div>

                            <p className="text-gray-700 text-xl font-medium mt-1 pl-9">
                                +1 (878)-753-9944
                            </p>
                        </FolderCard>

                        <FolderCard>
                            <h3 className="text-2xl font-semibold">Credit card</h3>

                            <div className="flex  text-2xl  items-center gap-4 text-gray-700 font-medium mt-3">
                                <FiPhone className="text-red-500" size={22} />
                                <span>Phone</span>
                            </div>

                            <p className="text-gray-700 text-xl mt-1 font-medium pl-9">
                                +1 (878)-753-9955
                            </p>
                        </FolderCard>

                        <FolderCard>
                            <h3 className="text-2xl font-semibold">Personal loan</h3>

                            <div className="flex  text-2xl  items-center gap-4 text-gray-700 font-medium mt-3">
                                <FiPhone className="text-red-500" size={22} />
                                <span>Phone</span>
                            </div>

                            <p className="text-gray-700 text-xl mt-1 font-medium pl-9">
                                +1 (878)-753-9966
                            </p>
                        </FolderCard>

                    </div>
                </div>



                <form className="wrapper py-16" onSubmit={handleSubmit}>

                    <h1 className="text-center text-4xl font-bold mb-12">Send a message!</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 lg:p-0">

                        <div>
                            <label className="block mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded"
                                required
                            />
                        </div>

                    </div>

                    <div className="mt-8 p-4 lg:p-0">
                        <label className="block mb-2">Your Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className="w-full border border-gray-300 p-3 rounded"
                            required
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-3 mt-6 p-4 lg:p-0">
                        <input
                            type="checkbox"
                            name="agreed_terms"
                            checked={formData.agreed_terms}
                            onChange={handleChange}
                        />
                        <label>
                            I agree to the{" "}
                            <a href="#" className="text-blue-600 underline">Terms & Conditions</a> and{" "}
                            <a href="#" className="text-blue-600 underline">Privacy policy</a>
                        </label>
                    </div>

                    {error && <p className="text-red-600 mt-3 ">{error}</p>}
                    {success && <p className="text-green-600 mt-3">{success}</p>}

                    <div className="flex group p-4 lg:p-0 justify-center lg:justify-start">
                        <button
                            type="submit"
                            disabled={loading}
                            className="
            relative overflow-hidden
            mt-8 
            bg-red-600 text-white 
            px-6 py-3 rounded
            transition-all duration-300
        "
                        >
                            <span
                                className="
                absolute inset-0 bg-[#000080]
                -translate-y-full 
                group-hover:translate-y-0
                transition-transform duration-300
            "
                            ></span>

                            <span className="relative z-10">
                                {loading ? "Sending..." : "Send Message"}
                            </span>
                        </button>
                    </div>


                </form>

            </div>
        </>
    );
}







