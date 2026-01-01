export interface Property {
    image2: any;
    image3: any;
    id: string;
    title: string;
    price: number | string;
    location: string;
    rooms?: number | string;
    area?: number | string;
    floor?: number | string;
    image1?: string;
    createdAt: string;
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
    isLoading: boolean;
}

export interface PropertyGridProps {
    properties?: Property[];
    apiEndpoint?: string;
}