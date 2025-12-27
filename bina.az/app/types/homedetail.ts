export interface Property {
    id: string;
    title: string;
    description?: string | null;
    location: string;
    floor?: number | null;
    area?: number | null;
    price?: number | null;
    type: string;
    property: string;
    isNew: boolean;
    rooms?: number | null;
    image1?: string | null;
    image2?: string | null;
    image3?: string | null;
    createdAt: Date;
    updatedAt: Date;
    views?: number;
}

export interface PropertyDetailProps {
    property: Property;
    relatedProperties: Property[];
}

export interface StaticPlan {
    rooms: string;
    price: string;
}

export interface StaticParameter {
    label: string;
    value: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface Listing {
    id: number;
    image: string;
    price: string;
    address: string;
    details: string;
    date: string;
    isNew: boolean;
    isVip: boolean;
}