import { useState, useCallback, useMemo } from 'react';
import type { Property, FilterState } from '@/types/homepage';

export function usePropertyFilters(properties: Property[]) {
    const [filters, setFilters] = useState<FilterState>({});

    const filteredProperties = useMemo(() => {
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

        return filtered;
    }, [properties, filters]);

    const handleFilterChange = useCallback((newFilters: FilterState) => {
        setFilters(newFilters);
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({});
    }, []);

    return {
        filteredProperties,
        filters,
        handleFilterChange,
        resetFilters,
    };
}