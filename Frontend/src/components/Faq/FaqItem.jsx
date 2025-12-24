import { useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function FaqItem({ faq, isOpen, onToggle }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!contentRef.current) return;

        if (isOpen) {
            contentRef.current.style.height =
                contentRef.current.scrollHeight + "px";
        } else {
            contentRef.current.style.height = "0px";
        }
    }, [isOpen]);

    return (
        <div
            className={`
                border rounded-xl px-5 py-4
                transition-colors duration-300
                ${isOpen ? "border-black" : "border-gray-200"}
            `}
        >
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex cursor-pointer justify-between items-center text-left gap-4"
            >
                <h3 className="font-medium cursor-pointer text-lg">
                    {faq.question}
                </h3>

                <FiChevronDown
                    className={`
                        text-xl  cursor-pointer transition-transform duration-300
                        ${isOpen ? "rotate-180 text-black" : "text-gray-500"}
                    `}
                />
            </button>

            <div
                ref={contentRef}
                className="
                    overflow-hidden
                    transition-[height] duration-300 ease-in-out
                "
                style={{ height: 0 }}
            >
                <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
}
