import React from 'react'
import BreadcrumbHero from '../components/Breadcrumb';
import { FiSearch } from "react-icons/fi";
import Subscribe from '../components/Subscriber';

function Atm() {
    return (
        <div>
            <BreadcrumbHero title="ATM locator" image="/Breadcrumb/atm.webp" />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    <div>
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                            Enter your address to <br /> find an ATM near you
                        </h1>

                        <p className="text-gray-600 mb-6">
                            Search from our network of over 300 ATMs
                        </p>

                        <div className="flex w-full max-w-md mb-10">
                            <input
                                type="text"
                                placeholder="Write your address"
                                className="flex-1 border border-gray-300 px-4 py-3 rounded-l-md focus:outline-none"
                            />

                            <button className="bg-blue-900 text-white px-5 rounded-r-md flex items-center justify-center">
                                <FiSearch size={18} />
                            </button>

                        </div>

                        <h3 className="font-semibold text-lg mb-2">
                            Information to keep in mind
                        </h3>
                        <p className="text-gray-600 leading-relaxed max-w-md">
                            We do not charge ATM fees Iaculis ultricies egestas purus eget
                            facilisis justo dignissim. Eget morbi condimentum lobortis in
                            vulputate consequat. Id euismod consectetur amet elit habitasse
                            accumsan tristique.
                        </p>
                    </div>

                    <div className="w-full h-[620px] rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            title="ATM Map"
                            src="https://www.google.com/maps?q=121%20King%20St%20Melbourne&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                </div>
            </div>
            
            <Subscribe />
        </div>
    )
}

export default Atm