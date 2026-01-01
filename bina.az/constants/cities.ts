export const CITIES = [
    'Bakı',
    'Gəncə',
    'Quba',
    'Qusar',
    'Qəbələ',
    'Xaçmaz',
    'Naxçıvan',
    'Şəmkir'
] as const;

export type City = typeof CITIES[number];