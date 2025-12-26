"use client";
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import {
  MapPin, Eye, Clock, Calendar,
  Home, Hash, Layers, Users, Phone,
  Percent, CircleDollarSign, ChevronDown, ChevronLeft, ChevronRight, Heart
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import 'react-photo-view/dist/react-photo-view.css';

const PropertyDetail = () => {
  const [showNumber, setShowNumber] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const property = {
    title: 'Eleven Park',
    location: 'Bakı, H. Əliyev, Y. V. Çəmənzəminli və Novruzov qardaşları küç. kəsişməsi',
    views: 38557,
    plans: [
      { rooms: '1 otaqlılar', price: '143 925 AZN-dən' },
      { rooms: '2 otaqlılar', price: '230 440 AZN-dən' },
      { rooms: '3 otaqlılar', price: '363 440 AZN-dən' },
      { rooms: '4 otaqlılar', price: '502 600 AZN-dən' }
    ],
    parameters: [
      { label: 'Təhvil tarixi', value: '2028-ci ilin mart ayı', icon: Calendar },
      { label: 'Korpus sayı', value: '9', icon: Home },
      { label: 'Blok sayı', value: '11', icon: Hash },
      { label: 'Hər blokda lift sayı', value: '2', icon: Layers },
      { label: 'Binada mərtəbələr', value: '16', icon: Layers },
      { label: 'Hər mərtəbədə mənzil sayı', value: '4-8', icon: Users },
    ],
    about: `"Winter City Group" 20 ildir ki, tikinti sahəsində fəaliyyət göstərir və beynəlxalq standartlara uyğun premium sinif binalar inşa edir. Biz şəhərin arxitekturasına uyğun, sakinləri üçün tam rahat və təhlükəsiz yaşayış komplekslərini təqdim edirik. Tamamlanmış və davam edən layihələrimiz gördüyümüz yüksək səviyyəli işin nümunəsidir.`,
    aboutExtra: `Yeni layihəmiz Həsən Əliyev və Cəlil Məmmədquluzadə küçələrinin kəsişməsində yerləşən "Eleven Park" layihəsidir. "Eleven Park" sizlərə 1, 2, 3 və 4 otaqlı mənzillər təklif edir.`,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200'
    ]
  };

  const allListings = [
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
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
      price: '149 985 AZN',
      address: '8 Noyabr m.',
      details: '1 otaqlı • 50,5 m² • 7/16 mərtəbə',
      date: 'Bakı, bugün 11:24',
      isNew: false,
      isVip: true
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1502672260066-6bc36a6fa4c4?w=400',
      price: '156 320 AZN',
      address: '8 Noyabr m.',
      details: '1 otaqlı • 52,8 m² • 8/16 mərtəbə',
      date: 'Bakı, bugün 10:15',
      isNew: true,
      isVip: false
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      price: '275 890 AZN',
      address: '8 Noyabr m.',
      details: '2 otaqlı • 91,5 m² • 9/16 mərtəbə',
      date: 'Bakı, bugün 09:45',
      isNew: false,
      isVip: true
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400',
      price: '385 600 AZN',
      address: '8 Noyabr m.',
      details: '3 otaqlı • 125,2 m² • 11/16 mərtəbə',
      date: 'Bakı, bugün 09:20',
      isNew: true,
      isVip: true
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      price: '152 440 AZN',
      address: '8 Noyabr m.',
      details: '1 otaqlı • 51,3 m² • 5/16 mərtəbə',
      date: 'Bakı, bugün 08:55',
      isNew: false,
      isVip: false
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      price: '520 750 AZN',
      address: '8 Noyabr m.',
      details: '4 otaqlı • 168,5 m² • 14/16 mərtəbə',
      date: 'Bakı, dünən 18:30',
      isNew: true,
      isVip: true
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400',
      price: '242 180 AZN',
      address: '8 Noyabr m.',
      details: '2 otaqlı • 80,6 m² • 12/16 mərtəbə',
      date: 'Bakı, dünən 17:45',
      isNew: false,
      isVip: true
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400',
      price: '395 220 AZN',
      address: '8 Noyabr m.',
      details: '3 otaqlı • 128,4 m² • 13/16 mərtəbə',
      date: 'Bakı, dünən 16:20',
      isNew: true,
      isVip: false
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      price: '158 900 AZN',
      address: '8 Noyabr m.',
      details: '1 otaqlı • 53,7 m² • 4/16 mərtəbə',
      date: 'Bakı, dünən 15:10',
      isNew: false,
      isVip: true
    },
    {
      id: 13,
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400',
      price: '288 640 AZN',
      address: '8 Noyabr m.',
      details: '2 otaqlı • 95,8 m² • 10/16 mərtəbə',
      date: 'Bakı, 2 gün əvvəl',
      isNew: true,
      isVip: true
    },
    {
      id: 14,
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400',
      price: '145 580 AZN',
      address: '8 Noyabr m.',
      details: '1 otaqlı • 49,2 m² • 3/16 mərtəbə',
      date: 'Bakı, 2 gün əvvəl',
      isNew: false,
      isVip: false
    },
    {
      id: 15,
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400',
      price: '372 950 AZN',
      address: '8 Noyabr m.',
      details: '3 otaqlı • 121,5 m² • 15/16 mərtəbə',
      date: 'Bakı, 3 gün əvvəl',
      isNew: true,
      isVip: true
    },
    {
      id: 16,
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400',
      price: '495 320 AZN',
      address: '8 Noyabr m.',
      details: '4 otaqlı • 162,8 m² • 16/16 mərtəbə',
      date: 'Bakı, 3 gün əvvəl',
      isNew: false,
      isVip: true
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(allListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = allListings.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white text-[#212326] antialiased max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex justify-between items-center text-[13px]">
        <div className="flex items-center gap-2 text-[#8d94ad]">
          <span className="hover:text-blue-600 cursor-pointer underline decoration-dotted">Yaşayış kompleksləri</span>
          <span>/</span>
          <span className="text-[#212326]">{property.title}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#8d94ad]">
          <Eye size={16} />
          <span>{property.views.toLocaleString()}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <h1 className="text-[32px] font-bold mb-6">{property.title}</h1>

        {/* Gallery Section */}
        <div className="grid grid-cols-3 gap-2 mb-8 h-[420px]">
          <PhotoProvider>
            <div className="col-span-2 relative rounded-l-lg overflow-hidden group">
              <PhotoView src={property.images[0]}>
                <img src={property.images[0]} className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105" alt="Main" />
              </PhotoView>
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <div className="bg-[#212326]/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[13px] flex items-center gap-2">
                  <MapPin size={14} /> {property.location.substring(0, 45)}...
                </div>
                <div className="bg-[#212326]/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[13px]">
                  Elan sayı: 15
                </div>
              </div>
              <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                <button className="bg-[#4CAF50] text-white px-8 py-2.5 rounded-md font-bold text-sm shadow-lg active:scale-95 transition-all">Əlaqə</button>
                <button className="bg-[#4169E1] text-white px-8 py-2.5 rounded-md font-bold text-sm shadow-lg active:scale-95 transition-all">Elanları göstər</button>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <div className="h-1/2 rounded-tr-lg overflow-hidden">
                <PhotoView src={property.images[1]}>
                  <img src={property.images[1]} className="w-full h-full object-cover cursor-pointer hover:opacity-90" alt="Side 1" />
                </PhotoView>
              </div>
              <div className="h-1/2 relative rounded-br-lg overflow-hidden">
                <PhotoView src={property.images[2]}>
                  <img src={property.images[2]} className="w-full h-full object-cover cursor-pointer hover:opacity-90" alt="Side 2" />
                </PhotoView>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                  <span className="bg-white text-[#212326] text-[13px] font-medium px-5 py-2 rounded-md shadow-sm">Bütün şəkillər</span>
                </div>
              </div>
            </div>
          </PhotoProvider>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Sol Kolon */}
          <div className="col-span-2">
            {/* Planlar Bar */}
            <div className="bg-[#f8f9fb] rounded-lg p-5 flex items-center mb-10 border border-[#f0f2f7]">
              <span className="font-bold text-[15px] mr-auto">Planlar</span>
              {property.plans.map((plan, i) => (
                <div key={i} className="text-center px-6 border-l border-[#e0e4ed] first:border-l-0">
                  <div className="text-[12px] text-[#8d94ad] mb-1">{plan.rooms}</div>
                  <div className="text-[14px] font-bold">{plan.price}</div>
                </div>
              ))}
            </div>

            {/* Qısa Təsvir */}
            <div className="mb-10">
              <h2 className="text-[20px] font-bold mb-2">{property.title} tikinti şirkətinə məxsus yaşayış kompleksi</h2>
              <div className="flex gap-4 text-[13px] text-[#8d94ad]">
                <span>Korpus sayı: 9</span>
                <span className="text-[#e0e4ed]">|</span>
                <span>Mərtəbə sayı: 16</span>
              </div>
            </div>

            {/* Kredit Seçimləri */}
            <div className="space-y-5 mb-12">
              <div className="flex gap-4 items-start">
                <div className="bg-[#f1fcf5] p-2 rounded-lg text-[#4CAF50]"><Percent size={18} /></div>
                <div>
                  <h4 className="text-[14px] font-bold">İpoteka</h4>
                  <p className="text-[13px] text-[#8d94ad]">30% ilkin ödəniş, 22 il müddətinə, illik 10.5%</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-[#fff9f1] p-2 rounded-lg text-[#ff9800]"><CircleDollarSign size={18} /></div>
                <div>
                  <h4 className="text-[14px] font-bold">Daxili kredit</h4>
                  <p className="text-[13px] text-[#8d94ad]">3 illik daxili kredit illik 11% ilə</p>
                </div>
              </div>
            </div>

            {/* Parametrlər Grid */}
            <div className="mb-12">
              <h2 className="text-[20px] font-bold mb-6">Parametrlər</h2>
              <div className="grid grid-cols-4 gap-3">
                {property.parameters.map((param, i) => (
                  <div key={i} className="border border-[#ebeef5] rounded-xl p-4 min-h-[110px] flex flex-col justify-between hover:border-[#8d94ad] transition-colors">
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

            {/* Ümumi məlumat */}
            <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
              <h2 className="text-[20px] font-bold mb-6">Ümumi məlumat</h2>
              <div className="text-[14px] leading-[1.6] text-[#212326] space-y-4">
                <p>{property.about}</p>
                <p>{property.aboutExtra}</p>
              </div>
            </div>

            {/* Yerləşmə (Xəritə) */}
            <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
              <h2 className="text-[20px] font-bold mb-6">Yerləşmə</h2>
              <div className="flex gap-2 mb-4">
                <span className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] border border-[#ebeef5] cursor-default">Nəsimi</span>
              </div>
              {/* Google Xəritə */}
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-[#ebeef5]">
                <iframe
                  width="100%"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
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

            {/* Eleven Park YK üzrə elanlar */}
            <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
              <div className="max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px] font-bold">Eleven Park YK üzrə elanlar</h2>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[13px] font-medium">Hamısı</button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">1 otaqlılar</button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">2 otaqlılar</button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">3 otaqlılar</button>
                    <button className="bg-[#f8f9fb] text-[#212326] px-4 py-1.5 rounded-full text-[13px] hover:bg-gray-200 transition-colors">4 otaqlılar</button>
                  </div>
                </div>

                <div className="text-[13px] text-[#8d94ad] mb-6">Elan sayı: {allListings.length}</div>

                {/* Listings Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {currentListings.map((listing) => (
                    <div key={listing.id} className="bg-white rounded-lg border border-[#ebeef5] overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative h-[180px] overflow-hidden">
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

                {/* Pagination */}
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
                    {[...Array(totalPages)].map((_, index) => (
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
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>

          {/* Sağ Kolon (Sticky Card) */}
          <div className="col-span-1">
            <div className="bg-[#f8f9fb] rounded-xl border border-[#f0f2f7] p-6 sticky top-6 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-[22px] font-bold leading-tight">{property.title}</h3>
                <div className="w-[50px] h-[50px] bg-[#004a7c] rounded-md flex items-center justify-center p-2 shrink-0">
                  <div className="text-[8px] text-white font-black text-center leading-tight">ELEVEN<br />PARK</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[14px] pb-3 border-b border-[#e0e4ed]">
                  <span className="text-[#8d94ad]">Sahə (m²)</span>
                  <span className="font-bold">50,5 - 179,5</span>
                </div>
                <div className="flex justify-between text-[14px] pb-3 border-b border-[#e0e4ed]">
                  <span className="text-[#8d94ad]">Qiymət</span>
                  <span className="font-bold">143 900 AZN-dən</span>
                </div>
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
                {!showNumber && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;