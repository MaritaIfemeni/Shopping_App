import * as yup from 'yup';

const registrationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters long')   
        .max(20, 'Name must be less than 20 characters long'),  
    email:yup.string().email().required('Email is required'),
    avatar: yup
        .string()
        .required('Avatar is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(4, 'Password must be at least 8 characters long'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export default registrationSchema;