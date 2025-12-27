import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Smartphone, QrCode } from 'lucide-react';
import {
    BAKU_DISTRICTS,
    AZERBAIJAN_CITIES,
    CONTACT_INFO,
    FOOTER_LINKS,
    SOCIAL_LINKS,
    COMPANY_INFO
} from '@/app/constants/footer';

const Footer = () => {
    return (
        <footer className="bg-[#f6f7f8] pt-12 pb-8 px-4 md:px-10 text-[13px] text-[#212326] font-sans border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                        <div>
                            <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Telefon</p>
                            <a
                                href={CONTACT_INFO.phone.href}
                                className="text-[20px] font-bold hover:text-[#ff4f08] transition tracking-tight"
                            >
                                {CONTACT_INFO.phone.number}
                            </a>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">E-mail</p>
                            <a
                                href={CONTACT_INFO.email.href}
                                className="text-[20px] font-bold hover:text-[#ff4f08] transition tracking-tight"
                            >
                                {CONTACT_INFO.email.address}
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <QrCode size={40} strokeWidth={1.5} className="text-gray-700" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <Smartphone size={16} className="text-[#ff4f08]" />
                                <span className="font-bold text-[15px]">bina.az App</span>
                            </div>
                            <p className="text-gray-400 text-[11px] leading-tight mt-1">
                                Avtomobildən savayı hər şey<br />bir tətbiqdə!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <section>
                        <h4 className="text-gray-400 font-semibold mb-5 uppercase tracking-[1px] text-[11px]">
                            Bakının rayonları
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-3">
                            {BAKU_DISTRICTS.map((district) => (
                                <Link
                                    key={district}
                                    href="#"
                                    className="hover:text-[#ff4f08] transition-colors duration-200"
                                >
                                    {district}
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-gray-400 font-semibold mb-5 uppercase tracking-[1px] text-[11px]">
                            Bütün Azərbaycan
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-3">
                            {AZERBAIJAN_CITIES.map((city) => (
                                <Link
                                    key={city}
                                    href="#"
                                    className="hover:text-[#ff4f08] transition-colors duration-200"
                                >
                                    {city}
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 text-gray-600 font-medium">
                        {FOOTER_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="hover:text-black"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-[12px]">
                        <div className="space-y-1 text-center md:text-left max-w-2xl">
                            <p>{COMPANY_INFO.disclaimer}</p>
                            <p>{COMPANY_INFO.copyright}</p>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex gap-5">
                                {SOCIAL_LINKS.map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        className={`hover:text-[${social.hoverColor}] transition-colors`}
                                    >
                                        {social.name === 'facebook' ? (
                                            <Facebook size={20} strokeWidth={2} />
                                        ) : (
                                            <Instagram size={20} strokeWidth={2} />
                                        )}
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href="#"
                                className="font-bold text-gray-700 hover:text-black border-l pl-8 border-gray-300"
                            >
                                Русский язык
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;