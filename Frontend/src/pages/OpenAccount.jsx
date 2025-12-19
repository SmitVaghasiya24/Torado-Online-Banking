import React, { useState } from "react";
import axios from "axios";
import BreadcrumbHero from "../components/Breadcrumb";

function OpenAccount() {
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        taxpayer_type: "ssn",
        taxpayer_number: "",
        id_type: "business",
        id_number: "",
        state_of_issue: "Florida",
        id_expiration_date: "",
        date_of_birth: "",
        citizenship: "Florida",
        email: "",
        phone_number: "",
        home_address_1: "",
        home_address_2: "",
        city: "Florida",
        state: "Florida",
        zip_code: "",
        profession: "",
        terms_accepted: false
    });

    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const token = localStorage.getItem("token");
        if (!token) {
            setIsSuccess(false);
            setMessage("Please login first");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/open_account",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setIsSuccess(true);
                setMessage("Account application submitted successfully");

                setFormData({
                    first_name: "",
                    middle_name: "",
                    last_name: "",
                    taxpayer_type: "ssn",
                    taxpayer_number: "",
                    id_type: "business",
                    id_number: "",
                    state_of_issue: "Florida",
                    id_expiration_date: "",
                    date_of_birth: "",
                    citizenship: "Florida",
                    email: "",
                    phone_number: "",
                    home_address_1: "",
                    home_address_2: "",
                    city: "Florida",
                    state: "Florida",
                    zip_code: "",
                    profession: "",
                    terms_accepted: false
                });

                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            console.error(err);
            setIsSuccess(false);
            setMessage("Something went wrong");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <>
            <BreadcrumbHero
                title="Open account"
                image="/Breadcrumb/openaccount.webp"
            />

            <section className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-center mt-6 text-3xl md:text-5xl font-semibold mb-14">
                    Open a Torado account
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                >

                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm mb-1">First name</label>
                                <input
                                    name="first_name"
                                    value={formData.first_name}
                                    required
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Middle name</label>
                                <input
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Last name</label>
                                <input
                                    name="last_name"
                                    value={formData.last_name}
                                    required
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-2">Taxpayer ID</label>
                        <div className="flex gap-6 text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="taxpayer_type"
                                    value="ssn"
                                    checked={formData.taxpayer_type === "ssn"}
                                    onChange={handleChange}
                                />
                                Social security number
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="taxpayer_type"
                                    value="itin"
                                    checked={formData.taxpayer_type === "itin"}
                                    onChange={handleChange}
                                />
                                Individual tax identification number
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1">
                            {formData.taxpayer_type === "ssn"
                                ? "Social Security Number"
                                : "Individual Tax Identification Number"}
                        </label>
                        <input
                            name="taxpayer_number"
                            value={formData.taxpayer_number}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">ID type</label>
                        <select
                            name="id_type"
                            value={formData.id_type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        >
                            <option value="business">Business</option>
                            <option value="passport">Passport</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">ID number</label>
                        <input
                            name="id_number"
                            value={formData.id_number}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">State issue</label>
                        <select
                            name="state_of_issue"
                            value={formData.state_of_issue}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        >
                            <option value="Florida">Florida</option>
                            <option value="California">California</option>
                            <option value="Texas">Texas</option>
                            <option value="New York">New York</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Arizona">Arizona</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm mb-1">Expiration date</label>
                        <input
                            type="date"
                            name="id_expiration_date"
                            value={formData.id_expiration_date}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Date of birth</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Citizenship</label>
                        <select
                            name="citizenship"
                            value={formData.citizenship}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        >
                            <option value="Florida">Florida</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="India">India</option>
                            <option value="Germany">Germany</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm mb-1">Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Phone Number</label>
                        <input
                            name="phone_number"
                            value={formData.phone_number}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Home address 01</label>
                        <input
                            name="home_address_1"
                            value={formData.home_address_1}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Home address 02 (optional)</label>
                        <input
                            name="home_address_2"
                            value={formData.home_address_2}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">City</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        >
                            <option value="Florida">Florida</option>
                            <option value="Miami">Miami</option>
                            <option value="Orlando">Orlando</option>
                            <option value="Tampa">Tampa</option>
                            <option value="Jacksonville">Jacksonville</option>
                            <option value="Fort Lauderdale">Fort Lauderdale</option>
                            <option value="Tallahassee">Tallahassee</option>
                            <option value="Naples">Naples</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">State</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        >
                            <option value="Florida">Florida</option>
                            <option value="California">California</option>
                            <option value="Texas">Texas</option>
                            <option value="New York">New York</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Washington">Washington</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Zip code</label>
                        <input
                            name="zip_code"
                            value={formData.zip_code}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Profession</label>
                        <input
                            name="profession"
                            value={formData.profession}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
                        />
                    </div>
                    <div className="md:col-span-2 flex items-start gap-3 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="terms_accepted"
                            checked={formData.terms_accepted}
                            required
                            onChange={handleChange}
                            className="accent-red-600 mt-1"
                        />
                        <p>
                            By clicking this checkbox, I agree to the all terms and conditions
                        </p>
                    </div>


                    {message && (
                        <div className={`md:col-span-2 text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </div>
                    )}
                    <div className="md:col-span-2">
                        <button
                            className="relative overflow-hidden bg-[#E30012] text-white px-6 py-3 rounded group"
                        >
                            <span
                                className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            ></span>

                            <span className="relative z-10">
                                Open account
                            </span>
                        </button>
                    </div>

                </form>
            </section>
        </>
    );
}

export default OpenAccount;
