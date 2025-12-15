import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import TermsAndConditions from "./TermsAndConditions";

export default function CmsPage() {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/admin/get_page/${slug}`
                );
                setPage(res.data.data);
            } catch (error) {
                console.error("Page fetch failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [slug]);

    if (loading) {
        return <p className="text-center py-20">Loading...</p>;
    }

    if (!page) {
        return <p className="text-center py-20">Page not found</p>;
    }

    return (
        <>
            <BreadcrumbHero
                title={page.title}
                image="/Breadcrumb/terms.webp"
            />

            <div className="max-w-6xl mx-auto px-4 py-16">
                <TermsAndConditions content={page.content} />
            </div>
        </>
    );
}
