import React, { useState } from "react";
import axios from "axios";
import BreadcrumbHero from "../components/Breadcrumb";

function LoanApply() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    date_of_birth: "",
    telephone: "",
    email: "",
    marital_status: "single",
    home_address: "",
    city: "Ahmedabad",
    postal_code: "",
    profession: "",
    organization_name: "",
    monthly_income: "",
    desired_amount: "",
    loan_tenure_month: "",
    existing_loan_tenure_month: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setIsSuccess(false);
      setMessage("Please login first");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/loan_application",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setIsSuccess(true);
        setMessage("Loan application submitted successfully");

        // ✅ form reset
        setFormData({
          first_name: "",
          date_of_birth: "",
          telephone: "",
          email: "",
          marital_status: "single",
          home_address: "",
          city: "Ahmedabad",
          postal_code: "",
          profession: "",
          organization_name: "",
          monthly_income: "",
          desired_amount: "",
          loan_tenure_month: "",
          existing_loan_tenure_month: ""
        });

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setMessage("Something went wrong");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };



  return (
    <div>
      <BreadcrumbHero
        title="Personal loan Apply"
        image="/Breadcrumb/loan-apply.webp"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-12 text-gray-800">
          Personal loan application form
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 bg-white p-4 sm:p-8 lg:p-10 rounded-2xl max-w-6xl mx-auto"
        >
          <div>
            <label className="block text-base mb-2">First name</label>
            <input
              type="text"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Telephone number</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Email address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Marital status</label>
            <select
              name="marital_status"
              value={formData.marital_status}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          <div>
            <label className="block text-base mb-2">Home address</label>
            <input
              type="text"
              name="home_address"
              value={formData.home_address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            >
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Indore">Indore</option>
              <option value="Bhopal">Bhopal</option>
            </select>
          </div>

          <div>
            <label className="block text-base mb-2">Postal code</label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Name of the organization</label>
            <input
              type="text"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Monthly income</label>
            <select
              name="monthly_income"
              value={formData.monthly_income}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            >
              <option value="">Select amount</option>
              <option value="0-20000">0 - 20,000</option>
              <option value="20001-40000">20,001 - 40,000</option>
              <option value="40001-60000">40,001 - 60,000</option>
              <option value="60001-80000">60,001 - 80,000</option>
              <option value="80001+">80,001+</option>
            </select>
          </div>

          <div>
            <label className="block text-base mb-2">Select your desired amount</label>
            <select
              name="desired_amount"
              value={formData.desired_amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            >
              <option value="">Select amount</option>
              <option value="50000">50,000</option>
              <option value="100000">1,00,000</option>
              <option value="200000">2,00,000</option>
              <option value="500000">5,00,000</option>
              <option value="1000000">10,00,000</option>
            </select>
          </div>

          <div>
            <label className="block text-base mb-2">Loan tenure (Month)</label>
            <select
              name="loan_tenure_month"
              value={formData.loan_tenure_month}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            >
              <option value="">Select tenure</option>
              <option value="6">6 month</option>
              <option value="12">12 month</option>
              <option value="24">24 month</option>
              <option value="36">36 month</option>
              <option value="48">48 month</option>
              <option value="60">60 month</option>
            </select>
          </div>

          <div>
            <label className="block text-base mb-2">
              Total monthly installments of all existing loans
            </label>
            <select
              name="existing_loan_tenure_month"
              value={formData.existing_loan_tenure_month}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-5 py-3 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-200 transition"
            >
              <option value="">Select</option>
              <option value="0">No existing loan</option>
              <option value="6">6 month</option>
              <option value="12">12 month</option>
              <option value="24">24 month</option>
              <option value="36">36 month</option>
              <option value="48">48 month</option>
              <option value="60">60 month</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-start gap-4 mt-6">
            <input type="checkbox" className="mt-1 accent-red-600 w-5 h-5" />
            <p className="text-base text-gray-600 leading-relaxed">
              I/we do hereby confirm that all information mentioned above is true.
            </p>
          </div>

          {message && (
            <div
              className={`md:col-span-2 text-base ${isSuccess ? "text-green-600" : "text-red-700"
                }`}
            >
              {message}
            </div>
          )}

          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="relative overflow-hidden bg-red-600 text-white px-12 py-4 text-lg rounded-md transition group"
            >
              <span className="absolute inset-0 bg-[#000080] -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative z-10">Submit Now</span>
            </button>
          </div>
        </form>


      </section>
    </div>
  );
}

export default LoanApply;
