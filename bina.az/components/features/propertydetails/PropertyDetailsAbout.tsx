const STATIC_ABOUT = `"Winter City Group" 20 ildir ki, tikinti sahəsində fəaliyyət göstərir və beynəlxalq standartlara uyğun premium sinif binalar inşa edir. Biz şəhərin arxitekturasına uyğun, sakinləri üçün tam rahat və təhlükəsiz yaşayış komplekslərini təqdim edirik. Tamamlanmış və davam edən layihələrimiz gördüyümüz yüksək səviyyəli işin nümunəsidir.`;

const STATIC_ABOUT_EXTRA = `Yeni layihəmiz Həsən Əliyev və Cəlil Məmmədquluzadə küçələrinin kəsişməsində yerləşən "Eleven Park" layihəsidir. "Eleven Park" sizlərə 1, 2, 3 və 4 otaqlı mənzillər təklif edir.`;

export const PropertyAbout: React.FC = () => {
    return (
        <div className="mb-12 pt-8 border-t border-[#f0f2f7]">
            <h2 className="text-[18px] md:text-[20px] font-bold mb-6">Ümumi məlumat</h2>
            <div className="text-[14px] leading-[1.6] text-[#212326] space-y-4">
                <p>{STATIC_ABOUT}</p>
                <p>{STATIC_ABOUT_EXTRA}</p>
            </div>
        </div>
    );
};