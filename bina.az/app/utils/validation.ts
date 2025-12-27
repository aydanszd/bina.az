import { FormData, Errors } from '../types/announcement';

export const validateField = (
    field: keyof FormData,
    value: string,
    formData: FormData,
    currentErrors: Errors
): { isValid: boolean; errors: Errors } => {
    const newErrors: Errors = { ...currentErrors };
    
    if (!value || value.toString().trim() === '') {
        delete newErrors[field as keyof Errors];
        return { isValid: true, errors: newErrors };
    }

    const rooms = field === 'rooms' ? parseInt(value) : parseInt(formData.rooms);
    const area = field === 'area' ? parseFloat(value) : parseFloat(formData.area);

    if (field === 'rooms' || field === 'area') {
        if (!isNaN(rooms) && !isNaN(area) && rooms > 0 && area > 0) {
            const minArea = rooms * 8;
            const maxArea = rooms * 100;

            if (area < minArea) {
                newErrors.area = `${rooms} otaq üçün minimum ${minArea} m² sahə olmalıdır`;
            } else if (area > maxArea) {
                newErrors.area = `${rooms} otaq üçün maksimum ${maxArea} m² sahə ola bilər`;
            } else {
                delete newErrors.area;
            }
        }
    }

    if (field === 'floor') {
        const floor = parseInt(value);
        if (!isNaN(floor) && (floor < 1 || floor > 50)) {
            newErrors.floor = 'Mərtəbə 1-50 arasında olmalıdır';
        } else {
            delete newErrors.floor;
        }
    }

    if (field === 'rooms') {
        if (!isNaN(rooms) && (rooms < 1 || rooms > 10)) {
            newErrors.rooms = 'Otaq sayı 1-10 arasında olmalıdır';
        } else if (!isNaN(rooms)) {
            delete newErrors.rooms;
        }
    }

    if (field === 'area') {
        if (!isNaN(area) && (area < 10 || area > 1000)) {
            newErrors.area = 'Sahə 10-1000 m² arasında olmalıdır';
        }
    }

    if (field === 'price') {
        const price = parseFloat(value);
        if (!isNaN(price) && price < 1) {
            newErrors.price = 'Qiymət 0-dan böyük olmalıdır';
        } else if (!isNaN(price)) {
            delete newErrors.price;
        }
    }

    if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            newErrors.email = 'Düzgün email daxil edin';
        } else {
            delete newErrors.email;
        }
    }

    if (field === 'phone') {
        const phoneRegex = /^[\d\s\+\-\(\)]{9,}$/;
        if (value && !phoneRegex.test(value)) {
            newErrors.phone = 'Düzgün telefon nömrəsi daxil edin';
        } else {
            delete newErrors.phone;
        }
    }

    return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors
    };
};

export const validateAllFields = (
    formData: FormData,
    currentErrors: Errors
): { isValid: boolean; errors: Errors } => {
    const fieldsToValidate: (keyof FormData)[] = [
        'rooms',
        'area',
        'floor',
        'price',
        'email',
        'phone'
    ];
    
    let errors = currentErrors;
    let hasErrors = false;

    fieldsToValidate.forEach(field => {
        const result = validateField(field, formData[field] as string, formData, errors);
        errors = result.errors;
        if (!result.isValid) {
            hasErrors = true;
        }
    });

    return { isValid: !hasErrors, errors };
};