export const PROPERTY_TYPES = [
    { value: 'Mənzil', label: 'Mənzil' },
    { value: 'Həyət evi', label: 'Həyət evi/Bağ evi' },
    { value: 'Ofis', label: 'Ofis' },
    { value: 'Qaraj', label: 'Qaraj' },
    { value: 'Torpaq', label: 'Torpaq' },
    { value: 'Obyekt', label: 'Obyekt' }
] as const;

export const TRANSACTION_TYPES = [
    { value: 'Alış', label: 'Alqı-satqı' },
    { value: 'Kiraye', label: 'Kiraye' }
] as const;

export const ROOM_OPTIONS = ['1', '2', '3', '4', '5+'] as const;

export type PropertyType = typeof PROPERTY_TYPES[number]['value'];
export type TransactionType = typeof TRANSACTION_TYPES[number]['value'];
export type RoomOption = typeof ROOM_OPTIONS[number];