"use client";
import { useState } from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Property } from '@/types/homepage';

interface PropertySidebarProps {
    property: Property;
}

export const PropertySidebar: React.FC<PropertySidebarProps> = ({ property }) => {
    const [showNumber, setShowNumber] = useState(false);

    return (
        <div className="bg-[#f8f9fb] rounded-xl border border-[#f0f2f7] p-6 lg:sticky top-6 shadow-sm">
            <div className="flex justify-between items-start mb-8">
                <h3 className="text-[20px] md:text-[22px] font-bold leading-tight">
                    {property.title}
                </h3>
                <div className="w-12.5 h-12.5 bg-[#004a7c] rounded-md flex items-center justify-center p-2 shrink-0">
                    <div className="text-[8px] text-white font-black text-center leading-tight">
                        {property.title.split(' ').slice(0, 2).map((word, i) => (
                            <div key={i}>{word.toUpperCase()}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {property.area && (
                    <div className="flex justify-between text-[14px] pb-3 border-b border-[#e0e4ed]">
                        <span className="text-[#8d94ad]">Sahə (m²)</span>
                        <span className="font-bold">{property.area}</span>
                    </div>
                )}
                {property.price && (
                    <div className="flex justify-between text-[14px] pb-3 border-b border-[#e0e4ed]">
                        <span className="text-[#8d94ad]">Qiymət</span>
                        <span className="font-bold">
                            {typeof property.price === 'number' 
                                ? property.price.toLocaleString() 
                                : property.price} AZN
                        </span>
                    </div>
                )}
                <div className="flex justify-between text-[14px]">
                    <span className="text-[#8d94ad]">Təhvil tarixi</span>
                    <span className="font-bold text-[#4CAF50]">2028-ci ilin mart ayı</span>
                </div>
            </div>

            <div className="space-y-4 mb-8 text-[13px]">
                <div className="flex gap-3 items-start">
                    <Clock size={18} className="text-[#8d94ad] shrink-0 mt-0.5" />
                    <div className="text-[#212326]">
                        <p>Bazar ertəsi - Cümə: 09:00-18:00</p>
                        <p>Şənbə: 10:00-17:00</p>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <MapPin size={18} className="text-[#8d94ad] shrink-0 mt-0.5" />
                    <p className="text-[#212326] leading-relaxed underline decoration-dotted cursor-pointer hover:text-blue-600">
                        {property.location}
                    </p>
                </div>
            </div>

            <button
                onClick={() => setShowNumber(!showNumber)}
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-lg py-4 flex flex-col items-center justify-center transition-all shadow-md group overflow-hidden relative"
            >
                <div className="flex items-center gap-2 font-bold text-[16px] z-10">
                    <Phone size={20} fill="white" />
                    <span>{showNumber ? '(050) 271-11-**' : 'Nömrəni göstər'}</span>
                </div>
                {!showNumber && (
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                )}
            </button>
        </div>
    );
};