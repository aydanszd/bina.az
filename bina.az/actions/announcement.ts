'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
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

    const validatedFields = AnnouncementSchema.safeParse(rawFormData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Zəhmət olmasa bütün tələb olunan sahələri doldurun',
        }
    }

    try {
        const data = validatedFields.data
        const building = await prisma.building.create({
            data: {
                title: `${data.property} - ${data.city}`,
                description: data.description || null,
                location: data.city,
                floor: parseInt(data.floor),
                area: parseFloat(data.area),
                price: parseFloat(data.price),
                type: data.type,
                property: data.property,
                isNew: data.isNew === 'true',
                rooms: parseInt(data.rooms),
                image1: data.image1,
                image2: data.image2,
                image3: data.image3,
            },
        })

        console.log('Uğurla əlavə olundu:', building)

        revalidatePath('/')
        revalidatePath('/buildings')

        return {
            message: 'Elan uğurla əlavə olundu!',
            success: true,
        }
    } catch (error) {
        console.error('Database error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Naməlum xəta'
        return {
            message: 'Xəta baş verdi: ' + errorMessage,
            success: false,
        }
    }
}