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
    rooms: z.string()
        .min(1, 'Otaq sayı tələb olunur')
        .refine(val => !isNaN(Number(val)) && Number(val) > 0, 'Otaq sayı müsbət ədəd olmalıdır'),
    area: z.string()
        .min(1, 'Sahə tələb olunur')
        .refine(val => !isNaN(Number(val)) && Number(val) > 0, 'Sahə müsbət ədəd olmalıdır'),
    floor: z.string()
        .min(1, 'Mərtəbə tələb olunur')
        .refine(val => !isNaN(Number(val)), 'Mərtəbə ədəd olmalıdır'),
    image1: z.string().url('Düzgün URL daxil edin').min(1, 'Şəkil 1 tələb olunur'),
    image2: z.string().url('Düzgün URL daxil edin').min(1, 'Şəkil 2 tələb olunur'),
    image3: z.string().url('Düzgün URL daxil edin').min(1, 'Şəkil 3 tələb olunur'),
    description: z.string().max(3000, 'Təsvir 3000 simvoldan çox ola bilməz').optional(),
    price: z.string()
        .min(1, 'Qiymət tələb olunur')
        .refine(val => !isNaN(Number(val)) && Number(val) > 0, 'Qiymət müsbət ədəd olmalıdır'),
    name: z.string().min(2, 'Ad ən azı 2 simvol olmalıdır').max(100, 'Ad çox uzundur'),
    email: z.string().email('Düzgün e-mail daxil edin').min(1, 'E-mail tələb olunur'),
    phone: z.string().min(9, 'Telefon nömrəsi ən azı 9 rəqəm olmalıdır').max(15, 'Telefon nömrəsi çox uzundur'),
})

export async function createAnnouncement(
    prevState: AnnouncementFormState, 
    formData: FormData 
): Promise<AnnouncementFormState> { 

    const rawFormData = Object.fromEntries(formData.entries())//obyekt->array
    const validatedFields = AnnouncementSchema.safeParse(rawFormData)// crash olmur
    
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,//mürəkkəb Zod errori -> sadə obyekt.
            message: 'Zəhmət olmasa bütün tələb olunan sahələri düzgün doldurun',
            success: false,
        }
    }

    try {
        const data = validatedFields.data
        
        await prisma.building.create({
            data: {
                title: `${data.property} - ${data.city}`,
                description: data.description || null,
                location: data.city,
                floor: parseInt(data.floor, 10),
                area: parseFloat(data.area),
                price: parseFloat(data.price),
                type: data.type,
                property: data.property,
                isNew: data.isNew === 'true',
                rooms: parseInt(data.rooms, 10),
                image1: data.image1,
                image2: data.image2,
                image3: data.image3,
            }
        })
        
        revalidatePath('/') 
        revalidatePath('/home')

        return {
            message: 'Elan uğurla əlavə olundu!',
            success: true,
        }
    } catch (error) {
        return {
            message: 'Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin',
            success: false,
        }
    }
}