export const BAKU_DISTRICTS = [
    "Abşeron", "Binəqədi", "Xətai", "Xəzər", "Qaradağ", "Nərimanov",
    "Nəsimi", "Nizami", "Pirallahi", "Sabunçu", "Səbail", "Suraxanı", "Yasamal"
] as const;

export const AZERBAIJAN_CITIES = [
    "Ağcabədi", "Ağdam", "Ağdaş", "Ağdərə", "Ağstafa", "Ağsu", "Astara", "Balakən",
    "Beyləqan", "Bərdə", "Biləsuvar", "Cəbrayıl", "Cəlilabad", "Daşkəsən", "Füzuli",
    "Gədəbəy", "Goranboy", "Göyçay", "Göygöl", "Göytəpə", "Hacıqabul", "Xankəndi",
    "Xızı", "Xocalı", "Xocavənd", "Xudat", "İmişli", "Kəlbəcər", "Kürdəmir", "Qazax",
    "Qobustan", "Qubadlı", "Laçın", "Lerik", "Masallı", "Mingəçevir", "Naftalan",
    "Naxçıvan", "Neftçala", "Oğuz", "Saatlı", "Sabirabad", "Salyan", "Samux",
    "Siyəzən", "Şabran", "Şəki", "Şəmkir", "Şirvan", "Şuşa", "Tərtər", "Tovuz",
    "Ucar", "Yardımlı", "Yevlax", "Zaqatala", "Zəngilan", "Zərdab"
] as const;

export const CONTACT_INFO = {
    phone: {
        number: "(012) 528-94-94",
        href: "tel:0125289494"
    },
    email: {
        address: "bina@bina.az",
        href: "mailto:bina@bina.az"
    }
} as const;

export const FOOTER_LINKS = [
    { label: "Layihə haqqında", href: "#" },
    { label: "İstifadəçi razılaşması", href: "#" },
    { label: "Saytın xəritəsi", href: "#" },
    { label: "Məxfilik siyasəti", href: "#" },
    { label: "Reklam yerləşdirin", href: "#" }
] as const;

export const SOCIAL_LINKS = [
    { name: "facebook", href: "#", hoverColor: "#1877F2" },
    { name: "instagram", href: "#", hoverColor: "#E4405F" }
] as const;

export const COMPANY_INFO = {
    name: "Digital Classifieds MMC",
    voen: "1405631651",
    yearFounded: 2008,
    copyright: "© 2008-2025 Digital Classifieds MMC. VÖEN: 1405631651",
    disclaimer: "Saytın Administrasiyası reklam bannerlərinin və yerləşdirilmiş elanların məzmununa görə məsuliyyət daşımır."
} as const;

export type BakuDistrict = typeof BAKU_DISTRICTS[number];
export type AzerbaijanCity = typeof AZERBAIJAN_CITIES[number];