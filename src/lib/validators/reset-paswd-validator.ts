import { z } from "zod"

export const ResetValidator = z.object({
    password: z.string()
        .min(8, {
            message: 'La contraseña debe contener al menos 8 caracteres.',
        })
        .refine(password => /[a-z]/.test(password), {
            message: 'La contraseña debe contener al menos una letra minuscula.',
        })
        .refine(password => /[A-Z]/.test(password), {
            message: 'La contraseña debe contener al menos una letra Mayúscula.',
        })
        .refine(password => /\d/.test(password), {
            message: 'La contraseña debe contener al menos un número.',
        }),

    confirmPassword: z.string()
        .min(8, {
            message: 'La contraseña debe contener al menos 8 caracteres.',
        })
        .refine(confirmPassword => /[a-z]/.test(confirmPassword), {
            message: 'La contraseña debe contener al menos una letra minuscula.',
        })
        .refine(confirmPassword => /[A-Z]/.test(confirmPassword), {
            message: 'La contraseña debe contener al menos una letra Mayúscula.',
        })
        .refine(confirmPassword => /\d/.test(confirmPassword), {
            message: 'La contraseña debe contener al menos un número.',
        }),
})
.refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir.',
    path: ['confirmPassword'],
});

export type TypeResetValidator = z.infer<typeof ResetValidator>
