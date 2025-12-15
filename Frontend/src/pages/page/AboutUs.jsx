import BreadcrumbHero from '../../components/Breadcrumb'

function AboutUs() {
    return (
        <div>
            <BreadcrumbHero title="About us" image="/Breadcrumb/about.webp" />

            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-lg">

                    <div className="h-full">
                        <img
                            src="/about-left.webp"
                            alt="Who we are"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div
                        className="
                        relative
                        bg-gradient-to-br from-[#02006b] via-[#1a056e] to-[#3b0a75]
                        text-white
                        px-8 sm:px-12 lg:px-16
                        py-12 lg:py-16
                        flex flex-col justify-center
                    "
                    >

                        <div className="absolute top-0 right-16 w-16 h-8 bg-white rounded-b-full"></div>

                        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                            Who We Are
                        </h2>

                        <p className="text-gray-200 leading-relaxed mb-10 max-w-xl">
                            Welcome to <span className="font-medium">“Torado”</span> secure and
                            user-friendly online banking platform, designed to provide
                            convenient access to your financial accounts, including Credit
                            Cards, Banking, Mortgage, and Personal loans. Manage your
                            finances with ease and enjoy a seamless banking experience from
                            the comfort of your home or on the go.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">

                            <div className="flex items-center gap-4">
                                <img
                                    src="/ceo.webp"
                                    alt="CEO"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white"
                                />

                                <div>
                                    <p className="font-semibold">
                                        Christopher Propst
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Chief Executive Officer
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-300">
                                    Call our consultant
                                </p>
                                <a
                                    href="tel:+18787539922"
                                    className="text-lg font-semibold text-red-400 hover:underline"
                                >
                                    +1 (878)-753-9922
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs