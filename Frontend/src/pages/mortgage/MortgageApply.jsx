import { useState } from "react";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import Subscribe from "../../components/Subscriber";
function MortgageApply() {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const initialFormState = {
        request_type: "mortgage_application",

        interested_purchase_home: 0,
        interested_move_mortgage: 0,
        interested_refinance: 0,

        full_name: "",
        date_of_birth: "",
        ssn: "",
        marital_status: "",
        home_address: "",
        city: "",
        province: "",
        postal_code: "",
        telephone_number: "",
        email: "",
        gross_annual_income: "",
        down_payment_amount: "",
        terms_confirmed: false,
    };

    const [form, setForm] = useState(initialFormState);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleInterestChange = (name) => {
        setForm({
            ...form,
            interested_purchase_home: 0,
            interested_move_mortgage: 0,
            interested_refinance: 0,
            [name]: 1,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/mortgage_application",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                setIsSuccess(true);
                setMessage("Mortgage application submitted successfully.");
                setForm(initialFormState);

                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                setIsSuccess(false);
                setMessage("Unable to submit application. Please try again.");

                setTimeout(() => {
                    setMessage("");
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setIsSuccess(false);
            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };



    const inputClass =
        "w-full border border-gray-300 rounded-md px-4 py-2 text-sm " +
        "focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition";

    return (
        <>
            <BreadcrumbHero
                title="Apply For Mortgage"
                image="/Breadcrumb/apply-mortgage.webp"
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <h1 className="text-center max-w-xl mx-auto text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 text-gray-800">
                    Online mortgage application
                </h1>
                <p className="mt-3 mb-12 text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto text-center">
                    When applying for a mortgage, the following information is commonly required.
                    Here's a sample list of the information needed to complete a mortgage application form.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 sm:p-10 rounded-2xl space-y-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pb-10">
                        <div>
                            <h4 className="text-4xl font-medium mb-3">
                                Request Type
                            </h4>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked
                                    readOnly
                                    className="accent-red-600"
                                />
                                Mortgage application
                            </label>
                        </div>

                        <div>
                            <h4 className="text-3xl font-medium mb-3">
                                I'm interested in
                            </h4>

                            <div className="space-y-2 text-sm text-gray-700">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="interest"
                                        className="accent-red-600"
                                        checked={form.interested_purchase_home === 1}
                                        onChange={() =>
                                            handleInterestChange("interested_purchase_home")
                                        }
                                    />
                                    Purchasing a new home
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="interest"
                                        className="accent-red-600"
                                        checked={form.interested_move_mortgage === 1}
                                        onChange={() =>
                                            handleInterestChange("interested_move_mortgage")
                                        }
                                    />
                                    Moving my mortgage
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="interest"
                                        className="accent-red-600"
                                        checked={form.interested_refinance === 1}
                                        onChange={() =>
                                            handleInterestChange("interested_refinance")
                                        }
                                    />
                                    Refinancing my mortgage
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-3xl md:text-5xl font-semibold mb-6">
                            Personal information
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm mb-1">Full name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={form.full_name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Date of birth</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={form.date_of_birth}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Social Security Number
                                </label>
                                <input
                                    type="text"
                                    name="ssn"
                                    value={form.ssn}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Marital status
                                </label>
                                <select
                                    name="marital_status"
                                    value={form.marital_status}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Home address
                                </label>
                                <input
                                    type="text"
                                    name="home_address"
                                    value={form.home_address}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Province</label>
                                <input
                                    type="text"
                                    name="province"
                                    value={form.province}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Postal code
                                </label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={form.postal_code}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Telephone number
                                </label>
                                <input
                                    type="text"
                                    name="telephone_number"
                                    value={form.telephone_number}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Gross annual income
                                </label>
                                <select
                                    name="gross_annual_income"
                                    value={form.gross_annual_income}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select amount</option>
                                    <option value="20001-40000">
                                        20,001-40,000
                                    </option>
                                    <option value="40001-60000">
                                        40,001 - 60,000
                                    </option>
                                    <option value="60001-80000">
                                        60,001 - 80,000
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    Down payment amount
                                </label>
                                <input
                                    type="number"
                                    name="down_payment_amount"
                                    value={form.down_payment_amount}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            name="terms_confirmed"
                            checked={form.terms_confirmed}
                            className="mt-1 accent-red-600"
                            onChange={handleChange}
                        />
                        <p className="text-sm text-gray-600">
                            I confirm that all information mentioned above is true.
                        </p>
                    </div>

                    {message && (
                        <div
                            className={`text-sm px-4 py-2 rounded-md ${isSuccess
                                ? "text-green-700 bg-green-50"
                                : "text-red-700 bg-red-50"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="relative overflow-hidden bg-red-600 text-white px-8 py-3 rounded-md transition group"
                    >
                        <span className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative z-10">Submit Now</span>
                    </button>
                </form>

            </section>
            <Subscribe />
        </>
    );
}

export default MortgageApply;
