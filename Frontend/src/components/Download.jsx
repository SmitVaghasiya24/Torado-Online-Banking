import React from 'react'

function Download() {
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div
                    className="
                    relative overflow-hidden rounded-3xl
                    bg-linear-to-r from-[#eaf1ff] via-[#f3eefe] to-[#fdecec]
                "
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-14">

                        <div className="pl-8 lg:pl-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold leading-tight text-gray-900">
                                Do all your banking safely
                                and conveniently through
                                our mobile app
                            </h2>

                            <div className="flex flex-wrap items-center gap-4 mt-8">
                                <span className="text-lg font-medium">
                                    Download now:
                                </span>

                                <button className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M3 2l14 10-14 10V2z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <div className="text-left leading-tight">
                                        <p className="text-xs">GET IT ON</p>
                                        <p className="text-sm font-semibold">
                                            Google Play
                                        </p>
                                    </div>
                                </button>

                                <button className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-lg shadow">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.365 1.43c0 1.14-.47 2.21-1.23 3.02-.78.85-2.04 1.51-3.23 1.42-.15-1.12.45-2.28 1.19-3.07.74-.83 2.06-1.46 3.27-1.37z" />
                                        <path d="M20.49 17.36c-.57 1.33-.83 1.93-1.56 3.1-1.01 1.6-2.43 3.59-4.21 3.61-1.58.02-1.99-1.03-4.12-1.03-2.13 0-2.59 1.01-4.13 1.05-1.78.04-3.13-1.79-4.14-3.38C.03 16.36-.99 10.02 1.71 5.87c1.3-2.03 3.56-3.22 5.98-3.22 1.86 0 3.61 1.03 4.12 1.03.5 0 1.6-1.27 3.83-1.09.93.04 3.54.37 5.21 2.8-.14.09-3.12 1.82-3.08 5.43.04 4.31 3.78 5.74 3.82 5.76z" />
                                    </svg>
                                    <div className="text-left leading-tight">
                                        <p className="text-xs">Download on the</p>
                                        <p className="text-sm font-semibold">
                                            App Store
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end h-full">
                            <img
                                src="/app-bg-3.webp"
                                alt="Mobile App"
                                className="
            h-full w-auto
            object-contain
            max-w-[260px] sm:max-w-[300px] lg:max-w-[360px]
        "
                            />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Download