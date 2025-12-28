"use client";
import { useState } from "react";
import Image from "next/image";
import {
    Key,
    Calendar,
    User,
    Briefcase,
    Building2,
    Home,
} from "lucide-react";
import { toast } from "sonner";
import { FormData, Errors } from '../../types/announcement';
import { validateField, validateAllFields } from '../../utils/validation';

export default function NewItem() {
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        type: "Alış",
        property: "",
        ownerType: "owner",
        city: "Bakı",
        rooms: "",
        area: "",
        floor: "",
        renovation: "",
        description: "",
        price: "",
        name: "",
        email: "",
        phone: "",
        isNew: false
    });
    const [errors, setErrors] = useState<Errors>({});
    const [imageUrls, setImageUrls] = useState<string[]>(['', '', '']);

    const nextStep = (data: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    const cities = ["Bakı", "Naxçıvan", "Gəncə", "Xaçmaz", "Qəbələ", "Quba", "Qusar", "Şəmkir"];

    const handleFieldValidation = (field: keyof FormData, value: string) => {
        const result = validateField(field, value, formData, errors);
        setErrors(result.errors);
        return result.isValid;
    };

    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
    };

    const handleSubmit = async () => {
        const { isValid, errors: validationErrors } = validateAllFields(formData, errors);
        setErrors(validationErrors);

        const validUrls = imageUrls.filter(url => url.trim() !== '');

        if (validUrls.length < 3) {
            toast.error('Minimum 3 şəkil URL-i daxil edin!');
            return;
        }

        if (!formData.price || !formData.name || !formData.email || !formData.phone) {
            toast.error('Zəhmət olmasa bütün məcburi sahələri doldurun!');
            return;
        }

        if (!isValid) {
            toast.error('Zəhmət olmasa bütün xətaları düzəldin!');
            return;
        }

        setLoading(true);

        try {
            const buildingData = {
                title: `${formData.property} - ${formData.city}`,
                description: formData.description || null,
                location: formData.city,
                floor: formData.floor ? parseInt(formData.floor) : null,
                area: formData.area ? parseFloat(formData.area) : null,
                price: formData.price ? parseFloat(formData.price) : null,
                type: formData.type,
                property: formData.property,
                isNew: formData.isNew,
                rooms: formData.rooms ? parseInt(formData.rooms) : null,
                image1: imageUrls[0] || null,
                image2: imageUrls[1] || null,
                image3: imageUrls[2] || null,
            };

            console.log('Bazaya yazılır...', buildingData);

            const response = await fetch('/api/buildings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(buildingData),
            });

            if (!response.ok) {
                throw new Error('Bazaya yazıla bilmədi');
            }

            const result = await response.json();

            console.log('Uğurla əlavə olundu:', result);
            toast.success('Elan uğurla əlavə olundu!');

            setFormData({
                type: "Alış",
                property: "",
                ownerType: "owner",
                city: "Bakı",
                rooms: "",
                area: "",
                floor: "",
                renovation: "",
                description: "",
                price: "",
                name: "",
                email: "",
                phone: "",
                isNew: false
            });
            setImageUrls(['', '', '']);
            setErrors({});
            setStep(1);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta';
            toast.error('Xəta baş verdi: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-4 mt-40 mb-20">
            <div className="w-full h-full max-w-200 bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">

                {step === 1 && (
                    <div className="p-30 text-center">
                        <h1 className="text-2xl font-bold mb-8">Yeni elan</h1>
                        <div className="flex justify-center gap-6">
                            <button onClick={() => nextStep({ type: "Alış" })} className="flex flex-col items-center justify-center border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all w-48">
                                <Key size={48} className="text-blue-600 mb-3" />
                                <span className="font-semibold text-gray-700">Satıram</span>
                            </button>
                            <button onClick={() => nextStep({ type: "Kiraye" })} className="flex flex-col items-center justify-center border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all w-48">
                                <Calendar size={48} className="text-blue-600 mb-3" />
                                <span className="font-semibold text-gray-700">Kirayə verirəm</span>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="p-30 text-center">
                        <h1 className="text-2xl font-bold mb-8">Yeni elan</h1>
                        <div className="flex justify-center gap-4 mb-8">
                            <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-sm">
                                <button
                                    onClick={() => setFormData({ ...formData, type: "Alış" })}
                                    className={`flex-1 py-2 rounded-lg ${formData.type === "Alış" ? "bg-blue-600 text-white shadow-sm" : "text-gray-400"}`}
                                >
                                    Satıram
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, type: "Kiraye" })}
                                    className={`flex-1 py-2 rounded-lg ${formData.type === "Kiraye" ? "bg-blue-600 text-white shadow-sm" : "text-gray-400"}`}
                                >
                                    Kirayə verirəm
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <button onClick={() => nextStep({ property: "Mənzil" })} className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2">
                                <Building2 size={32} /> Mənzil
                            </button>
                            <button onClick={() => nextStep({ property: "Həyət evi" })} className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2">
                                <Home size={32} /> Həyət evi
                            </button>
                            <button onClick={() => nextStep({ property: "Ofis" })} className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2">
                                <Briefcase size={32} /> Ofis
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="p-30 text-center">
                        <h1 className="text-2xl font-bold mb-8 text-[#412e27]">Yeni elan</h1>
                        <div className="flex justify-center gap-6">
                            <button onClick={() => nextStep({ ownerType: "owner" })} className="border border-gray-100 bg-gray-50/50 p-10 rounded-2xl hover:border-blue-500 w-64 flex flex-col items-center transition-all">
                                <User size={48} className="mb-3 text-gray-700" strokeWidth={1.5} />
                                <p className="font-semibold text-gray-700">Elanın sahibi</p>
                            </button>
                            <button onClick={() => nextStep({ ownerType: "agent" })} className="border border-gray-100 bg-gray-50/50 p-10 rounded-2xl hover:border-blue-500 w-64 flex flex-col items-center transition-all">
                                <Briefcase size={48} className="mb-3 text-gray-700" strokeWidth={1.5} />
                                <p className="font-semibold text-gray-700">Mən vasitəçiyəm</p>
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="p-8 space-y-10">
                        <div className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-[#412e27]">Yeni elan</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">{formData.type}</span>
                                <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">{formData.property}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-gray-700">Şəhər *</label>
                            <select
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500 appearance-none"
                            >
                                {cities.map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-[#412e27]">Əmlak haqqında *</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Otaq sayı *"
                                        value={formData.rooms}
                                        onChange={(e) => {
                                            setFormData({ ...formData, rooms: e.target.value });
                                            handleFieldValidation('rooms', e.target.value);
                                        }}
                                        className={`p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full ${errors.rooms ? 'border-red-500' : ''}`}
                                    />
                                    {errors.rooms && <p className="text-red-500 text-xs mt-1">{errors.rooms}</p>}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Sahə, m² *"
                                        value={formData.area}
                                        onChange={(e) => {
                                            setFormData({ ...formData, area: e.target.value });
                                            handleFieldValidation('area', e.target.value);
                                        }}
                                        className={`p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full ${errors.area ? 'border-red-500' : ''}`}
                                    />
                                    {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Mərtəbə *"
                                    value={formData.floor}
                                    onChange={(e) => {
                                        setFormData({ ...formData, floor: e.target.value });
                                        handleFieldValidation('floor', e.target.value);
                                    }}
                                    className={`w-full p-4 border rounded-xl bg-gray-50 outline-blue-500 ${errors.floor ? 'border-red-500' : ''}`}
                                />
                                {errors.floor && <p className="text-red-500 text-xs mt-1">{errors.floor}</p>}
                            </div>
                            <div className="flex gap-4 items-center pt-2">
                                <p className="text-sm font-bold text-gray-700">Tikili</p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isNew: true })}
                                        className={`px-6 py-2 border rounded-full text-sm font-medium transition ${formData.isNew ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
                                    >
                                        Yeni tikili
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isNew: false })}
                                        className={`px-6 py-2 border rounded-full text-sm font-medium transition ${!formData.isNew ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
                                    >
                                        Köhnə tikili
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-[#412e27]">Şəkil URL-ləri *</h3>
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 font-medium">Məlumat</p>
                                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                    Şəkillərinizi Cloudinary, Imgur və ya digər image hosting servislərə yükləyib URL-lərini buraya əlavə edin.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-600">
                                            Şəkil {index + 1} {index < 3 && '*'}
                                        </label>
                                        <input
                                            type="url"
                                            placeholder={`https://example.com/image${index + 1}.jpg`}
                                            value={url}
                                            onChange={(e) => handleUrlChange(index, e.target.value)}
                                            className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500 text-sm"
                                        />
                                        {url && (
                                            <div className="mt-2 rounded-xl overflow-hidden border-2 border-gray-200">
                                                <div className="relative w-full h-48">
                                                    <Image
                                                        src={url}
                                                        alt={`Preview ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        onError={(e) => {
                                                            const target = e.currentTarget;
                                                            target.style.display = 'none';
                                                            const parent = target.parentElement;
                                                            if (parent) {
                                                                const errorDiv = parent.nextElementSibling;
                                                                if (errorDiv && errorDiv instanceof HTMLElement) {
                                                                    errorDiv.style.display = 'flex';
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="hidden items-center justify-center h-48 bg-red-50 text-red-500 text-sm">
                                                    URL səhvdir və ya şəkil yüklənə bilmir
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-[#412e27]">Əlavə məlumat</h3>
                            <div className="relative">
                                <textarea
                                    placeholder="Daşınmaz əmlak barədə ətraflı məlumat qeyd edin. Telefon nömrənizi, e-mail və şirkət şərtlərini qeyd etməyin."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full h-44 p-4 border rounded-xl bg-gray-50 resize-none outline-blue-500 text-sm leading-relaxed"
                                    maxLength={3000}
                                ></textarea>
                                <p className="absolute bottom-4 right-4 text-[11px] text-gray-400">{3000 - formData.description.length} simvol qalıb</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-[#412e27]">Qiymət *</h3>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Qiymət, ₼ *"
                                    value={formData.price}
                                    onChange={(e) => {
                                        setFormData({ ...formData, price: e.target.value });
                                        handleFieldValidation('price', e.target.value);
                                    }}
                                    className={`w-full p-4 border rounded-xl bg-gray-50 pr-12 text-lg font-bold outline-blue-500 ${errors.price ? 'border-red-500' : ''}`}
                                />
                                <span className="absolute right-4 top-4 font-bold text-gray-400 text-xl">₼</span>
                            </div>
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>

                        <div className="pt-6 border-t border-gray-100 space-y-6">
                            <h3 className="text-lg font-bold text-[#412e27]">Əlaqə məlumatları *</h3>

                            <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-sm border border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, ownerType: 'owner' })}
                                    className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${formData.ownerType === 'owner' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
                                >
                                    Elanın sahibi
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, ownerType: 'agent' })}
                                    className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${formData.ownerType === 'agent' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
                                >
                                    Mən vasitəçiyəm
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    placeholder="Ad *"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="p-4 border rounded-xl bg-gray-50 outline-blue-500"
                                />
                                <div>
                                    <input
                                        type="email"
                                        placeholder="E-mail *"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            handleFieldValidation('email', e.target.value);
                                        }}
                                        className={`p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Telefon nömrəsi *"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData({ ...formData, phone: e.target.value });
                                            handleFieldValidation('phone', e.target.value);
                                        }}
                                        className={`p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full ${errors.phone ? 'border-red-500' : ''}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="pt-4">
                                <p className="text-[12px] text-gray-400 leading-relaxed">
                                    Elan yerləşdirərək, siz bina.az-ın
                                    <a href="#" className="text-blue-600 hover:underline mx-1">İstifadəçi razılaşmasını</a> və
                                    <a href="#" className="text-blue-600 hover:underline mx-1">Qaydaları</a> ilə razı olduğunuzu təsdiq edirsiniz.
                                </p>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-5 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all mt-6 shadow-xl shadow-blue-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Yüklənir...' : 'Davam etmək'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}