import { Link } from "react-router-dom";

function Error() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">

            <img
                src="/page/404.webp"
                alt="404 Not Found"
                className="max-w-[420px] w-full mb-8"
            />

            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
                Oops! Page Not Found
            </h1>

            <p className="text-gray-600 max-w-xl mb-8">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </p>

            <Link
                to="/"
                className="
                    inline-block
                    bg-red-600 text-white
                    px-6 py-3 rounded
                    transition duration-300
                    hover:bg-[#000080]
                "
            >
                Back To Home
            </Link>
        </div>
    );
}

export default Error;
