"use client"
import { useState } from 'react';
import { Heart, MapPin, Bed, Maximize, Calendar } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCardClick = () => {
    // Property details səhifəsinə keçid
    window.location.href = `/homedetails?id=${property.id}`;
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Kartın klik hadisəsinin işə düşməsinin qarşısını alır
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden group">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {property.badge && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            {property.badge}
          </span>
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {property.price} <span className="text-lg">₼</span>
          </h3>
          {property.verified && (
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-gray-800 font-medium mb-2">{property.title}</h4>

        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Bed size={16} />
            {property.rooms} otaqlı
          </span>
          <span className="flex items-center gap-1">
            <Maximize size={16} />
            {property.area} m²
          </span>
          <span>{property.floor} mərtəbə</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={12} />
            {property.date}
          </span>
          {property.company && (
            <span className="text-xs text-blue-600 font-medium">{property.company}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const PropertyGrid = () => {
  const properties = [
    {
      id: 1,
      title: 'Nəsimi r.',
      price: '375 000',
      rooms: 3,
      area: 104,
      floor: '2/19',
      location: 'Nəsimi r.',
      date: 'dünən 21:05',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 2,
      title: 'Şah İsmayıl Xətai m',
      price: '193 000',
      rooms: 2,
      area: 60,
      floor: '3/15',
      location: 'Şah İsmayıl Xətai m',
      date: 'bugün 13:06',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      badge: 'Agentlik',
      verified: true,
      company: null
    },
    {
      id: 3,
      title: 'Qara Qarayev m',
      price: '190 000',
      rooms: 2,
      area: 65,
      floor: '19/20',
      location: 'Qara Qarayev m',
      date: 'dünən 15:19',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
      badge: 'Agentlik',
      verified: true,
      company: null
    },
    {
      id: 4,
      title: 'Nərdaran q',
      price: '285 447',
      rooms: 1,
      area: 57.9,
      floor: '6/9',
      location: 'Nərdaran q',
      date: 'bugün 11:46',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
      badge: 'Agentlik',
      verified: false,
      company: 'PARADISE'
    },
    {
      id: 5,
      title: 'Yeni tikili',
      price: '165 000',
      rooms: 3,
      area: 120,
      floor: '1/2',
      location: 'Binəqədi r.',
      date: 'bugün 10:20',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 6,
      title: 'Köhnə tikili',
      price: '354 000',
      rooms: 4,
      area: 95,
      floor: '5/9',
      location: 'Nəsimi r.',
      date: 'dünən 18:30',
      image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 7,
      title: 'Yasamal kompleksi',
      price: '260 177',
      rooms: 2,
      area: 70,
      floor: '8/12',
      location: 'Yasamal r.',
      date: 'bugün 09:15',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500',
      badge: 'Kompleks',
      verified: false,
      company: 'PARADISE'
    },
    {
      id: 8,
      title: 'Lüks mənzil',
      price: '290 000',
      rooms: 3,
      area: 85,
      floor: '12/15',
      location: 'Nəsimi r.',
      date: 'bugün 14:22',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500',
      badge: 'Agentlik',
      verified: true,
      company: null
    },
    {
      id: 9,
      title: 'Yeni layihə',
      price: '220 000',
      rooms: 2,
      area: 68,
      floor: '4/10',
      location: 'Xətai r.',
      date: 'dünən 16:45',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 10,
      title: 'Həyət evi',
      price: '450 000',
      rooms: 5,
      area: 180,
      floor: '2/2',
      location: 'Sabunçu r.',
      date: 'bugün 11:30',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 11,
      title: 'Dəniz mənzərəsi',
      price: '380 000',
      rooms: 3,
      area: 110,
      floor: '15/20',
      location: 'Nəsimi r.',
      date: 'bugün 08:15',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500',
      badge: 'VIP',
      verified: true,
      company: null
    },
    {
      id: 12,
      title: 'Təmir edilmiş',
      price: '195 000',
      rooms: 2,
      area: 62,
      floor: '7/9',
      location: 'Yasamal r.',
      date: 'dünən 20:10',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 13,
      title: 'Mərkəzdə mənzil',
      price: '275 000',
      rooms: 3,
      area: 90,
      floor: '6/14',
      location: 'Səbail r.',
      date: 'bugün 12:45',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500',
      badge: 'Agentlik',
      verified: true,
      company: null
    },
    {
      id: 14,
      title: 'Villa kompleksi',
      price: '520 000',
      rooms: 4,
      area: 200,
      floor: '2/2',
      location: 'Pirallahı r.',
      date: 'bugün 09:30',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500',
      badge: 'Kompleks',
      verified: false,
      company: 'PASHA'
    },
    {
      id: 15,
      title: 'Penthouse',
      price: '650 000',
      rooms: 4,
      area: 150,
      floor: '20/20',
      location: 'Nəsimi r.',
      date: 'dünən 17:25',
      image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=500',
      badge: 'VIP',
      verified: true,
      company: null
    },
    {
      id: 16,
      title: 'Yaşayış kompleksi',
      price: '235 000',
      rooms: 2,
      area: 72,
      floor: '10/16',
      location: 'Xətai r.',
      date: 'bugün 15:50',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=500',
      badge: 'Agentlik',
      verified: true,
      company: null
    },
    {
      id: 17,
      title: 'Təmirli mənzil',
      price: '310 000',
      rooms: 3,
      area: 95,
      floor: '5/12',
      location: 'Nəsimi r.',
      date: 'bugün 10:15',
      image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 18,
      title: 'Geniş mənzil',
      price: '425 000',
      rooms: 4,
      area: 130,
      floor: '8/15',
      location: 'Yasamal r.',
      date: 'dünən 13:40',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500',
      badge: null,
      verified: true,
      company: null
    },
    {
      id: 19,
      title: 'Lüks kompleks',
      price: '340 000',
      rooms: 2,
      area: 78,
      floor: '12/18',
      location: 'Nəsimi r.',
      date: 'bugün 11:20',
      image: 'https://images.unsplash.com/photo-1600566752229-250ed79470c3?w=500',
      badge: 'Kompleks',
      verified: false,
      company: 'PARADISE'
    },
    {
      id: 20,
      title: 'Rahat mənzil',
      price: '215 000',
      rooms: 2,
      area: 64,
      floor: '3/9',
      location: 'Xətai r.',
      date: 'bugün 14:05',
      image: 'https://images.unsplash.com/photo-1600607686328-c394a5a0e2e8?w=500',
      badge: null,
      verified: true,
      company: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ev alqi satqisi elanlari</h1>
          <p className="text-gray-600">{properties.length} elan tapıldı</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;