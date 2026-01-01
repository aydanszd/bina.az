'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export type AnnouncementFormState = {
    message?: string
    success?: boolean
    errors?: {
        [key: string]: string[]
    }
}

const AnnouncementSchema = z.object({
    type: z.enum(['Alış', 'Kiraye']),
    property: z.string().min(1, 'Əmlak növü tələb olunur'),
    ownerType: z.enum(['owner', 'agent']),
    isNew: z.string(),
    city: z.string().min(1, 'Şəhər tələb olunur'),
    rooms: z.string().min(1, 'Otaq sayı tələb olunur'),
    area: z.string().min(1, 'Sahə tələb olunur'),
    floor: z.string().min(1, 'Mərtəbə tələb olunur'),
    image1: z.string().url('Düzgün URL daxil edin').min(1, 'Şəkil 1 tələb olunur'),
    image2: z.string().url('Düzgün URL daxil edin').min(1, 'Şəkil 2 tələb olunur'),
    image3: z.string().url('Düzgün URL daxil edin').min(1, 'Şəkil 3 tələb olunur'),
    description: z.string().optional(),
    price: z.string().min(1, 'Qiymət tələb olunur'),
    name: z.string().min(1, 'Ad tələb olunur'),
    email: z.string().email('Düzgün e-mail daxil edin').min(1, 'E-mail tələb olunur'),
    phone: z.string().min(1, 'Telefon nömrəsi tələb olunur'),
})

export async function createAnnouncement(
    prevState: AnnouncementFormState,
    formData: FormData
): Promise<AnnouncementFormState> {
    // Convert FormData to object
    const rawFormData = {
        type: formData.get('type'),
        property: formData.get('property'),
        ownerType: formData.get('ownerType'),
        isNew: formData.get('isNew'),
        city: formData.get('city'),
        rooms: formData.get('rooms'),
        area: formData.get('area'),
        floor: formData.get('floor'),
        image1: formData.get('image1'),
        image2: formData.get('image2'),
        image3: formData.get('image3'),
        description: formData.get('description'),
        price: formData.get('price'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    }

    // Validate form data
    const validatedFields = AnnouncementSchema.safeParse(rawFormData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Zəhmət olmasa bütün tələb olunan sahələri doldurun',
        }
    }

    try {
        const buildingData = {
            title: `${validatedFields.data.property} - ${validatedFields.data.city}`,
            description: validatedFields.data.description || null,
            location: validatedFields.data.city,
            floor: parseInt(validatedFields.data.floor),
            area: parseFloat(validatedFields.data.area),
            price: parseFloat(validatedFields.data.price),
            type: validatedFields.data.type,
            property: validatedFields.data.property,
            isNew: validatedFields.data.isNew === 'true',
            rooms: parseInt(validatedFields.data.rooms),
            image1: validatedFields.data.image1,
            image2: validatedFields.data.image2,
            image3: validatedFields.data.image3,
        }

        console.log('Bazaya yazılır...', buildingData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/buildings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(buildingData),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            throw new Error(errorData?.message || 'Bazaya yazıla bilmədi')
        }

        const result = await response.json()
        console.log('Uğurla əlavə olundu:', result)

        revalidatePath('/')
        revalidatePath('/buildings')

        return {
            message: 'Elan uğurla əlavə olundu!',
            success: true,
        }
    } catch (error) {
        console.error('Error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta'
        return {
            message: 'Xəta baş verdi: ' + errorMessage,
            success: false,
        }
    }
}