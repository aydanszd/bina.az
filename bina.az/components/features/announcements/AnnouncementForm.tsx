'use client'
import { useForm, useWatch } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { createAnnouncement } from '@/actions/announcement'
import { Key, Calendar, User, Briefcase, Building2, Home } from 'lucide-react'

type FormData = {
    type: 'Alış' | 'Kiraye'
    property: string
    ownerType: 'owner' | 'agent'
    isNew: string
    city: string
    rooms: string
    area: string
    floor: string
    image1: string
    image2: string
    image3: string
    description?: string
    price: string
    name: string
    email: string
    phone: string
}

function ImagePreview({ url }: { url: string }) {
    const [error, setError] = useState(false)

    if (!url) return null

    return (
        <div className="mt-2 rounded-xl overflow-hidden border-2 border-gray-200">
            {!error ? (
                <img
                    src={url}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={() => setError(true)}
                />
            ) : (
                <div className="flex items-center justify-center h-48 bg-red-50 text-red-500 text-sm">
                    URL səhvdir və ya şəkil yüklənə bilmir
                </div>
            )}
        </div>
    )
}

export default function AnnouncementForm() {
    const [step, setStep] = useState(1)
    const [isPending, startTransition] = useTransition()
    const [serverMessage, setServerMessage] = useState<{ message: string; success: boolean } | null>(null)
    const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>({})

    const cities = ["Bakı", "Naxçıvan", "Gəncə", "Xaçmaz", "Qəbələ", "Quba", "Qusar", "Şəmkir"]

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control 
    } = useForm<FormData>({
        defaultValues: {
            type: 'Alış',
            property: '',
            ownerType: 'owner',
            isNew: 'true',
            city: 'Bakı'
        }
    })

    const watchType = useWatch({ control, name: 'type' })
    const watchProperty = useWatch({ control, name: 'property' })
    const watchOwnerType = useWatch({ control, name: 'ownerType' })
    const watchIsNew = useWatch({ control, name: 'isNew' })
    const watchDescription = useWatch({ control, name: 'description' })
    const watchImage1 = useWatch({ control, name: 'image1' })
    const watchImage2 = useWatch({ control, name: 'image2' })
    const watchImage3 = useWatch({ control, name: 'image3' })

    const onSubmit = async (data: FormData) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value ?? ''))
        })

        startTransition(async () => {
            const result = await createAnnouncement({ message: undefined, errors: {} }, formData)
            
            if (result.success) {
                setServerMessage({ message: result.message!, success: true })
                setServerErrors({})
                setTimeout(() => {
                    reset()
                    setStep(1)
                    setServerMessage(null)
                }, 3000)
            } else {
                setServerMessage({ message: result.message!, success: false })
                setServerErrors(result.errors || {})
            }
        })
    }

    // Step 1: Choose Type
    if (step === 1) {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-10">
                    <h1 className="text-2xl font-bold mb-8 text-center text-[#412e27]">Yeni elan</h1>
                    <div className="flex justify-center gap-6">
                        <button
                            type="button"
                            onClick={() => {
                                setValue('type', 'Alış')
                                setStep(2)
                            }}
                            className="flex flex-col items-center justify-center border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all w-48"
                        >
                            <Key size={48} className="text-blue-600 mb-3" />
                            <span className="font-semibold text-gray-700">Satıram</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setValue('type', 'Kiraye')
                                setStep(2)
                            }}
                            className="flex flex-col items-center justify-center border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all w-48"
                        >
                            <Calendar size={48} className="text-blue-600 mb-3" />
                            <span className="font-semibold text-gray-700">Kirayə verirəm</span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    // Step 2: Choose Property
    if (step === 2) {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-10">
                    <h1 className="text-2xl font-bold mb-8 text-center text-[#412e27]">Yeni elan</h1>
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-sm">
                            <button
                                type="button"
                                onClick={() => setValue('type', 'Alış')}
                                className={`flex-1 py-2 rounded-lg ${watchType === 'Alış' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400'}`}
                            >
                                Satıram
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue('type', 'Kiraye')}
                                className={`flex-1 py-2 rounded-lg ${watchType === 'Kiraye' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400'}`}
                            >
                                Kirayə verirəm
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setValue('property', 'Mənzil')
                                setStep(3)
                            }}
                            className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2"
                        >
                            <Building2 size={32} />
                            Mənzil
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setValue('property', 'Həyət evi')
                                setStep(3)
                            }}
                            className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2"
                        >
                            <Home size={32} />
                            Həyət evi
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setValue('property', 'Ofis')
                                setStep(3)
                            }}
                            className="border p-6 rounded-xl hover:border-blue-500 flex flex-col items-center gap-2"
                        >
                            <Briefcase size={32} />
                            Ofis
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    // Step 3: Choose Owner Type
    if (step === 3) {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-10">
                    <h1 className="text-2xl font-bold mb-8 text-center text-[#412e27]">Yeni elan</h1>
                    <div className="flex justify-center gap-6">
                        <button
                            type="button"
                            onClick={() => {
                                setValue('ownerType', 'owner')
                                setStep(4)
                            }}
                            className="border border-gray-100 bg-gray-50/50 p-10 rounded-2xl hover:border-blue-500 w-64 flex flex-col items-center transition-all"
                        >
                            <User size={48} className="mb-3 text-gray-700" strokeWidth={1.5} />
                            <p className="font-semibold text-gray-700">Elanın sahibi</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setValue('ownerType', 'agent')
                                setStep(4)
                            }}
                            className="border border-gray-100 bg-gray-50/50 p-10 rounded-2xl hover:border-blue-500 w-64 flex flex-col items-center transition-all"
                        >
                            <Briefcase size={48} className="mb-3 text-gray-700" strokeWidth={1.5} />
                            <p className="font-semibold text-gray-700">Mən vasitəçiyəm</p>
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    // Step 4: Main Form 
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen flex items-center justify-center p-4 my-20">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border">
                <div className="p-8 space-y-10">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-bold text-[#412e27]">Yeni elan</h2>
                        <div className="flex gap-2 mt-2">
                            <span className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                                {watchType}
                            </span>
                            <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                                {watchProperty}
                            </span>
                        </div>
                    </div>

                    {serverMessage && (
                        <div className={`p-4 rounded-xl ${serverMessage.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {serverMessage.message}
                        </div>
                    )}

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Şəhər *</label>
                        <select
                            {...register('city')}
                            className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500 appearance-none"
                        >
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {serverErrors.city && (
                            <p className="text-red-500 text-xs">{serverErrors.city[0]}</p>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-[#412e27]">Əmlak haqqında *</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="number"
                                    {...register('rooms')}
                                    placeholder="Otaq sayı *"
                                    className="p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full"
                                />
                                {serverErrors.rooms && (
                                    <p className="text-red-500 text-xs mt-1">{serverErrors.rooms[0]}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register('area')}
                                    placeholder="Sahə, m² *"
                                    className="p-4 border rounded-xl bg-gray-50 outline-blue-500 w-full"
                                />
                                {serverErrors.area && (
                                    <p className="text-red-500 text-xs mt-1">{serverErrors.area[0]}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <input
                                type="number"
                                {...register('floor')}
                                placeholder="Mərtəbə *"
                                className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {serverErrors.floor && (
                                <p className="text-red-500 text-xs mt-1">{serverErrors.floor[0]}</p>
                            )}
                        </div>
                        <div className="flex gap-4 items-center pt-2">
                            <p className="text-sm font-bold text-gray-700">Tikili</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setValue('isNew', 'true')}
                                    className={`px-6 py-2 border rounded-full text-sm font-medium transition ${watchIsNew === 'true' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
                                >
                                    Yeni tikili
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setValue('isNew', 'false')}
                                    className={`px-6 py-2 border rounded-full text-sm font-medium transition ${watchIsNew === 'false' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
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
                            {[1, 2, 3].map((index) => (
                                <div key={index} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">
                                        Şəkil {index} *
                                    </label>
                                    <input
                                        type="url"
                                        {...register(`image${index}` as keyof FormData)}
                                        placeholder={`https://example.com/image${index}.jpg`}
                                        className="w-full p-4 border rounded-xl bg-gray-50 outline-blue-500 text-sm"
                                    />
                                    <ImagePreview 
                                        url={index === 1 ? watchImage1 : index === 2 ? watchImage2 : watchImage3} 
                                    />
                                    {serverErrors[`image${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {serverErrors[`image${index}`][0]}
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
                                {...register('description')}
                                placeholder="Daşınmaz əmlak barədə ətraflı məlumat qeyd edin. Telefon nömrənizi, e-mail və şirkət şərtlərini qeyd etməyin."
                                className="w-full h-44 p-4 border rounded-xl bg-gray-50 resize-none outline-blue-500 text-sm leading-relaxed"
                                maxLength={3000}
                            />
                            <p className="absolute bottom-4 right-4 text-[11px] text-gray-400">
                                {3000 - (watchDescription?.length || 0)} simvol qalıb
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#412e27]">Qiymət *</h3>
                        <div className="relative">
                            <input
                                type="number"
                                {...register('price')}
                                placeholder="Qiymət, ₼ *"
                                className="w-full p-4 border rounded-xl bg-gray-50 pr-12 text-lg font-bold outline-blue-500"
                            />
                            <span className="absolute right-4 top-4 font-bold text-gray-400 text-xl">₼</span>
                        </div>
                        {serverErrors.price && (
                            <p className="text-red-500 text-xs">{serverErrors.price[0]}</p>
                        )}
                    </div>

                    <div className="pt-6 border-t border-gray-100 space-y-6">
                        <h3 className="text-lg font-bold text-[#412e27]">Əlaqə məlumatları *</h3>

                        <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-sm border border-gray-200">
                            <button
                                type="button"
                                onClick={() => setValue('ownerType', 'owner')}
                                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${watchOwnerType === 'owner' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
                            >
                                Elanın sahibi
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue('ownerType', 'agent')}
                                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${watchOwnerType === 'agent' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
                            >
                                Mən vasitəçiyəm
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                {...register('name')}
                                placeholder="Ad *"
                                className="p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {serverErrors.name && (
                                <p className="text-red-500 text-xs">{serverErrors.name[0]}</p>
                            )}

                            <input
                                type="email"
                                {...register('email')}
                                placeholder="E-mail *"
                                className="p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {serverErrors.email && (
                                <p className="text-red-500 text-xs">{serverErrors.email[0]}</p>
                            )}

                            <input
                                type="tel"
                                {...register('phone')}
                                placeholder="Telefon nömrəsi *"
                                className="p-4 border rounded-xl bg-gray-50 outline-blue-500"
                            />
                            {serverErrors.phone && (
                                <p className="text-red-500 text-xs">{serverErrors.phone[0]}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <p className="text-[12px] text-gray-400 leading-relaxed">
                                Elan yerləşdirərək, siz bina.az-ın
                                <a href="#" className="text-blue-600 hover:underline mx-1">İstifadəçi razılaşmasını</a> və
                                <a href="#" className="text-blue-600 hover:underline mx-1">Qaydaları</a> ilə razı olduğunuzu təsdiq edirsiniz.
                            </p>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-blue-600 text-white py-5 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? 'Yüklənir...' : 'Davam etmək'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}