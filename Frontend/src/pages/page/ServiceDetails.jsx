import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BreadcrumbHero from "../../components/Breadcrumb";
import Subscribe from "../../components/Subscriber";
import { useNavigate } from "react-router-dom";
import Contact from "../../components/Contact";


function ServiceDetails() {
    const { slug } = useParams();

    const [categories, setCategories] = useState([]);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        fetchCategories(controller.signal);
        fetchServiceDetails(controller.signal);

        return () => controller.abort();
    }, [slug]);

    const fetchCategories = async (signal) => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_service_category",
                { signal }
            );
            if (res.data.success) {
                setCategories(res.data.data);
            }
        } catch (err) {
            if (err.name !== "CanceledError") console.error(err);
        }
    };

    const fetchServiceDetails = async (signal) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/admin/get_service/slug/${slug}`,
                { signal }
            );
            if (res.data.success) {
                setService(res.data.data);
            }
        } catch (err) {
            if (err.name !== "CanceledError") console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="container mx-auto py-20 text-center">
                Loading service...
            </section>
        );
    }

    return (
        <div>
            <BreadcrumbHero
                title={service?.title || "Service Details"}
                image="/Breadcrumb/service.webp"
            />

            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    <aside className="lg:col-span-4 space-y-8">

                        <div className="bg-gray-50 rounded-2xl p-6 top-24">
                            <h4 className="text-lg font-semibold mb-4">
                                Categories
                            </h4>

                            <ul className="space-y-3">
                                {categories.map((cat) => (
                                    <li
                                        key={cat.id}
                                        onClick={() => navigate(`/pages/services`)}
                                        className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
                                    >
                                        <span className="w-2 h-2 bg-[#86AA42] rounded-full"></span>
                                        {cat.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* <div className="bg-gray-50 rounded-2xl p-6">
                            <h4 className="text-lg font-semibold mb-4">
                                Need help?
                            </h4>

                            <div className="space-y-3 text-sm text-gray-700">
                                <p>
                                    <strong>Phone:</strong><br />
                                    +1 (878) 753-9922<br />
                                    +1 (876) 753-0013
                                </p>

                                <p>
                                    <strong>Email:</strong><br />
                                    hello@torado.com<br />
                                    support@torado.com
                                </p>
                            </div>
                        </div> */}
                        <Contact />
                    </aside>

                    <div className="lg:col-span-8">

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-8">
                            Our investment advisory services are designed to guide you through the
                            complex world of sustainable and green finance
                        </h2>

                        {service?.thumbnail && (
                            <img
                                src={service.thumbnail}
                                alt={service.title}
                                className="rounded-2xl mb-10 w-full object-cover"
                            />
                        )}

                        <div className="mb-12">
                            <h4 className="font-semibold text-xl sm:text-2xl mb-4">
                                Overview
                            </h4>
                            <p className="text-gray-700 leading-relaxed max-w-3xl">
                                {service?.short_description}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-8">
                                Key components of investment advisory services
                            </h3>

                            <div className="space-y-8 text-gray-700">

                                <div>
                                    <h4 className="font-semibold text-black mb-2">
                                        Portfolio Management
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                                        <li>
                                            <span className="font-medium">Asset Allocation:</span>{" "}
                                            Advisors determine the optimal mix of asset classes
                                            (e.g., stocks, bonds, real estate) based on the client’s
                                            risk tolerance, investment goals, and time horizon.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-black mb-2">
                                        Financial Planning
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                                        <li>
                                            <span className="font-medium">Retirement Planning:</span>{" "}
                                            Developing strategies to ensure sufficient income during
                                            retirement, including pension plans, retirement accounts,
                                            and annuities.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-black mb-2">
                                        Risk Management
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                                        <li>
                                            <span className="font-medium">Insurance Needs:</span>{" "}
                                            Assessing the need for life, health, and property insurance.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-black mb-2">
                                        Tax Planning
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                                        <li>
                                            <span className="font-medium">Tax Efficiency:</span>{" "}
                                            Strategies to minimize tax liability through tax-advantaged
                                            investments, deductions, and credits.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-black mb-2">
                                        Investment Research and Analysis
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                                        <li>
                                            <span className="font-medium">Market Analysis:</span>{" "}
                                            Analyzing market trends, economic indicators, and financial
                                            data to make informed investment decisions.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-black mb-2">
                                        Retirement Account Management
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                                        <li>
                                            <span className="font-medium">
                                                401(k) and IRA Management:
                                            </span>{" "}
                                            Advising on contributions, rollovers, and distributions
                                            from retirement accounts.
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="mt-12 space-y-14">

                            <section>
                                <h3 className="text-2xl sm:text-3xl font-semibold mb-5">
                                    Benefits of Investment Advisory Services
                                </h3>

                                <p className="text-gray-700 leading-relaxed max-w-4xl">
                                    Advisors have specialized knowledge and experience in financial markets,
                                    which can help in making informed investment decisions. They provide
                                    tailored advice based on the client’s unique financial situation, goals,
                                    and risk tolerance. Delegating investment management to professionals
                                    frees up time for clients to focus on other aspects of their lives.
                                    Advisors often offer holistic financial planning services that cover
                                    various aspects of financial well-being. Through diversification and
                                    careful investment selection, advisors can help reduce investment risk.
                                </p>
                            </section>

                            <section>
                                <img
                                    src="/page/about/single-service-2.webp"
                                    alt="Investment advisory discussion"
                                    className="rounded-2xl w-full object-cover max-h-[420px]"
                                />
                            </section>

                            <section>
                                <h3 className="text-xl sm:text-2xl font-semibold mb-5">
                                    Considerations when choosing an investment advisory service
                                </h3>

                                <p className="text-gray-700 leading-relaxed max-w-4xl">
                                    Look for advisors with relevant qualifications, such as Certified Financial
                                    Planner (CFP) or Chartered Financial Analyst (CFA) designations, and
                                    significant experience. Understand the fee structure (e.g., flat fees,
                                    percentage of assets under management, hourly rates) and ensure it aligns
                                    with your budget and expectations. Prefer advisors who adhere to a fiduciary
                                    standard, meaning they are legally obligated to act in your best interest.
                                    Review the advisor’s track record and performance history to gauge their
                                    effectiveness. Ensure the advisor offers services that meet your specific
                                    needs, whether it's investment management, financial planning, or retirement
                                    planning. Check client reviews, testimonials, and ask for references to
                                    understand the advisor’s reputation and client satisfaction. Assess how the
                                    advisor communicates with clients and the frequency and quality of the
                                    reports they provide.
                                </p>
                            </section>

                            <section className="mt-14">
                                <h3 className="text-2xl sm:text-3xl font-semibold mb-5">
                                    Conclusion
                                </h3>

                                <p className="text-gray-700 leading-relaxed max-w-4xl">
                                    Investment advisory services can be a valuable resource for individuals
                                    looking to effectively manage their finances and achieve their financial
                                    goals. By providing expert advice, personalized planning, and ongoing
                                    support, these services help clients navigate the complexities of
                                    investing and financial planning.
                                </p>
                            </section>

                        </div>



                    </div>

                </div>
            </section>

            <Subscribe />
        </div>
    );
}

export default ServiceDetails;
