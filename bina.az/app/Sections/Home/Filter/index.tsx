"use client"
import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, Building2, Home, Warehouse, Building, MapPin, Store, X, Search } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function BinaFilter() {
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Rayon');
    const [selectedType, setSelectedType] = useState('Alış');
    const [selectedProperty, setSelectedProperty] = useState('Mənzil');
    const [selectedRooms, setSelectedRooms] = useState('');

    const rayonlar = [
        'Abşeron r.', 'Xutor', 'Səngəçal', 'Yeni Ramana',
        'Aşağı Güzdək', 'M.Ə.Rəsulzadə', 'Şüvəlan', 'Zabrat',
        'Atyalı', 'Sülütəpə', 'Nərimanov r.', 'Səbail r.',
        'Ceyranbatan', 'Xətai r.', 'Böyükşor', '20-ci sahə',
        'Çiçək', 'Ağ şəhər', 'Nəsimi r.', 'Badamdar',
        'Digah', 'Əhmədli', '1-ci mikrorayon', 'Bayıl',
        'Fətməyi', 'Həzi Aslanov', '2-ci mikrorayon', 'Bibiheybət',
        'Görədil', 'Köhnə Günəşli', 'Şıxov',
        'Güzdək', 'NZS', '3-cü mikrorayon',
        'Hökməli', 'Xəzər r.', '4-cü mikrorayon', 'Suraxanı r.',
        'Köhnə Corat', 'Binə', '5-ci mikrorayon', 'Bahar',
        'Kubinka', 'Bilgəh'
    ];

    return (
        <>
            <div className="bg-white border-b border-gray-200 mt-[70px]">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* Dropdowns Row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {/* Alış/Kiraye Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white">
                                    <span className="text-gray-700">{selectedType}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="bg-white border-gray-200">
                                <DropdownMenuItem onClick={() => setSelectedType('Alış')}>
                                    Alqı-satqı
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedType('Kiraye')}>
                                    Kiraye
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mənzil Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white">
                                    <span className="text-gray-700">{selectedProperty}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="bg-white border-gray-200">
                                <DropdownMenuItem onClick={() => setSelectedProperty('Mənzil')}>
                                    Mənzil
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedProperty('Həyət evi')}>
                                    Həyət evi/Bağ evi
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedProperty('Ofis')}>
                                    Ofis
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedProperty('Qaraj')}>
                                    Qaraj
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedProperty('Torpaq')}>
                                    Torpaq
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedProperty('Obyekt')}>
                                    Obyekt
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Otaq sayı Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white">
                                    <span className={selectedRooms ? "text-gray-700" : "text-gray-400"}>
                                        {selectedRooms || "Otaq sayı"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="bg-white border-gray-200">
                                <DropdownMenuItem onClick={() => setSelectedRooms('1')}>1</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedRooms('2')}>2</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedRooms('3')}>3</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedRooms('4')}>4</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedRooms('5+')}>5+</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Qiymət Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white">
                                    <span className="text-gray-400">Qiymət, ₼</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="bg-white p-0 w-[450px] border-gray-200">
                                <div className="p-4 space-y-3">
                                    <div className="flex gap-3 items-center">
                                        <input
                                            type="number"
                                            placeholder="min."
                                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base w-full"
                                        />
                                        <input
                                            type="number"
                                            placeholder="maks."
                                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base w-full"
                                        />
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Search Input with Bakı inside */}
                        <div className="flex-1 min-w-[250px] relative">
                            <input
                                type="text"
                                placeholder="Rayon, metro, nişangah"
                                className="w-full pl-4 pr-16 py-[14px] border border-gray-300 rounded-[20px] focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                                onClick={() => setShowLocationModal(true)}
                                readOnly
                            />
                            <button
                                onClick={() => setShowLocationModal(true)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 font-medium"
                            >
                                Bakı
                            </button>
                        </div>

                        {/* Filtirlər Button */}
                        <button
                            onClick={() => setShowFilterModal(true)}
                            className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white"
                        >
                            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">Filtrlər</span>
                        </button>

                        {/* Axtar Button */}
                        <button className="px-6 py-[14px] bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 transition-colors font-medium">
                            Axtar
                        </button>
                    </div>

                    {/* Property Type Icons Row */}
                    <div className="flex flex-wrap items-center gap-4">
                        <button className="group flex items-center gap-2 px-4 py-[10px] bg-gray-100 border border-gray-100 rounded-[20px] transition-colors">
                            <Building2 className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                            <span className="text-black group-hover:text-blue-600 transition-colors">
                                Yeni tikili
                            </span>
                        </button>


                        <button className="group flex items-center gap-2 px-4 py-[10px] bg-gray-100 border border-gray-100 rounded-[20px] transition-colors">
                            <Home className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                            <span className="text-black group-hover:text-blue-600 transition-colors">
                                Köhnə tikili
                            </span>
                        </button>

                        <button className="group flex items-center gap-2 px-4 py-[10px] bg-gray-100 border border-gray-100 rounded-[20px] transition-colors">
                            <Building className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                            <span className="text-black group-hover:text-blue-600 transition-colors">Həyət ev/Bağ evi</span>
                        </button>

                        <button className="group flex items-center gap-2 px-4 py-[10px] bg-gray-100 border border-gray-100 rounded-[20px] transition-colors">
                            <Store className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                            <span className="text-black group-hover:text-blue-600 transition-colors">Ofis</span>
                        </button>

                        <button className="group flex items-center gap-2 px-4 py-[10px] bg-gray-100 border border-gray-100 rounded-[20px] transition-colors">
                            <Warehouse className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                            <span className="text-black group-hover:text-blue-600 transition-colors">Qaraj</span>
                        </button>

                        <button className="group flex items-center gap-2 px-4 py-[10px] bg-gray-100 border border-gray-100 rounded-[20px] transition-colors">
                            <MapPin className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                            <span className="text-black group-hover:text-blue-600 transition-colors">Torpaq</span>
                        </button>

                        <button className="group flex items-center gap-2 px-4 py-[10px] bg-gray-100 border border-gray-100 rounded-[20px] transition-colors">
                            <Building className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors" />
                            <span className="text-black group-hover:text-blue-600 transition-colors">Obyekt</span>
                        </button>

                        <div className="ml-auto">
                            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                                Bu gün - 2089 yeni elan
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location Modal */}
            {showLocationModal && (
                <div className="fixed inset-0 bg-black/20 flex items-start justify-center z-50 pt-20">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Rayon, metro, nişangah</h2>
                                <button onClick={() => setShowLocationModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                                    Şəhər: Bakı
                                </button>
                            </div>

                            <div className="flex gap-4 mb-4">
                                <button
                                    onClick={() => setSelectedTab('Rayon')}
                                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${selectedTab === 'Rayon' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'
                                        }`}
                                >
                                    Rayon
                                </button>
                                <button
                                    onClick={() => setSelectedTab('Metro')}
                                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${selectedTab === 'Metro' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'
                                        }`}
                                >
                                    Metro
                                </button>
                                <button
                                    onClick={() => setSelectedTab('Nişangah')}
                                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${selectedTab === 'Nişangah' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'
                                        }`}
                                >
                                    Nişangah
                                </button>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rayon, metro, nişangah"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[400px]">
                            <div className="grid grid-cols-4 gap-4">
                                {rayonlar.map((rayon, index) => (
                                    <button
                                        key={index}
                                        className="text-left px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-gray-700 hover:text-blue-600"
                                    >
                                        {rayon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLocationModal(false)}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Sıfırla
                            </button>
                            <button
                                onClick={() => setShowLocationModal(false)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                50359 elanı göstər
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black/20 flex items-start justify-center z-50 pt-20">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Ətraflı axtarış</h2>
                                <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[500px] space-y-6">
                            {/* Yerləşmə */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Yerləşmə</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Rayon, metro, nişangah"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                    <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">Bakı</button>
                                </div>
                            </div>

                            {/* Alqı-satqı növü */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Alqı-satqı növü</label>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Alış</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Kiraye</button>
                                </div>
                            </div>

                            {/* Əmlakın növü */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Əmlakın növü</label>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Mənzil</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Həyət evi/Bağ evi</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Ofis</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Qaraj</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Torpaq</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Obyekt</button>
                                </div>
                            </div>

                            {/* Tikilinin növü */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tikilinin növü</label>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Yeni tikili</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Köhnə tikili</button>
                                </div>
                            </div>

                            {/* Qiymət */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Qiymət, ₼</label>
                                <div className="flex gap-2 items-center">
                                    <input type="number" placeholder="min." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                    <span className="text-gray-500">-</span>
                                    <input type="number" placeholder="maks." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm">Çıxarış var</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm">İpoteka var</span>
                                    </label>
                                </div>
                            </div>

                            {/* Otaq sayı */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Otaq sayı</label>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">1</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">4</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">5+</button>
                                </div>
                            </div>

                            {/* Təmir */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Təmir</label>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Fərqi yoxdur</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Təmirli</button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Təmirsiz</button>
                                </div>
                            </div>

                            {/* Sahə */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sahə (m²)</label>
                                <div className="flex gap-2 items-center">
                                    <input type="number" placeholder="min." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                    <span className="text-gray-500">-</span>
                                    <input type="number" placeholder="maks." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex gap-3 justify-end">
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Sıfırla
                            </button>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                50359 elanı göstər
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}