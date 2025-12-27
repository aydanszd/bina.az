export interface Property {
    id: string | number;
    image1?: string;
    title: string;
    price?: number;
    rooms?: number | string;
    area?: number | string;
    floor?: number | string;
    location: string;
    createdAt: string | Date;
    type?: string;
    property?: string;
    isNew?: boolean | string;
}

export interface PropertyCardProps {
    property: Property;
}

export interface FilterState {
    type?: string;
    property?: string;
    rooms?: string;
    locations?: string[];
    priceMin?: number;
    priceMax?: number;
    areaMin?: number;
    areaMax?: number;
    buildingType?: string;
}

export interface BinaFilterProps {
    onFilterChange: (filters: FilterState) => void;
    totalCount: number;
    isLoading?: boolean;
}

export interface PropertyGridProps {
    properties?: Property[];
    apiEndpoint?: string;
}