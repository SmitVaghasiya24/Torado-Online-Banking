import { useEffect, useState } from "react";
import axios from "axios";
import BreadcrumbHero from "../../components/Breadcrumb";
import TermsAndConditions from "./TermsAndConditions";

export default function TermsPage() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/admin/get_page/terms-and-conditions"
                );
                setContent(res.data.data.content);
                setTitle(res.data.data.title);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, []);

    if (loading) {
        return <p className="text-center py-20">Loading...</p>;
    }

    return (
        <>
            <BreadcrumbHero
                title={title}
                image="/Breadcrumb/terms.webp"
            />

            <div className="container px-4 py-16">
                <TermsAndConditions content={content} />
            </div>
        </>
    );
}
