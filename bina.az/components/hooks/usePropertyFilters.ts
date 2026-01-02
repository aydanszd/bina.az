import { useState } from 'react';
import type { Property, FilterState } from '@/types/homepage';

export function usePropertyFilters(properties: Property[]) {
    const [filters, setFilters] = useState<FilterState>({});
    function filterProperties() {
        let result = [...properties]; 

        if (filters.type) {
            result = result.filter(property => {
                const propertyType = property.type?.toLowerCase().trim();
                const selectedType = filters.type?.toLowerCase();

                if (selectedType === 'alış') {
                    return propertyType === 'alış' ||
                        propertyType === 'alqı-satqı' ||
                        propertyType === 'alqi-satqi';
                }

                if (selectedType === 'kiraye') {
                    return propertyType === 'kiraye' ||
                        propertyType === 'kirayə';
                }

                return true;
            });
        }
        if (filters.property) {
            result = result.filter(property => {
                const propertyName = property.property?.toLowerCase().trim();
                const selectedProperty = filters.property?.toLowerCase();
                if (selectedProperty === 'mənzil') {
                    return propertyName === 'mənzil' || propertyName === 'menzil';
                }
                if (selectedProperty === 'həyət evi') {
                    return propertyName === 'həyət evi' ||
                        propertyName === 'heyet evi' ||
                        propertyName === 'bağ evi' ||
                        propertyName === 'bag evi';
                }

                if (selectedProperty === 'qaraj') {
                    return propertyName === 'qaraj' || propertyName === 'garaj';
                }
                return propertyName === selectedProperty;
            });
        }
        if (filters.rooms) {
            result = result.filter(property => {
                const roomCount = parseInt(String(property.rooms));

                if (isNaN(roomCount)) {
                    return false;
                }

                if (filters.rooms === '5+') {
                    return roomCount >= 5;
                }
                return roomCount === parseInt(filters.rooms || '0');
            });
        }

        if (filters.priceMin) {
            result = result.filter(property => {
                const price = parseFloat(String(property.price));
                return !isNaN(price) && price >= (filters.priceMin || 0);
            });
        }

        if (filters.priceMax) {
            result = result.filter(property => {
                const price = parseFloat(String(property.price));
                return !isNaN(price) && price <= (filters.priceMax || 0);
            });
        }

        if (filters.areaMin) {
            result = result.filter(property => {
                const area = parseFloat(String(property.area));
                return !isNaN(area) && area >= (filters.areaMin || 0);
            });
        }

        if (filters.areaMax) {
            result = result.filter(property => {
                const area = parseFloat(String(property.area));
                return !isNaN(area) && area <= (filters.areaMax || 0);
            });
        }

        if (filters.locations && filters.locations.length > 0) {
            result = result.filter(property => {
                const propertyLocation = property.location?.toLowerCase().trim() || '';
                return filters.locations!.some(selectedLocation => {
                    const location = selectedLocation.toLowerCase().trim();
                    return propertyLocation.includes(location) ||
                        propertyLocation === location;
                });
            });
        }
        if (filters.buildingType) {
            result = result.filter(property => {
                if (filters.buildingType === 'new') {
                    return property.isNew === true || property.isNew === 'true';
                }

                if (filters.buildingType === 'old') {
                    return property.isNew === false ||
                        property.isNew === 'false' ||
                        !property.isNew;
                }

                return true;
            });
        }

        return result;
    }
    const filteredProperties = filterProperties();

    function handleFilterChange(newFilters: FilterState) {
        setFilters(newFilters);
    }

    function resetFilters() {
        setFilters({});
    }

    return {
        filteredProperties,  
        filters,            
        handleFilterChange,  
        resetFilters,       
    };
}