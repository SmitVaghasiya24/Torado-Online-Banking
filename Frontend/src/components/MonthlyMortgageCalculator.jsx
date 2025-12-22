import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const defaultChartData = [
    {
        name: "Total principle and interest",
        value: 97,
        color: "#B8C0F9",
    },
    {
        name: "Monthly homeowners insurance",
        value: 10,
        color: "#D6C0AA",
    },
    {
        name: "Property taxes",
        value: 7,
        color: "#AEE0DF",
    },
];

function MonthlyMortgageCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [interestRate, setInterestRate] = useState(4);
    const [termYears, setTermYears] = useState(10);

    const [result, setResult] = useState({
        principalInterest: 97,
        insurance: 10,
        tax: 7,
        total: 114,
    });

    const handleAmountChange = (value, setter) => {
        if (value === "") {
            setter("");
            return;
        }
        if (!/^\d+$/.test(value)) return;

        const cleaned = value.replace(/^0+/, "");
        if (cleaned === "") {
            setter("");
            return;
        }

        if (Number(cleaned) < 1) {
            setter("1");
        } else {
            setter(cleaned);
        }
    };

    const calculateMortgage = () => {
        const loan = Number(loanAmount);
        const down = Number(downPayment);
        const principal = loan - down;

        if (!loan || principal < 1) {
            setResult({
                principalInterest: 97,
                insurance: 10,
                tax: 7,
                total: 114,
            });
            return;
        }

        const monthlyRate = interestRate / 100 / 12;
        const totalMonths = termYears * 12;

        const monthlyPI =
            (principal *
                monthlyRate *
                Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);

        const insurance = 10;
        const tax = 7;

        setResult({
            principalInterest: Math.round(monthlyPI),
            insurance,
            tax,
            total: Math.round(monthlyPI + insurance + tax),
        });
    };

    const clearAllFields = () => {
        setLoanAmount("");
        setDownPayment("");
        setInterestRate(4);
        setTermYears(10);
        setResult({
            principalInterest: 97,
            insurance: 10,
            tax: 7,
            total: 114,
        });
    };

    const chartData = result
        ? [
              {
                  name: "Total principle and interest",
                  value: result.principalInterest,
                  color: "#B8C0F9",
              },
              {
                  name: "Monthly homeowners insurance",
                  value: result.insurance,
                  color: "#D6C0AA",
              },
              {
                  name: "Property taxes",
                  value: result.tax,
                  color: "#AEE0DF",
              },
          ]
        : defaultChartData;

    return (
        <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-10 sm:mb-20">
                Monthly mortgage payment calculator
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8 lg:p-10">
                    <h3 className="text-lg sm:text-xl font-semibold mb-6">
                        Mortgage calculator
                    </h3>

                    <div className="space-y-4 sm:space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Loan amount
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={loanAmount}
                                placeholder="$1000"
                                onChange={(e) =>
                                    handleAmountChange(
                                        e.target.value,
                                        setLoanAmount
                                    )
                                }
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-0 focus:border-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Interest rate for
                            </label>
                            <select
                                value={interestRate}
                                onChange={(e) =>
                                    setInterestRate(Number(e.target.value))
                                }
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-0 focus:border-gray-400"
                            >
                                <option value={4}>4%</option>
                                <option value={5}>5%</option>
                                <option value={6}>6%</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Terms for
                            </label>
                            <select
                                value={termYears}
                                onChange={(e) =>
                                    setTermYears(Number(e.target.value))
                                }
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-0 focus:border-gray-400"
                            >
                                <option value={10}>10 years</option>
                                <option value={15}>15 years</option>
                                <option value={30}>30 years</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Down payment
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={downPayment}
                                placeholder="$1000"
                                onChange={(e) =>
                                    handleAmountChange(
                                        e.target.value,
                                        setDownPayment
                                    )
                                }
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-0 focus:border-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
                        <button
                            onClick={calculateMortgage}
                            className="bg-[#000080] text-white px-6 py-3 rounded-md font-medium w-full sm:w-auto"
                        >
                            Get My Results
                        </button>

                        <button
                            onClick={clearAllFields}
                            className="text-sm underline cursor-pointer text-gray-600 text-center sm:text-left"
                        >
                            Clear all fields
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg sm:text-xl text-center font-semibold">
                        Monthly payment calculator
                    </h3>

                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] h-[300px] sm:h-[360px] lg:h-[420px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        className="sm:hidden"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>

                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={120}
                                        outerRadius={170}
                                        className="hidden sm:block"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <p className="text-sm sm:text-base text-gray-600">
                                    Total monthly payment
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-semibold">
                                    ${result.total}
                                </h2>
                            </div>
                        </div>

                        <div className="w-full max-w-md mt-8 sm:mt-2 space-y-4">
                            {chartData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-sm sm:text-base"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="w-4 h-4 rounded-full"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        ></span>
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="font-medium">
                                        ${item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MonthlyMortgageCalculator;
