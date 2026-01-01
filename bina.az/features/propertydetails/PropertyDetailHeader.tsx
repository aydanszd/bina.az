interface PropertyHeaderProps {
    title: string;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ title }) => {
    return (
        <>
            <div className="max-w-350 mx-auto px-4 py-4 flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-2 text-[#8d94ad]">
                    <span className="hover:text-blue-600 cursor-pointer underline decoration-dotted">
                        Yaşayış kompleksləri
                    </span>
                    <span>/</span>
                    <span className="text-[#212326]">{title}</span>
                </div>
            </div>
            <div className="max-w-350 mx-auto px-4">
                <h1 className="text-[24px] md:text-[32px] font-bold mb-6">{title}</h1>
            </div>
        </>
    );
};