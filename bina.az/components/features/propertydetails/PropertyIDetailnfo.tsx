interface PropertyInfoProps {
    title: string;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({ title }) => {
    return (
        <div className="mb-10">
            <h2 className="text-[18px] md:text-[20px] font-bold mb-2">
                {title} tikinti şirkətinə məxsus yaşayış kompleksi
            </h2>
            <div className="flex gap-4 text-[13px] text-[#8d94ad]">
                <span>Korpus sayı: 9</span>
                <span className="text-[#e0e4ed]">|</span>
                <span>Mərtəbə sayı: 16</span>
            </div>
        </div>
    );
};