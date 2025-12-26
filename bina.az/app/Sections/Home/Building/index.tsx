"use client"
import { useState, useEffect } from 'react';
import { Heart, MapPin, Bed, Maximize, Calendar, ChevronDown, SlidersHorizontal, Building2, Home, Warehouse, Building, Store, X, Search } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCardClick = () => {
    window.location.href = `/homedetails?id=${property.id}`;
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden group">
        <img
          src={property.image1 || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
            {property.price ? `${property.price.toLocaleString()} ₼` : "Qiymət göstərilməyib"}
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

const BinaFilter = ({ onFilterChange, totalCount }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Rayon');
  const [selectedType, setSelectedType] = useState('Alış');
  const [selectedProperty, setSelectedProperty] = useState('Mənzil');
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedBuildingType, setSelectedBuildingType] = useState('');

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

  const toggleLocation = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const applyFilters = () => {
    const filters = {
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
            {/* Alış/Kiraye Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white"
              >
                <span className="text-gray-700">{selectedType}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                  <button
                    onClick={() => { setSelectedType('Alış'); setShowTypeDropdown(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Alqı-satqı
                  </button>
                  <button
                    onClick={() => { setSelectedType('Kiraye'); setShowTypeDropdown(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Kiraye
                  </button>
                </div>
              )}
            </div>

            {/* Mənzil Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
                className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white"
              >
                <span className="text-gray-700">{selectedProperty}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showPropertyDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
                  <button onClick={() => { setSelectedProperty('Mənzil'); setShowPropertyDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Mənzil</button>
                  <button onClick={() => { setSelectedProperty('Həyət evi'); setShowPropertyDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Həyət evi/Bağ evi</button>
                  <button onClick={() => { setSelectedProperty('Ofis'); setShowPropertyDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Ofis</button>
                  <button onClick={() => { setSelectedProperty('Qaraj'); setShowPropertyDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Qaraj</button>
                  <button onClick={() => { setSelectedProperty('Torpaq'); setShowPropertyDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Torpaq</button>
                  <button onClick={() => { setSelectedProperty('Obyekt'); setShowPropertyDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Obyekt</button>
                </div>
              )}
            </div>

            {/* Otaq sayı Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoomsDropdown(!showRoomsDropdown)}
                className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white"
              >
                <span className={selectedRooms ? "text-gray-700" : "text-gray-400"}>
                  {selectedRooms || "Otaq sayı"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showRoomsDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                  <button onClick={() => { setSelectedRooms(''); setShowRoomsDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Hamısı</button>
                  <button onClick={() => { setSelectedRooms('1'); setShowRoomsDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">1</button>
                  <button onClick={() => { setSelectedRooms('2'); setShowRoomsDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">2</button>
                  <button onClick={() => { setSelectedRooms('3'); setShowRoomsDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">3</button>
                  <button onClick={() => { setSelectedRooms('4'); setShowRoomsDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">4</button>
                  <button onClick={() => { setSelectedRooms('5+'); setShowRoomsDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">5+</button>
                </div>
              )}
            </div>

            {/* Qiymət Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white"
              >
                <span className={priceMin || priceMax ? "text-gray-700" : "text-gray-400"}>
                  {priceMin || priceMax ? `${priceMin || 0} - ${priceMax || '∞'} ₼` : "Qiymət, ₼"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showPriceDropdown && (
                <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-[450px]">
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

            {/* Search Input */}
            <div className="flex-1 min-w-[250px] relative">
              <input
                type="text"
                placeholder="Rayon, metro, nişangah"
                className="w-full pl-4 pr-16 py-[14px] border border-gray-300 rounded-[20px] focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                onClick={() => setShowLocationModal(true)}
                value={selectedLocations.length > 0 ? `${selectedLocations.length} rayon seçildi` : ''}
                readOnly
              />
              <button
                onClick={() => setShowLocationModal(true)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 font-medium"
              >
                Bakı
              </button>
            </div>

            {/* Filtrlər Button */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-[14px] border border-gray-300 rounded-[20px] hover:border-gray-400 transition-colors bg-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Filtrlər</span>
            </button>

            {/* Axtar Button */}
            <button
              onClick={applyFilters}
              className="px-6 py-[14px] bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 transition-colors font-medium"
            >
              Axtar
            </button>
          </div>

          {/* Property Type Icons Row */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setSelectedBuildingType(selectedBuildingType === 'new' ? '' : 'new');
              }}
              className={`group flex items-center gap-2 px-4 py-[10px] rounded-[20px] transition-colors ${selectedBuildingType === 'new'
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
              className={`group flex items-center gap-2 px-4 py-[10px] rounded-[20px] transition-colors ${selectedBuildingType === 'old'
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
                {totalCount} elan
              </span>
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
                    onClick={() => toggleLocation(rayon)}
                    className={`text-left px-4 py-2 rounded-lg transition-colors ${selectedLocations.includes(rayon)
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                      }`}
                  >
                    {rayon}
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
              {/* Qiymət */}
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

              {/* Otaq sayı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Otaq sayı</label>
                <div className="flex gap-2">
                  {['1', '2', '3', '4', '5+'].map(room => (
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

              {/* Sahə */}
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

// Ana komponent - properties PROP kimi qəbul edir
const PropertyGrid = ({ properties }) => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({});

  // Properties dəyişəndə filteredProperties-i yenilə
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  // Filter dəyişəndə tətbiq et
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...properties];

    // Alış/Kiraye filtri - API-dan gələn "type" field-ni yoxlayır
    if (filters.type) {
      filtered = filtered.filter(p => {
        const apiType = p.type?.toLowerCase().trim();
        const filterType = filters.type.toLowerCase();

        // "Alış" seçilibsə "alış" və ya "alqı-satqı" yoxlayırıq
        if (filterType === 'alış') {
          return apiType === 'alış' || apiType === 'alqı-satqı' || apiType === 'alqi-satqi';
        }
        // "Kiraye" seçilibsə
        if (filterType === 'kiraye') {
          return apiType === 'kiraye' || apiType === 'kirayə';
        }
        return true;
      });
    }

    // Property növü filtri - API-dan gələn "property" field-ni yoxlayır
    if (filters.property) {
      filtered = filtered.filter(p => {
        const apiProperty = p.property?.toLowerCase().trim();
        const filterProperty = filters.property.toLowerCase();

        // Müxtəlif yazılış variantlarını yoxlayırıq
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

    // Otaq sayı filtri - API-dan gələn "rooms" rəqəmini yoxlayır
    if (filters.rooms) {
      filtered = filtered.filter(p => {
        const roomCount = parseInt(p.rooms);
        if (isNaN(roomCount)) return false;

        if (filters.rooms === '5+') {
          return roomCount >= 5;
        } else {
          return roomCount === parseInt(filters.rooms);
        }
      });
    }

    // Qiymət filtri - API-dan gələn "price" rəqəmini yoxlayır
    if (filters.priceMin) {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.price);
        return !isNaN(price) && price >= filters.priceMin;
      });
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.price);
        return !isNaN(price) && price <= filters.priceMax;
      });
    }

    // Sahə filtri - API-dan gələn "area" rəqəmini yoxlayır
    if (filters.areaMin) {
      filtered = filtered.filter(p => {
        const area = parseFloat(p.area);
        return !isNaN(area) && area >= filters.areaMin;
      });
    }
    if (filters.areaMax) {
      filtered = filtered.filter(p => {
        const area = parseFloat(p.area);
        return !isNaN(area) && area <= filters.areaMax;
      });
    }

    // Rayon/Yer filtri - API-dan gələn "location" mətni yoxlayır
    if (filters.locations && filters.locations.length > 0) {
      filtered = filtered.filter(p => {
        const locationText = p.location?.toLowerCase().trim() || '';

        // Seçilmiş rayonlardan hər hansı biri location field-də varsa
        return filters.locations.some(loc => {
          const selectedLoc = loc.toLowerCase().trim();
          return locationText.includes(selectedLoc) ||
            locationText === selectedLoc;
        });
      });
    }

    // Bina növü filtri (Yeni tikili / Köhnə tikili) - isNew field-ni yoxlayır
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
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BinaFilter onFilterChange={handleFilterChange} totalCount={filteredProperties.length} />

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