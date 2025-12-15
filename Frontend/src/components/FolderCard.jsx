export default function FolderCard({ children }) {
    return (
        <div className="relative w-full max-w-[330px]">

            <svg width="100%" height="100%" viewBox="0 0 400 240">
                <path d="
                M 40 240
                Q 20 240 20 220    
                L 20 70
                Q 20 35 55 35     
                L 180 35
                Q 205 35 220 48 
                Q 235 60 270 60
                L 340 60
                Q 380 60 380 95     
                L 380 220
                Q 380 240 360 240   
                Z
            "
                    fill="#f6f7f8"
                    stroke="#d9d9d9"
                    stroke-width="2" />
            </svg>

            <div className="absolute inset-0 px-8 py-14">
                {children}
            </div>

        </div>
    );
}
