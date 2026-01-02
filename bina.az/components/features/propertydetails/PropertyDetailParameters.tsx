import { Calendar, Home, Hash, Layers, Users, ChevronDown } from 'lucide-react';

const STATIC_PARAMETERS = [
    { label: 'Təhvil tarixi', value: '2028-ci ilin mart ayı', icon: Calendar },
    { label: 'Korpus sayı', value: '9', icon: Home },
    { label: 'Blok sayı', value: '11', icon: Hash },
    { label: 'Hər blokda lift sayı', value: '2', icon: Layers },
    { label: 'Binada mərtəbələr', value: '16', icon: Layers },
    { label: 'Hər mərtəbədə mənzil sayı', value: '4-8', icon: Users },
];

export const PropertyParameters: React.FC = () => {
    return (
        <div className="mb-12">
            <h2 className="text-[18px] md:text-[20px] font-bold mb-6">Parametrlər</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {STATIC_PARAMETERS.map((param, i) => (
                    <div
                        key={i}
                        className="border border-[#ebeef5] rounded-xl p-4 min-h-27.5 flex flex-col justify-between hover:border-[#8d94ad] transition-colors"
                    >
                        <param.icon size={20} className="text-[#8d94ad]" />
                        <div>
                            <p className="text-[11px] text-[#8d94ad] mb-1">{param.label}</p>
                            <p className="text-[14px] font-bold leading-tight">{param.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-3 border border-[#ebeef5] rounded-lg text-blue-600 text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                Bütün parametrlər <ChevronDown size={16} />
            </button>
        </div>
    );
};