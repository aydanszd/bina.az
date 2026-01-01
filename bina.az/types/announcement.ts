export interface FormData {
    type: string;
    property: string;
    ownerType: string;
    city: string;
    rooms: string;
    area: string;
    floor: string;
    renovation: string;
    description: string;
    price: string;
    name: string;
    email: string;
    phone: string;
    isNew: boolean;
}

export interface Errors {
    rooms?: string;
    area?: string;
    floor?: string;
    price?: string;
    email?: string;
    phone?: string;
}

export interface ImageFile {
    file: File;
    preview: string;
    id: string;
}