import Download from "../../components/Download";

function TermsAndConditions({ content }) {
    if (!content) return null;

    const sections = content.split("\n\n");

    return (
        <>
            <div className="space-y-10">
                {sections.map((block, index) => {
                    const lines = block.split("\n");
                    const firstLine = lines[0].trim();

                    if (
                        firstLine.endsWith(":") ||
                        (/^[A-Z][A-Za-z\s,&]+$/.test(firstLine) && firstLine.length < 80)
                    ) {
                        return (
                            <div key={index} className="space-y-4">
                                <h2 className="text-2xl font-semibold">
                                    {firstLine.replace(":", "")}
                                </h2>

                                {lines.slice(1).map((line, i) => (
                                    <p
                                        key={i}
                                        className="text-gray-700 leading-relaxed"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        );
                    }

                    const sentences = block
                        .split(". ")
                        .map(s => s.trim())
                        .filter(s => s.length > 40);

                    if (sentences.length >= 2) {
                        return (
                            <ol
                                key={index}
                                className="list-decimal pl-6 space-y-3 text-gray-700"
                            >
                                {sentences.map((item, i) => (
                                    <li key={i}>
                                        {item.endsWith(".") ? item : item + "."}
                                    </li>
                                ))}
                            </ol>
                        );
                    }

                    return (
                        <p
                            key={index}
                            className="text-gray-700 leading-relaxed"
                        >
                            {block}
                        </p>
                    );
                })}
            </div>

          
            <Download/>
        </>
    );
}

export default TermsAndConditions;
