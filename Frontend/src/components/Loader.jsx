function Loader() {
    const text = "Torado";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-9999">
            <h1 className="text-6xl font-bold flex gap-1">
                {text.split("").map((char, i) => {
                    const mirrorIndex = text.length - 1 - i;
                    const delay = Math.min(i, mirrorIndex) * 0.1;

                    return (
                        <span
                            key={i}
                            className="char"
                            style={{ animationDelay: `${delay}s` }}
                        >
                            {char}
                        </span>
                    );
                })}
            </h1>
        </div>
    );
}

export default Loader;
