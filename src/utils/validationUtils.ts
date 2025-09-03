// Validation error types and utilities
export interface ValidationError {
    field: string;
    message: string;
}

export interface FormErrors {
    [key: string]: string;
}

// Parse validation errors from backend response
export const parseValidationErrors = (errorMessage: string): FormErrors => {
    const errors: FormErrors = {};

    // Handle different error message formats
    if (typeof errorMessage !== 'string') {
        return errors;
    }

    // Handle Joi validation error messages
    // Common format: "First Name is required" or "Email must be a valid email"
    const fieldMatches = [
        // Match "First Name is required"
        { pattern: /^"?([^"]+)"?\s+is\s+required$/i, field: '$1', message: '$1 is required' },
        // Match "First Name must be..."
        { pattern: /^"?([^"]+)"?\s+must\s+(.+)$/i, field: '$1', message: '$1 must $2' },
        // Match "Password length must be..."
        { pattern: /^"?([^"]+)"?\s+length\s+(.+)$/i, field: '$1', message: '$1 length $2' },
        // Match "Email with this email already exists"
        { pattern: /^User\s+with\s+this\s+email\s+already\s+exists$/i, field: 'email', message: 'Email address is already registered' },
        // Match "Invalid credentials"
        { pattern: /^Invalid\s+credentials$/i, field: 'password', message: 'Invalid email or password' },
    ];

    for (const match of fieldMatches) {
        const result = errorMessage.match(match.pattern);
        if (result) {
            const fieldName = normalizeFieldName(result[1] || match.field);
            errors[fieldName] = match.message.replace('$1', result[1] || '').replace('$2', result[2] || '');
            return errors;
        }
    }

    // If no specific field match, try to identify the field from common error messages
    const errorLower = errorMessage.toLowerCase();

    if (errorLower.includes('email')) {
        errors.email = errorMessage;
    } else if (errorLower.includes('password')) {
        errors.password = errorMessage;
    } else if (errorLower.includes('first name') || errorLower.includes('firstname')) {
        errors.firstName = errorMessage;
    } else if (errorLower.includes('last name') || errorLower.includes('lastname')) {
        errors.lastName = errorMessage;
    } else if (errorLower.includes('telephone') || errorLower.includes('phone')) {
        errors.telephone = errorMessage;
    } else if (errorLower.includes('country')) {
        errors.country = errorMessage;
    } else {
        // Generic error - could be displayed as a general form error
        errors.general = errorMessage;
    }

    return errors;
};

// Normalize field names to match form field names
const normalizeFieldName = (fieldName: string): string => {
    const normalized = fieldName.toLowerCase().replace(/\s+/g, '');

    const fieldMapping: { [key: string]: string } = {
        'firstname': 'firstName',
        'lastname': 'lastName',
        'email': 'email',
        'password': 'password',
        'telephone': 'telephone',
        'phone': 'telephone',
        'country': 'country',
        'usertype': 'userType',
        'confirmpassword': 'confirmPassword',
    };

    return fieldMapping[normalized] || normalized;
};

// Clear specific field errors when user starts typing
export const clearFieldError = (
    errors: FormErrors,
    field: string,
    setErrors: (errors: FormErrors) => void
): void => {
    if (errors[field]) {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
    }
};

// Validate form data and return errors
export const validateFormData = (
    data: any,
    requiredFields: string[],
    customValidators: { [key: string]: (value: any) => string | null } = {}
): FormErrors => {
    const errors: FormErrors = {};

    // Check required fields
    for (const field of requiredFields) {
        if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
            errors[field] = `${formatFieldName(field)} is required`;
        }
    }

    // Run custom validators
    for (const [field, validator] of Object.entries(customValidators)) {
        if (data[field]) {
            const error = validator(data[field]);
            if (error) {
                errors[field] = error;
            }
        }
    }

    return errors;
};

// Format field names for display
const formatFieldName = (fieldName: string): string => {
    return fieldName
        .replace(/([A-Z])/g, ' $1') // Add space before capitals
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim();
};

// Common validators
export const validators = {
    email: (value: string): string | null => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : 'Please enter a valid email address';
    },

    password: (value: string): string | null => {
        if (value.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(value)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(value)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/\d/.test(value)) {
            return 'Password must contain at least one number';
        }
        return null;
    },

    confirmPassword: (value: string, originalPassword: string): string | null => {
        return value === originalPassword ? null : 'Passwords do not match';
    },

    phone: (value: string): string | null => {
        if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
            return 'Please enter a valid phone number';
        }
        return null;
    }
};
