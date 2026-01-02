import { Percent, CircleDollarSign } from 'lucide-react';
export const PropertyFeatures: React.FC = () => {
    return (
        <div className="space-y-5 mb-12">
            <div className="flex gap-4 items-start">
                <div className="bg-[#f1fcf5] p-2 rounded-lg text-[#4CAF50]">
                    <Percent size={18} />
                </div>
                <div>
                    <h4 className="text-[14px] font-bold">İpoteka</h4>
                    <p className="text-[13px] text-[#8d94ad]">
                        30% ilkin ödəniş, 22 il müddətinə, illik 10.5%
                    </p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-[#fff9f1] p-2 rounded-lg text-[#ff9800]">
                    <CircleDollarSign size={18} />
                </div>
                <div>
                    <h4 className="text-[14px] font-bold">Daxili kredit</h4>
                    <p className="text-[13px] text-[#8d94ad]">
                        3 illik daxili kredit illik 11% ilə
                    </p>
                </div>
            </div>
        </div>
    );
};