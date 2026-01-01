import { useState } from 'react';
import Image from 'next/image';
import { Heart, MapPin, Bed, Maximize, Calendar } from 'lucide-react';
import type { PropertyCardProps } from '@/types/homepage';

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCardClick = () => {
    window.location.href = `/homedetails?id=${property.id}`;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden group">
        <Image
          src={property.image1 || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {property.price ? `${Number(property.price).toLocaleString()} ₼` : "Qiymət göstərilməyib"}
          </h3>
        </div>

        <h4 className="text-gray-800 font-medium mb-2">{property.title}</h4>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {property.rooms && (
            <span className="flex items-center gap-1">
              <Bed size={16} />
              {property.rooms} otaqlı
            </span>
          )}
          {property.area && (
            <span className="flex items-center gap-1">
              <Maximize size={16} />
              {property.area} m²
            </span>
          )}
          {property.floor && <span>{property.floor} mərtəbə</span>}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={12} />
            {new Date(property.createdAt).toLocaleDateString('az-AZ')}
          </span>
        </div>
      </div>
    </div>
  );
}