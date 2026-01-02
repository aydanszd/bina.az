interface PropertyLocationProps {
    location: string;
    coordinates?: { lat: number; lng: number };
}
export const PropertyLocation: React.FC<PropertyLocationProps> = ({
    location,
    coordinates = { lat: 40.3913, lng: 49.8571 }
}) => {
    return (
        <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
            <h2 className="text-[18px] md:text-[20px] font-bold mb-6">Yerləşmə</h2>
            <div className="flex gap-2 mb-4">
                <span className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] border border-[#ebeef5] cursor-default">
                    Nəsimi
                </span>
            </div>
            <div className="relative w-full h-64 md:h-100 rounded-xl overflow-hidden border border-[#ebeef5]">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=az&z=15&output=embed`}
                    style={{ border: 0 }}
                    title={`Eleven Park - ${location}`}
                    allowFullScreen
                />
                <div className="absolute top-4 left-4 flex gap-1 shadow-md bg-white rounded overflow-hidden">
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors"
                    >
                        Google Maps-da aç
                    </a>
                </div>
            </div>
        </div>
    );
};