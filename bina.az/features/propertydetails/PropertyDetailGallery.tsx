"use client";
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { MapPin } from 'lucide-react';
import 'react-photo-view/dist/react-photo-view.css';
import { Property } from '@/types/homepage';

interface PropertyGalleryProps {
    property: Property;
    relatedProperties: Property[];
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
    property,
    relatedProperties
}) => {
    const images = [property.image1, property.image2, property.image3]
        .filter((img): img is string => Boolean(img));

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
            <PhotoProvider>
                {images.length > 0 ? (
                    <>
                        <div className="md:col-span-2 relative md:rounded-l-lg rounded-lg overflow-hidden group h-64 md:h-110">
                            <PhotoView src={images[0]}>
                                <Image
                                    src={images[0]}
                                    alt="Main"
                                    fill
                                    className="object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                />
                            </PhotoView>
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                                <div className="bg-[#212326]/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] md:text-[13px] flex items-center gap-2">
                                    <MapPin size={14} />
                                    <span className="max-w-37.5 md:max-w-none truncate">
                                        {property.location.length > 45
                                            ? property.location.substring(0, 45) + '...'
                                            : property.location}
                                    </span>
                                </div>
                                {relatedProperties.length > 0 && (
                                    <div className="bg-[#212326]/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] md:text-[13px]">
                                        Elan sayı: {relatedProperties.length}
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex flex-col sm:flex-row gap-2 md:gap-3 z-10 w-[calc(100%-2rem)]">
                                <button className="bg-[#4CAF50] text-white px-4 md:px-8 py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm shadow-lg active:scale-95 transition-all w-full sm:w-auto">
                                    Əlaqə
                                </button>
                                <button className="bg-[#4169E1] text-white px-4 md:px-8 py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm shadow-lg active:scale-95 transition-all w-full sm:w-auto">
                                    Elanları göstər
                                </button>
                            </div>
                        </div>
                        <div className="md:col-span-1 flex flex-row md:flex-col gap-2 h-48 md:h-110">
                            {images[1] ? (
                                <div className="flex-1 rounded-tr-lg md:rounded-tr-lg rounded-lg overflow-hidden group relative">
                                    <PhotoView src={images[1]}>
                                        <Image
                                            src={images[1]}
                                            alt="Side 1"
                                            fill
                                            className="object-cover cursor-pointer transition-opacity group-hover:opacity-90"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </PhotoView>
                                </div>
                            ) : (
                                <div className="flex-1 bg-gray-100 rounded-tr-lg flex items-center justify-center text-gray-400 text-sm">
                                    Şəkil yoxdur
                                </div>
                            )}
                            {images[2] ? (
                                <div className="flex-1 relative rounded-br-lg md:rounded-br-lg rounded-lg overflow-hidden group">
                                    <PhotoView src={images[2]}>
                                        <Image
                                            src={images[2]}
                                            alt="Side 2"
                                            fill
                                            className="object-cover cursor-pointer transition-opacity group-hover:opacity-90"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </PhotoView>
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none group-hover:bg-black/30 transition-colors">
                                        <span className="bg-white text-[#212326] text-[13px] font-medium px-5 py-2 rounded-md shadow-sm">
                                            Bütün şəkillər
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 bg-gray-100 rounded-br-lg flex items-center justify-center text-gray-400 text-sm">
                                    Şəkil yoxdur
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="col-span-3 h-110 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        Şəkil mövcud deyil
                    </div>
                )}
            </PhotoProvider>
        </div>
    );
};