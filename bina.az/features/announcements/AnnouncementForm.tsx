'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { createAnnouncement, type AnnouncementFormState } from '@/actions/announcement'
import { useState } from 'react'
import { Key, Calendar, User, Briefcase, Building2, Home } from 'lucide-react'
import Image from 'next/image'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white py-5 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Yüklənir...' : 'Davam etmək'}
        </button>
    )
}

export default function AnnouncementForm() {
    const [step, setStep] = useState(1)
    const [formType, setFormType] = useState<'Alış' | 'Kiraye'>('Alış')
    const [property, setProperty] = useState('')
    const [ownerType, setOwnerType] = useState<'owner' | 'agent'>('owner')
    const [isNew, setIsNew] = useState(true)
    const [imageUrls, setImageUrls] = useState(['', '', ''])
    const [description, setDescription] = useState('')

    const initialState: AnnouncementFormState = { message: undefined, errors: {} }
    const [state, formAction] = useFormState(createAnnouncement, initialState)

    const cities = ["Bakı", "Naxçıvan", "Gəncə", "Xaçmaz", "Qəbələ", "Quba", "Qusar", "Şəmkir"]

    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...imageUrls]
        newUrls[index] = value
        setImageUrls(newUrls)
    }

    // Step 1: Choose Type
    if (step === 1) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-10">
                    <h1 className="text-2xl font-bold mb-8 text-center text-[#412e27]">Yeni elan</h1>
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => {
                                setFormType('Alış')
                                setStep(2)
                            }}
                            className="flex flex-col items-center justify-center border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all w-48"
                        >
                            <Key size={48} className="text-blue-600 mb-3" />
                            <span className="font-semibold text-gray-700">Satıram</span>
                        </button>
                        <button
                            onClick={() => {
                                setFormType('Kiraye')
                                setStep(2)
                            }}
                            className="flex flex-col items-center justify-center border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all w-48"
                        >
                            <Calendar size={48} className="text-blue-600 mb-3" />
                            <span className="font-semibold text-gray-700">Kirayə verirəm</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Step 2: Choose Property
    if (step === 2) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-10">
                    <h1 className="text-2xl font-bold mb-8 text-center text-[#412e27]">Yeni elan</h1>
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-sm">
                            <button
                                onClick={() => setFormType('Alış')}
                                className={`flex-1 py-2 rounded-lg ${formType === 'Alış' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400'}`}
                            >
                                Satıram
                            </button>
                            <button
                                onClick={() => setFormType('Kiraye')}
                                className={`flex-1 py-2 rounded-lg ${formType === 'Kiraye' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400'}`}
                            >
                                Kirayə verirəm
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => {
                                setProperty('Mənzil')
                                setStep(3)
                            }}
                            className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2"
                        >
                            <Building2 size={32} />
                            Mənzil
                        </button>
                        <button
                            onClick={() => {
                                setProperty('Həyət evi')
                                setStep(3)
                            }}
                            className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2"
                        >
                            <Home size={32} />
                            Həyət evi
                        </button>
                        <button
                            onClick={() => {
                                setProperty('Ofis')
                                setStep(3)
                            }}
                            className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2"
                        >
                            <Briefcase size={32} />
                            Ofis
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Step 3: Choose Owner Type
    if (step === 3) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-10">
                    <h1 className="text-2xl font-bold mb-8 text-center text-[#412e27]">Yeni elan</h1>
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => {
                                setOwnerType('owner')
                                setStep(4)
                            }}
                            className="border border-gray-100 bg-gray-50/50 p-10 rounded-2xl hover:border-blue-500 w-64 flex flex-col items-center transition-all"
                        >
                            <User size={48} className="mb-3 text-gray-700" strokeWidth={1.5} />
                            <p className="font-semibold text-gray-700">Elanın sahibi</p>
                        </button>
                        <button
                            onClick={() => {
                                setOwnerType('agent')
                                setStep(4)
                            }}
                            className="border border-gray-100 bg-gray-50/50 p-10 rounded-2xl hover:border-blue-500 w-64 flex flex-col items-center transition-all"
                        >
                            <Briefcase size={48} className="mb-3 text-gray-700" strokeWidth={1.5} />
                            <p className="font-semibold text-gray-700">Mən vasitəçiyəm</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Step 4: Main Form 
    return (
        <div className="min-h-screen flex items-center justify-center p-4 my-20">
            <form action={formAction} className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border">
                <div className="p-8 space-y-10">
                    <input type="hidden" name="type" value={formType} />
                    <input type="hidden" name="property" value={property} />
                    <input type="hidden" name="ownerType" value={ownerType} />
                    <input type="hidden" name="isNew" value={String(isNew)} />

                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-bold text-[#412e27]">Yeni elan</h2>
                        <div className="flex gap-2 mt-2">
                            <span className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                                {formType}
                            </span>
                            <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                                {property}
                            </span>
                        </div>
                    </div>

                    {state.message && (
                        <div className={`p-4 rounded-xl ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {state.message}
                        </div>
                    )}

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Şəhər *</label>
                        <select
                            name="city"
                            defaultValue="Bakı"
                            className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500 appearance-none"
                        >
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {state.errors?.city && (
                            <p className="text-red-500 text-xs">{state.errors.city[0]}</p>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-[#412e27]">Əmlak haqqında *</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="number"
                                    name="rooms"
                                    placeholder="Otaq sayı *"
                                    className="p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full"
                                />
                                {state.errors?.rooms && (
                                    <p className="text-red-500 text-xs mt-1">{state.errors.rooms[0]}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="area"
                                    placeholder="Sahə, m² *"
                                    className="p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full"
                                />
                                {state.errors?.area && (
                                    <p className="text-red-500 text-xs mt-1">{state.errors.area[0]}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <input
                                type="number"
                                name="floor"
                                placeholder="Mərtəbə *"
                                className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {state.errors?.floor && (
                                <p className="text-red-500 text-xs mt-1">{state.errors.floor[0]}</p>
                            )}
                        </div>
                        <div className="flex gap-4 items-center pt-2">
                            <p className="text-sm font-bold text-gray-700">Tikili</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsNew(true)}
                                    className={`px-6 py-2 border rounded-full text-sm font-medium transition ${isNew ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
                                >
                                    Yeni tikili
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsNew(false)}
                                    className={`px-6 py-2 border rounded-full text-sm font-medium transition ${!isNew ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
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
                                        Şəkil {index + 1} *
                                    </label>
                                    <input
                                        type="url"
                                        name={`image${index + 1}`}
                                        placeholder={`https://example.com/image${index + 1}.jpg`}
                                        value={url}
                                        onChange={(e) => handleUrlChange(index, e.target.value)}
                                        className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500 text-sm"
                                    />
                                    {url && (
                                        <div className="mt-2 rounded-xl overflow-hidden border-2 border-gray-200">
                                            <div className="relative w-full h-48 bg-gray-100">
                                                <Image
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    fill
                                                    unoptimized={true}
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
                                    {state.errors?.[`image${index + 1}` as keyof typeof state.errors] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {state.errors[`image${index + 1}` as keyof typeof state.errors]?.[0]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#412e27]">Əlavə məlumat</h3>
                        <div className="relative">
                            <textarea
                                name="description"
                                placeholder="Daşınmaz əmlak barədə ətraflı məlumat qeyd edin. Telefon nömrənizi, e-mail və şirkət şərtlərini qeyd etməyin."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-44 p-4 border rounded-xl bg-gray-50 resize-none outline-blue-500 text-sm leading-relaxed"
                                maxLength={3000}
                            />
                            <p className="absolute bottom-4 right-4 text-[11px] text-gray-400">
                                {3000 - description.length} simvol qalıb
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#412e27]">Qiymət *</h3>
                        <div className="relative">
                            <input
                                type="number"
                                name="price"
                                placeholder="Qiymət, ₼ *"
                                className="w-full p-4 border rounded-xl bg-gray-50 pr-12 text-lg font-bold outline-blue-500"
                            />
                            <span className="absolute right-4 top-4 font-bold text-gray-400 text-xl">₼</span>
                        </div>
                        {state.errors?.price && (
                            <p className="text-red-500 text-xs">{state.errors.price[0]}</p>
                        )}
                    </div>

                    <div className="pt-6 border-t border-gray-100 space-y-6">
                        <h3 className="text-lg font-bold text-[#412e27]">Əlaqə məlumatları *</h3>

                        <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-sm border border-gray-200">
                            <button
                                type="button"
                                onClick={() => setOwnerType('owner')}
                                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${ownerType === 'owner' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
                            >
                                Elanın sahibi
                            </button>
                            <button
                                type="button"
                                onClick={() => setOwnerType('agent')}
                                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${ownerType === 'agent' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
                            >
                                Mən vasitəçiyəm
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Ad *"
                                className="p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {state.errors?.name && (
                                <p className="text-red-500 text-xs">{state.errors.name[0]}</p>
                            )}

                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail *"
                                className="p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {state.errors?.email && (
                                <p className="text-red-500 text-xs">{state.errors.email[0]}</p>
                            )}

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Telefon nömrəsi *"
                                className="p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {state.errors?.phone && (
                                <p className="text-red-500 text-xs">{state.errors.phone[0]}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <p className="text-[12px] text-gray-400 leading-relaxed">
                                Elan yerləşdirərək, siz bina.az-ın
                                <a href="#" className="text-blue-600 hover:underline mx-1">İstifadəçi razılaşmasını</a> və
                                <a href="#" className="text-blue-600 hover:underline mx-1">Qaydaları</a> ilə razı olduğunuzu təsdiq edirsiniz.
                            </p>
                            <div className="mt-6">
                                <SubmitButton />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}