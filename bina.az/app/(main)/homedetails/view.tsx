"use client";
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import {
  MapPin, Eye, Clock, Calendar,
  Home, Hash, Layers, Users, Phone,
  Percent, CircleDollarSign, ChevronDown, Heart
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import 'react-photo-view/dist/react-photo-view.css';
import type { PropertyDetailProps, StaticPlan, StaticParameter, Listing } from '@/app/types/homedetail';

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, relatedProperties = [] }) => {
  const [showNumber, setShowNumber] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil((relatedProperties?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = relatedProperties?.slice(startIndex, endIndex) || [];
  const images = [property.image1, property.image2, property.image3]
    .filter((img): img is string => Boolean(img));

  const staticPlans: StaticPlan[] = [
    { rooms: '1 otaqlılar', price: '143 925 AZN-dən' },
    { rooms: '2 otaqlılar', price: '230 440 AZN-dən' },
    { rooms: '3 otaqlılar', price: '363 440 AZN-dən' },
    { rooms: '4 otaqlılar', price: '502 600 AZN-dən' }
  ];

  const staticParameters: StaticParameter[] = [
    { label: 'Təhvil tarixi', value: '2028-ci ilin mart ayı', icon: Calendar },
    { label: 'Korpus sayı', value: '9', icon: Home },
    { label: 'Blok sayı', value: '11', icon: Hash },
    { label: 'Hər blokda lift sayı', value: '2', icon: Layers },
    { label: 'Binada mərtəbələr', value: '16', icon: Layers },
    { label: 'Hər mərtəbədə mənzil sayı', value: '4-8', icon: Users },
  ];

  const staticAbout = `"Winter City Group" 20 ildir ki, tikinti sahəsində fəaliyyət göstərir və beynəlxalq standartlara uyğun premium sinif binalar inşa edir. Biz şəhərin arxitekturasına uyğun, sakinləri üçün tam rahat və təhlükəsiz yaşayış komplekslərini təqdim edirik. Tamamlanmış və davam edən layihələrimiz gördüyümüz yüksək səviyyəli işin nümunəsidir.`;

  const staticAboutExtra = `Yeni layihəmiz Həsən Əliyev və Cəlil Məmmədquluzadə küçələrinin kəsişməsində yerləşən "Eleven Park" layihəsidir. "Eleven Park" sizlərə 1, 2, 3 və 4 otaqlı mənzillər təklif edir.`;

  return (
    <div className="min-h-screen mt-18 bg-white text-[#212326] antialiased max-w-7xl mx-auto">
      <div className="max-w-350 mx-auto px-4 py-4 flex justify-between items-center text-[13px]">
        <div className="flex items-center gap-2 text-[#8d94ad]">
          <span className="hover:text-blue-600 cursor-pointer underline decoration-dotted">Yaşayış kompleksləri</span>
          <span>/</span>
          <span className="text-[#212326]">{property.title}</span>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-4 pb-20">
        <h1 className="text-[32px] font-bold mb-6">{property.title}</h1>
        <div className="grid grid-cols-3 gap-2 mb-8">
          <PhotoProvider>
            {images.length > 0 ? (
              <>
                <div className="col-span-2 relative rounded-l-lg overflow-hidden group h-110">
                  <PhotoView src={images[0]}>
                    <img
                      src={images[0]}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                      alt="Main"
                    />
                  </PhotoView>
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <div className="bg-[#212326]/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[13px] flex items-center gap-2">
                      <MapPin size={14} /> {property.location.length > 45 ? property.location.substring(0, 45) + '...' : property.location}
                    </div>
                    {relatedProperties.length > 0 && (
                      <div className="bg-[#212326]/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[13px]">
                        Elan sayı: {relatedProperties.length}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                    <button className="bg-[#4CAF50] text-white px-8 py-2.5 rounded-md font-bold text-sm shadow-lg active:scale-95 transition-all">
                      Əlaqə
                    </button>
                    <button className="bg-[#4169E1] text-white px-8 py-2.5 rounded-md font-bold text-sm shadow-lg active:scale-95 transition-all">
                      Elanları göstər
                    </button>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col gap-2 h-110">
                  {images[1] ? (
                    <div className="flex-1 rounded-tr-lg overflow-hidden group">
                      <PhotoView src={images[1]}>
                        <img
                          src={images[1]}
                          className="w-full h-full object-cover cursor-pointer transition-opacity group-hover:opacity-90"
                          alt="Side 1"
                        />
                      </PhotoView>
                    </div>
                  ) : (
                    <div className="flex-1 bg-gray-100 rounded-tr-lg flex items-center justify-center text-gray-400 text-sm">
                      Şəkil yoxdur
                    </div>
                  )}
                  {images[2] ? (
                    <div className="flex-1 relative rounded-br-lg overflow-hidden group">
                      <PhotoView src={images[2]}>
                        <img
                          src={images[2]}
                          className="w-full h-full object-cover cursor-pointer transition-opacity group-hover:opacity-90"
                          alt="Side 2"
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

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-[#f8f9fb] rounded-lg p-5 flex items-center mb-10 border border-[#f0f2f7]">
              <span className="font-bold text-[15px] mr-auto">Planlar</span>
              {staticPlans.map((plan, i) => (
                <div key={i} className="text-center px-6 border-l border-[#e0e4ed] first:border-l-0">
                  <div className="text-[12px] text-[#8d94ad] mb-1">{plan.rooms}</div>
                  <div className="text-[14px] font-bold">{plan.price}</div>
                </div>
              ))}
            </div>
            <div className="mb-10">
              <h2 className="text-[20px] font-bold mb-2">{property.title} tikinti şirkətinə məxsus yaşayış kompleksi</h2>
              <div className="flex gap-4 text-[13px] text-[#8d94ad]">
                <span>Korpus sayı: 9</span>
                <span className="text-[#e0e4ed]">|</span>
                <span>Mərtəbə sayı: 16</span>
              </div>
            </div>
            <div className="space-y-5 mb-12">
              <div className="flex gap-4 items-start">
                <div className="bg-[#f1fcf5] p-2 rounded-lg text-[#4CAF50]">
                  <Percent size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">İpoteka</h4>
                  <p className="text-[13px] text-[#8d94ad]">30% ilkin ödəniş, 22 il müddətinə, illik 10.5%</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-[#fff9f1] p-2 rounded-lg text-[#ff9800]">
                  <CircleDollarSign size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">Daxili kredit</h4>
                  <p className="text-[13px] text-[#8d94ad]">3 illik daxili kredit illik 11% ilə</p>
                </div>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-[20px] font-bold mb-6">Parametrlər</h2>
              <div className="grid grid-cols-4 gap-3">
                {staticParameters.map((param, i) => (
                  <div key={i} className="border border-[#ebeef5] rounded-xl p-4 min-h-27.5 flex flex-col justify-between hover:border-[#8d94ad] transition-colors">
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
            <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
              <h2 className="text-[20px] font-bold mb-6">Ümumi məlumat</h2>
              <div className="text-[14px] leading-[1.6] text-[#212326] space-y-4">
                <p>{staticAbout}</p>
                <p>{staticAboutExtra}</p>
              </div>
            </div>
            <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
              <h2 className="text-[20px] font-bold mb-6">Yerləşmə</h2>
              <div className="flex gap-2 mb-4">
                <span className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] border border-[#ebeef5] cursor-default">
                  Nəsimi
                </span>
              </div>
              <div className="relative w-full h-100 rounded-xl overflow-hidden border border-[#ebeef5]">
                <iframe
                  width="100%"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?q=40.3913,49.8571&hl=az&z=15&output=embed"
                  style={{ border: 0 }}
                  title="Eleven Park - Bakı, Nəsimi"
                  allowFullScreen
                ></iframe>
                <div className="absolute top-4 left-4 flex gap-1 shadow-md bg-white rounded overflow-hidden">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=40.3913,49.8571"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors"
                  >
                    Google Maps-da aç
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
              <div className="max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px] font-bold">Eleven Park YK üzrə elanlar</h2>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[13px] font-medium">
                      Hamısı
                    </button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">
                      1 otaqlılar
                    </button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">
                      2 otaqlılar
                    </button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">
                      3 otaqlılar
                    </button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">
                      4 otaqlılar
                    </button>
                  </div>
                </div>

                <div className="text-[13px] text-[#8d94ad] mb-6">Elan sayı: 16</div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
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
                  ].slice(startIndex, endIndex).map((listing) => (
                    <div key={listing.id} className="bg-white rounded-lg border border-[#ebeef5] overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative h-45 overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.address}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {listing.isNew && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-bold">
                            YENİ
                          </div>
                        )}
                        {listing.isVip && (
                          <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded text-[10px] font-bold">
                            VIP
                          </div>
                        )}
                        <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white transition-colors">
                          <Heart size={16} className="text-gray-600" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">
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
          </div>

          <div className="col-span-1">
            <div className="bg-[#f8f9fb] rounded-xl border border-[#f0f2f7] p-6 sticky top-6 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-[22px] font-bold leading-tight">{property.title}</h3>
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
                    <span className="font-bold">{property.price.toLocaleString()} AZN</span>
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
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;