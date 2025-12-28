"use client"
import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Heart, MapPin, Bed, Maximize, Calendar, ChevronDown, SlidersHorizontal, Building2, Home, X, Search } from 'lucide-react';
import type { 
  Property, 
  PropertyCardProps, 
  FilterState, 
  BinaFilterProps, 
  PropertyGridProps 
} from '@/app/types/homepage';
import { CITIES } from '@/app/constants/cities';
import { PROPERTY_TYPES, TRANSACTION_TYPES, ROOM_OPTIONS } from '@/app/constants/propertyTypes';

const fetchProperties = async (endpoint: string): Promise<Property[]> => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Məlumatlar yüklənmədi');
  }
  return response.json();
};

const PropertyCard = ({ property }: PropertyCardProps) => {
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
};

const BinaFilter = ({ onFilterChange, totalCount, isLoading }: BinaFilterProps) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedType, setSelectedType] = useState('Alış');
  const [selectedProperty, setSelectedProperty] = useState('Mənzil');
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedBuildingType, setSelectedBuildingType] = useState('');

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const applyFilters = () => {
    const filters: FilterState = {
      type: selectedType,
      property: selectedProperty,
      rooms: selectedRooms,
      locations: selectedLocations,
      priceMin: priceMin ? parseFloat(priceMin) : undefined,
      priceMax: priceMax ? parseFloat(priceMax) : undefined,
      areaMin: areaMin ? parseFloat(areaMin) : undefined,
      areaMax: areaMax ? parseFloat(areaMax) : undefined,
      buildingType: selectedBuildingType,
    };

    onFilterChange(filters);
    setShowFilterModal(false);
    setShowLocationModal(false);
  };

  const resetFilters = () => {
    setSelectedType('Alış');
    setSelectedProperty('Mənzil');
    setSelectedRooms('');
    setSelectedLocations([]);
    setPriceMin('');
    setPriceMax('');
    setAreaMin('');
    setAreaMax('');
    setSelectedBuildingType('');
    onFilterChange({});
  };

  return (
    <>
      <div className="bg-white mt-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="flex items-center gap-2 px-4 py-3.5 border border-gray-300 rounded-full hover:border-gray-400 transition-colors bg-white"
              >
                <span className="text-gray-700">{selectedType}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-37.5">
                  {TRANSACTION_TYPES.map(type => (
                    <button
                      key={type.value}
                      onClick={() => { setSelectedType(type.value); setShowTypeDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
                className="flex items-center gap-2 px-4 py-3.5 border border-gray-300 rounded-full hover:border-gray-400 transition-colors bg-white"
              >
                <span className="text-gray-700">{selectedProperty}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showPropertyDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-45">
                  {PROPERTY_TYPES.map(type => (
                    <button
                      key={type.value}
                      onClick={() => { setSelectedProperty(type.value); setShowPropertyDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowRoomsDropdown(!showRoomsDropdown)}
                className="flex items-center gap-2 px-4 py-3.5 border border-gray-300 rounded-full hover:border-gray-400 transition-colors bg-white"
              >
                <span className={selectedRooms ? "text-gray-700" : "text-gray-400"}>
                  {selectedRooms || "Otaq sayı"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showRoomsDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-30">
                  <button onClick={() => { setSelectedRooms(''); setShowRoomsDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Hamısı</button>
                  {ROOM_OPTIONS.map(room => (
                    <button
                      key={room}
                      onClick={() => { setSelectedRooms(room); setShowRoomsDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      {room}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="flex items-center gap-2 px-4 py-3.5 border border-gray-300 rounded-full hover:border-gray-400 transition-colors bg-white"
              >
                <span className={priceMin || priceMax ? "text-gray-700" : "text-gray-400"}>
                  {priceMin || priceMax ? `${priceMin || 0} - ${priceMax || '∞'} ₼` : "Qiymət, ₼"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showPriceDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-112.5">
                  <div className="p-4 space-y-3">
                    <div className="flex gap-3 items-center">
                      <input
                        type="number"
                        placeholder="min."
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base w-full"
                      />
                      <input
                        type="number"
                        placeholder="maks."
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base w-full"
                      />
                    </div>
                    <button
                      onClick={() => setShowPriceDropdown(false)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Tətbiq et
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-62.5 relative">
              <input
                type="text"
                placeholder="Şəhər seçin"
                className="w-full pl-4 pr-16 py-3.5 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                onClick={() => setShowLocationModal(true)}
                value={selectedLocations.length > 0 ? `${selectedLocations.length} şəhər seçildi` : ''}
                readOnly
              />
              <button
                onClick={() => setShowLocationModal(true)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 font-medium"
              >
                Şəhər
              </button>
            </div>

            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-3.5 border border-gray-300 rounded-full hover:border-gray-400 transition-colors bg-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Filtrlər</span>
            </button>

            <button
              onClick={applyFilters}
              className="px-6 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Axtar
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setSelectedBuildingType(selectedBuildingType === 'new' ? '' : 'new');
              }}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors ${selectedBuildingType === 'new'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 border border-gray-100'
                }`}
            >
              <Building2 className={`w-5 h-5 transition-colors ${selectedBuildingType === 'new'
                  ? 'text-white'
                  : 'text-black group-hover:text-blue-600'
                }`} />
              <span className={`transition-colors ${selectedBuildingType === 'new'
                  ? 'text-white'
                  : 'text-black group-hover:text-blue-600'
                }`}>Yeni tikili</span>
            </button>

            <button
              onClick={() => {
                setSelectedBuildingType(selectedBuildingType === 'old' ? '' : 'old');
              }}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors ${selectedBuildingType === 'old'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 border border-gray-100'
                }`}
            >
              <Home className={`w-5 h-5 transition-colors ${selectedBuildingType === 'old'
                  ? 'text-white'
                  : 'text-black group-hover:text-blue-600'
                }`} />
              <span className={`transition-colors ${selectedBuildingType === 'old'
                  ? 'text-white'
                  : 'text-black group-hover:text-blue-600'
                }`}>Köhnə tikili</span>
            </button>

            <div className="ml-auto">
              <span className="text-gray-600">
                {isLoading ? '...' : `${totalCount} elan`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showLocationModal && (
        <div className="fixed inset-0 bg-black/20 flex items-start justify-center z-50 pt-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Şəhər seçin</h2>
                <button onClick={() => setShowLocationModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Şəhər axtar"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto" style={{maxHeight: '400px'}}>
              <div className="grid grid-cols-2 gap-4">
                {CITIES.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => toggleLocation(city)}
                    className={`text-left px-4 py-3 rounded-lg transition-colors ${selectedLocations.includes(city)
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                      }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedLocations([])}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sıfırla
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tətbiq et
              </button>
            </div>
          </div>
        </div>
      )}

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

            <div className="p-6 overflow-y-auto space-y-6" style={{maxHeight: '500px'}}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qiymət, ₼</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="min."
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="maks."
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Otaq sayı</label>
                <div className="flex gap-2">
                  {ROOM_OPTIONS.map(room => (
                    <button
                      key={room}
                      onClick={() => setSelectedRooms(room)}
                      className={`px-4 py-2 rounded-lg transition-colors ${selectedRooms === room
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sahə (m²)</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="min."
                    value={areaMin}
                    onChange={(e) => setAreaMin(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="maks."
                    value={areaMax}
                    onChange={(e) => setAreaMax(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={resetFilters}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sıfırla
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tətbiq et
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PropertyGrid = ({ properties: initialProperties, apiEndpoint }: PropertyGridProps) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties || []);
  const [filters, setFilters] = useState<FilterState>({});

  const { data: fetchedProperties, isLoading, isError, error } = useQuery({
    queryKey: ['properties', apiEndpoint],
    queryFn: () => fetchProperties(apiEndpoint!),
    enabled: !!apiEndpoint,
  });

  // Memoize properties to prevent unnecessary re-renders
  const properties = useMemo(() => {
    return apiEndpoint ? (fetchedProperties || []) : (initialProperties || []);
  }, [apiEndpoint, fetchedProperties, initialProperties]);

  // Move applyFilters before useEffect to fix declaration order
  const applyFilters = useCallback(() => {
    let filtered = [...properties];

    if (filters.type) {
      filtered = filtered.filter(p => {
        const apiType = p.type?.toLowerCase().trim();
        const filterType = filters.type?.toLowerCase();

        if (filterType === 'alış') {
          return apiType === 'alış' || apiType === 'alqı-satqı' || apiType === 'alqi-satqi';
        }
        if (filterType === 'kiraye') {
          return apiType === 'kiraye' || apiType === 'kirayə';
        }
        return true;
      });
    }

    if (filters.property) {
      filtered = filtered.filter(p => {
        const apiProperty = p.property?.toLowerCase().trim();
        const filterProperty = filters.property?.toLowerCase();

        if (filterProperty === 'mənzil') {
          return apiProperty === 'mənzil' || apiProperty === 'menzil';
        }
        if (filterProperty === 'həyət evi') {
          return apiProperty === 'həyət evi' || apiProperty === 'heyet evi' ||
            apiProperty === 'bağ evi' || apiProperty === 'bag evi';
        }
        if (filterProperty === 'ofis') {
          return apiProperty === 'ofis';
        }
        if (filterProperty === 'qaraj') {
          return apiProperty === 'qaraj' || apiProperty === 'garaj';
        }
        if (filterProperty === 'torpaq') {
          return apiProperty === 'torpaq';
        }
        if (filterProperty === 'obyekt') {
          return apiProperty === 'obyekt';
        }
        return apiProperty === filterProperty;
      });
    }

    if (filters.rooms) {
      filtered = filtered.filter(p => {
        const roomCount = parseInt(String(p.rooms));
        if (isNaN(roomCount)) return false;

        if (filters.rooms === '5+') {
          return roomCount >= 5;
        } else {
          return roomCount === parseInt(filters.rooms || '0');
        }
      });
    }

    if (filters.priceMin) {
      filtered = filtered.filter(p => {
        const price = parseFloat(String(p.price));
        return !isNaN(price) && price >= (filters.priceMin || 0);
      });
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => {
        const price = parseFloat(String(p.price));
        return !isNaN(price) && price <= (filters.priceMax || 0);
      });
    }

    if (filters.areaMin) {
      filtered = filtered.filter(p => {
        const area = parseFloat(String(p.area));
        return !isNaN(area) && area >= (filters.areaMin || 0);
      });
    }
    if (filters.areaMax) {
      filtered = filtered.filter(p => {
        const area = parseFloat(String(p.area));
        return !isNaN(area) && area <= (filters.areaMax || 0);
      });
    }

    if (filters.locations && filters.locations.length > 0) {
      filtered = filtered.filter(p => {
        const locationText = p.location?.toLowerCase().trim() || '';

        return filters.locations!.some(loc => {
          const selectedLoc = loc.toLowerCase().trim();
          return locationText.includes(selectedLoc) ||
            locationText === selectedLoc;
        });
      });
    }

    if (filters.buildingType) {
      filtered = filtered.filter(p => {
        if (filters.buildingType === 'new') {
          return p.isNew === true || p.isNew === 'true';
        }
        if (filters.buildingType === 'old') {
          return p.isNew === false || p.isNew === 'false' || !p.isNew;
        }
        return true;
      });
    }

    setFilteredProperties(filtered);
  }, [properties, filters]);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Yüklənir...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600 text-lg mb-4">Xəta baş verdi</p>
          <p className="text-gray-600">{error instanceof Error ? error.message : 'Məlumatlar yüklənmədi'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BinaFilter 
        onFilterChange={handleFilterChange} 
        totalCount={filteredProperties.length}
        isLoading={isLoading}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ev alqı-satqısı elanları</h1>
          <p className="text-gray-600">{filteredProperties.length} elan tapıldı</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg mb-2">Axtarış nəticəsi tapılmadı</p>
              <p className="text-gray-400">Filter parametrlərini dəyişdirərək yenidən cəhd edin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;