import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";

function CaseStudyDetails() {
    const { slug } = useParams();

    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        fetchCaseStudy(controller.signal);

        return () => controller.abort();
    }, [slug]);

    const fetchCaseStudy = async (signal) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/api/admin/get_case_study/slug/${slug}`,
                { signal }
            );

            if (res.data.success) {
                setCaseStudy(res.data.data);
            }
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error("Case study fetch error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="container mx-auto py-20 text-center">
                Loading case study...
            </section>
        );
    }

    if (!caseStudy) {
        return (
            <section className="container mx-auto py-20 text-center">
                Case study not found.
            </section>
        );
    }

    return (
        <div>
            <BreadcrumbHero
                title={caseStudy.title}
                image="/Breadcrumb/casestudy.webp"
            />

            <section className="container mx-auto px-4 py-20">

                <h1 className="text-3xl sm:text-5xl font-semibold mb-8">
                    {caseStudy.title}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">

                    <div className="flex items-center gap-4 bg-[#D0F7EA] rounded-xl px-5 py-4">
                        <img src="/page/about/reputation.svg" alt="" />
                        <div>
                            <p className="text-4xl font-semibold">Client</p>
                            <p className="font-semibold text-gray-800">
                                {caseStudy.client}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-[#BDC1F2] rounded-xl px-5 py-4">
                        <img src="/page/about/solar-energy.svg" alt="" />
                        <div>
                            <p className="text-4xl font-semibold">Sector</p>
                            <p className="font-semibold text-gray-800">
                                {caseStudy.sector}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-[#CCDDBB] rounded-xl px-5 py-4">
                        <img src="/page/about/map-5.svg" alt="" />
                        <div>
                            <p className="text-4xl font-semibold">Location</p>
                            <p className="font-semibold text-gray-800">
                                {caseStudy.location}
                            </p>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

                    <div>
                        <h3 className="font-semibold text-2xl mb-3">Overview</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {caseStudy.overview}
                        </p>

                        <div className="mb-12">
                            <h3 className="font-semibold text-2xl mt-6 mb-4">Challenges</h3>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    <strong>High Initial Capital Requirements:</strong>{" "}
                                    Solar installations require significant upfront investment, which posed a barrier for widespread adoption in financially constrained communities.
                                </p>
                                <p>
                                    <strong>Limited Access to Financing:</strong>{" "}
                                    Solar installations require significant upfront investment, which posed a barrier for widespread adoption in financially constrained communities.
                                </p>
                                <p>
                                    <strong>Technical & Logistical Issues:</strong>{" "}
                                    Remote locations presented difficulties in terms of logistics, installation, and maintenance of solar energy systems.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img
                            src={caseStudy.thumbnail}
                            alt={caseStudy.title}
                            className="w-full rounded-2xl object-cover"
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">

                    <div className="bg-[#E5ECD2] rounded-2xl p-6">
                        <h3 className="font-semibold mb-4">Approach</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>
                                <strong>Structured financing solutions:</strong>{" "}
                                Implemented flexible financing options such as micro-financing and pay-as-you-go models
                                to make solar technology more accessible to rural households.
                            </li>

                            <li><strong>Public–private partnerships:</strong>{" "}
                                Collaborated with local governments and NGOs to facilitate project implementation and secure additional funding and support.
                            </li>

                            <li><strong>Capacity-Building Programs:</strong>{" "}
                                Established training programs to educate and equip local technicians with the skills needed for the installation and maintenance of solar systems, ensuring long-term sustainability and self-sufficiency.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#F2F0F0] rounded-2xl p-6">
                        <h3 className="font-semibold mb-4">Impact</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                            <li><strong>Improved Energy Access:</strong>{" "}
                                Equipped over 1,000 households with solar panels, significantly reducing their reliance on kerosene and diesel generators, which are both costly and environmentally harmful.
                            </li>
                            <li><strong>Enhanced Quality of Life:</strong>{" "}
                                The improved energy access facilitated economic activities such as small businesses and extended study hours for students, contributing to better education.
                            </li>
                            <li><strong>Environmental Benefits:</strong>{" "}
                                Achieved an annual reduction of approximately 10,000 tons of CO2 emissions, contributing to global efforts to combat climate change and demonstrating the environmental benefits of transitioning to renewable energy sources.
                            </li>

                        </ul>
                    </div>

                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-2xl mb-3">Conclusion</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Renewable energy projects have the potential to transform rural communities by providing sustainable energy solutions, fostering economic development, and improving quality of life. The case studies from India, Mexico, and Rwanda demonstrate the diverse approaches and positive impacts of renewable energy in rural settings. For successful implementation, it is crucial to involve the community, secure sustainable funding, and build local capacity.
                    </p>
                </div>

            </section>
        </div>
    );
}

export default CaseStudyDetails;
