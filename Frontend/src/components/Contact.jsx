import { useEffect, useState } from "react";
import axios from "axios";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";

function Contact() {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetchContact(controller.signal);

        return () => controller.abort();
    }, []);

    const fetchContact = async (signal) => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/get_contact",
                { signal }
            );

            if (res.data.success) {
                setContact(res.data.data);
            }
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error(err);
            }
        }
    };

    if (!contact) return null;

    return (
        <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-4">
                Need help?
            </h4>

            {/* Phone */}
            <div className="mb-4">
                <div className="flex items-center gap-4 mb-1">
                    <FiPhone className="text-[#86AA42]" size={20} />
                    <p className="text-sm font-medium text-black">
                        Phone
                    </p>
                </div>

                <div className="pl-8">
                    {contact.phone?.map((ph, i) => (
                        <p key={i} className="text-gray-700 text-sm">
                            {ph}
                        </p>
                    ))}
                </div>
            </div>

            {/* Email */}
            <div>
                <div className="flex items-center gap-4 mb-1">
                    <FiMail className="text-[#86AA42]" size={20} />
                    <p className="text-sm font-medium text-black">
                        Email
                    </p>
                </div>

                <div className="pl-8">
                    {contact.email?.map((em, i) => (
                        <p key={i} className="text-gray-700 text-sm">
                            {em}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contact;
