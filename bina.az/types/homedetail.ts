export interface Property {
    id: string;
    title: string;
    price: number | string;
    location: string;
    rooms?: number | string;
    area?: number | string;
    floor?: number | string;
    image1?: string;
    image2?: string;  
    image3?: string; 
    createdAt: string;
    type?: string;
    property?: string;
    isNew?: boolean | string;
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