"use client"
import React, { useState } from 'react';
import { Menu, Heart, User } from 'lucide-react';

export default function BinaNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6 text-[#946952]" />
                        </button>

                        <a href="/" className="text-[20px] font-bold text-[#946952]">
                            BİNA.AZ
                        </a>
                    </div>
                    <div className="hidden md:flex text-[15px] items-center gap-6 mr-50">
                        <a href="#" className="text-black hover:text-[#946952] transition-colors">
                            Alqi-satqi
                        </a>
                        <a href="#" className="text-black hover:text-[#946952] transition-colors">
                            Kiraye
                        </a>
                        <a href="#" className="text-black hover:text-[#946952] transition-colors">
                            Günlük
                        </a>
                        <a href="#" className="text-black hover:text-[#946952] transition-colors">
                            Agentliklər
                        </a>
                        <a href="#" className="text-black hover:text-[#946952] transition-colors">
                            Yaşayış kompleksləri
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <img
                                src="https://brightgroup.az/wp-content/uploads/2025/04/Pasha_Holding_logo-1.png"
                                alt="PASHA Holding"
                                className="h-6 w-auto object-contain"
                            />
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="hidden sm:block px-3 py-1 text-[18px] cursor-pointer text-black hover:text-[#946952] rounded transition-colors">
                            RU
                        </button>

                        <button className="p-2 cursor-pointer rounded-lg transition-colors">
                            <Heart className="w-6 h-6 hover:text-[#946952]  text-black" />
                        </button>

                        <a href="/announcement" className="hidden sm:flex cursor-pointer items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-[13px] hover:bg-green-800 transition-colors">
                            <span className="text-xl">+</span>
                            <span>Yeni elan</span>
                        </a>

                        <button className="p-2 cursor-pointer rounded-lg transition-colors">
                            <User className="w-6 h-6 text-black" />
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-4 py-2 space-y-2">
                        <a href="#" className="block py-2 text-gray-700 hover:text-orange-600">
                            Alqi-satqi
                        </a>
                        <a href="#" className="block py-2 text-gray-700 hover:text-orange-600">
                            Kiraye
                        </a>
                        <a href="#" className="block py-2 text-gray-700 hover:text-orange-600">
                            Günlük
                        </a>
                        <a href="#" className="block py-2 text-gray-700 hover:text-orange-600">
                            Agentliklər
                        </a>
                        <a href="#" className="block py-2 text-gray-700 hover:text-orange-600">
                            Yaşayış kompleksləri
                        </a>
                        <a href="#" className="block py-2 hover:opacity-80 transition-opacity">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/PH_aze.jpg/1200px-PH_aze.jpg"
                                alt="PASHA Holding"
                                className="h-8 w-auto object-contain"
                            />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}