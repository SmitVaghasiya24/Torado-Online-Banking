import React, { useState } from "react";

const CreditcardApply = () => {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const initialFormState = {
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        ssn_tax_id: "",
        is_us_citizen: null,

        residential_address1: "",
        residential_address2: "",
        zip_code: "",
        city: "",
        province: "",

        email: "",
        telephone_number: "",

        employment_status: "",
        total_annual_income: "",
        monthly_mortgage_or_rent: "",
        has_bank_account: null,

        terms_accepted: false,
    };

    const [formData, setFormData] = useState(initialFormState);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBoolean = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.terms_accepted) {
            setMessage("Please accept terms & conditions");
            setMessageType("error");

            setTimeout(() => {
                setMessage("");
            }, 3000);

            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "http://localhost:5000/api/credit_card_apply",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Something went wrong");
                setMessageType("error");

                setTimeout(() => {
                    setMessage("");
                }, 3000);

                return;
            }

            setMessage("Credit card application submitted successfully");
            setMessageType("success");

            setFormData(initialFormState);

            setTimeout(() => {
                setMessage("");
            }, 3000);

            console.log(data);

        } catch (error) {
            console.error(error);

            setMessage("Server error");
            setMessageType("error");

            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };



    return (
        <div className="container mx-auto px-4 pt-10 pb-20">

            <h1 className="text-3xl sm:text-5xl font-semibold mb-10">
                Personal information
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div>
                    <label className="block text-md mb-3">First name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
                focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">Middle name</label>
                    <input
                        type="text"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
                focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">Last name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
                focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                    <label className="block text-md mb-3">
                        Date of birth (DD/MM/YY)
                    </label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
                focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">
                        SS or individual TAX ID
                    </label>
                    <input
                        type="text"
                        name="ssn_tax_id"
                        value={formData.ssn_tax_id}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
                focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>
            </div>

            <div className="mb-20">
                <label className="block text-md mb-4">
                    Are you a USA Citizen
                </label>

                <div className="flex items-center gap-10">
                    <label className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="citizen"
                            checked={formData.is_us_citizen === true}
                            onChange={() => handleBoolean("is_us_citizen", true)}
                            className="accent-red-600"
                        />
                        Yes
                    </label>

                    <label className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="citizen"
                            checked={formData.is_us_citizen === false}
                            onChange={() => handleBoolean("is_us_citizen", false)}
                            className="accent-red-600"
                        />
                        No
                    </label>
                </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-semibold mb-10">
                Contact information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                    <label className="block text-md mb-3">
                        Residential Address 1
                    </label>
                    <input
                        type="text"
                        name="residential_address1"
                        value={formData.residential_address1}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">
                        Residential Address 2
                    </label>
                    <input
                        type="text"
                        name="residential_address2"
                        value={formData.residential_address2}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div>
                    <label className="block text-md mb-3">ZIP code</label>
                    <input
                        type="text"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">Province</label>
                    <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                    <label className="block text-md mb-3">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">
                        Telephone number
                    </label>
                    <input
                        type="text"
                        name="telephone_number"
                        value={formData.telephone_number}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>
            </div>


            <h2 className="text-3xl sm:text-5xl font-semibold mt-24 mb-10">
                Financial information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                    <label className="block text-md mb-3">
                        Employment Status
                    </label>
                    <select
                        name="employment_status"
                        value={formData.employment_status}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    >
                        <option value="">Select option</option>
                        <option>Employed</option>
                        <option>Self Employed</option>
                        <option>Unemployed</option>
                        <option>Student</option>
                    </select>
                </div>

                <div>
                    <label className="block text-md mb-3">
                        Total annual income
                    </label>
                    <input
                        type="number"
                        name="total_annual_income"
                        value={formData.total_annual_income}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div>
                    <label className="block text-md mb-3">
                        Monthly mortgage or rental payment
                    </label>
                    <input
                        type="number"
                        name="monthly_mortgage_or_rent"
                        value={formData.monthly_mortgage_or_rent}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
            focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <div>
                    <label className="block text-md mb-3">
                        Do you have any bank account?
                    </label>
                    <select
                        value={
                            formData.has_bank_account === null
                                ? ""
                                : formData.has_bank_account
                                    ? "Yes"
                                    : "No"
                        }
                        onChange={(e) =>
                            handleBoolean("has_bank_account", e.target.value === "Yes")
                        }
                        className="w-full border border-gray-200 rounded-md px-5 py-4 text-base
                        focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    >
                        <option value="">Select option</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>
            </div>


            <h2 className="text-2xl sm:text-5xl font-semibold mb-8">
                Additional information
            </h2>

            <div className="space-y-8 max-w-4xl">
                <label className="flex items-start gap-4 text-sm cursor-pointer">
                    <input
                        type="radio"
                        name="agreement"
                        value="terms"
                        onChange={() => handleBoolean("terms_accepted", true)}
                        className="mt-1 w-4 h-4 accent-red-600"
                        required
                    />
                    <span>
                        By clicking this option, I agree to the above Card Terms and Conditions
                    </span>
                </label>

                <label className="flex items-start gap-4 text-sm cursor-pointer">
                    <input
                        type="radio"
                        name="agreement"
                        value="consent"
                        onChange={() => handleBoolean("terms_accepted", true)}
                        className="mt-1 w-4 h-4 accent-red-600"
                        required
                    />
                    <span>
                        By clicking this option, I certify that I have read and consent.
                        Maecenas volutpat etiam sit in tincidunt pretium tempus. Tristique
                        pretium quisque egestas sit in vivamus sed ut pretium. Condimentum
                        leo luctus adipiscing porta aliquam est tristique.
                    </span>
                </label>

                <p className="text-sm font-medium text-gray-700">
                    Note: You must select one option before submitting the application.
                </p>
            </div>

            {message && (
                <div
                    className={`mb-6 inline-block px-4 py-3 mt-6 rounded-md text-sm font-medium ${messageType === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {message}
                </div>
            )}

            <div className="mt-12">
                <button
                    onClick={handleSubmit}
                    className="relative overflow-hidden bg-red-600 text-white px-10 py-4 rounded-md text-base font-medium flex items-center gap-2 transition before:absolute before:inset-0 before:bg-[#000080] before:-translate-y-full before:transition-transform before:duration-300 hover:before:translate-y-0"

                >
                    <span className="relative z-10">
                        Agree & Submit →
                    </span>
                </button>
            </div>


        </div>

    );

};

export default CreditcardApply;
