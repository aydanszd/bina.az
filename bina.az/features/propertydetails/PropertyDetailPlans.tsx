const STATIC_PLANS = [
    { rooms: '1 otaqlılar', price: '143 925 AZN-dən' },
    { rooms: '2 otaqlılar', price: '230 440 AZN-dən' },
    { rooms: '3 otaqlılar', price: '363 440 AZN-dən' },
    { rooms: '4 otaqlılar', price: '502 600 AZN-dən' }
];

export const PropertyPlans: React.FC = () => {
    return (
        <div className="bg-[#f8f9fb] rounded-lg p-4 md:p-5 flex flex-col md:flex-row md:items-center mb-10 border border-[#f0f2f7] gap-4">
            <span className="font-bold text-[15px] md:mr-auto">Planlar</span>
            <div className="grid grid-cols-2 md:flex md:flex-1 gap-3 md:gap-0">
                {STATIC_PLANS.map((plan, i) => (
                    <div key={i} className="text-center px-3 md:px-6 md:border-l border-[#e0e4ed] md:first:border-l-0">
                        <div className="text-[12px] text-[#8d94ad] mb-1">{plan.rooms}</div>
                        <div className="text-[13px] md:text-[14px] font-bold">{plan.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};