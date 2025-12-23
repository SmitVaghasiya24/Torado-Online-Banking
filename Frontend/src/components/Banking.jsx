import React from 'react'
import { useNavigate } from 'react-router-dom'

function Banking() {
    const navigate = useNavigate();
  return (
    <div>
          <section className="bg-linear-to-r from-gray-50 to-indigo-50 py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-stretch">

                        <div className="flex justify-center lg:justify-start h-full">
                            <img
                                src="/banking/process-1.webp"
                                alt="started banking quickly"
                                className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-full rounded-2xl object-cover"
                            />
                        </div>

                        <div className="h-full flex flex-col justify-center">
                            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                                Ready to get started banking quickly.
                            </h2>

                            <p className="text-gray-600 max-w-md mb-10">
                                Determine the type of account you need based on your banking
                                requirements.
                            </p>

                            <div className="flex gap-6 pb-8 border-b border-gray-200">
                                <span className="text-4xl font-semibold text-red-600">01</span>

                                <div>
                                    <h4 className="text-lg font-semibold mb-2">
                                        Open an account
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Start by researching and comparing different credit card
                                        options available to find the one that suits your needs.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 py-8 border-b border-gray-200">
                                <span className="text-4xl font-semibold text-red-600">02</span>

                                <div>
                                    <h4 className="text-lg font-semibold mb-2">
                                        Register your online savings account
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Once you have identified the credit card that aligns with
                                        your preferences, you can proceed to the application.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 pt-8">
                                <span className="text-4xl font-semibold text-red-600">03</span>

                                <div>
                                    <h4 className="text-lg font-semibold mb-2">
                                        Sign in
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        After submitting your application, the credit card issuer
                                        will review your application and assess your creditworthiness.
                                    </p>
                                </div>
                            </div>

                            <button
                                className="group relative mt-10 w-fit overflow-hidden rounded-md bg-red-600 px-8 py-3 font-medium text-white transition"

                            >
                                <span
                                    className="absolute inset-0 bg-[#000080] -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"

                                ></span>

                                <span
                                    onClick={() => navigate("/open-account")}
                                    className="relative z-10">
                                    Get Started →
                                </span>
                            </button>

                        </div>

                    </div>
                </div>
            </section>
    </div>
  )
}

export default Banking