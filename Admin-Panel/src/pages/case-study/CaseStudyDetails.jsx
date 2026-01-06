import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, MapPin, Briefcase } from "lucide-react";

function CaseStudyDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaseStudy = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/admin/get_case_study/slug/${slug}`
                );

                if (res.data.success) {
                    setCaseStudy(res.data.data);
                }
            } catch (error) {
                console.error("Fetch case study error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseStudy();
    }, [slug]);

    if (loading) {
        return <div className="p-6 text-gray-500">Loading case study...</div>;
    }

    if (!caseStudy) {
        return (
            <div className="p-6">
                <p className="text-gray-600">Case study not found</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-blue-600 underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm cursor-pointer bg-black text-white px-4 py-2 rounded"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        {caseStudy.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Slug: {caseStudy.slug}
                    </p>
                </div>

                <span
                    className={`self-start px-4 py-1.5 rounded-full text-sm font-medium ${caseStudy.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {caseStudy.status}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {caseStudy.thumbnail && (
                    <div className="inline-flex border border-gray-200 rounded-2xl p-4 shadow-sm bg-white self-start">
                        <img
                            src={caseStudy.thumbnail}
                            alt={caseStudy.title}
                            className="h-48 object-cover rounded-xl"
                        />
                    </div>
                )}

                <div className="flex-1 flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                        <InfoCard
                            label="Client"
                            value={caseStudy.client}
                            icon={<Briefcase size={16} />}
                        />
                        <InfoCard
                            label="Sector"
                            value={caseStudy.sector}
                        />
                        <InfoCard
                            label="Location"
                            value={caseStudy.location}
                            icon={<MapPin size={16} />}
                        />
                        <InfoCard
                            label="Status"
                            value={caseStudy.status}
                        />
                    </div>
                </div>
            </div>


            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                    {caseStudy.overview}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DateCard
                    label="Created At"
                    date={caseStudy.created_at}
                />
                <UserCard
                    label="Created By"
                    value={`Admin #${caseStudy.created_by}`}
                />
                <DateCard
                    label="Updated At"
                    date={caseStudy.updated_at}
                />
                <UserCard
                    label="Updated By"
                    value={`Admin #${caseStudy.updated_by}`}
                />
            </div>
        </div>
    );
}

function InfoCard({ label, value, icon }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                {icon}
                <span>{label}</span>
            </div>
            <p className="font-medium text-gray-900">{value || "-"}</p>
        </div>
    );
}

function DateCard({ label, date }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar size={16} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-900">
                    {new Date(date).toLocaleString()}
                </p>
            </div>
        </div>
    );
}

function UserCard({ label, value }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="font-medium text-gray-900">
                {value || "-"}
            </p>
        </div>
    );
}

export default CaseStudyDetails;
