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
        "w-full border border-gray-300 rounded-md px-4 py-4 text-sm " +
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
                    className="bg-white p-8 sm:p-12 lg:p-16 rounded-3xl space-y-16 max-w-6xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pb-12 ">
                        <div>
                            <h4 className="text-4xl font-medium mb-4">
                                Request Type
                            </h4>
                            <label className="flex items-center gap-3 text-base text-gray-700">
                                <input
                                    type="checkbox"
                                    checked
                                    readOnly
                                    className="accent-red-600 w-5 h-5"
                                />
                                Mortgage application
                            </label>
                        </div>

                        <div>
                            <h4 className="text-3xl font-medium mb-4">
                                I'm interested in
                            </h4>

                            <div className="space-y-3 text-base text-gray-700">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="interest"
                                        className="accent-red-600 w-5 h-5"
                                        checked={form.interested_purchase_home === 1}
                                        onChange={() =>
                                            handleInterestChange("interested_purchase_home")
                                        }
                                    />
                                    Purchasing a new home
                                </label>

                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="interest"
                                        className="accent-red-600 w-5 h-5"
                                        checked={form.interested_move_mortgage === 1}
                                        onChange={() =>
                                            handleInterestChange("interested_move_mortgage")
                                        }
                                    />
                                    Moving my mortgage
                                </label>

                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="interest"
                                        className="accent-red-600 w-5 h-5"
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
                        <h4 className="text-4xl md:text-5xl font-semibold mb-10">
                            Personal information
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {[
                                ["Full name", "full_name", "text"],
                                ["Date of birth", "date_of_birth", "date"],
                                ["Social Security Number", "ssn", "text"],
                            ].map(([label, name, type]) => (
                                <div key={name}>
                                    <label className="block text-base font-medium mb-2">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className={inputClass} />
                                </div>
                            ))}

                            <div>
                                <label className="block text-base font-medium mb-2">
                                    Marital status
                                </label>
                                <select
                                    name="marital_status"
                                    value={form.marital_status}
                                    onChange={handleChange}
                                    className={inputClass}                                >
                                    <option value="">Select</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>

                            {[
                                ["Home address", "home_address"],
                                ["City", "city"],
                                ["Province", "province"],
                                ["Postal code", "postal_code"],
                                ["Telephone number", "telephone_number"],
                                ["Email address", "email"],
                            ].map(([label, name]) => (
                                <div key={name}>
                                    <label className="block text-base font-medium mb-2">
                                        {label}
                                    </label>
                                    <input
                                        type={name === "email" ? "email" : "text"}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className={inputClass} />
                                </div>
                            ))}

                            <div>
                                <label className="block text-base font-medium mb-2">
                                    Gross annual income
                                </label>
                                <select
                                    name="gross_annual_income"
                                    value={form.gross_annual_income}
                                    onChange={handleChange}
                                    className={inputClass}                                >
                                    <option value="">Select amount</option>
                                    <option value="20001-40000">20,001 - 40,000</option>
                                    <option value="40001-60000">40,001 - 60,000</option>
                                    <option value="60001-80000">60,001 - 80,000</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-base font-medium mb-2">
                                    Down payment amount
                                </label>
                                <input
                                    type="number"
                                    name="down_payment_amount"
                                    value={form.down_payment_amount}
                                    onChange={handleChange}
                                    className={inputClass} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <input
                            type="checkbox"
                            name="terms_confirmed"
                            checked={form.terms_confirmed}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 accent-red-600"
                        />
                        <p className="text-base text-gray-600">
                            I confirm that all information mentioned above is true.
                        </p>
                    </div>

                    {message && (
                        <div
                            className={`text-base px-5 py-3 rounded-lg ${isSuccess
                                ? "text-green-700 bg-green-50"
                                : "text-red-700 bg-red-50"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="relative overflow-hidden bg-red-600 text-white px-14 py-4 text-lg rounded-lg transition group"
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
