"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PropertyListingsProps {
    propertyTitle: string;
}

const STATIC_LISTINGS = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        price: '148 470 AZN',
        address: '8 Noyabr m.',
        details: '1 otaqlı • 50,5 m² • 6/16 mərtəbə',
        date: 'Bakı, bugün 11:25',
        isNew: true,
        isVip: true
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
        price: '265 221 AZN',
        address: '8 Noyabr m.',
        details: '2 otaqlı • 89,3 m² • 7/16 mərtəbə',
        date: 'Bakı, bugün 11:25',
        isNew: false,
        isVip: true
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
        price: '247 723 AZN',
        address: '8 Noyabr m.',
        details: '2 otaqlı • 82,3 m² • 10/16 mərtəbə',
        date: 'Bakı, bugün 11:24',
        isNew: true,
        isVip: true
    }
];

export const PropertyListings: React.FC<PropertyListingsProps> = ({ propertyTitle }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentListings = STATIC_LISTINGS.slice(startIndex, endIndex);

    return (
        <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
            <div className="max-w-7xl">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <h2 className="text-[18px] md:text-[20px] font-bold">
                        {propertyTitle} YK üzrə elanlar
                    </h2>
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap">
                            Hamısı
                        </button>
                        <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors whitespace-nowrap">
                            1 otaqlılar
                        </button>
                        <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors whitespace-nowrap">
                            2 otaqlılar
                        </button>
                        <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors whitespace-nowrap">
                            3 otaqlılar
                        </button>
                        <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors whitespace-nowrap">
                            4 otaqlılar
                        </button>
                    </div>
                </div>

                <div className="text-[13px] text-[#8d94ad] mb-6">Elan sayı: 16</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {currentListings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-lg border border-[#ebeef5] overflow-hidden hover:shadow-lg transition-shadow group">
                            <div className="relative h-45 overflow-hidden">
                                <Image
                                    src={listing.image}
                                    alt={listing.address}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {listing.isNew && (
                                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-bold z-10">
                                        YENİ
                                    </div>
                                )}
                                {listing.isVip && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded text-[10px] font-bold z-10">
                                        VIP
                                    </div>
                                )}
                                <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white transition-colors z-10">
                                    <Heart size={16} className="text-gray-600" />
                                </button>
                                <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold z-10">
                                    Kompleks
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="text-[16px] font-bold mb-1">{listing.price}</div>
                                <div className="text-[13px] text-[#212326] mb-1">{listing.address}</div>
                                <div className="text-[12px] text-[#8d94ad] mb-2">{listing.details}</div>
                                <div className="text-[11px] text-[#8d94ad]">{listing.date}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        {[...Array(6)].map((_, index) => (
                            <PaginationItem key={index + 1}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
                                    isActive={currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < 6) setCurrentPage(currentPage + 1);
                                }}
                                className={currentPage === 6 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};