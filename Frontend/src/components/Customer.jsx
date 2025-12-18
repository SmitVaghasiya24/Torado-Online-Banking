import { useEffect, useRef, useState } from "react";

const stats = [
    {
        bg: "bg-indigo-200",
        start: 100,
        end: 800,
        suffix: "K+",
        label: "Happy Customers",
        image: "/page/about/counter-icon-1.svg",
    },
    {
        bg: "bg-[#d8c2ad]",
        start: 1,
        end: 25,
        suffix: "+",
        label: "Years in banking",
        image: "/page/about/counter-icon-2.svg",
    },
    {
        bg: "bg-teal-200",
        start: 1,
        end: 150,
        suffix: "+",
        label: "Branches",
        image: "/page/about/counter-icon-3.svg",
    },
];

// ✅ Hook is ALWAYS called
function useCountUp(start, end, shouldStart, duration = 1500) {
    const [value, setValue] = useState(start);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime = null;

        const animate = (time) => {
            if (!startTime) startTime = time;

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            const current = Math.floor(
                start + (end - start) * progress
            );

            setValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [start, end, duration, shouldStart]);

    return value;
}

export default function StatsCounter() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    // 👇 Start when section enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // run once
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="space-y-6">
            {stats.map((s, i) => {
                // ✅ Hook ALWAYS called
                const count = useCountUp(
                    s.start,
                    s.end,
                    visible
                );

                return (
                    <div
                        key={i}
                        className={`${s.bg} rounded-2xl p-6`}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={s.image}
                                alt={s.label}
                                className="w-12 h-12 object-contain shrink-0"
                            />

                            <div>
                                <p className="text-3xl font-semibold">
                                    {count}
                                    {s.suffix}
                                </p>
                                <p className="text-gray-700">
                                    {s.label}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
