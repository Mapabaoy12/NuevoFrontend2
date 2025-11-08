interface AboutContentProps {
    paragraphs: string[];
    sectionTitle?: string;
}

export const AboutContent = ({ paragraphs, sectionTitle }: AboutContentProps) => {
    return (
        <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800">
            {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            
            {sectionTitle && (
                <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
                    {sectionTitle}
                </h2>
            )}
        </div>
    );
};
