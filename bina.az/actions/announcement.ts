"use server"
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const announcementSchema = z.object({
    type: z.enum(['Alış', 'Kiraye']),
    property: z.string().min(1, 'Əmlak növü seçin'),
    ownerType: z.enum(['owner', 'agent']),
    city: z.string().min(1, 'Şəhər seçin'),
    rooms: z.coerce.number().min(1, 'Otaq sayı minimum 1 olmalıdır'),
    area: z.coerce.number().min(1, 'Sahə daxil edin'),
    floor: z.coerce.number().min(0, 'Mərtəbə 0-dan kiçik ola bilməz'),
    isNew: z.enum(['true', 'false']).transform(val => val === 'true'),
    image1: z.string().url('Düzgün URL daxil edin'),
    image2: z.string().url('Düzgün URL daxil edin'),
    image3: z.string().url('Düzgün URL daxil edin'),
    description: z.string().optional(),
    price: z.coerce.number().min(1, 'Qiymət 0-dan böyük olmalıdır'),
    name: z.string().min(2, 'Ad minimum 2 simvol olmalıdır'),
    email: z.string().email('Düzgün email daxil edin'),
    phone: z.string().min(9, 'Telefon nömrəsi minimum 9 rəqəm olmalıdır'),
})

export type AnnouncementFormState = {
    errors?: {
        [K in keyof z.infer<typeof announcementSchema>]?: string[]
    }
    message?: string
    success?: boolean
}

export async function createAnnouncement(
    prevState: AnnouncementFormState,
    formData: FormData
): Promise<AnnouncementFormState> {
    const validatedFields = announcementSchema.safeParse({
        type: formData.get('type'),
        property: formData.get('property'),
        ownerType: formData.get('ownerType'),
        city: formData.get('city'),
        rooms: formData.get('rooms'),
        area: formData.get('area'),
        floor: formData.get('floor'),
        isNew: formData.get('isNew'),
        image1: formData.get('image1'),
        image2: formData.get('image2'),
        image3: formData.get('image3'),
        description: formData.get('description'),
        price: formData.get('price'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Zəhmət olmasa bütün xanaları düzgün doldurun',
        }
    }

    const data = validatedFields.data

    try {
        revalidatePath('/elanlar')
        return {
            success: true,
            message: 'Elan uğurla əlavə olundu!',
        }
    } catch (error) {
        return {
            message: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
        }
    }
}