interface AboutUsProps {
    title: string;
    imageUrl: string;
}

export const AboutUs = ({ title, imageUrl }: AboutUsProps) => {
    return (
        <>
            <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">
                {title}
            </h1>
            <img 
                src={imageUrl} 
                alt={title} 
                className="h-[600px] w-full object-cover" 
            />
        </>
    );
};
