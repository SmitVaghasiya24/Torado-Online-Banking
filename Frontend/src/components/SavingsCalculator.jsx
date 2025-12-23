import { useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SavingCalculator() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [months, setMonths] = useState(6);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();

  const APY = 0.04;

  const calculateSavings = () => {
    let balance = Number(initial);
    const monthlyRate = APY / 12;

    for (let i = 0; i < months; i++) {
      balance += Number(monthly);
      balance *= 1 + monthlyRate;
    }

    const interestEarned =
      balance - (Number(initial) + Number(monthly) * months);

    setResult(interestEarned.toFixed(2));
  };

  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          <div className="flex flex-col h-full items-start">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl mb-2 font-normal">
              Features
            </h2>

            <p className="text-gray-600 leading-relaxed py-4 mb-2 text-sm sm:text-base">
              A savings account is a type of bank account that is designed to help
              individuals save money while earning interest on their deposits.
            </p>

            <ul className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
              {[
                "No monthly fees, no minimums",
                "24/7 superior customer service",
                "Easy access to your money",
                "Free ATM card upon request",
                "$100 minimum balance to open an account",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-sm sm:text-base">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-blue-900 text-white flex items-center justify-center">
                    <FiCheck size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/open-account")}
              className="
                relative inline-flex items-center justify-center
                overflow-hidden
                bg-red-600 text-white
                px-5 py-3 text-sm rounded-md
                transition
                before:absolute before:inset-0
                before:-translate-y-full
                before:bg-[#000080]
                before:transition-transform before:duration-300
                hover:before:translate-y-0
              "
            >
              <span className="relative z-10 whitespace-nowrap">
                Open An Account
              </span>
            </button>
          </div>

          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-normal mb-6 sm:mb-8">
                Saving calculator
              </h2>

              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Initial deposit
                  </label>
                  <input
                    type="number"
                    value={initial}
                    onChange={(e) => setInitial(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Recurring monthly deposit
                  </label>
                  <input
                    type="number"
                    value={monthly}
                    onChange={(e) => setMonthly(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Save for
                  </label>
                  <div className="relative">
                    <select
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-md px-4 py-3 appearance-none text-sm sm:text-base"
                    >
                      <option value={6}>6 months</option>
                      <option value={12}>12 months</option>
                      <option value={24}>24 months</option>
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6">
              <button
                onClick={calculateSavings}
                className="
                  relative overflow-hidden
                  bg-blue-900 text-white
                  px-8 py-3 rounded-md
                  transition
                  before:absolute before:inset-0
                  before:-translate-y-full
                  before:bg-red-600
                  before:transition-transform before:duration-300
                  hover:before:translate-y-0
                "
              >
                <span className="relative z-10">Calculate</span>
              </button>

              <div className="border border-gray-200 rounded-md px-6 py-3 text-red-600 font-medium whitespace-nowrap">
                ${result} <span className="text-gray-700">(4.00% APY)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
