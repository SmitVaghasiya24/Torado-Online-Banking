export default function FolderCard({
    children,
    className = "",
    bgColor = "#f6f7f8",
    borderColor = "#d9d9d9",
}) {
    return (
        <div className={`relative w-full min-h-[200px] ${className}`}>
            <svg
                viewBox="0 0 400 240"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
            >
                <path
                    d="
                        M 40 240
                        Q 20 240 20 220    
                        L 20 70
                        Q 20 35 55 35     
                        L 180 35
                        L 235 35
                        L 265 60
                        L 340 60
                        Q 380 60 380 95     
                        L 380 220
                        Q 380 240 360 240   
                        Z
                    "
                    fill={bgColor}
                    stroke={borderColor}
                    strokeWidth="2"
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
