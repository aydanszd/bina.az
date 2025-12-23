"use client"
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Heart, MapPin, Phone, Eye, Share2, Calendar, Home, Car, Zap, Shield, Check, Clock } from 'lucide-react';
import 'react-photo-view/dist/react-photo-view.css';

const PropertyDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const property = {
    title: 'Bağça Şəhər',
    location: 'Sumqayıt, Sumqayıt ş., 1-ci mkr., Sülh küç., 1-ci döngə',
    views: 40839,
    elanCount: 23,
    corpusCount: 6,
    floorCount: '12-14',
    apartmentCount: 2320,
    company: 'Bağça Şəhər',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200'
    ],
    plans: [
      { rooms: '1 otaqlı', price: '59 020 AZN-dən', area: '45.5 - 97.1 m²' },
      { rooms: '2 otaqlı', price: '70 615 AZN-dən', area: '60 - 85 m²' },
      { rooms: '3 otaqlı', price: '114 360 AZN-dən', area: '85 - 110 m²' }
    ],
    description: 'Bağça Şəhər Yaşayış Kompleksi tikinti şirkətinə məxsus yaşayış kompleksi',
    features: [
      { icon: Check, label: 'Aksiya', description: 'Nəqd alış zamanı 5% endirim' },
      { icon: Car, label: 'Daxili kredit', description: 'faiz olaraq 1 illik veriliş ilkin ödəniş 30% olaraq olaraq 1.5% endirim olunur ilkin ödəniş' }
    ],
    info: {
      area: '45.4 - 97.1',
      price: '59 000 AZN-dən',
      deliveryDate: 'iyul 2026-cı il'
    },
    workingHours: 'Bazar ertəsi - Cümə: 09:00-19:00'
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="hover:underline cursor-pointer">Yaşayış kompleksləri</span>
              <span>/</span>
              <span>Bağça Şəhər</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Eye size={16} />
              <span>{property.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Başlıq */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{property.title}</h1>

        {/* Şəkillər */}
        <div className="mb-6">
          <PhotoProvider>
            <div className="grid grid-cols-2 gap-2">
              <PhotoView src={property.images[0]}>
                <div className="relative cursor-pointer group overflow-hidden rounded-lg">
                  <img
                    src={property.images[0]}
                    alt="Əsas şəkil"
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                    <MapPin size={16} className="text-gray-700" />
                    <span className="text-sm font-medium">Sumqayıt, Sumqayıt ş., 1-ci mkr., Sülh küç., 1-ci döngə</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                    <span className="text-sm font-medium">Elan sayı: {property.elanCount}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
                      Əlaqə
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                      Elanları göstər
                    </button>
                  </div>
                </div>
              </PhotoView>
              
              <div className="grid grid-rows-2 gap-2">
                {property.images.slice(1, 3).map((img, idx) => (
                  <PhotoView key={idx} src={img}>
                    <div className="relative cursor-pointer group overflow-hidden rounded-lg">
                      <img
                        src={img}
                        alt={`Şəkil ${idx + 2}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {idx === 1 && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <span className="text-white text-lg font-medium">Bütün şəkilləri</span>
                        </div>
                      )}
                    </div>
                  </PhotoView>
                ))}
              </div>
            </div>
          </PhotoProvider>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol sütun */}
          <div className="lg:col-span-2 space-y-6">
            {/* Planlar */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Planlar</h2>
              <div className="space-y-3">
                {property.plans.map((plan, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300 transition-colors">
                    <div>
                      <h3 className="font-semibold text-gray-900">{plan.rooms}</h3>
                      <p className="text-sm text-gray-600">{plan.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{plan.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Təsvir */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Bağça Şəhər Yaşayış Kompleksi tikinti şirkətinə məxsus yaşayış kompleksi
              </h2>
              <div className="text-gray-700 mb-4">
                <p className="mb-2">Korpus sayı: {property.corpusCount}</p>
                <p className="mb-2">Mərtəbə sayı: {property.floorCount}</p>
                <p>Mənzil sayı: {property.apartmentCount}</p>
              </div>
            </div>

            {/* Xüsusiyyətlər */}
            <div className="space-y-4">
              {property.features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <feature.icon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.label}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ sütun - Əlaqə kartı */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{property.company}</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Sahə (m²)</span>
                  <span className="font-semibold">{property.info.area}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Qiymət</span>
                  <span className="font-semibold">{property.info.price}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Təhvil tarixi</span>
                  <span className="font-semibold">{property.info.deliveryDate}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock size={16} />
                  <span>{property.workingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                  <Clock size={16} />
                  <span>Şənbə - Bazar: 10:00-19:00</span>
                </div>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Zəng et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;