import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#1f1f1f] text-gray-300">
            <div className="container py-16 grid gap-10 md:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                            T
                        </div>
                        <span className="text-white text-xl font-semibold">Torado</span>
                    </div>

                    <p className="text-sm mb-2">Need Help</p>
                    <p className="text-white text-lg font-medium mb-4">
                        +1 (878)-753-9922
                    </p>

                    <div className="flex gap-3">
                        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                            (Icon, i) => (
                                <span
                                    key={i}
                                    className="w-9 h-9 rounded-full bg-[#2b2b2b] flex items-center justify-center hover:bg-red-500 transition"
                                >
                                    <Icon size={14} />
                                </span>
                            )
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li>› About us</li>
                        <li>› News</li>
                        <li>› Contact us</li>
                        <li>› FAQs</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Services</h4>
                    <ul className="space-y-2 text-sm">
                        <li>› Credit card</li>
                        <li>› Banking</li>
                        <li>› Mortgage</li>
                        <li>› Personal loan</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Help Center</h4>
                    <ul className="space-y-2 text-sm">
                        <li>› ATM Locator</li>
                        <li>› Terms & conditions</li>
                        <li>› Privacy policy</li>
                        <li>› Cookie Policy</li>
                    </ul>
                </div>
            </div>

            <div className="container border-t border-white/10">
                <div className=" py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p>
                        © Torado is proudly owned by{" "}
                        <span className="text-white">EnvyTheme</span>
                    </p>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <span>United States</span>
                        <span className="text-xs">⌄</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
