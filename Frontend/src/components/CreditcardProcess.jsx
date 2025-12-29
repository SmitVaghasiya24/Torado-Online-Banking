import React from 'react'

function CreditcardProcess() {
  return (
    <div>
          <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">

                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                                Get credit card from 3 simple process
                            </h2>

                            <p className="text-gray-600 max-w-lg mb-10">
                                Getting a credit card typically involves a straightforward
                                process that can be summarized in three simple steps:
                            </p>

                            <div className="space-y-8">

                                <div className="flex gap-6">
                                    <span className="text-4xl font-semibold text-red-600">01</span>
                                    <div className="border-b border-gray-200 pb-6 w-full">
                                        <h4 className="text-lg font-semibold mb-2">
                                            Research and compare
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Start by researching and comparing different credit card
                                            options available to find the one that suits your needs.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <span className="text-4xl font-semibold text-red-600">02</span>
                                    <div className="border-b border-gray-200 pb-6 w-full">
                                        <h4 className="text-lg font-semibold mb-2">
                                            Submit an application
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Once you have identified the credit card that aligns with
                                            your preferences, you can proceed to the application
                                            process.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <span className="text-4xl font-semibold text-red-600">03</span>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold mb-2">
                                            Approval and activation
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            After submitting your application, the credit card issuer
                                            will review your application and assess your
                                            creditworthiness.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="relative flex items-center justify-center h-full">

                            <img
                                src="/credit-card/process-shape.webp"
                                alt="Background shape"
                                className=" absolute inset-0 w-full max-w-2xl z-0"
                            />

                            <img
                                src="/credit-card/process-img-1.webp"
                                alt="Credit card process"
                                className="relative w-full max-w-2xl z-10 float-animation"
                            />

                            <div className="hidden sm:flex absolute top-8 right-6 bg-white shadow-lg rounded-xl px-6 py-4 flex-col items-center gap-2 z-20">
                                <img
                                    src="/credit-card/shape-1.webp"
                                    alt=""
                                    className="w-20 h-18"
                                />
                                <span className="font-medium max-w-26 text-sm text-center">
                                    No overdraft Fees
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default CreditcardProcess