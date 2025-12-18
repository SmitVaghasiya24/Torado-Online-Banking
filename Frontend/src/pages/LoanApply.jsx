import React from 'react'
import BreadcrumbHero from '../components/Breadcrumb'

function LoanApply() {
  return (
    <div>
      <BreadcrumbHero
        title="Personal loan Apply"
        image="/Breadcrumb/loan-apply.webp"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-12">
          Personal loan application form
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <div>
            <label className="block text-sm mb-1">First name</label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Date of Birth (MM/DD/YY)
            </label>
            <input
              type="date"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Telephone number
            </label>
            <input
              type="tel"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Marital status
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Married</option>
              <option>Single</option>
              <option>Divorced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Home address
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">City</label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Florida</option>
              <option>New York</option>
              <option>California</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Postal code
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Profession
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Name of the organization
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Monthly income
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Select amount</option>
              <option>$1,000 – $3,000</option>
              <option>$3,000 – $5,000</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Select your desired amount
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Select amount</option>
              <option>$5,000</option>
              <option>$10,000</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Loan tenure (Month)
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>60 month</option>
              <option>48 month</option>
              <option>36 month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Total monthly installments of all existing loans
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>60 month</option>
              <option>48 month</option>
              <option>36 month</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-start gap-2 mt-2">
            <input type="checkbox" className="mt-1" />
            <p className="text-sm">
              I/we do hereby confirm that all information mentioned
              above is true.
            </p>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="
        relative overflow-hidden
        bg-red-600 text-white
        px-8 py-3 rounded-md
        transition
        group
    "
            >
              <span
                className="
            absolute inset-0
            bg-[#000080]
            -translate-y-full
            group-hover:translate-y-0
            transition-transform duration-300
        "
              ></span>

              <span className="relative z-10">
                Submit Now
              </span>
            </button>

          </div>
        </form>
      </section>
    </div>
  )
}

export default LoanApply