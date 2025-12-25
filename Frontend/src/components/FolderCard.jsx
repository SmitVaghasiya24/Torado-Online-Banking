export default function FolderCard({
    children,
    className = "",
    bgColor = "#f6f7f8",
    borderColor = "#d9d9d9",
    headerHeight = 60,
}) {
    const totalHeight = 250;
    const bottom = totalHeight - 2;
    const h = headerHeight;

    return (
        <div className={`relative w-full min-h-[200px] ${className}`}>
            <svg
                viewBox={`0 0 400 ${totalHeight}`}
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
            >
                <path
                    d={`
            M 40 ${bottom}
            Q 20 ${bottom} 20 ${bottom - 20}
            L 20 ${h + 10}
            Q 20 35 55 35
            L 285 35
            L 285 35
            L 310 ${h}
            L 340 ${h}
            Q 380 ${h} 380 ${h + 35}
            L 380 ${bottom - 20}
            Q 380 ${bottom} 360 ${bottom}
            Z
          `}
                    fill={bgColor}
                    stroke={borderColor}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <div className="relative z-10 px-8 py-10">
                {children}
            </div>
        </div>
    );
}
